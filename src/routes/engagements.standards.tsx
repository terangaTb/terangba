import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import standardsHero1280Jpg from "@/assets/standards-hero-1280.jpg";
import standardsHero768Webp from "@/assets/standards-hero-768.webp";
import standardsHero1280Webp from "@/assets/standards-hero-1280.webp";
import standardsHero1920Webp from "@/assets/standards-hero-1920.webp";
import standardsHero768Jpg from "@/assets/standards-hero-768.jpg";
import standardsHero1920Jpg from "@/assets/standards-hero-1920.jpg";
import {
  Award,
  Users,
  Tag,
  Truck,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Activity,
  ClipboardCheck,
  BarChart3,
  Gauge,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  PhoneCall,
  Sparkles,
  Calendar,
} from "lucide-react";

const SITE_URL = "https://teranga-africa-connect.lovable.app";
const PAGE_URL = `${SITE_URL}/engagements/standards`;
const OG_IMAGE = `${SITE_URL}${standardsHero1280Jpg}`;

const PAGE_TITLE =
  "Engagements opérationnels — Six standards mesurés, jamais négociés | Teranga Bridge Africa";
const PAGE_DESC =
  "Standards opérationnels TBA : qualité, partenaires, prix, livraison, durabilité et confidentialité. KPI mesurés, méthodes d'audit et plan d'amélioration continue détaillés.";

type Standard = {
  id: string;
  icon: typeof Award;
  t: string;
  short: string;
  d: string;
  metric: string;
  metricLabel: string;
  target: string;
  measurement: string;
  controls: string[];
  tools: string[];
  escalation: string;
};

const standards: Standard[] = [
  {
    id: "qualite",
    icon: Award,
    t: "Qualité garantie",
    short: "Conformité internationale",
    d: "Chaque lot est validé selon des protocoles ISO/Codex Alimentarius avant départ. Aucune marchandise n'est expédiée sans certificat.",
    metric: "100%",
    metricLabel: "lots contrôlés",
    target: "0 non-conformité critique",
    measurement: "Inspection avant chargement par organisme tiers (SGS, Bureau Veritas, Cotecna).",
    controls: [
      "Audit fournisseur initial + audit annuel",
      "Échantillonnage normé sur chaque lot",
      "Analyses laboratoire (humidité, impuretés, mycotoxines)",
      "Certificats sanitaires & d'origine archivés 5 ans",
    ],
    tools: ["ISO 9001", "HACCP", "Codex Alimentarius", "Rapports SGS"],
    escalation: "Toute non-conformité majeure → arrêt expédition + notification client sous 24h.",
  },
  {
    id: "partenaires",
    icon: Users,
    t: "Partenaires fiables",
    short: "Réseau éprouvé",
    d: "120+ partenaires industriels, logistiques et financiers, sélectionnés sur leur historique, leur éthique et leur capacité opérationnelle.",
    metric: "120+",
    metricLabel: "partenaires actifs",
    target: "≥ 95% partenaires audités annuellement",
    measurement: "Score interne de fiabilité revu chaque trimestre (qualité, ponctualité, éthique).",
    controls: [
      "Due diligence avant tout engagement (KYC, sanctions, presse)",
      "Évaluation de performance sur 8 critères chiffrés",
      "Revue trimestrielle avec plan d'action",
      "Charte fournisseurs signée obligatoire",
    ],
    tools: ["KYC + AML", "Score TBA Partner Index", "Charte fournisseurs"],
    escalation: "Partenaire en alerte rouge → mise en plan correctif 30 jours, puis suspension.",
  },
  {
    id: "prix",
    icon: Tag,
    t: "Prix compétitifs",
    short: "Optimisation continue",
    d: "Volumes négociés, sourcing multi-pays et ingénierie logistique : nous capturons les meilleures fenêtres de marché pour vous.",
    metric: "−15%",
    metricLabel: "coûts moyens vs marché",
    target: "≤ prix médian marché sur 90% des lignes",
    measurement: "Benchmark mensuel sur indices Refinitiv, FAO, plateformes de négoce.",
    controls: [
      "Mise en concurrence systématique (≥ 3 offres)",
      "Couverture FX & matières quand pertinent",
      "Mutualisation des volumes inter-clients",
      "Décomposition transparente du prix livré",
    ],
    tools: ["Indices FAO/Refinitiv", "Pricing TBA", "Hedging FX"],
    escalation: "Écart > +5% vs benchmark → re-sourcing immédiat & rapport au client.",
  },
  {
    id: "livraison",
    icon: Truck,
    t: "Livraison rapide",
    short: "Délais maîtrisés",
    d: "Coordination multi-modale, transitaires accrédités et tracking en temps réel pour livrer quand votre production en a besoin.",
    metric: "98%",
    metricLabel: "livraisons à l'heure",
    target: "OTIF ≥ 97% (On Time In Full)",
    measurement: "Suivi GPS + reporting hebdomadaire OTIF par client et par corridor.",
    controls: [
      "Plan logistique validé avec le client (j-30 mini)",
      "Transitaire principal + plan B activable",
      "Stock tampon stratégique sur lignes critiques",
      "Notification proactive si retard > 24h",
    ],
    tools: ["GPS / EDI armateurs", "Tableau OTIF", "Plan B logistique"],
    escalation: "Retard > 48h → cellule de crise + solution alternative chiffrée sous 6h.",
  },
  {
    id: "durabilite",
    icon: Sprout,
    t: "Innovation & durabilité",
    short: "Impact positif",
    d: "Préférence aux filières responsables, équipements éco-efficients et solutions circulaires. Nous mesurons notre empreinte pour la réduire.",
    metric: "ESG",
    metricLabel: "approche intégrée",
    target: "−10% intensité carbone par tonne livrée d'ici 2027",
    measurement: "Bilan carbone Scope 1-2-3 annuel (méthodologie GHG Protocol).",
    controls: [
      "Critère ESG dans la sélection fournisseurs",
      "Optimisation des taux de remplissage conteneurs",
      "Préférence transport maritime vs aérien",
      "Reporting ESG annuel disponible sur demande",
    ],
    tools: ["GHG Protocol", "ODD ONU 8/12/13/17", "Reporting ESG annuel"],
    escalation: "Tout incident environnemental → rapport client + plan correctif 15 jours.",
  },
  {
    id: "confidentialite",
    icon: ShieldCheck,
    t: "Confidentialité & éthique",
    short: "Confiance absolue",
    d: "Vos données, volumes et sources restent strictement confidentiels. Notre charte éthique est opposable et auditée.",
    metric: "RGPD",
    metricLabel: "conformité",
    target: "0 incident de confidentialité",
    measurement: "Audit annuel des accès, journalisation et politique de rétention des données.",
    controls: [
      "NDA systématique avant tout échange sensible",
      "Cloisonnement des dossiers par client",
      "Charte anti-corruption signée par tous les collaborateurs",
      "Hébergement des données dans des centres certifiés",
    ],
    tools: ["NDA TBA", "Charte anti-corruption", "RGPD"],
    escalation: "Tout incident → notification client sous 24h + analyse de cause racine.",
  },
];

