"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rating: 5,
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setSuccess(null);

    if (formData.name.trim().length < 2) {
      setError("İsim en az 2 karakter olmalıdır.");
      return;
    }

    if (formData.text.trim().length < 10) {
      setError("Yorum en az 10 karakter olmalıdır.");
      return;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setError("Lütfen 1-5 arası bir puan seçin.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Bir hata oluştu.");
        return;
      }

      setSuccess(
        "Yorumunuz başarıyla gönderildi. Admin onayından sonra yayınlanacaktır."
      );

      setFormData({
        name: "",
        company: "",
        rating: 5,
        text: "",
      });
    } catch {
      setError("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-10 bg-slate-900 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-orange-400">
        Deneyiminizi Paylaşın
      </h2>

      <div className="space-y-4">
        {/* Name */}
        <input
          className="w-full bg-slate-800 p-2 rounded border border-slate-700 focus:border-orange-500 outline-none"
          placeholder="Adınız Soyadınız *"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        {/* Company */}
        <input
          className="w-full bg-slate-800 p-2 rounded border border-slate-700 focus:border-orange-500 outline-none"
          placeholder="Firma Adı (isteğe bağlı)"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />

        {/* Rating - Classic Version */}
        <div>
          <label className="block text-sm mb-2 text-slate-400">
            Değerlendirme *
          </label>

          <div className="flex gap-4 text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className={`cursor-pointer px-3 py-1 rounded border transition ${
                  formData.rating === star
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-orange-500"
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formData.rating === star}
                  onChange={() =>
                    setFormData({ ...formData, rating: star })
                  }
                  className="hidden"
                />
                {star} Yıldız
              </label>
            ))}
          </div>
        </div>

        {/* Comment */}
        <textarea
          rows={4}
          className="w-full bg-slate-800 p-2 rounded border border-slate-700 focus:border-orange-500 outline-none"
          placeholder="Yorumunuz * (min 10 karakter)"
          value={formData.text}
          onChange={(e) =>
            setFormData({ ...formData, text: e.target.value })
          }
        />

        {/* Error */}
        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-400 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-900/40 border border-green-600 text-green-400 p-3 rounded text-sm">
            {success}
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-bold transition disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Yorumu Gönder"}
        </button>
      </div>
    </div>
  );
}
