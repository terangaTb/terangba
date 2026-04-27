import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import servicesHero1280Jpg from "@/assets/services-hero-1280.jpg";
import servicesHero768Webp from "@/assets/services-hero-768.webp";
import servicesHero1280Webp from "@/assets/services-hero-1280.webp";
import servicesHero1920Webp from "@/assets/services-hero-1920.webp";
import servicesHero768Jpg from "@/assets/services-hero-768.jpg";
import servicesHero1920Jpg from "@/assets/services-hero-1920.jpg";
import {
  Package,
  Globe2,
  Wrench,
  Lightbulb,
  Truck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Compass,
  ClipboardCheck,
  Container,
  Factory,
  TrendingUp,
  Handshake,
  Leaf,
  CheckCircle2,
  PhoneCall,
  Send,
  FileText,
  Building2,
  Copy,
  Printer,
  Hash,
  CalendarClock,
  Mail,
  User as UserIcon,
} from "lucide-react";

const SITE_URL = "https://teranga-africa-connect.lovable.app";
const SERVICES_URL = `${SITE_URL}/services`;
const OG_IMAGE = `${SITE_URL}${servicesHero1280Jpg}`;

const PAGE_TITLE =
  "Nos services — Approvisionnement, équipements et logistique industrielle | TBA";
const PAGE_DESC =
  "Teranga Bridge Africa propose un éventail complet de services industriels en Afrique : fourniture de matières premières agroalimentaires, import/export, équipements, conseil et logistique de bout en bout depuis Dakar.";

const services = [
  {
    icon: Package,
    t: "Fourniture de matières premières agroalimentaires",
    short: "Sourcing rigoureux et traçable",
    d: "Céréales, oléagineux, sucre, ingrédients spécialisés : nous sécurisons votre approvisionnement auprès de producteurs et négociants certifiés à travers le monde.",
    points: [
      "Cahier des charges sur-mesure",
      "Certificats qualité & origine",
      "Volumes adaptés à votre cadence",
    ],
  },
  {
    icon: Globe2,
    t: "Import / Export industriel",
    short: "Conformité douanière maîtrisée",
    d: "Gestion intégrale de vos opérations transfrontalières : documentation, dédouanement, normes sanitaires et réglementaires sur les corridors africains et internationaux.",
    points: [
      "Formalités douanières",
      "Conformité réglementaire",
      "Optimisation tarifaire",
    ],
  },
  {
    icon: Wrench,
    t: "Fourniture d'équipements agroalimentaires",
    short: "Process, conditionnement, stockage",
    d: "Équipements industriels de transformation, lignes de conditionnement et solutions de stockage adaptés à vos volumes et à votre environnement de production.",
    points: [
      "Lignes neuves & reconditionnées",
      "Pièces de rechange",
      "Mise en service & formation",
    ],
  },
  {
    icon: Lightbulb,
    t: "Conseil et accompagnement industriel",
    short: "Expertise stratégique & opérationnelle",
    d: "Audit, optimisation des process, étude de faisabilité et accompagnement dans le déploiement de vos projets industriels en Afrique de l'Ouest et au-delà.",
    points: [
      "Audit & diagnostic",
      "Étude de faisabilité",
      "Accompagnement projet",
    ],
  },
  {
    icon: Truck,
    t: "Logistique & chaîne d'approvisionnement",
    short: "Du port au site de production",
    d: "Solutions logistiques intégrées : transport multimodal, entreposage sécurisé, distribution capillaire et suivi en temps réel sur tout le continent africain.",
    points: [
      "Transport multimodal",
      "Entreposage sécurisé",
      "Suivi temps réel",
    ],
  },
  {
    icon: Container,
    t: "Affrètement & gestion de conteneurs",
    short: "Maritime, routier, aérien",
    d: "Réservation, consolidation et suivi de vos expéditions FCL/LCL avec un réseau d'armateurs partenaires et un coordinateur dédié à votre dossier.",
    points: [
      "FCL & LCL",
      "Tracking complet",
      "Assurance cargo",
    ],
  },
];

const sectors = [
  { icon: Factory, t: "Minoteries & semouleries" },
  { icon: Leaf, t: "Huileries & corps gras" },
  { icon: Package, t: "Sucreries & confiseries" },
  { icon: TrendingUp, t: "Boissons & laiteries" },
  { icon: ClipboardCheck, t: "Conserveries & condiments" },
  { icon: Handshake, t: "Distributeurs & négoces" },
];

