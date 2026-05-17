import { useState } from "react";
import Icon from "@/components/ui/icon";

const SUBSCRIBE_URL = "https://functions.poehali.dev/ef590e11-20ec-445c-9eb9-ec2c00d3c996";

export default function NewsSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-16 rounded-2xl p-8 md:p-12 text-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <Icon name="Bell" size={32} className="mx-auto mb-4" style={{ color: "var(--neon-cyan)" }} />
      <h3 className="text-2xl font-black text-white mb-2">Подпишитесь на IT-новости</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">Получайте актуальные обновления из мира технологий и кибербезопасности первыми.</p>

      {status === "success" ? (
        <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
          <Icon name="CheckCircle" size={20} />
          Вы подписаны! Спасибо.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-white text-sm outline-none focus:ring-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              focusRingColor: "var(--neon-cyan)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="neon-btn px-6 py-3 rounded-xl text-sm font-bold tracking-wider uppercase whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Подписаться"}
          </button>
        </form>
      )}

      {status === "duplicate" && (
        <p className="mt-3 text-yellow-400 text-sm">Этот email уже подписан.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-400 text-sm">Ошибка. Попробуйте ещё раз.</p>
      )}
    </div>
  );
}
