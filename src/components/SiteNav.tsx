import { useState } from "react";
import Icon from "@/components/ui/icon";
import LogoShimmer from "@/components/LogoShimmer";

interface SiteNavProps {
  scrollTo: (id: string) => void;
}

export default function SiteNav({ scrollTo }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(6, 13, 26, 0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <LogoShimmer size="nav" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[["Услуги", "services"], ["О нас", "about"], ["Преимущества", "why"], ["Контакты", "contact"], ["Новости", "news"]].map(([label, id]) => (
            <button key={id} onClick={() => handleScrollTo(id)} className="text-sm font-medium text-gray-400 hover:text-[var(--neon-cyan)] transition-colors duration-200 tracking-wider uppercase">
              {label}
            </button>
          ))}
          <button onClick={() => handleScrollTo("contact")} className="neon-btn px-5 py-2 rounded-lg text-sm font-bold tracking-wider uppercase">
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
            <button key={id} onClick={() => handleScrollTo(id)} className="text-left text-gray-300 hover:text-[var(--neon-cyan)] py-2 border-b border-gray-800 text-sm uppercase tracking-wider">
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