const process = [
  {
    n: "01",
    icon: Compass,
    t: "Compréhension du besoin",
    d: "Briefing détaillé : volumes, spécifications, contraintes logistiques et calendrier.",
  },
  {
    n: "02",
    icon: Globe2,
    t: "Sourcing & sélection",
    d: "Identification des fournisseurs, négociation et présélection selon vos critères qualité/prix.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    t: "Contrôle & conformité",
    d: "Inspection avant expédition, conformité documentaire et sanitaire, certificats à l'appui.",
  },
  {
    n: "04",
    icon: Truck,
    t: "Livraison & suivi",
    d: "Coordination logistique de bout en bout jusqu'à la réception sur votre site de production.",
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
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
};

const servicesGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": services.map((s, i) => ({
    "@type": "Service",
    "@id": `${SERVICES_URL}#service-${i + 1}`,
    name: s.t,
    description: s.d,
    serviceType: s.short,
    provider: { "@type": "Organization", name: "Teranga Bridge Africa" },
    areaServed: { "@type": "Place", name: "Afrique" },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: SERVICES_URL },
  ],
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "services industriels Afrique, matières premières agroalimentaires, équipements industriels, import export Sénégal, logistique Afrique, conseil industriel, sourcing agroalimentaire, Dakar",
      },
      { name: "author", content: "Teranga Bridge Africa" },
      { name: "robots", content: "index, follow, max-image-preview:large" },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Teranga Bridge Africa" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SERVICES_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      {
        property: "og:image:alt",
        content:
          "Vue aérienne d'un terminal portuaire africain avec silos agroalimentaires, conteneurs et grues au coucher du soleil",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SERVICES_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(servicesGraphJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: Services,
});

const SERVICE_OPTIONS = services.map((s) => s.t);

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(2, "Sélectionnez un service").max(160),
  volume: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Décrivez votre besoin (10 caractères min.)").max(1000),
  charterAccepted: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la charte éthique / NDA pour continuer." }),
  }),
});

type Confirmation = {
  reference: string;
  submittedAt: string; // ISO
  name: string;
  email: string;
  company: string;
  service: string;
  volume: string;
  message: string;
};

