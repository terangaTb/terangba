import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Package, Globe2, Wrench, Lightbulb, Truck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nos services — Teranga Bridge Africa" },
      { name: "description", content: "Matières premières, import/export, équipements agroalimentaires, conseil industriel et logistique." },
      { property: "og:title", content: "Nos services — Teranga Bridge Africa" },
      { property: "og:description", content: "Solutions complètes pour l'industrie agroalimentaire en Afrique." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Package, t: "Fourniture de matières premières agroalimentaires", d: "Sourcing rigoureux de matières premières (céréales, oléagineux, sucre, ingrédients) auprès de partenaires certifiés." },
  { icon: Globe2, t: "Import / Export industriel", d: "Gestion complète des opérations d'import/export, formalités douanières et conformité réglementaire." },
  { icon: Wrench, t: "Fourniture d'équipements agroalimentaires", d: "Équipements de transformation, de conditionnement et de stockage adaptés à votre production." },
  { icon: Lightbulb, t: "Conseil et accompagnement industriel", d: "Audit, optimisation des process et accompagnement stratégique pour votre développement." },
  { icon: Truck, t: "Logistique et chaîne d'approvisionnement", d: "Solutions logistiques sur-mesure : transport, entreposage et distribution sur tout le continent." },
];

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Nos services</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            Des solutions industrielles complètes
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            De la matière première à la livraison, nous couvrons toute la chaîne de valeur industrielle.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.t}
              className="group flex gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                <s.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
          >
            Discuter de votre projet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
