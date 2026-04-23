import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Target, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Teranga Bridge Africa" },
      { name: "description", content: "Entreprise sénégalaise spécialisée dans la fourniture de matières premières et d'équipements agroalimentaires en Afrique." },
      { property: "og:title", content: "À propos — Teranga Bridge Africa" },
      { property: "og:description", content: "Notre mission : un approvisionnement fiable, compétitif et durable pour les industries africaines." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">À propos</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            Bâtir des ponts industriels durables à travers l'Afrique
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-3xl text-muted-foreground">
          <p className="text-lg leading-relaxed">
            <strong className="text-foreground">Teranga Bridge Africa</strong> est une entreprise sénégalaise spécialisée dans la fourniture de matières premières et d'équipements agroalimentaires en Afrique. Grâce à notre expertise et à un réseau de partenaires solides, nous accompagnons les industries locales et régionales en leur garantissant un approvisionnement fiable, compétitif et adapté à leurs besoins.
          </p>
          <p className="mt-6 text-lg leading-relaxed">
            Animés par une vision de croissance durable, nous mettons l'innovation et la qualité au cœur de notre engagement pour contribuer au développement du secteur industriel africain.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, t: "Notre mission", d: "Garantir un approvisionnement fiable et compétitif aux industries africaines." },
            { icon: Eye, t: "Notre vision", d: "Devenir le pont industriel de référence entre l'Afrique et le monde." },
            { icon: Heart, t: "Nos valeurs", d: "Qualité, intégrité, innovation et engagement durable." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
