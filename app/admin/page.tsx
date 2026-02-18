import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import AdminDashboardClient from "./AdminDashboardClient";
import { isAdminEmail } from "@/lib/auth/isAdmin";


export default async function AdminPage() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (!isAdminEmail(session.user.email)) {
    redirect("/");
  }


  return <AdminDashboardClient />;
}
