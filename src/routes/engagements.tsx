import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import engagementsHero1280Jpg from "@/assets/engagements-hero-1280.jpg";
import engagementsHero768Webp from "@/assets/engagements-hero-768.webp";
import engagementsHero1280Webp from "@/assets/engagements-hero-1280.webp";
import engagementsHero1920Webp from "@/assets/engagements-hero-1920.webp";
import engagementsHero768Jpg from "@/assets/engagements-hero-768.jpg";
import engagementsHero1920Jpg from "@/assets/engagements-hero-1920.jpg";
import {
  Award,
  Users,
  Tag,
  Truck,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Handshake,
  Leaf,
  Globe2,
  HeartHandshake,
  ScrollText,
  Quote,
  Sparkles,
  Target,
  Eye,
  Compass,
  PhoneCall,
} from "lucide-react";

const SITE_URL = "https://teranga-africa-connect.lovable.app";
const PAGE_URL = `${SITE_URL}/engagements`;
const OG_IMAGE = `${SITE_URL}${engagementsHero1280Jpg}`;

const PAGE_TITLE =
  "Nos engagements — Qualité, partenariats et responsabilité | Teranga Bridge Africa";
const PAGE_DESC =
  "Découvrez les cinq engagements concrets de Teranga Bridge Africa : qualité certifiée, partenaires fiables, prix compétitifs, livraison rapide et innovation durable au service de l'industrie africaine.";

const commitments = [
  {
    icon: Award,
    t: "Qualité garantie",
    short: "Conformité internationale",
    d: "Contrôles rigoureux, audits fournisseurs et standards internationaux à chaque étape de la chaîne d'approvisionnement.",
    points: [
      "Inspection avant expédition",
      "Certificats d'origine & conformité",
      "Traçabilité documentaire complète",
    ],
    metric: "100%",
    metricLabel: "lots contrôlés",
  },
  {
    icon: Users,
    t: "Partenaires fiables",
    short: "Réseau éprouvé",
    d: "Un écosystème de fournisseurs, transporteurs et industriels sélectionnés sur des critères stricts d'éthique et de performance.",
    points: [
      "Fournisseurs audités",
      "Transporteurs accrédités",
      "Relations long terme",
    ],
    metric: "120+",
    metricLabel: "partenaires actifs",
  },
  {
    icon: Tag,
    t: "Prix compétitifs",
    short: "Optimisation continue",
    d: "Volumes négociés, ingénierie logistique et achats groupés : nous obtenons les meilleures conditions du marché pour vous.",
    points: [
      "Sourcing multi-pays",
      "Volumes mutualisés",
      "Transparence tarifaire",
    ],
    metric: "−15%",
    metricLabel: "coûts moyens",
  },
  {
    icon: Truck,
    t: "Livraison rapide",
    short: "Délais maîtrisés",
    d: "Coordination logistique de bout en bout et suivi en temps réel : vos commandes arrivent quand votre production en a besoin.",
    points: [
      "Suivi temps réel",
      "Multi-modal optimisé",
      "Plan B logistique",
    ],
    metric: "98%",
    metricLabel: "livraisons à l'heure",
  },
  {
    icon: Sprout,
    t: "Innovation & durabilité",
    short: "Impact positif",
    d: "Préférence aux filières responsables, équipements éco-efficients et solutions circulaires pour bâtir l'industrie de demain.",
    points: [
      "Filières responsables",
      "Équipements éco-efficients",
      "Réduction empreinte carbone",
    ],
    metric: "ESG",
    metricLabel: "approche intégrée",
  },
  {
    icon: ShieldCheck,
    t: "Confidentialité & éthique",
    short: "Confiance absolue",
    d: "Vos données, vos volumes et vos sources restent strictement confidentiels. Nous appliquons une charte éthique exigeante.",
    points: [
      "NDA systématique",
      "Charte anti-corruption",
      "Données protégées",
    ],
    metric: "RGPD",
    metricLabel: "conformité",
  },
];

const values = [
  {
    icon: Target,
    t: "Notre mission",
    d: "Connecter les industries africaines aux meilleures ressources mondiales en garantissant qualité, fiabilité et compétitivité.",
  },
  {
    icon: Eye,
    t: "Notre vision",
    d: "Devenir le partenaire de référence de la transformation agroalimentaire en Afrique de l'Ouest et au-delà.",
  },
  {
    icon: Compass,
    t: "Nos valeurs",
    d: "Intégrité, exigence, proximité et engagement à long terme envers nos clients, fournisseurs et communautés.",
  },
];

const sdgs = [
  { icon: Sprout, t: "Production responsable", d: "ODD 12 — Filières tracées et éco-efficientes." },
  { icon: HeartHandshake, t: "Travail décent", d: "ODD 8 — Conditions et rémunérations équitables chez nos partenaires." },
  { icon: Leaf, t: "Action climatique", d: "ODD 13 — Optimisation logistique pour réduire l'empreinte carbone." },
  { icon: Globe2, t: "Partenariats", d: "ODD 17 — Coopérations durables Sud-Sud et Nord-Sud." },
];

const charterPoints = [
  "Sélection rigoureuse des fournisseurs sur critères qualité, sociaux et environnementaux.",
  "Respect strict des normes sanitaires et réglementaires des pays d'origine et de destination.",
  "Transparence totale sur les origines, certifications et conditions commerciales.",
  "Tolérance zéro face à la corruption, au travail forcé et aux pratiques anti-concurrentielles.",
  "Engagement de réponse sous 48h ouvrées et de suivi dédié pour chaque dossier.",
  "Confidentialité absolue des informations commerciales et opérationnelles confiées.",
];

