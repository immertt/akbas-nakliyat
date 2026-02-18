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
    // ✅ 2.1 Rate limit kontrol (en baş)
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

    // ✅ 2.2 Body parse
    const body = await req.json();

    // ✅ 2.3 Alanları çıkar
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const rating = Number(body.rating || 0);
    const text = String(body.text || "").trim();

    // ✅ 2.4 Honeypot (varsa)
    const website = String(body.website || "").trim();
    if (website) return NextResponse.json({ ok: true });

    // ✅ 2.5 VALIDATION BLOĞU (İŞTE BURAYA)
    if (name.length < 2) {
      return NextResponse.json({ error: "İsim çok kısa" }, { status: 400 });
    }

    // ✅ SENİN SORDUĞUN SATIR TAM OLARAK BURAYA
    if (text.length < 10) {
      return NextResponse.json({ error: "Yorum çok kısa" }, { status: 400 });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Puan 1-5 arası olmalı" }, { status: 400 });
    }

    // ✅ 2.6 Insert (validation sonrası)
    const { error } = await supabase.from("reviews").insert({
      name,
      company: company || null,
      rating,
      text,
    });

    await resend.emails.send({
        from: "Akbas Nakliyat <info@akbasnakliyat.com>",
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
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Admin Panel</a>
        `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

