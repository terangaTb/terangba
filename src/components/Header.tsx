import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/engagements", label: "Engagements" },
  { to: "/planifier-rencontre", label: "Planifier" },
  { to: "/contact", label: "Contact" },
] as const;

const BRAND_ITEMS = [
  "TERANGA BRIDGE AFRICA",
  "★",
  "CONNECTING AFRICA TO THE WORLD",
  "★",
  "TERANGA BRIDGE AFRICA",
  "★",
  "GROWING IN AFRICA, REACHING THE WORLD",
  "★",
];

function BrandMarquee() {
  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-[image:var(--gradient-primary)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 6s linear infinite",
        }}
      />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap py-2">
        {[...BRAND_ITEMS, ...BRAND_ITEMS].map((item, i) => (
          <span
            key={i}
            className={
              item === "★"
                ? "text-base text-primary-foreground/70"
                : "font-display text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <BrandMarquee />
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Teranga Bridge Africa"
            className="h-11 w-auto rounded-md object-contain"
          />
          <span className="hidden font-display text-base font-bold uppercase tracking-[0.18em] text-foreground sm:inline-block">
            Teranga <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">Bridge Africa</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-md bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
          >
            Devis gratuit
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
