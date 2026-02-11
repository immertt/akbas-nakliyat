'use client'

import { useState, useEffect, useRef } from 'react';
import { Truck, Shield, Clock, Star, Phone, MessageCircle, Package, MapPin, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import Image from "next/image";

type Review = {
  name: string;
  company?: string;
  rating: number;
  text: string;
};

export default function AkbasNakliyat() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
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
      setScrollY(currentScroll);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 saniye

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);


  const projects = [
    {
      id: 1,
      image: "/images/projects/1.jpg",
      title: "Sanayi Yükü Taşıması",
      description: "Ağır sanayi malzemelerinin güvenli ve sabitlenmiş şekilde taşınması."
    },
    {
      id: 2,
      image: "/images/projects/2.jpg",
      title: "Fabrika Sevkiyatı",
      description: "Üretim tesislerinden zamanında ve sorunsuz teslimat."
    },
    {
      id: 3,
      image: "/images/projects/3.jpg",
      title: "Şehirler Arası Nakliye",
      description: "Uzun mesafe taşımacılıkta planlı ve güvenli teslimat."
    },
    {
      id: 4,
      image: "/images/projects/4.jpg",
      title: "Özel Proje Taşıması",
      description: "Ölçüsü/ağırlığı özel yükler için kontrollü taşıma."
    }
  ];



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
                src="/images/logom.png"
                alt="Akbaş Nakliyat Logo"
                width={64}
                height={64}
                priority
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

      {/* Hero Section with Parallax */}
      <section id="anasayfa" className="relative pt-24 pb-16 px-4 min-h-[calc(100vh-80px)] flex items-start">
        {/* Cinematic Background Image */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/2.jpg')" }}
        />
        {/* Dark Overlay for readability */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.05] pointer-events-none select-none">
          <Image
            src="/images/logom.png"
            alt="Akbaş Nakliyat"
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">              
              <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-white via-orange-100 to-orange-500 bg-clip-text text-transparent">
                  Sanayi Taşımacılığında
                </span> <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Profesyonel Çözüm
                </span>
              </h2>


              <p className="text-xl text-slate-300 leading-relaxed">
                Demir, çelik ve ağır sanayi malzemelerinizi <span className="text-orange-400 font-semibold">güvenle</span> taşıyorum. 
                Tek araçla, <span className="text-orange-400 font-semibold">profesyonel yükleme ekipleriyle</span> çalışarak 
                Kayseri ve Türkiye genelinde hizmet veriyorum.
              </p>

              <div className="flex flex-nowrap gap-3 mt-6 overflow-x-auto no-scrollbar">
                {[
                  { text: "Tek araç – tek sorumlu", icon: <Shield className="w-4 h-4" /> },
                  { text: "Forklift & vinç uyumlu", icon: <Zap className="w-4 h-4" /> },
                  { text: "Sanayiye özel sabitleme", icon: <CheckCircle className="w-4 h-4" /> }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-200 backdrop-blur-md shadow-sm hover:border-orange-500/50 transition-colors cursor-default"
                  >
                    <span className="text-orange-500">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent("Merhaba, nakliye hizmeti hakkında bilgi almak istiyorum")}`} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6" />
                    <span>Hemen Teklif Al</span>
                  </span>
                </a>
                
                <a href={`tel:+${process.env.NEXT_PUBLIC_PHONE}`} 
                   className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-orange-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-orange-400 group-hover:rotate-12 transition-transform" />
                  <span>0532 123 12 34</span>
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

      {/* Services - Animated Cards */}
      <section id="hizmetler" ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Hizmetlerimiz
            </h3>
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
                  
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h4>
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

      {/* Projects / Portfolio Slider */}
      <section ref={registerSection} className="fade-in-section py-24 px-4 relative z-10">
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
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="min-w-full h-[520px] md:h-[560px] relative">
                  <div
                    className="absolute inset-0 cursor-zoom-in z-20"
                    onClick={() => setOpenImage(project.image)}
                  >
                    <div
                      className="group relative w-full h-full cursor-pointer"
                      onClick={() => {
                        setModalIndex(project.id - 1);
                        setIsModalOpen(true);
                      }}
                    >
                    <div className="relative w-full h-full bg-black/10">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>

                      {/* Hover ipucu */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition bg-black/60 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur">
                        🔍 Büyütmek için tıkla
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 z-10" />

                  {/* Text */}
                  <div className="absolute bottom-10 left-10 right-10 text-white z-30 pointer-events-none">
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
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white w-11 h-11 rounded-full flex items-center justify-center transition"
              aria-label="Önceki"
            >
              ◀
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white w-11 h-11 rounded-full flex items-center justify-center transition"
              aria-label="Sonraki"
            >
              ▶
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? "w-8 bg-orange-500" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slayt ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


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
            <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Müşteri Yorumları
            </h3>
            <p className="text-xl text-slate-400">Müşterilerimiz ne diyor?</p>
          </div>
          
          {/* Review Form */}
          <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 shadow-2xl">
            <h4 className="text-2xl font-bold mb-6 text-orange-400">✨ Deneyiminizi Paylaşın</h4>
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
                    <h5 className="font-bold text-lg text-orange-400">{review.name}</h5>
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
          bg-green-500 hover:bg-green-600
          text-white font-semibold
          px-6 py-3 rounded-full
          shadow-xl shadow-green-500/40
          transition-all duration-300
          hover:scale-105
        "
      >
        <MessageCircle className="w-5 h-5" />
        Whatsapp Hattı
      </a>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={selectedImage}
              alt="Büyük görsel"
              fill
              sizes="90vw"
              className="object-contain rounded-xl shadow-2xl"
            />  
          </div>

        </div>
      )}

      {openImage && (
        <div
          className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center"
          onClick={() => setOpenImage(null)}
        >
          <div className="relative w-[95vw] h-[95vh]">
            <Image
              src={openImage}
              alt="Büyük görsel"
              fill
              sizes="95vw"
              className="object-contain"
            />
          </div>


          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setOpenImage(null)}
          >
            ✕
          </button>
        </div>
      )}

      {isModalOpen && modalIndex !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          {/* İç alan */}
          <div
            className="relative max-w-6xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Görsel */}
            <div className="relative w-[90vw] h-[90vh]">
              <Image
                src={projects[modalIndex].image}
                alt={projects[modalIndex].title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>


            {/* Başlık */}
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-2xl font-bold">{projects[modalIndex].title}</h3>
              <p className="text-slate-300">{projects[modalIndex].description}</p>
            </div>

            {/* Sol ok */}
            <button
              onClick={() =>
                setModalIndex(
                  modalIndex === 0 ? projects.length - 1 : modalIndex - 1
                )
              }
              className="absolute left-6 text-white text-3xl bg-black/50 hover:bg-orange-500 w-12 h-12 rounded-full"
            >
              ◀
            </button>

            {/* Sağ ok */}
            <button
              onClick={() =>
                setModalIndex(
                  modalIndex === projects.length - 1 ? 0 : modalIndex + 1
                )
              }
              className="absolute right-6 text-white text-3xl bg-black/50 hover:bg-orange-500 w-12 h-12 rounded-full"
            >
              ▶
            </button>
          </div>
        </div>
      )}


      {/* Footer */}
      <footer className="relative z-10 bg-slate-950/90 backdrop-blur-sm py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image
                src="/images/logom.png"
                alt="Akbaş Nakliyat Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />

              <h2 className="text-2xl font-bold text-white">AKBAŞ NAKLİYAT</h2>
            </div>
            <p className="text-slate-400 mb-2">&copy; 2026 Akbaş Nakliyat. Tüm hakları saklıdır.</p>
            <p className="text-sm text-slate-500">Kayseri merkezli • Türkiye genelinde güvenli taşımacılık</p>
            <div className="mt-6 flex justify-center space-x-6">
              <a href="tel:+905324420987" className="text-slate-400 hover:text-orange-400 transition-colors">
                📞 0532 123 12 34
              </a>
              <span className="text-slate-700">|</span>
              <a href="https://wa.me/905324420987" className="text-slate-400 hover:text-green-400 transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}