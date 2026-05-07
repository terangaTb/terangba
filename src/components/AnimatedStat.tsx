import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
}

function parseValue(v: string) {
  const match = v.match(/[\d\s]+/);
  if (!match) return { num: 0, prefix: "", suffix: v };
  const numStr = match[0].replace(/\s/g, "");
  const num = parseInt(numStr, 10);
  const idx = v.indexOf(match[0]);
  return {
    num: isNaN(num) ? 0 : num,
    prefix: v.slice(0, idx),
    suffix: v.slice(idx + match[0].length),
    hasSpace: match[0].includes(" "),
  };
}

function formatNum(n: number, hasSpace: boolean) {
  const rounded = Math.round(n);
  if (hasSpace) return rounded.toLocaleString("fr-FR").replace(/,/g, " ");
  return String(rounded);
}

export function AnimatedStat({ icon: Icon, value, label, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const parsed = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || parsed.num === 0) return;
    const duration = 1600;
    const start = performance.now() + index * 120;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(parsed.num * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, parsed.num, index]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Shine sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Icon with rotating ring */}
      <div className="relative mx-auto h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 opacity-0 transition-all duration-500 group-hover:rotate-180 group-hover:opacity-100" />
        <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="relative mt-4 font-display text-2xl font-bold text-primary md:text-3xl tabular-nums">
        {parsed.num > 0
          ? `${parsed.prefix}${formatNum(count, !!parsed.hasSpace)}${parsed.suffix}`
          : value}
      </div>
      <div className="relative mt-1 text-xs font-medium text-muted-foreground">{label}</div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[image:var(--gradient-gold)] transition-all duration-500 group-hover:w-3/4" />
    </div>
  );
}
