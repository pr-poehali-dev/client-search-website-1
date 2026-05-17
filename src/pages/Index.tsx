import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import LogoShimmer from "@/components/LogoShimmer";
import SiteNav from "@/components/SiteNav";
import HeroSection from "@/components/HeroSection";
import ContactSection from "@/components/ContactSection";
import NewsGrid from "@/components/NewsGrid";
import NewsSubscribe from "@/components/NewsSubscribe";

const services = [
  {
    icon: "Monitor",
    title: "IT-инфраструктура",
    desc: "Проектирование, монтаж и обслуживание корпоративных сетей, серверов и рабочих мест.",
    tag: "Бизнес-решения",
  },
  {
    icon: "Camera",
    title: "Видеонаблюдение",
    desc: "Системы CCTV и IP-видеонаблюдения для офисов, складов, магазинов и объектов любого масштаба.",
    tag: "Безопасность",
  },
  {
    icon: "Shield",
    title: "Кибербезопасность",
    desc: "Защита корпоративных данных, настройка файрволов, антивирусные решения и аудит безопасности.",
    tag: "Защита данных",
  },
  {
    icon: "Wifi",
    title: "Сетевые решения",
    desc: "Wi-Fi покрытие, VLAN-сегментация, VPN-туннели и управляемая коммутация для любого бизнеса.",
    tag: "Связь",
  },
  {
    icon: "Server",
    title: "Сборка ПК и серверов",
    desc: "Подбор комплектующих и сборка компьютеров и серверов под любые задачи — для дома и бизнеса.",
    tag: "Железо",
  },
  {
    icon: "Headphones",
    title: "IT-аутсорсинг",
    desc: "Полное IT-обслуживание вашей компании — как собственный системный администратор, но дешевле.",
    tag: "Поддержка 24/7",
  },
];

const reasons = [
  { icon: "Zap", title: "Быстрый выезд", desc: "Специалист на объекте в течение 2 часов по городу" },
  { icon: "Award", title: "Гарантия", desc: "На все установленные системы и оборудование" },
  { icon: "Users", title: "Собственные инженеры", desc: "Только штатные специалисты без субподрядчиков" },
  { icon: "TrendingUp", title: "Масштабируемость", desc: "Системы растут вместе с вашим бизнесом" },
];

export default function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0-init");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--dark-bg)" }}>

      {/* NAV */}
      <SiteNav scrollTo={scrollTo} />

      {/* HERO */}
      <HeroSection scrollTo={scrollTo} />

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-0-init reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "var(--neon-cyan)", background: "rgba(0,212,255,0.05)" }}>
              Что мы делаем
            </div>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">Наши <span className="gradient-text">услуги</span></h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Комплексные IT-решения для малого и среднего бизнеса</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="glass-card rounded-2xl p-7 opacity-0-init reveal cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>
                    <Icon name={s.icon} size={22} className="text-[var(--neon-cyan)]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ color: "var(--neon-cyan)", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-oswald font-bold text-xl text-white mb-3 tracking-wide">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative overflow-hidden" style={{ background: "rgba(10,22,40,0.5)" }}>
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="opacity-0-init reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
                style={{ border: "1px solid rgba(0,212,255,0.3)", color: "var(--neon-cyan)", background: "rgba(0,212,255,0.05)" }}>
                О компании
              </div>
              <h2 className="section-title text-4xl md:text-5xl text-white mb-6">Мы — ваш <span className="gradient-text">надёжный</span> IT-партнёр</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                D-Service IT technology — команда сертифицированных IT-специалистов, работающих с 2012 года. Мы помогаем бизнесу строить надёжную технологическую основу: от кабельной разводки до облачной инфраструктуры.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Специализируемся на системах видеонаблюдения для коммерческих объектов, IT-аутсорсинге и комплексной интеграции решений под ключ.
              </p>
              <button onClick={() => scrollTo("contact")} className="neon-btn px-7 py-3 rounded-xl font-bold tracking-wider uppercase flex items-center gap-2">
                <Icon name="MessageCircle" size={18} />
                Связаться с нами
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 opacity-0-init reveal">
              {[
                { icon: "MapPin", title: "Санкт-Петербург", desc: "Работаем по всему Санкт-Петербургу и ЛО" },
                { icon: "Clock", title: "Работаем с 2012", desc: "Более 200 довольных клиентов" },
                { icon: "CheckCircle", title: "Лицензии", desc: "Все необходимые сертификаты и допуски" },
                { icon: "Star", title: "Топ-рейтинг", desc: "4.9/5 на платформах отзывов" },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <Icon name={item.icon} size={24} className="text-[var(--neon-cyan)] mb-3" />
                  <div className="font-oswald font-bold text-white text-lg mb-1">{item.title}</div>
                  <div className="text-gray-500 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-0-init reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "var(--neon-cyan)", background: "rgba(0,212,255,0.05)" }}>
              Почему мы
            </div>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">Ваши <span className="gradient-text">преимущества</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <div key={r.title} className="text-center glass-card rounded-2xl p-8 opacity-0-init reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-float"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,102,255,0.15))", border: "1px solid rgba(0,212,255,0.3)" }}>
                  <Icon name={r.icon} size={28} className="text-[var(--neon-cyan)]" />
                </div>
                <h3 className="font-oswald font-bold text-xl text-white mb-3 tracking-wide">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      {/* NEWS */}
      <section id="news" className="py-24 px-6" style={{ background: "rgba(6,13,26,0.95)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: "var(--neon-cyan)" }}>IT-дайджест</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Новости IT-сферы <span style={{ color: "var(--neon-cyan)" }}>2026</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Актуальные события и тренды в мире технологий, кибербезопасности и цифровой трансформации.</p>
          </div>
          <NewsGrid />
          <NewsSubscribe />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer" aria-label="Наверх">
              <LogoShimmer size="footer" />
            </button>
          </div>
          <p className="text-gray-600 text-sm">© 2026 D-Service IT technology. Все права защищены.</p>
          <div className="flex items-center gap-6">
            {[["Услуги", "services"], ["О нас", "about"], ["Контакты", "contact"], ["Новости", "news"]].map(([l, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-gray-600 hover:text-[var(--neon-cyan)] text-sm transition-colors uppercase tracking-wider">
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
