import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONSULTATION_URL = "https://functions.poehali.dev/cb82fe3d-da02-4976-b8d7-71a3171cf6d2";

const servicesList = [
  "IT-инфраструктура",
  "Видеонаблюдение",
  "Кибербезопасность",
  "Сетевые решения",
  "Сборка ПК и серверов",
  "IT-аутсорсинг",
];

const contacts = [
  { icon: "Phone", label: "+7 (812) 987-63-45", href: "tel:+78129876345" },
  { icon: "Mail", label: "d-service.spb@mail.ru", href: "mailto:d-service.spb@mail.ru" },
  { icon: "MapPin", label: "Санкт-Петербург", href: null },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [pdnConsent, setPdnConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      const res = await fetch(CONSULTATION_URL, {
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

  return (
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
                  {servicesList.map((s) => (
                    <option key={s} value={s} style={{ background: "#060d1a" }}>{s}</option>
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

              <button type="submit" disabled={sending || !pdnConsent} className="neon-btn w-full py-4 rounded-xl text-base font-bold tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
                <Icon name={sending ? "Loader" : "Send"} size={18} className={sending ? "animate-spin" : ""} />
                {sending ? "Отправляем..." : "Записаться на бесплатную консультацию"}
              </button>

              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={pdnConsent}
                  onChange={e => setPdnConsent(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer accent-[var(--neon-cyan)]"
                />
                <span className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors">
                  Согласие на обработку персональных данных
                </span>
              </label>

              {sendError && (
                <p className="text-center text-red-400 text-sm">{sendError}</p>
              )}
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
          {contacts.map((c) => (
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
  );
}