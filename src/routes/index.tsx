import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SenefoodBanner } from "@/components/SenefoodBanner";
import heroImg from "@/assets/hero.jpg";
import videoPoster from "@/assets/video-poster.jpg";
import { ArrowRight, Package, Truck, Wrench, Globe2, Lightbulb, ShieldCheck, CheckCircle2, Star, Quote, Building2, Factory, Wheat, Beef, Cookie, Milk } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teranga Bridge Africa — Approvisionnement industriel en Afrique" },
      { name: "description", content: "Fourniture de matières premières et d'équipements agroalimentaires en Afrique. Partenaire de confiance basé à Dakar, Sénégal." },
      { property: "og:title", content: "Teranga Bridge Africa — Approvisionnement industriel" },
      { property: "og:description", content: "Matières premières, équipements agroalimentaires et logistique pour les industries africaines." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Industrie agroalimentaire en Afrique"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="container relative mx-auto px-4 py-28 md:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur">
              Sénégal · Afrique
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Votre partenaire de confiance pour l'approvisionnement industriel en Afrique
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Matières premières, équipements agroalimentaires et solutions logistiques au service de la croissance industrielle africaine.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
              >
                Nos services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Nous contacter
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              <a href="#services" className="transition-colors hover:text-gold">↓ Nos services</a>
              <a href="#engagements" className="transition-colors hover:text-gold">↓ Engagements</a>
              <a href="#contact" className="transition-colors hover:text-gold">↓ Contact</a>
            </div>
          </div>
        </div>
      </section>

      {/* SENEFOOD 2026 Banner */}
      <SenefoodBanner />

      {/* Vidéo TBA */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Notre dynamique</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              L'impact se construit par l'action
            </h2>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
              <div className="relative aspect-video w-full bg-secondary/40">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={videoPoster}
                  className="absolute inset-0 h-full w-full object-cover"
                  controlsList="nodownload"
                >
                  <source src="/tba.mp4" type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              </div>
            </div>
            <div className="space-y-5 text-muted-foreground">
              <p className="leading-relaxed">
                Chez <strong className="text-foreground">TBA</strong>, nous croyons que l'impact se construit par
                l'action, l'innovation et l'engagement collectif.
              </p>
              <p className="leading-relaxed">
                Cette vidéo illustre notre vision, notre énergie et surtout les personnes qui font avancer nos
                projets au quotidien.
              </p>
              <p className="leading-relaxed">
                👉 Merci à toutes celles et ceux qui contribuent à cette dynamique.
                <br />
                <span className="font-semibold text-foreground">L'aventure continue.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { v: "15+", l: "Pays desservis" },
            { v: "200+", l: "Clients industriels" },
            { v: "50+", l: "Partenaires fiables" },
            { v: "24/7", l: "Support client" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section id="services" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Nos expertises</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Des solutions complètes pour l'industrie</h2>
          <p className="mt-4 text-muted-foreground">
            Nous accompagnons les industries africaines à chaque étape : sourcing, équipements, conseil et logistique.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Package, t: "Matières premières", d: "Approvisionnement fiable de matières premières agroalimentaires." },
            { icon: Globe2, t: "Import / Export", d: "Solutions d'import/export adaptées aux industries africaines." },
            { icon: Wrench, t: "Équipements", d: "Fourniture d'équipements agroalimentaires de qualité." },
            { icon: Lightbulb, t: "Conseil industriel", d: "Accompagnement stratégique et expertise sectorielle." },
            { icon: Truck, t: "Logistique", d: "Chaîne d'approvisionnement maîtrisée de bout en bout." },
            { icon: ShieldCheck, t: "Qualité garantie", d: "Standards rigoureux et contrôles à chaque étape." },
          ].map((s) => (
            <div
              key={s.t}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-secondary/30">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Qui sommes-nous</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Un pont industriel entre l'Afrique et le monde
            </h2>
            <p className="mt-5 text-muted-foreground">
              Basée à Dakar, <strong className="text-foreground">Teranga Bridge Africa</strong> accompagne les industries
              agroalimentaires africaines dans leur croissance. Grâce à un réseau international de partenaires fiables,
              nous garantissons un approvisionnement compétitif et une logistique maîtrisée du sourcing à la livraison.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Sourcing international rigoureux et tracé",
                "Conformité réglementaire et qualité certifiée",
                "Présence locale au Sénégal et en Afrique de l'Ouest",
                "Engagement durable et innovation continue",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/a-propos"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              En savoir plus sur nous <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Wheat, t: "Céréales & farines" },
              { icon: Beef, t: "Protéines" },
              { icon: Milk, t: "Produits laitiers" },
              { icon: Cookie, t: "Ingrédients" },
            ].map((c) => (
              <div
                key={c.t}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)]">
                  <c.icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-semibold">{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Teranga Bridge Africa */}
      <section id="engagements" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Pourquoi nous choisir</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Pourquoi Teranga Bridge Africa ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cinq raisons concrètes de nous faire confiance pour vos approvisionnements industriels.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { n: "01", t: "Expertise sectorielle", d: "Une connaissance fine des marchés agroalimentaires africains et internationaux." },
            { n: "02", t: "Réseau éprouvé", d: "Plus de 50 partenaires industriels et logistiques sélectionnés pour leur fiabilité." },
            { n: "03", t: "Réactivité", d: "Devis sous 48h et accompagnement personnalisé à chaque étape de votre projet." },
            { n: "04", t: "Conformité totale", d: "Respect strict des normes douanières, sanitaires et environnementales." },
            { n: "05", t: "Prix compétitifs", d: "Volumes négociés et logistique optimisée pour des coûts maîtrisés." },
            { n: "06", t: "Vision durable", d: "Des solutions pensées pour le développement long terme du secteur africain." },
          ].map((r) => (
            <div
              key={r.n}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="font-display text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                {r.n}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Témoignages</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Ce que disent nos partenaires
            </h2>
            <p className="mt-4 text-muted-foreground">
              Des industriels nous font confiance pour sécuriser leurs approvisionnements.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Un partenaire fiable et réactif. Les délais sont toujours respectés et la qualité au rendez-vous.",
                n: "Aminata D.",
                r: "Directrice Achats, Industrie agroalimentaire",
              },
              {
                q: "L'accompagnement de Teranga Bridge nous a permis d'optimiser notre chaîne d'approvisionnement.",
                n: "Mamadou S.",
                r: "Responsable Production, Minoterie",
              },
              {
                q: "Une équipe à l'écoute, des prix compétitifs et un vrai souci de la qualité. Hautement recommandé.",
                n: "Fatou N.",
                r: "Gérante, Transformation alimentaire",
              },
            ].map((t) => (
              <figure
                key={t.n}
                className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-gold/20" />
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">"{t.q}"</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Clients potentiels / secteurs */}
          <div className="mt-16">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Ils nous font confiance — secteurs servis
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Factory, t: "Minoteries" },
                { icon: Building2, t: "Industries laitières" },
                { icon: Package, t: "Conditionneurs" },
                { icon: Wheat, t: "Boulangeries industrielles" },
              ].map((c) => (
                <div
                  key={c.t}
                  className="flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-5 text-center"
                >
                  <c.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="container mx-auto px-4 pb-20 scroll-mt-20">
        <div className="relative overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] px-8 py-14 text-center shadow-[var(--shadow-elegant)] md:px-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Prêt à sécuriser vos approvisionnements ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Discutons de vos besoins et obtenez un devis personnalisé sous 48h.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)]"
          >
            Demander un devis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
