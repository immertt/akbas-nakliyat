import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  // ✅ SADECE SENİN MAİLİN GİREBİLSİN
  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return <AdminDashboardClient />;
}