const kpiOverview = [
  { icon: Gauge, label: "Lots conformes", value: "100%", trend: "stable" },
  { icon: TrendingUp, label: "OTIF moyen 12 mois", value: "98%", trend: "+1,2 pt" },
  { icon: BarChart3, label: "Écart prix vs marché", value: "−15%", trend: "−2 pt" },
  { icon: Activity, label: "Partenaires audités/an", value: "≥ 95%", trend: "stable" },
];

const cycle = [
  {
    n: "01",
    icon: ClipboardCheck,
    t: "Définir",
    d: "Pour chaque standard, un objectif chiffré, un propriétaire et une fréquence de mesure.",
  },
  {
    n: "02",
    icon: Activity,
    t: "Mesurer",
    d: "Collecte continue via outils internes, partenaires d'audit et reporting client.",
  },
  {
    n: "03",
    icon: AlertTriangle,
    t: "Alerter",
    d: "Toute déviation déclenche une alerte automatique et un plan correctif sous 24h.",
  },
  {
    n: "04",
    icon: RefreshCw,
    t: "Améliorer",
    d: "Revue trimestrielle, retour d'expérience et mise à jour des standards.",
  },
];

const standardsSchemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Engagements opérationnels Teranga Bridge Africa",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: standards.length,
  itemListElement: standards.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.t,
    description: s.d,
    url: `${PAGE_URL}#${s.id}`,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Engagements", item: `${SITE_URL}/engagements` },
    { "@type": "ListItem", position: 3, name: "Standards opérationnels", item: PAGE_URL },
  ],
};

export const Route = createFileRoute("/engagements/standards")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "standards opérationnels TBA, KPI qualité, OTIF, audit fournisseurs, ISO 9001 HACCP, RSE Sénégal, conformité industrielle Afrique, charte éthique",
      },
      { name: "author", content: "Teranga Bridge Africa" },
      { name: "robots", content: "index, follow, max-image-preview:large" },

      { property: "og:type", content: "article" },
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
          "Inspecteur qualité africain consultant un tableau de bord KPI sur tablette dans un laboratoire agroindustriel moderne",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(standardsSchemaJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: Standards,
});

