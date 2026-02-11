import Image from "next/image";
import { Shield, Zap, CheckCircle, Phone, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="relative pt-24 pb-16 px-4 min-h-[calc(100vh-80px)] flex items-start"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/2.webp"
          alt="Akbaş Nakliyat"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
      </div>

      {/* Dark Overlay Logo */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.05] pointer-events-none select-none">
        <Image
          src="/images/logom.webp"
          alt="Akbaş Nakliyat Sanayi Taşımacılığı"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-orange-500 bg-clip-text text-transparent">
                Sanayi Taşımacılığında
              </span>{" "}
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Profesyonel Çözüm
              </span>
            </h2>

            <p className="text-xl text-slate-300 leading-relaxed">
              Demir, çelik ve ağır sanayi malzemelerinizi{" "}
              <span className="text-orange-400 font-semibold">güvenle</span>{" "}
              taşıyorum. Tek araçla,{" "}
              <span className="text-orange-400 font-semibold">
                profesyonel yükleme ekipleriyle
              </span>{" "}
              çalışarak Kayseri ve Türkiye genelinde hizmet veriyorum.
            </p>

            <div className="flex flex-nowrap gap-3 mt-6 overflow-x-auto no-scrollbar">
              {[
                { text: "Tek araç – tek sorumlu", icon: <Shield className="w-4 h-4" /> },
                { text: "Forklift & vinç uyumlu", icon: <Zap className="w-4 h-4" /> },
                { text: "Sanayiye özel sabitleme", icon: <CheckCircle className="w-4 h-4" /> }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-200 backdrop-blur-md shadow-sm"
                >
                  <span className="text-orange-500">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(
                  "Merhaba, nakliye hizmeti hakkında bilgi almak istiyorum"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50"
              >
                <span className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6" />
                  <span>Hemen Teklif Al</span>
                </span>
              </a>

              <a
                href={`tel:+${process.env.NEXT_PUBLIC_PHONE}`}
                className="px-8 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl font-bold text-lg flex items-center space-x-2"
              >
                <Phone className="w-6 h-6 text-orange-400" />
                <span>0532 442 09 87</span>
              </a>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-slate-400">Başarılı Taşıma</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-slate-400">Müşteri Memnuniyeti</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">7/24</div>
                <div className="text-sm text-slate-400">İletişim</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
