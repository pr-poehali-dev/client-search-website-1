import { useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/f81d60f1-bda8-46ed-ba4a-93dc124098f6/files/57b5b856-988b-44b2-988c-2df8f54fbe02.jpg";

const stats = [
  { value: "200+", label: "Клиентов" },
  { value: "с 2012", label: "На рынке" },
  { value: "500+", label: "Проектов" },
  { value: "24/7", label: "Поддержка" },
];

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
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
  );
}
