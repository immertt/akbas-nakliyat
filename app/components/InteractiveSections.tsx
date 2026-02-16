'use client'

import { useState, useEffect, useRef } from 'react';
import { Truck, Shield, Clock, Star, Phone, MessageCircle, Package, MapPin, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import Image from "next/image";
import Hero from "./Hero";
import Projects from "./Projects";


type Review = {
  name: string;
  company?: string;
  rating: number;
  text: string;
};

export default function InteractiveSections() {
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', company: '', message: '', rating: 5 });
  const [reviews, setReviews] = useState<Review[]>([
  {
    name: "Mehmet Yılmaz",
    company: "Demir Çelik A.Ş.",
    rating: 5,
    text: "Zamanlama ve güvenlik konusunda mükemmel hizmet. Ağır yüklerimizi sorunsuz taşıdılar."
  },
  {
    name: "Ayşe Kaya",
    company: "Makine Sanayi Ltd.",
    rating: 5,
    text: "Profesyonel ve güvenilir. Kayseri'de en iyi nakliye hizmeti!"
  }
]);


  const sectionsRef = useRef<Set<HTMLElement>>(new Set());

  const registerSection = (el: HTMLElement | null) => {
    if (el) sectionsRef.current.add(el);
  };


    useEffect(() => {
    const handleScroll = () => {
        const currentScroll = window.scrollY;

        const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

        const scrollPercent =
        docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;

        setScrollProgress(scrollPercent);

        sectionsRef.current.forEach((section) => {
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
            section.classList.add('visible');
            }
        }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const interval = setInterval(() => {
        setActiveService(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
    };
    }, []);

  const services = [
    {
      icon: Package,
      title: "Sanayi Malzemeleri",
      desc: "Demir, çelik ve ağır sanayi ürünleri için uzman taşımacılık",
      color: "from-orange-500 to-red-500",
      whatsappText: "Merhaba, sanayi malzemeleri taşımacılığı için teklif almak istiyorum."
    },
    {
      icon: MapPin,
      title: "Şehir İçi Nakliye",
      desc: "Kayseri ve çevresinde hızlı güvenli teslimat",
      color: "from-blue-500 to-cyan-500",
      whatsappText: "Merhaba, şehir içi nakliye için teklif almak istiyorum."
    },
    {
      icon: Truck,
      title: "Şehirler Arası",
      desc: "Türkiye geneli profesyonel uzun mesafe taşımacılık",
      color: "from-purple-500 to-pink-500",
      whatsappText: "Merhaba, şehirler arası nakliye için teklif almak istiyorum."
    }
  ];


  const features = [
    { icon: Shield, title: "Sigortalı Taşıma", desc: "Her yük tam kapsamlı sigorta altında", color: "text-blue-400" },
    { icon: Clock, title: "Zamanında Teslimat", desc: "Belirlenen sürede garantili teslimat", color: "text-green-400" },
    { icon: Zap, title: "Hızlı Hizmet", desc: "Acil nakliye talepleriniz için anında çözüm", color: "text-yellow-400" },
    { icon: TrendingUp, title: "Uygun Fiyat", desc: "Kaliteli hizmet, rekabetçi fiyatlar", color: "text-orange-400" }
  ];

  const handleSubmit = () => {
  if (formData.name && formData.message) {
    const newReview: Review = {
      name: formData.name,
      company: formData.company || undefined,
      rating: formData.rating,
      text: formData.message
    };

    setReviews(prev => [newReview, ...prev]);

    setFormData({ name: '', company: '', message: '', rating: 5 });
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-orange-500/20 shadow-lg shadow-orange-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#anasayfa" className="flex items-center gap-0.3 group cursor-pointer">
              <Image
                src="/images/logom.webp"
                alt="Akbaş Nakliyat Logo"
                width={64}
                height={64}
                className="w-14 h-14 md:w-16 md:h-16 object-contain mt-1.5"
              />


              <h1 className="text-[32px] font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                AKBAŞ NAKLİYAT
              </h1>
            </a>

            {/* Menü */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-200">
              <a href="#anasayfa" className="hover:text-orange-400 transition-colors">Anasayfa</a>
              <a href="#hizmetler" className="hover:text-orange-400 transition-colors">Hizmetlerimiz</a>
              <a href="#hakkimizda" className="hover:text-orange-400 transition-colors">Hakkımızda</a>
              <a href="#misyon" className="hover:text-orange-400 transition-colors">Misyon</a>
              <a href="#vizyon" className="hover:text-orange-400 transition-colors">Vizyon</a>
              <a href="#neden-biz" className="hover:text-orange-400 transition-colors">Neden Biz?</a>
              <a href="#iletisim" className="hover:text-orange-400 transition-colors">İletişim</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_6px_rgba(249,115,22,0.9)] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Hero />

      {/* Services - Animated Cards */}
      <section id="hizmetler" ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-slate-400">Profesyonel taşımacılık çözümleri</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} 
                className={`group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${activeService === idx ? 'border-orange-500 shadow-2xl shadow-orange-500/50' : 'border-slate-700/50 hover:border-orange-500/50'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                </div>

                <a
                  href={`https://wa.me/905324420987?text=${encodeURIComponent(service.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-6 right-6 bottom-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-slate-950/80 backdrop-blur-sm border border-orange-500/40 text-orange-400 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white"
                >
                  👉 Bu hizmet için teklif al
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      {/* About / Mission / Vision */}
      <section id="hakkimizda" ref={registerSection} className="fade-in-section py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-black mb-3 text-orange-400">Hakkımızda</h3>
            <p className="text-slate-300 leading-relaxed">
              Akbaş Nakliyat; Kayseri merkezli, sanayi taşımacılığı odağında güvenli ve zamanında teslimatı
              önceliklendiren profesyonel bir taşımacılık hizmetidir.
            </p>
          </div>

          <div id="misyon" className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-black mb-3 text-orange-400">Misyon</h3>
            <p className="text-slate-300 leading-relaxed">
              Yükünüzü doğru planlama, doğru sabitleme ve doğru iletişimle sorunsuz şekilde taşımak;
              her işte sürdürülebilir memnuniyet üretmek.
            </p>
          </div>

          <div id="vizyon" className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-black mb-3 text-orange-400">Vizyon</h3>
            <p className="text-slate-300 leading-relaxed">
              Kayseri ve Türkiye genelinde sanayi taşımacılığında “tek araç – tek sorumlu” yaklaşımıyla
              referans gösterilen güvenilir marka olmak.
            </p>
          </div>
        </div>
      </section>


      {/* Features - Animated Grid */}
      <section id="neden-biz" ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Neden Akbaş Nakliyat?
            </h3>
            <p className="text-xl text-slate-400">Güvenilir ve profesyonel hizmet garantisi</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} 
                   className="group bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                   style={{animationDelay: `${idx * 100}ms`}}>
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}/>
                <h5 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h5>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Reviews Section */}
      <section ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Müşteri Yorumları
            </h2>
            <p className="text-xl text-slate-400">Müşterilerimiz ne diyor?</p>
          </div>
          
          {/* Review Form */}
          <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">✨ Deneyiminizi Paylaşın</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Adınız Soyadınız *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Firma Adı (İsteğe bağlı)"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
              />
              <div>
                <label className="block mb-2 text-sm text-slate-400 font-semibold">Değerlendirme</label>
                <div className="flex space-x-2">
                  {[1,2,3,4,5].map(star => (
                    <Star
                      key={star}
                      className={`w-10 h-10 cursor-pointer transition-all transform hover:scale-125 ${star <= formData.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`}
                      onClick={() => setFormData({...formData, rating: star})}
                    />
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Yorumunuz *"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none resize-none transition-all"
              ></textarea>
              <button onClick={handleSubmit} 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/50">
                📤 Yorumu Gönder
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} 
                   className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-orange-400">{review.name}</h3>
                    {review.company && <p className="text-sm text-slate-400">{review.company}</p>}
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="iletisim" ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-12 border border-orange-500/30 shadow-2xl">
            <h3 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Hemen İletişime Geçin
            </h3>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Nakliye ihtiyaçlarınız için bizimle iletişime geçin. <br/>
              Size <span className="text-orange-400 font-bold">özel</span> çözümler sunalım!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://wa.me/905324420987?text=Merhaba,%20nakliye%20hizmeti%20hakkında%20bilgi%20almak%20istiyorum" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg flex items-center space-x-3 transition-all transform hover:scale-110 shadow-2xl shadow-green-500/50 hover:shadow-green-500/80">
                <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>WhatsApp ile Yaz</span>
              </a>
              
              <a href="tel:+905324420987" 
                 className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-bold text-lg flex items-center space-x-3 transition-all transform hover:scale-110 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80">
                <Phone className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
            Türkiye Genelinde Hizmet
          </h3>
            <p className="text-slate-400 mt-3">
              Kayseri merkezli olmakla birlikte, Türkiye genelinde şehir içi ve şehirler arası taşımacılık hizmeti sunuyoruz.
            </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe
            title="Akbaş Nakliyat Kayseri Harita Konumu"
            src="https://www.google.com/maps?q=Kayseri&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="w-full h-[450px] grayscale hover:grayscale-0 transition duration-500"
            allowFullScreen
          ></iframe>
        </div>
      </section>


      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905324420987?text=Merhaba,%20nakliye%20hizmeti%20hakkında%20bilgi%20almak%20istiyorum"
        target="_blank"
        rel="noopener noreferrer"
        className="
        fixed bottom-6 right-6 z-[9999]
        flex items-center gap-3
        bg-green-700 hover:bg-green-800
        text-white font-semibold
        px-6 py-3 rounded-full
        shadow-xl shadow-green-900/40
        transition-all duration-300
        hover:scale-105
        "
      >
        <MessageCircle className="w-5 h-5" />
        Whatsapp Hattı
      </a>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950/90 backdrop-blur-sm py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image
                src="/images/logom.webp"
                alt="Akbaş Nakliyat Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />

              <h2 className="text-2xl font-bold text-white">AKBAŞ NAKLİYAT</h2>
            </div>
            <p className="text-slate-400 mb-2">&copy; 2026 Akbaş Nakliyat. Tüm hakları saklıdır.</p>
            <p className="text-sm text-slate-400">Kayseri merkezli • Türkiye genelinde güvenli taşımacılık</p>
            <div className="mt-6 flex justify-center space-x-6">
                <a
                href={`tel:+${process.env.NEXT_PUBLIC_PHONE}`}
                className="text-slate-400 hover:text-orange-400 transition-colors"
                >
                📞 {process.env.NEXT_PUBLIC_PHONE_DISPLAY}
                </a>

                <span className="text-slate-700">|</span>

                <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
                className="text-slate-400 hover:text-green-400 transition-colors"
                >
                💬 WhatsApp
                </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}