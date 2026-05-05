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
  { icon: "Award", title: "Гарантия 3 года", desc: "На все установленные системы и оборудование" },
  { icon: "Users", title: "Собственные инженеры", desc: "Только штатные специалисты без субподрядчиков" },
  { icon: "TrendingUp", title: "Масштабируемость", desc: "Системы растут вместе с вашим бизнесом" },
];

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
            <img src="https://cdn.poehali.dev/projects/f81d60f1-bda8-46ed-ba4a-93dc124098f6/bucket/ae86bea9-335b-4c7c-893e-f097b5cb6f28.png" alt="D-Service" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[["Услуги", "services"], ["О нас", "about"], ["Преимущества", "why"], ["Контакты", "contact"]].map(([label, id]) => (
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
            {[["Услуги", "services"], ["О нас", "about"], ["Преимущества", "why"], ["Консультация", "contact"]].map(([label, id]) => (
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

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src="https://cdn.poehali.dev/projects/f81d60f1-bda8-46ed-ba4a-93dc124098f6/bucket/ae86bea9-335b-4c7c-893e-f097b5cb6f28.png" alt="D-Service" className="h-8 w-auto opacity-70" />
          </div>
          <p className="text-gray-600 text-sm">© 2025 D-Service IT technology. Все права защищены.</p>
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