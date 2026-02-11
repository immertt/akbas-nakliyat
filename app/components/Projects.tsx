'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Projects() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      image: "/images/projects/1.webp",
      title: "Sanayi Yükü Taşıması",
      description: "Ağır sanayi malzemelerinin güvenli ve sabitlenmiş şekilde taşınması."
    },
    {
      id: 2,
      image: "/images/projects/2.webp",
      title: "Fabrika Sevkiyatı",
      description: "Üretim tesislerinden zamanında ve sorunsuz teslimat."
    },
    {
      id: 3,
      image: "/images/projects/3.webp",
      title: "Şehirler Arası Nakliye",
      description: "Uzun mesafe taşımacılıkta planlı ve güvenli teslimat."
    },
    {
      id: 4,
      image: "/images/projects/4.webp",
      title: "Özel Proje Taşıması",
      description: "Ölçüsü/ağırlığı özel yükler için kontrollü taşıma."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
            Yapılan İşler
          </h3>
          <p className="text-slate-400 text-lg">
            Son projelerden örnek taşımalar
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/30">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="min-w-full h-[520px] md:h-[560px] relative">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-10 left-10 right-10 text-white z-30">
                  <h4 className="text-3xl font-bold mb-2">
                    {project.title}
                  </h4>
                  <p className="text-slate-200 max-w-2xl">
                    {project.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Prev */}
          <button
            onClick={() =>
              setCurrentSlide(prev =>
                prev === 0 ? projects.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white w-11 h-11 rounded-full flex items-center justify-center"
          >
            ◀
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentSlide(prev =>
                prev === projects.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white w-11 h-11 rounded-full flex items-center justify-center"
          >
            ▶
          </button>

        </div>
      </div>
    </section>
  );
}
