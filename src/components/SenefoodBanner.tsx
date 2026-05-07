import { Calendar, MapPin, ArrowRight, Users, Building2, Briefcase, Eye, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import senefoodImg from "@/assets/senefood-2026.jpg";
import { AnimatedStat } from "@/components/AnimatedStat";
import { useInView } from "@/hooks/use-in-view";

export function SenefoodBanner() {
  const blobs = useInView<HTMLDivElement>(0.15);
  const heading = useInView<HTMLDivElement>(0.4);
  const divider = useInView<HTMLDivElement>(0.6);
  const slogan = useInView<HTMLDivElement>(0.3);

  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-br from-secondary/60 via-background to-secondary/40">
      {/* Marquee top strip */}
      <div className="overflow-hidden border-b border-border/60 bg-[image:var(--gradient-primary)] py-2">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-sm font-semibold uppercase tracking-widest text-primary-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              SENEFOOD & SENEPACK 2026 · Dakar · 11 — 13 Juin · Teranga Bridge Africa y sera
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
        {/* Image with floating animation */}
        <div className="relative mx-auto w-full max-w-md animate-float-slow lg:max-w-lg">
          <div className="absolute -inset-4 rounded-3xl bg-[image:var(--gradient-gold)] opacity-30 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
            <img
              src={senefoodImg}
              alt="Teranga Bridge Africa au salon SENEFOOD & SENEPACK 2026 à Dakar"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden rounded-xl bg-[image:var(--gradient-gold)] px-4 py-2 text-sm font-bold text-gold-foreground shadow-[var(--shadow-gold)] md:block">
            Nous y serons !
          </div>
        </div>

        {/* Text content */}
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            Événement à venir
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            Acteurs de l'agro-industrie et du packaging,{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              parlons performance.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Du <strong className="text-foreground">11 au 13 juin</strong>, Teranga Bridge Africa
            vous donne rendez-vous au <strong className="text-foreground">SENEFOOD</strong>.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Nous accompagnons les industriels en Afrique de l'Ouest dans la sécurisation de leurs
            approvisionnements et l'optimisation de leurs coûts, de la matière première au produit
            fini.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Venez découvrir comment nous structurons vos chaînes d'approvisionnement avec des
            solutions fiables, compétitives et adaptées à vos réalités locales.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Dates
                </div>
                <div className="text-sm font-bold">11 – 13 juin 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[image:var(--gradient-gold)] text-gold-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Lieu
                </div>
                <div className="text-sm font-bold">Diamniadio – Dakar</div>
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
          >
            Planifier une rencontre <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* SENEFOOD — Chiffres clés */}
      <div ref={blobs.ref} className="relative overflow-hidden border-t border-border/60 bg-background/60 backdrop-blur">
        {/* Decorative animated blobs — fade & scale in on scroll */}
        <div
          className={`pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float-slow transition-all duration-[1400ms] ease-out ${
            blobs.inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
        <div
          className={`pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float-slow [animation-delay:1.5s] transition-all duration-[1400ms] delay-200 ease-out ${
            blobs.inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
        {/* Subtle dot grid */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-[1600ms] ${
            blobs.inView ? "opacity-[0.04]" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container relative mx-auto px-4 py-16">
          <div
            ref={heading.ref}
            className={`mx-auto max-w-2xl text-center transition-all duration-1000 ease-out ${
              heading.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
              <span
                className={`h-px bg-gold transition-all duration-700 delay-200 ${
                  heading.inView ? "w-8 opacity-100" : "w-0 opacity-0"
                }`}
              />
              SENEFOOD & SENEPACK — En chiffres
              <span
                className={`h-px bg-gold transition-all duration-700 delay-200 ${
                  heading.inView ? "w-8 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight md:text-4xl">
              Le rendez-vous incontournable de{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                l'agro-industrie ouest-africaine
              </span>
            </h3>
            <div
              ref={divider.ref}
              className={`mx-auto mt-4 h-1 rounded-full bg-[image:var(--gradient-gold)] transition-all duration-1000 ease-out ${
                divider.inView ? "w-16 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {[
              { icon: Users, v: "10 000+", l: "Visiteurs professionnels" },
              { icon: Building2, v: "200+", l: "Exposants" },
              { icon: Briefcase, v: "30+", l: "Pays représentés" },
              { icon: Trophy, v: "5e", l: "Édition" },
              { icon: Eye, v: "50+", l: "Partenaires officiels" },
            ].map((s, i) => (
              <AnimatedStat key={s.l} icon={s.icon} value={s.v} label={s.l} index={i} />
            ))}
          </div>

          {/* Slogan — animated reveal */}
          <div
            ref={slogan.ref}
            className={`group relative mt-14 overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-12 text-center shadow-[var(--shadow-elegant)] transition-all duration-1000 ease-out md:px-12 ${
              slogan.inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"
            }`}
          >
            <div
              className={`pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-gold/20 blur-2xl transition-all duration-[1400ms] delay-300 ease-out group-hover:scale-150 ${
                slogan.inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
            <div
              className={`pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gold/20 blur-2xl transition-all duration-[1400ms] delay-500 ease-out group-hover:scale-150 ${
                slogan.inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
            {/* Shine sweep on reveal */}
            <div
              className={`pointer-events-none absolute inset-y-0 -inset-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1800ms] delay-700 ${
                slogan.inView ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <p
              className={`relative font-display text-2xl font-bold leading-tight text-primary-foreground transition-all duration-1000 delay-300 md:text-4xl ${
                slogan.inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              « Plus qu'un partenaire,{" "}
              <span className="bg-[image:var(--gradient-gold)] bg-clip-text text-transparent">
                nous construisons ensemble !
              </span>{" "}»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
