import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const rateLimit = new Map<string, number>();
const WINDOW_MS = 60_000;
const resend = new Resend(process.env.RESEND_API_KEY);

function getIP(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return "unknown";
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 0);
  const limit = Number(searchParams.get("limit") || 6);

  const from = page * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("reviews")
    .select("id,name,company,rating,text,created_at", { count: "exact" })
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    hasMore: count ? to + 1 < count : false,
  });
}


export async function POST(req: Request) {
  try {
    // 1️⃣ Rate limit
    const ip = getIP(req);
    const now = Date.now();
    const prev = rateLimit.get(ip);
    if (prev && now - prev < WINDOW_MS) {
      return NextResponse.json(
        { error: "Çok sık gönderim. 1 dakika bekleyin." },
        { status: 429 }
      );
    }
    rateLimit.set(ip, now);

    // 2️⃣ Body parse
    const body = await req.json();

    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const rating = Number(body.rating || 0);
    const text = String(body.text || "").trim();

    // 3️⃣ Honeypot
    const website = String(body.website || "").trim();
    if (website) return NextResponse.json({ ok: true });

    // 4️⃣ Validation
    if (name.length < 2) {
      return NextResponse.json({ error: "İsim çok kısa" }, { status: 400 });
    }

    if (text.length < 10) {
      return NextResponse.json({ error: "Yorum çok kısa" }, { status: 400 });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Puan 1-5 arası olmalı" },
        { status: 400 }
      );
    }

    // 5️⃣ Supabase insert
    const { error: insertError } = await supabase.from("reviews").insert({
      name,
      company: company || null,
      rating,
      text,
    });

    if (insertError) {
      console.error("SUPABASE INSERT FAIL:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // 6️⃣ Domain’i request origin’den alıyoruz (env bağımlılığı bitiyor)
    const origin = new URL(req.url).origin;
    const adminUrl = new URL("/admin/login", origin).toString();

    console.log("ENV CHECK:", {
      origin,
      resendKey: !!process.env.RESEND_API_KEY,
      notifyTo: !!process.env.ADMIN_NOTIFY_EMAIL,
    });

    // 7️⃣ Mail gönderimi (try/catch ile)
    try {
      const result = await resend.emails.send({
        from: "Akbas Nakliyat <onboarding@resend.dev>", // test için güvenli adres
        to: process.env.ADMIN_NOTIFY_EMAIL!,
        subject: "Yeni yorum bekliyor",
        html: `
          <h2>Yeni yorum geldi</h2>
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>Firma:</strong> ${company || "-"}</p>
          <p><strong>Puan:</strong> ${rating}</p>
          <p><strong>Yorum:</strong></p>
          <p>${text}</p>
          <hr />
          <a href="${adminUrl}">Admin Panel</a>
        `,
      });

      console.log("RESEND OK:", result);
    } catch (e) {
      console.error("RESEND FAIL:", e);
      // Mail fail olsa bile yorumu kaydettik, sistem çalışmaya devam eder
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/reviews FAIL:", e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}