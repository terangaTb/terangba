import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Award, Users, Tag, Truck, Sprout } from "lucide-react";

export const Route = createFileRoute("/engagements")({
  head: () => ({
    meta: [
      { title: "Nos engagements — Teranga Bridge Africa" },
      { name: "description", content: "Qualité garantie, partenaires fiables, prix compétitifs, livraison rapide et innovation durable." },
      { property: "og:title", content: "Nos engagements — Teranga Bridge Africa" },
      { property: "og:description", content: "Cinq engagements forts au service de la performance industrielle." },
    ],
  }),
  component: Engagements,
});

const items = [
  { icon: Award, t: "Qualité garantie", d: "Contrôles rigoureux et standards internationaux à chaque étape." },
  { icon: Users, t: "Réseau de partenaires fiables", d: "Un écosystème éprouvé de fournisseurs et transporteurs de confiance." },
  { icon: Tag, t: "Prix compétitifs", d: "Optimisation des coûts grâce à des volumes négociés et une logistique maîtrisée." },
  { icon: Truck, t: "Livraison rapide", d: "Délais respectés et suivi en temps réel de vos commandes." },
  { icon: Sprout, t: "Innovation & durabilité", d: "Solutions durables et innovation continue au service du développement africain." },
];

function Engagements() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Nos engagements</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            Cinq promesses, une exigence
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)]">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