function generateReference(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  // 5 chars alphanum aléatoires (sans I/O/0/1 pour lisibilité)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const cryptoObj = typeof window !== "undefined" ? window.crypto : undefined;
  if (cryptoObj?.getRandomValues) {
    const buf = new Uint32Array(5);
    cryptoObj.getRandomValues(buf);
    for (let i = 0; i < 5; i++) suffix += alphabet[buf[i] % alphabet.length];
  } else {
    for (let i = 0; i < 5; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `TBA-${yyyy}${mm}${dd}-${suffix}`;
}

function Services() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Services",
    volume: "",
    message: "",
    charterAccepted: false,
  });
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const confirmRef = useRef<HTMLDivElement | null>(null);

  // Pré-remplissage via query string ?service=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const presetService = params.get("service");
    if (presetService) {
      setForm((f) => ({ ...f, service: presetService }));
    }
  }, []);

  function preselectService(name: string) {
    setForm((f) => ({ ...f, service: name }));
    setConfirmation(null);
    if (typeof document !== "undefined") {
      document.getElementById("devis")?.scrollIntoView({ behavior: "smooth", block: "start" });
      // focus le premier champ après le scroll
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus(), 450);
    }
  }

  function resetForNewRequest() {
    setConfirmation(null);
    setForm({
      name: "",
      email: "",
      company: "",
      service: "Services",
      volume: "",
      message: "",
    });
    setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus(), 100);
  }

  async function copyReference(ref: string) {
    try {
      await navigator.clipboard.writeText(ref);
      toast.success("Numéro de référence copié");
    } catch {
      toast.error("Impossible de copier — sélectionnez le numéro manuellement");
    }
  }

  function submitQuote(e: React.FormEvent) {
    e.preventDefault();
    const r = quoteSchema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setSending(true);
    void (async () => {
      const reference = generateReference();
      const submittedAt = new Date().toISOString();
      const composedMessage =
        `[Demande de devis — ${r.data.service}]\n` +
        `Référence : ${reference}\n` +
        `Date : ${submittedAt}\n` +
        (r.data.company ? `Société : ${r.data.company}\n` : "") +
        (r.data.volume ? `Volume / cadence estimés : ${r.data.volume}\n` : "") +
        `\n${r.data.message}`;
      const { error } = await supabase.from("contact_requests").insert({
        name: r.data.name,
        email: r.data.email,
        message: composedMessage,
      });
      setSending(false);
      if (error) {
        toast.error("Une erreur est survenue. Réessayez.");
        return;
      }
      toast.success(`Demande envoyée — référence ${reference}`);
      setConfirmation({
        reference,
        submittedAt,
        name: r.data.name,
        email: r.data.email,
        company: r.data.company ?? "",
        service: r.data.service,
        volume: r.data.volume ?? "",
        message: r.data.message,
      });
      // scroll vers la confirmation
      setTimeout(() => {
        confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    })();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet={`${servicesHero768Webp} 768w, ${servicesHero1280Webp} 1280w, ${servicesHero1920Webp} 1920w`}
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet={`${servicesHero768Jpg} 768w, ${servicesHero1280Jpg} 1280w, ${servicesHero1920Jpg} 1920w`}
            sizes="100vw"
          />
          <img
            src={servicesHero1280Jpg}
            alt="Terminal portuaire africain avec silos, conteneurs et grues — illustration de la chaîne d'approvisionnement industrielle de Teranga Bridge Africa"
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
              Nos services
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Des solutions industrielles complètes, du sourcing à la livraison
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Matières premières, équipements, import/export, conseil et logistique : un partenaire
              unique pour sécuriser et accélérer votre activité industrielle en Afrique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#devis"
                onClick={() => setForm((f) => ({ ...f, service: "Services" }))}
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#nos-services"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Explorer nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars / promesse */}
      <section className="container mx-auto px-4 py-16 cv-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              t: "Qualité certifiée",
              d: "Conformité aux standards internationaux, contrôles à chaque étape de la chaîne.",
            },
            {
              icon: Sparkles,
              t: "Expertise globale",
              d: "Un réseau international de fournisseurs sélectionnés avec exigence.",
            },
            {
              icon: Handshake,
              t: "Proximité africaine",
              d: "Une équipe basée à Dakar, à l'écoute, qui parle votre langue industrielle.",
            },
          ].map((p, i) => (
            <div
              key={p.t}
              className="group rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <p.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold">{p.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section id="nos-services" className="bg-secondary/30 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Catalogue de services
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Six expertises au service de votre industrie
            </h2>
            <p className="mt-4 text-muted-foreground">
              Des prestations modulaires que nous orchestrons en bout-en-bout selon vos besoins.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.t}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[image:var(--gradient-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold leading-snug">
                  {s.t}
                </h3>
                <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  {s.short}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
                <ul className="relative mt-5 space-y-2 text-sm">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => preselectService(s.t)}
                  className="relative mt-6 inline-flex items-center gap-2 self-start rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 py-20 cv-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Notre méthode
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Un processus structuré, transparent et sécurisé
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quatre étapes éprouvées pour transformer vos besoins en livraisons fiables.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <div
              key={step.n}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-gold)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-display text-5xl font-bold text-primary/10 transition-all duration-500 group-hover:text-primary/30 group-hover:scale-110 inline-block">
                {step.n}
              </span>
              <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{step.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-secondary/30 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Secteurs servis
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Des industries variées, un même niveau d'exigence
              </h2>
              <p className="mt-5 text-muted-foreground">
                Nous accompagnons une diversité d'acteurs de la transformation et de la
                distribution, en Afrique de l'Ouest et au-delà.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7 md:grid-cols-3">
              {sectors.map((s, i) => (
                <div
                  key={s.t}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 hover-lift reveal-on-scroll"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium leading-tight">{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section id="devis" className="container mx-auto px-4 py-20 cv-auto scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Demande de devis
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Recevez une proposition chiffrée sous 48&nbsp;heures
            </h2>
            <p className="mt-5 text-muted-foreground">
              Décrivez votre besoin en quelques lignes. Notre équipe revient vers vous avec une
              recommandation précise, des références fournisseurs et une estimation budgétaire.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span><strong className="text-foreground">Réponse sous 48h</strong> ouvrées par un interlocuteur dédié.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span><strong className="text-foreground">Confidentialité</strong> totale de vos informations et volumes.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span><strong className="text-foreground">Sans engagement</strong> — étude et estimation offertes.</span>
              </li>
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Préférez un échange direct ?{" "}
              <Link to="/contact" className="font-semibold text-primary hover:underline">
                Voir nos coordonnées
              </Link>
              .
            </div>
          </div>

          <div className="lg:col-span-7">
            {confirmation ? (
              <div
                ref={confirmRef}
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-primary/30 bg-card p-6 shadow-[var(--shadow-elegant)] md:p-8 print:border-black print:shadow-none"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold">
                      Demande envoyée avec succès
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Merci {confirmation.name.split(" ")[0]} ! Notre équipe revient vers vous sous{" "}
                      <strong className="text-foreground">48&nbsp;heures ouvrées</strong> à
                      l'adresse <strong className="text-foreground">{confirmation.email}</strong>.
                    </p>
                  </div>
                </div>

                {/* Bloc référence */}
                <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                        <Hash className="h-3.5 w-3.5" /> Numéro de référence
                      </p>
                      <p
                        className="mt-1 select-all break-all font-mono text-xl font-semibold text-foreground md:text-2xl"
                        aria-label="Numéro de référence du dossier"
                      >
                        {confirmation.reference}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 print:hidden">
                      <button
                        type="button"
                        onClick={() => copyReference(confirmation.reference)}
                        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Copy className="h-4 w-4" /> Copier
                      </button>
                      <button
                        type="button"
                        onClick={() => typeof window !== "undefined" && window.print()}
                        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Printer className="h-4 w-4" /> Imprimer
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Conservez ce numéro pour toute correspondance — il nous permettra de retrouver
                    votre dossier instantanément.
                  </p>
                </div>

                {/* Récapitulatif */}
                <div className="mt-6">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Récapitulatif de votre demande
                  </h4>
                  <dl className="mt-3 divide-y divide-border rounded-xl border border-border bg-background/50">
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <CalendarClock className="h-3.5 w-3.5" /> Soumise le
                      </dt>
                      <dd className="sm:col-span-2 text-sm">
                        {new Date(confirmation.submittedAt).toLocaleString("fr-FR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <UserIcon className="h-3.5 w-3.5" /> Contact
                      </dt>
                      <dd className="sm:col-span-2 text-sm">{confirmation.name}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" /> Email
                      </dt>
                      <dd className="sm:col-span-2 text-sm break-all">{confirmation.email}</dd>
                    </div>
                    {confirmation.company && (
                      <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                        <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5" /> Société
                        </dt>
                        <dd className="sm:col-span-2 text-sm">{confirmation.company}</dd>
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" /> Service
                      </dt>
                      <dd className="sm:col-span-2 text-sm">{confirmation.service}</dd>
                    </div>
                    {confirmation.volume && (
                      <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Volume / cadence
                        </dt>
                        <dd className="sm:col-span-2 text-sm">{confirmation.volume}</dd>
                      </div>
                    )}
                    <div className="px-4 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Message
                      </dt>
                      <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                        {confirmation.message}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                  <button
                    type="button"
                    onClick={resetForNewRequest}
                    className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
                  >
                    Nouvelle demande
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={submitQuote}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
                noValidate
              >
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <FileText className="h-5 w-5 text-primary" /> Votre demande
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tous les champs marqués d'un * sont obligatoires.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="q-name" className="mb-1 block text-sm font-medium">Nom complet *</label>
                    <input
                      id="q-name"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      maxLength={100}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-email" className="mb-1 block text-sm font-medium">Email professionnel *</label>
                    <input
                      id="q-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={255}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-company" className="mb-1 block text-sm font-medium">
                      <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-gold" /> Société</span>
                    </label>
                    <input
                      id="q-company"
                      name="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      maxLength={120}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-volume" className="mb-1 block text-sm font-medium">Volume / cadence estimés</label>
                    <input
                      id="q-volume"
                      name="volume"
                      value={form.volume}
                      onChange={(e) => setForm({ ...form, volume: e.target.value })}
                      maxLength={80}
                      placeholder="ex. 200 t / mois"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="q-service" className="mb-1 block text-sm font-medium">Service concerné *</label>
                    <select
                      id="q-service"
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    >
                      <option value="Services">Services (général)</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      <option value="Autre">Autre / je ne sais pas encore</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="q-message" className="mb-1 block text-sm font-medium">Décrivez votre besoin *</label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      maxLength={1000}
                      required
                      placeholder="Spécifications, contraintes, calendrier souhaité…"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                    <div className="mt-1 text-right text-xs text-muted-foreground">
                      {form.message.length}/1000
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Envoi en cours…" : "Envoyer ma demande de devis"}
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 cv-auto">
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
          <h2 className="relative font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Un projet industriel ? Parlons-en.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Décrivez-nous votre besoin : nous revenons vers vous avec une proposition chiffrée sous
            48 heures.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#devis"
              className="group/btn inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] animate-glow-pulse transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <PhoneCall className="h-4 w-4" />
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/20"
            >
              En savoir plus sur TBA
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