const testimonials = [
  {
    quote:
      "Une équipe à l'écoute, des délais tenus et une qualité produit irréprochable. TBA est devenu un partenaire stratégique de notre minoterie.",
    author: "Directeur des achats",
    role: "Groupe minotier — Sénégal",
  },
  {
    quote:
      "La transparence sur l'origine et les certifications nous a convaincus. Nous sécurisons aujourd'hui 60% de nos approvisionnements via TBA.",
    author: "Responsable production",
    role: "Industrie agroalimentaire — Côte d'Ivoire",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Teranga Bridge Africa",
  alternateName: "TBA",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: OG_IMAGE,
  description:
    "Entreprise sénégalaise spécialisée dans la fourniture de matières premières et d'équipements agroalimentaires pour les industries africaines.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sacré Cœur 3 VDN, 57",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  ethicsPolicy: PAGE_URL,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Engagements", item: PAGE_URL },
  ],
};

export const Route = createFileRoute("/engagements")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "engagements TBA, qualité agroalimentaire, partenaires industriels Afrique, livraison rapide, innovation durable, charte éthique, RSE Sénégal, traçabilité",
      },
      { name: "author", content: "Teranga Bridge Africa" },
      { name: "robots", content: "index, follow, max-image-preview:large" },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Teranga Bridge Africa" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      {
        property: "og:image:alt",
        content:
          "Deux opérateurs en uniforme et casque blanc inspectant la qualité du grain dans une usine agroalimentaire africaine moderne",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: Engagements,
});

function Engagements() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet={`${engagementsHero768Webp} 768w, ${engagementsHero1280Webp} 1280w, ${engagementsHero1920Webp} 1920w`}
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet={`${engagementsHero768Jpg} 768w, ${engagementsHero1280Jpg} 1280w, ${engagementsHero1920Jpg} 1920w`}
            sizes="100vw"
          />
          <img
            src={engagementsHero1280Jpg}
            alt="Deux opérateurs en uniforme inspectant la qualité du grain dans une usine agroalimentaire africaine moderne — illustration des engagements qualité de Teranga Bridge Africa"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur">
              Nos engagements
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Six promesses concrètes au service de votre industrie
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Qualité certifiée, partenaires de confiance, prix maîtrisés, livraison rapide et
              démarche durable : nos engagements ne sont pas des slogans, ce sont des standards
              opérationnels mesurés au quotidien.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                search={{ service: "Services" }}
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#engagements"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Découvrir nos engagements
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="container mx-auto px-4 py-16 cv-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Ce qui nous guide
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Une boussole claire, un cap exigeant
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.t}
              className="group rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements grid */}
      <section id="engagements" className="bg-secondary/30 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Engagements opérationnels
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Six standards mesurés, jamais négociés
            </h2>
            <p className="mt-4 text-muted-foreground">
              Chaque engagement est suivi par des indicateurs précis et revu trimestriellement avec
              nos équipes et partenaires.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <article
                key={c.t}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[image:var(--gradient-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <c.icon className="h-7 w-7" />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold leading-none text-primary">
                      {c.metric}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.metricLabel}
                    </div>
                  </div>
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold leading-snug">
                  {c.t}
                </h3>
                <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  {c.short}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
                <ul className="relative mt-5 space-y-2 text-sm">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Charte éthique */}
      <section id="charte" className="container mx-auto px-4 py-20 cv-auto scroll-mt-24">

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Charte éthique
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Six principes non négociables
            </h2>
            <p className="mt-5 text-muted-foreground">
              Notre charte encadre chaque relation commerciale, chaque expédition et chaque
              recommandation. Elle est partagée avec l'ensemble de nos partenaires et auditée
              régulièrement.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)]">
                <ScrollText className="h-6 w-6" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Document de référence</p>
                <p className="text-muted-foreground">
                  Disponible sur demande pour nos clients et fournisseurs.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-4">
              {charterPoints.map((p, i) => (
                <li
                  key={p}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover-lift reveal-on-scroll"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Impact & ODD */}
      <section className="bg-secondary/30 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Impact & responsabilité
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Aligner croissance industrielle et impact positif
            </h2>
            <p className="mt-4 text-muted-foreground">
              Notre activité s'inscrit dans les Objectifs de Développement Durable des Nations
              Unies. Quatre ODD prioritaires structurent notre démarche.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sdgs.map((s, i) => (
              <div
                key={s.t}
                className="group rounded-2xl border border-border bg-card p-6 text-center hover-lift reveal-on-scroll"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-500 group-hover:scale-110">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="container mx-auto px-4 py-20 cv-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Ils nous font confiance
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            La preuve par nos partenaires
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((tm, i) => (
            <figure
              key={tm.author + i}
              className="relative rounded-2xl border border-border bg-card p-8 hover-lift reveal-on-scroll"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" aria-hidden="true" />
              <blockquote className="relative font-display text-lg leading-relaxed text-foreground/90">
                « {tm.quote} »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{tm.author}</div>
                  <div className="text-xs text-muted-foreground">{tm.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20 cv-auto">
        <div className="group relative overflow-hidden rounded-2xl bg-[image:linear-gradient(135deg,var(--primary),var(--primary-glow))] px-8 py-14 text-center shadow-[var(--shadow-elegant)] md:px-16">
          <div
            className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl animate-blob"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl animate-blob"
            style={{ animationDelay: "-7s" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground backdrop-blur">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="relative font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Faisons équipe sur des bases solides
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Confiez-nous votre prochain approvisionnement : nos engagements sont mesurés et
            opposables. Réponse sous 48&nbsp;heures ouvrées.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              search={{ service: "Services" }}
              className="group/btn inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] animate-glow-pulse transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <PhoneCall className="h-4 w-4" />
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
