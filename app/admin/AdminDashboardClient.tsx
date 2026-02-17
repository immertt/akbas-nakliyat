"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


type Review = {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  approved: boolean;
  created_at: string;
};

export default function AdminDashboard() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchReviews() {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();

    if (data.data) {
      setReviews(data.data);
    }

    setLoading(false);
  }

  async function approveReview(id: string, approved: boolean) {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });

    fetchReviews();
  }

  async function deleteReview(id: string) {
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchReviews();
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Panel</h1>

            <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>

      {reviews.length === 0 ? (
        <p>Henüz yorum yok.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-800 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <strong>{review.name}</strong> – {review.company}
                </div>
                <div>
                  ⭐ {review.rating}
                </div>
              </div>

              <p className="mb-3">{review.text}</p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    approveReview(review.id, !review.approved)
                  }
                  className={`px-3 py-1 rounded ${
                    review.approved
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {review.approved ? "Onayı Kaldır" : "Onayla"}
                </button>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
