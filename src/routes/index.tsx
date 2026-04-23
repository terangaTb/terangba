import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, Package, Truck, Wrench, Globe2, Lightbulb, ShieldCheck } from "lucide-react";

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
      <section className="container mx-auto px-4 py-20">
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

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
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
