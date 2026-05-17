import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f81d60f1-bda8-46ed-ba4a-93dc124098f6/files/57b5b856-988b-44b2-988c-2df8f54fbe02.jpg";

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

const stats = [
  { value: "200+", label: "Клиентов" },
  { value: "с 2012", label: "На рынке" },
  { value: "500+", label: "Проектов" },
  { value: "24/7", label: "Поддержка" },
];

const reasons = [
  { icon: "Zap", title: "Быстрый выезд", desc: "Специалист на объекте в течение 2 часов по городу" },
  { icon: "Award", title: "Гарантия", desc: "На все установленные системы и оборудование" },
  { icon: "Users", title: "Собственные инженеры", desc: "Только штатные специалисты без субподрядчиков" },
  { icon: "TrendingUp", title: "Масштабируемость", desc: "Системы растут вместе с вашим бизнесом" },
];

function LogoShimmer({ size }: { size: "nav" | "footer" }) {
  const h = size === "nav" ? 40 : 28;
  const id = `shimmer-${size}`;
  return (
    <svg height={h} viewBox="0 0 287 67" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff">
            <animate attributeName="offset" values="-1;0;1" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="#4db8ff">
            <animate attributeName="offset" values="-0.7;0.3;1.3" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="60%" stopColor="#ffffff">
            <animate attributeName="offset" values="-0.4;0.6;1.6" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="85%" stopColor="#4db8ff">
            <animate attributeName="offset" values="-0.1;0.85;1.85" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#0066ff">
            <animate attributeName="offset" values="0;1;2" dur="2.5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Building icon */}
      <g filter={`url(#glow-${size})`} fill={`url(#${id})`}>
        <polygon points="8,54 8,28 28,14 48,28 48,54" />
        <polygon points="4,54 4,32 8,29 8,54" opacity="0.6" />
        <rect x="8" y="34" width="40" height="3" opacity="0.4" />
        <rect x="8" y="42" width="40" height="3" opacity="0.4" />
        <polygon points="12,14 28,4 44,14 28,10" opacity="0.8" />
      </g>
      {/* IT-technology text */}
      <text x="58" y="26" fontFamily="Oswald, sans-serif" fontSize="13" fontWeight="500" letterSpacing="1" fill={`url(#${id})`} filter={`url(#glow-${size})`}>
        IT-technology
      </text>
      {/* D-Service text */}
      <text x="56" y="56" fontFamily="Oswald, sans-serif" fontSize="32" fontWeight="700" letterSpacing="1" fill={`url(#${id})`} filter={`url(#glow-${size})`}>
        D-Service
      </text>
    </svg>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("https://functions.poehali.dev/cb82fe3d-da02-4976-b8d7-71a3171cf6d2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSendError("Не удалось отправить заявку. Позвоните нам напрямую.");
      }
    } catch {
      setSendError("Ошибка соединения. Позвоните нам напрямую.");
    } finally {
      setSending(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--dark-bg)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(6, 13, 26, 0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <LogoShimmer size="nav" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[["Услуги", "services"], ["О нас", "about"], ["Преимущества", "why"], ["Контакты", "contact"], ["Новости", "news"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-400 hover:text-[var(--neon-cyan)] transition-colors duration-200 tracking-wider uppercase">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="neon-btn px-5 py-2 rounded-lg text-sm font-bold tracking-wider uppercase">
              Консультация
            </button>
          </div>

          <button className="md:hidden text-gray-400 hover:text-[var(--neon-cyan)]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ background: "rgba(6,13,26,0.98)" }}>
            {[["Услуги", "services"], ["О нас", "about"], ["Преимущества", "why"], ["Консультация", "contact"], ["Новости", "news"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-gray-300 hover:text-[var(--neon-cyan)] py-2 border-b border-gray-800 text-sm uppercase tracking-wider">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden grid-bg" id="hero">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="D-Service IT technology" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.7) 50%, rgba(6,13,26,0.95) 100%)" }} />
        </div>

        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--neon-cyan), transparent)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--neon-blue), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-widest uppercase animate-fade-in"
              style={{ border: "1px solid rgba(0,212,255,0.4)", color: "var(--neon-cyan)", background: "rgba(0,212,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
              IT-решения для вашего бизнеса
            </div>

            <h1 className="font-oswald font-bold text-5xl md:text-7xl leading-none uppercase tracking-wide mb-6 opacity-0-init reveal" style={{ animationDelay: "0.1s" }}>
              <span className="text-white">Технологии,</span>
              <br />
              <span className="gradient-text">которые работают</span>
              <br />
              <span className="text-white">на вас</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl opacity-0-init reveal" style={{ animationDelay: "0.3s" }}>
              IT-инфраструктура и системы видеонаблюдения под ключ. Профессиональный монтаж, настройка и поддержка 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0-init reveal" style={{ animationDelay: "0.5s" }}>
              <button onClick={() => scrollTo("contact")} className="neon-btn px-8 py-4 rounded-xl text-base font-bold tracking-wider uppercase flex items-center gap-2 justify-center">
                <Icon name="Calendar" size={18} />
                Записаться на консультацию
              </button>
              <button onClick={() => scrollTo("services")} className="px-8 py-4 rounded-xl text-base font-bold tracking-wider uppercase flex items-center gap-2 justify-center transition-all duration-300 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
                <Icon name="ArrowDown" size={18} />
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ background: "rgba(10,22,40,0.9)", borderTop: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald font-bold text-3xl gradient-text">{s.value}</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <div key={r.title} className="text-center glass-card rounded-2xl p-8 opacity-0-init reveal" style={{ animationDelay: `${i * 0.12}s` }}>
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

      {/* CONTACT / FORM */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden" style={{ background: "rgba(10,22,40,0.6)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)" }} />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12 opacity-0-init reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "var(--neon-cyan)", background: "rgba(0,212,255,0.05)" }}>
              Бесплатно
            </div>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">Запись на <span className="gradient-text">консультацию</span></h2>
            <p className="text-gray-400 text-lg">Специалист свяжется с вами в течение 15 минут и ответит на все вопросы</p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 opacity-0-init reveal" style={{ animationDelay: "0.2s" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Интересующая услуга</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all duration-300 cursor-pointer"
                    style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(6,13,26,0.9)" }}
                  >
                    <option value="" style={{ background: "#060d1a", color: "#9ca3af" }}>Выберите услугу</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title} style={{ background: "#060d1a" }}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Комментарий</label>
                  <textarea
                    placeholder="Опишите задачу или вопрос..."
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none"
                    style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,212,255,0.2)")}
                  />
                </div>

                <button type="submit" disabled={sending} className="neon-btn w-full py-4 rounded-xl text-base font-bold tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
                  <Icon name={sending ? "Loader" : "Send"} size={18} className={sending ? "animate-spin" : ""} />
                  {sending ? "Отправляем..." : "Записаться на бесплатную консультацию"}
                </button>

                {sendError && (
                  <p className="text-center text-red-400 text-sm">{sendError}</p>
                )}

                <p className="text-center text-gray-600 text-xs">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
                  <Icon name="CheckCircle" size={40} className="text-[var(--neon-green)]" />
                </div>
                <h3 className="font-oswald font-bold text-3xl text-white mb-3">Заявка принята!</h3>
                <p className="text-gray-400 text-lg">Наш специалист свяжется с вами в ближайшее время.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-gray-500 hover:text-[var(--neon-cyan)] transition-colors underline">
                  Отправить ещё одну заявку
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "Phone", label: "+7 (812) 987-63-45", href: "tel:+78129876345" },
              { icon: "Mail", label: "d-service.spb@mail.ru", href: "mailto:d-service.spb@mail.ru" },
              { icon: "MapPin", label: "Санкт-Петербург", href: null },
            ].map((c) => (
              c.href ? (
                <a key={c.label} href={c.href} className="flex items-center gap-3 glass-card rounded-xl px-5 py-4 hover:border-[var(--neon-cyan)] transition-colors">
                  <Icon name={c.icon} size={18} className="text-[var(--neon-cyan)] shrink-0" />
                  <span className="text-gray-300 text-sm">{c.label}</span>
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-3 glass-card rounded-xl px-5 py-4">
                  <Icon name={c.icon} size={18} className="text-[var(--neon-cyan)] shrink-0" />
                  <span className="text-gray-300 text-sm">{c.label}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-24 px-6" style={{ background: "rgba(6,13,26,0.95)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: "var(--neon-cyan)" }}>IT-дайджест</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Новости IT-сферы <span style={{ color: "var(--neon-cyan)" }}>2026</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Актуальные события и тренды в мире технологий, кибербезопасности и цифровой трансформации.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                date: "Май 2026",
                tag: "ИИ",
                title: "GPT-5 и конкуренты: ИИ-модели достигли человеческого уровня в профессиональных задачах",
                desc: "Ведущие ИИ-лаборатории — OpenAI, Google DeepMind и Anthropic — представили модели, превосходящие экспертов в медицине, праве и инженерии. Компании по всему миру ускоряют внедрение ИИ-агентов в бизнес-процессы.",
                icon: "Brain",
              },
              {
                date: "Апрель 2026",
                tag: "Кибербезопасность",
                title: "Волна атак на промышленные объекты: под угрозой системы АСУ ТП по всей Европе",
                desc: "Международные группировки киберпреступников усилили атаки на критическую инфраструктуру. Эксперты призывают бизнес срочно обновить системы защиты и провести аудит уязвимостей.",
                icon: "Shield",
              },
              {
                date: "Апрель 2026",
                tag: "Облако",
                title: "Рынок облачных вычислений превысил $1 трлн: лидируют Microsoft Azure и AWS",
                desc: "По данным Gartner, мировые расходы на облачные сервисы впервые пробили триллионный порог. Российские компании активно переходят на отечественные облачные платформы — Yandex Cloud и SberCloud.",
                icon: "Cloud",
              },
              {
                date: "Март 2026",
                tag: "Видеонаблюдение",
                title: "Видеоналитика с ИИ: системы распознавания эмоций внедряются в ритейл и офисы",
                desc: "Интеллектуальные CCTV-системы нового поколения анализируют поведение посетителей в реальном времени. Технологии помогают оптимизировать выкладку товаров и повышать безопасность объектов.",
                icon: "Camera",
              },
              {
                date: "Февраль 2026",
                tag: "Сети",
                title: "5G-покрытие охватило 80% городов России: бизнес получает доступ к сверхбыстрой связи",
                desc: "«Ростелеком» и МТС завершили масштабное развёртывание 5G-сетей в крупных городах. Технология открывает новые возможности для IoT, удалённого управления оборудованием и видеонаблюдения.",
                icon: "Wifi",
              },
              {
                date: "Январь 2026",
                tag: "Импортозамещение",
                title: "Российский рынок ПО вырос на 35%: отечественные решения вытесняют зарубежные продукты",
                desc: "Переход на российское ПО ускорился: госсектор и крупный бизнес полностью мигрировали на отечественные ERP, CRM и инфраструктурные решения. Спрос на IT-интеграторов достиг рекордных значений.",
                icon: "Monitor",
              },
            ].map((news, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.12)", color: "var(--neon-cyan)" }}>{news.tag}</span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)" }}>
                    <Icon name={news.icon} size={18} style={{ color: "var(--neon-cyan)" }} />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug">{news.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{news.desc}</p>
              </div>
            ))}
          </div>
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
            {[["Услуги", "services"], ["О нас", "about"], ["Контакты", "contact"]].map(([l, id]) => (
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