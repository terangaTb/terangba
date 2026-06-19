import { useEffect, useRef, useState } from "react";
import { Globe2, Building2, Handshake, Headphones } from "lucide-react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  display?: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Pays desservis", Icon: Globe2 },
  { value: 200, suffix: "+", label: "Clients industriels", Icon: Building2 },
  { value: 50, suffix: "+", label: "Partenaires fiables", Icon: Handshake },
  { value: 24, suffix: "/7", label: "Support client", display: "24/7", Icon: Headphones },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function CountUp({ to, suffix, display, active }: { to: number; suffix: string; display?: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (display) { setN(to); return; }
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, display]);
  return (
    <span>
      {display ?? `${n}${suffix}`}
    </span>
  );
}

function Card3D({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 14, ry: x * 18 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  const Icon = stat.Icon;

  return (
    <div
      className="group relative [perspective:1200px]"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${index * 120}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${index * 120}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-2xl border border-border/60 bg-gradient-to-br from-card to-secondary/40 p-8 shadow-[0_10px_40px_-20px_hsl(var(--primary)/0.35)] will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          transformStyle: "preserve-3d",
          transition: "transform 200ms ease-out",
        }}
      >
        {/* shine */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), hsl(var(--primary)/0.12), transparent 40%)",
          }}
        />
        {/* gold corner accent */}
        <div
          aria-hidden
          className="absolute right-5 top-5 h-10 w-10 rounded-full bg-gold/10 blur-xl"
          style={{ transform: "translateZ(30px)" }}
        />

        <div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15"
          style={{ transform: "translateZ(40px)" }}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div
          className="font-display text-5xl font-bold tracking-tight text-primary md:text-6xl"
          style={{ transform: "translateZ(60px)" }}
        >
          <CountUp to={stat.value} suffix={stat.suffix} display={stat.display} active={active} />
        </div>

        <div
          className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground"
          style={{ transform: "translateZ(25px)" }}
        >
          {stat.label}
        </div>

        <div
          className="mt-6 h-px w-12 bg-gradient-to-r from-gold to-transparent"
          style={{ transform: "translateZ(20px)" }}
        />
      </div>
    </div>
  );
}

export default function Stats3D() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div ref={ref} className="container mx-auto grid grid-cols-1 gap-6 px-4 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Card3D key={s.label} stat={s} index={i} active={seen} />
        ))}
      </div>
    </section>
  );
}
