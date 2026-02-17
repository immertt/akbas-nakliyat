import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";



function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // sadece server
);

export async function GET() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user || !isAdminEmail(data.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: rows, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: rows });
}

export async function PATCH(req: Request) {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user || !isAdminEmail(data.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { id, approved } = body;

  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ approved })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user || !isAdminEmail(data.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { id } = body;

  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