function Standards() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet={`${standardsHero768Webp} 768w, ${standardsHero1280Webp} 1280w, ${standardsHero1920Webp} 1920w`}
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet={`${standardsHero768Jpg} 768w, ${standardsHero1280Jpg} 1280w, ${standardsHero1920Jpg} 1920w`}
            sizes="100vw"
          />
          <img
            src={standardsHero1280Jpg}
            alt="Inspecteur qualité africain consultant un tableau de bord KPI sur tablette dans un laboratoire agroindustriel moderne — illustration des standards opérationnels TBA"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-xs text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">Accueil</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/engagements" className="hover:text-white">Engagements</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white">Standards opérationnels</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur">
              Engagements opérationnels
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Six standards mesurés, jamais négociés
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Chaque promesse opérationnelle de TBA est traduite en objectif chiffré, mesurée en
              continu et revue chaque trimestre. Voici la mécanique précise derrière nos
              engagements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#standards"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Explorer les six standards
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KPI bar */}
      <section className="border-b border-border bg-secondary/30 py-10">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {kpiOverview.map((k) => (
            <div
              key={k.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <k.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl font-bold leading-none">{k.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </div>
                <div className="mt-1 text-[11px] text-primary">{k.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sommaire ancres */}
      <section className="container mx-auto px-4 py-10 cv-auto">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Sommaire</span>
          <h2 className="mt-2 font-display text-2xl font-semibold">Naviguer dans nos standards</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {standards.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-secondary/60"
              >
                <span className="font-display text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.t}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Standards détaillés */}
      <section id="standards" className="bg-secondary/20 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            {standards.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm hover-lift reveal-on-scroll md:p-10"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${reverse ? "lg:[&>:first-child]:order-2" : ""}`}>
                    {/* Colonne descriptive */}
                    <div className="lg:col-span-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-xs font-bold tracking-widest text-gold">
                            STANDARD {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <a
                          href={`#${s.id}`}
                          aria-label={`Lien direct vers ${s.t}`}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="mt-3 flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                          <s.icon className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                            {s.t}
                          </h3>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                            {s.short}
                          </p>
                        </div>
                      </div>
                      <p className="mt-5 text-muted-foreground">{s.d}</p>

                      <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Contrôles & méthode
                        </h4>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {s.controls.map((c) => (
                            <li key={c} className="flex items-start gap-2 text-sm text-foreground/85">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.tools.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-semibold text-foreground/80"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Colonne KPI / encadrés */}
                    <aside className="lg:col-span-5">
                      <div className="rounded-2xl border border-primary/20 bg-[image:linear-gradient(135deg,oklch(0.42_0.11_155/0.05),oklch(0.78_0.14_85/0.05))] p-6">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                              Indicateur clé
                            </div>
                            <div className="mt-1 font-display text-4xl font-bold text-primary">
                              {s.metric}
                            </div>
                            <div className="text-xs text-muted-foreground">{s.metricLabel}</div>
                          </div>
                          <Gauge className="h-10 w-10 text-primary/30" aria-hidden="true" />
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                              Cible
                            </div>
                            <div className="mt-0.5 font-medium text-foreground/90">{s.target}</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                              Méthode de mesure
                            </div>
                            <div className="mt-0.5 text-foreground/85">{s.measurement}</div>
                          </div>
                          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                              <div>
                                <div className="text-[11px] font-bold uppercase tracking-wider text-destructive">
                                  Procédure d'escalade
                                </div>
                                <div className="mt-0.5 text-xs text-foreground/85">
                                  {s.escalation}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cycle d'amélioration continue */}
      <section className="container mx-auto px-4 py-20 cv-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Amélioration continue
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Définir, mesurer, alerter, améliorer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Notre cycle qualité s'inspire des méthodes industrielles éprouvées (PDCA, Six Sigma) et
            s'applique à chacun des six standards.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cycle.map((c, i) => (
            <div
              key={c.t}
              className="group relative rounded-2xl border border-border bg-card p-6 hover-lift reveal-on-scroll"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="font-display text-5xl font-bold text-primary/15">{c.n}</div>
              <div className="-mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reporting & gouvernance */}
      <section className="bg-secondary/30 py-20 cv-auto">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Gouvernance & reporting
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Des standards opposables, partagés avec vous
              </h2>
              <p className="mt-5 text-muted-foreground">
                Vous recevez un reporting opérationnel régulier sur les indicateurs qui comptent
                pour votre activité, et nous tenons une revue trimestrielle dédiée à votre compte.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                {[
                  { t: "Reporting mensuel", d: "Synthèse OTIF, conformité, incidents et plans d'action." },
                  { t: "Comité de pilotage trimestriel", d: "Revue des standards, KPI et roadmap d'amélioration." },
                  { t: "Audit annuel partagé", d: "Synthèse ESG et résultats des audits qualité." },
                ].map((row) => (
                  <div key={row.t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <div className="text-sm font-semibold">{row.t}</div>
                      <div className="text-xs text-muted-foreground">{row.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="px-4 py-3 text-left font-semibold">Cible</th>
                      <th className="px-4 py-3 text-left font-semibold">Fréquence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standards.map((s, i) => (
                      <tr
                        key={s.id}
                        className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}
                      >
                        <td className="px-4 py-3">
                          <a
                            href={`#${s.id}`}
                            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary"
                          >
                            <s.icon className="h-4 w-4 text-primary" />
                            {s.t}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-foreground/85">{s.target}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {s.id === "qualite" || s.id === "livraison"
                            ? "Continue"
                            : s.id === "prix"
                            ? "Mensuelle"
                            : "Trimestrielle"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Tableau extrait du référentiel TBA Standards v3.2 — disponible sur demande sous NDA.
              </p>
            </div>
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
          <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground backdrop-blur">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="relative font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Travaillons sur des bases mesurables
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Demandez notre référentiel complet ou démarrez un dossier&nbsp;: nos engagements vous
            sont opposables dès le premier devis.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
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
              Demander le référentiel
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
