import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import aboutHero from "@/assets/about-hero-1280.jpg";
import aboutHero768Webp from "@/assets/about-hero-768.webp";
import aboutHero1280Webp from "@/assets/about-hero-1280.webp";
import aboutHero1920Webp from "@/assets/about-hero-1920.webp";
import aboutHero768Jpg from "@/assets/about-hero-768.jpg";
import aboutHero1280Jpg from "@/assets/about-hero-1280.jpg";
import aboutHero1920Jpg from "@/assets/about-hero-1920.jpg";
import {
  Target,
  Eye,
  Heart,
  ArrowRight,
  MapPin,
  Globe2,
  Handshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Compass,
} from "lucide-react";

const SITE_URL = "https://teranga-africa-connect.lovable.app";
const ABOUT_URL = `${SITE_URL}/a-propos`;
const OG_IMAGE = `${SITE_URL}${aboutHero}`;

const PAGE_TITLE = "À propos de Teranga Bridge Africa — Approvisionnement industriel en Afrique";
const PAGE_DESC =
  "Découvrez Teranga Bridge Africa, entreprise basée à Dakar (Sénégal), spécialisée dans la fourniture de matières premières et d'équipements agroalimentaires pour les industries africaines. Notre histoire, notre mission, nos valeurs et nos engagements.";

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
  foundingLocation: "Dakar, Sénégal",
  areaServed: [
    { "@type": "Place", name: "Afrique" },
    { "@type": "Country", name: "Sénégal" },
    { "@type": "Country", name: "Mali" },
    { "@type": "Country", name: "Côte d'Ivoire" },
    { "@type": "Country", name: "Burkina Faso" },
    { "@type": "Country", name: "Guinée" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  sameAs: [],
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: ABOUT_URL,
  name: PAGE_TITLE,
  description: PAGE_DESC,
  primaryImageOfPage: OG_IMAGE,
  inLanguage: "fr-FR",
  isPartOf: {
    "@type": "WebSite",
    name: "Teranga Bridge Africa",
    url: SITE_URL,
  },
  about: { "@type": "Organization", name: "Teranga Bridge Africa" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "À propos", item: ABOUT_URL },
  ],
};

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "Teranga Bridge Africa, TBA, approvisionnement industriel, agroalimentaire Afrique, matières premières Sénégal, équipements industriels, Dakar, import export Afrique",
      },
      { name: "author", content: "Teranga Bridge Africa" },
      { name: "robots", content: "index, follow, max-image-preview:large" },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Teranga Bridge Africa" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: ABOUT_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      {
        property: "og:image:alt",
        content:
          "Équipe de Teranga Bridge Africa réunie dans les bureaux de Dakar avec en arrière-plan un terminal portuaire et des silos agroalimentaires",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
      {
        name: "twitter:image:alt",
        content: "Équipe de Teranga Bridge Africa à Dakar",
      },
    ],
    links: [{ rel: "canonical", href: ABOUT_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(aboutPageJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet={`${aboutHero768Webp} 768w, ${aboutHero1280Webp} 1280w, ${aboutHero1920Webp} 1920w`}
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet={`${aboutHero768Jpg} 768w, ${aboutHero1280Jpg} 1280w, ${aboutHero1920Jpg} 1920w`}
            sizes="100vw"
          />
          <img
            src={aboutHero1280Jpg}
            alt="Équipe de Teranga Bridge Africa réunie dans les bureaux de Dakar, avec terminal portuaire et silos agroalimentaires en arrière-plan"
            className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        {/* Floating decorative blobs */}
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/20 blur-3xl animate-blob"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl animate-blob"
          style={{ animationDelay: "-5s" }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur animate-fade-in">
              À propos
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Bâtir des ponts industriels durables à travers l'Afrique
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Depuis Dakar, nous connectons les industries africaines aux meilleures matières
              premières et équipements du monde — avec rigueur, transparence et engagement.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold animate-float-slow" /> Dakar, Sénégal
              </span>
              <span className="inline-flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-gold animate-spin-slow" /> Présence panafricaine
              </span>
              <span className="inline-flex items-center gap-2">
                <Handshake className="h-4 w-4 text-gold" /> 50+ partenaires
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Notre histoire
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Une vision née de l'hospitalité sénégalaise
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground lg:col-span-7">
            <p className="text-lg leading-relaxed">
              <strong className="text-foreground">Teranga Bridge Africa</strong> est née de la
              conviction que l'Afrique mérite un approvisionnement industriel à la hauteur de ses
              ambitions. Le mot <em>Teranga</em>, qui incarne l'hospitalité sénégalaise, guide
              chacune de nos relations clients et partenaires.
            </p>
            <p className="leading-relaxed">
              Nous accompagnons les industriels africains dans la sécurisation de leurs flux de
              matières premières et d'équipements agroalimentaires. Grâce à un réseau international
              soigneusement sélectionné, nous garantissons qualité, traçabilité et compétitivité —
              du sourcing à la livraison sur site.
            </p>
            <p className="leading-relaxed">
              Notre ancrage local, combiné à une expertise globale, fait de nous le pont naturel
              entre les producteurs internationaux et les transformateurs africains.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Notre identité
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Mission, vision et valeurs
            </h2>
            <p className="mt-4 text-muted-foreground">
              Trois piliers qui orientent nos décisions et nos engagements au quotidien.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                t: "Notre mission",
                d: "Garantir aux industries africaines un approvisionnement fiable, compétitif et conforme aux standards internationaux.",
              },
              {
                icon: Eye,
                t: "Notre vision",
                d: "Devenir le partenaire industriel de référence entre l'Afrique et le monde, au service d'une croissance durable.",
              },
              {
                icon: Heart,
                t: "Nos valeurs",
                d: "Intégrité, qualité, innovation, proximité et engagement durable envers nos clients et partenaires.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                  <c.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Nos engagements
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Une exigence à chaque étape de la chaîne
            </h2>
            <p className="mt-5 text-muted-foreground">
              De la sélection des fournisseurs à la livraison finale, nous appliquons une discipline
              rigoureuse pour protéger vos opérations et bâtir des relations de long terme.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  t: "Qualité certifiée",
                  d: "Contrôles à chaque étape et conformité aux normes internationales.",
                },
                {
                  icon: Leaf,
                  t: "Engagement durable",
                  d: "Sourcing responsable et démarche environnementale continue.",
                },
                {
                  icon: Sparkles,
                  t: "Innovation continue",
                  d: "Veille constante pour vous proposer les meilleures solutions du marché.",
                },
                {
                  icon: Users,
                  t: "Proximité client",
                  d: "Un interlocuteur dédié et un accompagnement personnalisé sur mesure.",
                },
              ].map((p) => (
                <li
                  key={p.t}
                  className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{p.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "15+", l: "Pays desservis", icon: Globe2 },
              { v: "200+", l: "Clients industriels", icon: Users },
              { v: "50+", l: "Partenaires fiables", icon: Handshake },
              { v: "48h", l: "Délai moyen de devis", icon: TrendingUp },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-gold)]">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
                  {s.v}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre approche / processus */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Notre approche
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Un processus structuré, transparent et sécurisé
            </h2>
            <p className="mt-4 text-muted-foreground">
              Quatre étapes éprouvées pour transformer vos besoins en livraisons fiables.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                icon: Compass,
                t: "Écoute & analyse",
                d: "Compréhension approfondie de vos besoins et contraintes industrielles.",
              },
              {
                n: "02",
                icon: Globe2,
                t: "Sourcing ciblé",
                d: "Sélection des meilleurs fournisseurs internationaux selon vos critères.",
              },
              {
                n: "03",
                icon: ShieldCheck,
                t: "Contrôle qualité",
                d: "Vérification rigoureuse, conformité documentaire et sanitaire.",
              },
              {
                n: "04",
                icon: TrendingUp,
                t: "Livraison maîtrisée",
                d: "Logistique optimisée et suivi de bout en bout jusqu'à votre site.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
              >
                <span className="font-display text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                  {step.n}
                </span>
                <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ancrage local */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Ancrage & rayonnement
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Basés à Dakar, tournés vers toute l'Afrique
            </h2>
            <p className="mt-5 text-muted-foreground">
              Notre siège sénégalais nous offre une position stratégique au cœur de l'Afrique de
              l'Ouest. Nous opérons à travers un réseau régional étendu pour servir les industries
              du Sénégal, du Mali, de la Côte d'Ivoire, du Burkina Faso, de la Guinée et bien
              au-delà.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: Award, t: "Expertise locale" },
                { icon: Globe2, t: "Réseau international" },
                { icon: Handshake, t: "Partenariats long terme" },
                { icon: Leaf, t: "Vision durable" },
              ].map((b) => (
                <div
                  key={b.t}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3"
                >
                  <b.icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{b.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Sparkles className="absolute right-6 top-6 h-10 w-10 text-gold/40" />
            <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
              « Notre rôle est d'ouvrir des passerelles industrielles fiables pour accélérer la
              transformation économique africaine. »
            </p>
            <div className="mt-6 border-t border-primary-foreground/20 pt-4 text-sm text-primary-foreground/85">
              — La Direction, Teranga Bridge Africa
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] px-8 py-14 text-center shadow-[var(--shadow-elegant)] md:px-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Construisons ensemble la chaîne d'approvisionnement de demain
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Échangeons sur vos enjeux industriels et obtenez un devis personnalisé sous 48h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)]"
            >
              Nous contacter <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/20"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
