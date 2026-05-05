import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Globe2,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://teranga-africa-connect.lovable.app";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Teranga Bridge Africa | Dakar, Sénégal" },
      {
        name: "description",
        content:
          "Contactez Teranga Bridge Africa à Dakar. Réponse sous 48h ouvrées. Tél +221 78 307 36 36 — contact@terangabridgeafrica.com. Devis, partenariats, sourcing.",
      },
      { property: "og:title", content: "Contact — Teranga Bridge Africa" },
      {
        property: "og:description",
        content:
          "Discutons de vos besoins en sourcing et approvisionnement industriel. Équipe basée à Dakar, réponse sous 48h ouvrées.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Numéro trop court")
    .max(30, "Numéro trop long")
    .regex(/^[+0-9\s().-]+$/, "Numéro invalide"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Sujet requis").max(120),
  message: z.string().trim().min(10, "Message trop court").max(1000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter la politique de confidentialité." }),
  }),
});

const SUBJECTS = [
  "Demande de devis",
  "Sourcing & approvisionnement",
  "Partenariat fournisseur",
  "Logistique & transport",
  "Presse / médias",
  "Autre",
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: SUBJECTS[0],
    message: "",
    consent: false,
  });
  const [sending, setSending] = useState(false);
  const [sentInfo, setSentInfo] = useState<{ name: string; email: string } | null>(null);

  function resetForm() {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: SUBJECTS[0],
      message: "",
      consent: false,
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setSending(true);
    void (async () => {
      const composedMessage =
        `[${r.data.subject}]` +
        (r.data.company ? ` — ${r.data.company}` : "") +
        `\nTéléphone : ${r.data.phone}` +
        `\n\n${r.data.message}`;
      const { error } = await supabase.from("contact_requests").insert({
        name: r.data.name,
        email: r.data.email,
        message: composedMessage,
      });
      setSending(false);
      if (error) {
        toast.error("Une erreur est survenue. Réessayez ou écrivez-nous directement par email.");
        return;
      }
      toast.success("Message envoyé. Notre équipe revient vers vous sous 48h ouvrées.");
      setSentInfo({ name: r.data.name, email: r.data.email });
      resetForm();
      // Smooth scroll to the confirmation panel
      if (typeof window !== "undefined") {
        setTimeout(() => {
          document.getElementById("contact-confirmation")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 50);
      }
    })();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Decorative gradient layers */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="animate-blob absolute -top-24 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div
          aria-hidden
          className="animate-blob absolute -bottom-32 -left-20 -z-10 h-[24rem] w-[24rem] rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--gradient-primary)", animationDelay: "3s" }}
        />

        <div className="container mx-auto px-4 py-24 md:py-32">
          <nav aria-label="fil d'ariane" className="mb-6 text-xs text-white/70">
            <Link to="/" className="hover:text-white">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--gold)] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Contact
            </span>
            <h1 className="animate-fade-in-up mt-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              Parlons de votre <span className="text-[color:var(--gold)]">projet</span>.
            </h1>
            <p className="animate-fade-in-up mt-6 max-w-2xl text-base text-white/80 md:text-lg">
              Notre équipe basée à Dakar accompagne vos opérations de sourcing,
              d'approvisionnement et de logistique en Afrique de l'Ouest.
              <span className="block mt-2 text-white/70">
                Réponse garantie sous <strong className="text-white">48h ouvrées</strong>.
              </span>
            </p>

            {/* Quick action chips */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="tel:+221783073636"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-[color:var(--gold)]" />
                +221 78 307 36 36
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
              <a
                href="mailto:contact@terangabridgeafrica.com"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Mail className="h-4 w-4 text-[color:var(--gold)]" />
                Écrire un email
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
              <a
                href="https://wa.me/221783073636"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 py-2.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp direct
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg
          aria-hidden
          className="absolute bottom-0 left-0 w-full text-background"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* ===================== TRUST STRIP ===================== */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            { icon: Clock, label: "Réponse", value: "48h ouvrées" },
            { icon: Globe2, label: "Couverture", value: "Afrique de l'Ouest" },
            { icon: ShieldCheck, label: "Confidentialité", value: "NDA disponible" },
            { icon: Building2, label: "Siège", value: "Dakar, Sénégal" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </div>
                <div className="truncate text-sm font-semibold text-foreground">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== MAIN GRID ===================== */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* ----- LEFT: Coordinates + map ----- */}
          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-px w-8 bg-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  Coordonnées
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Nous joindre
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Une équipe humaine, joignable, à votre écoute.
              </p>

              <ul className="mt-6 space-y-5">
                <li className="group flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Adresse
                    </div>
                    <p className="mt-1 text-sm text-foreground">
                      4P - 6, Imm. Elh Omar DIA
                      <br />
                      Boulevard de l'Est x Rue 9, Point E
                      <br />
                      Dakar, Sénégal
                    </p>
                  </div>
                </li>

                <li className="group flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Téléphone
                    </div>
                    <a
                      href="tel:+221783073636"
                      className="mt-1 block text-sm font-medium text-foreground transition hover:text-primary"
                    >
                      +221 78 307 36 36
                    </a>
                  </div>
                </li>

                <li className="group flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Email
                    </div>
                    <a
                      href="mailto:contact@terangabridgeafrica.com"
                      className="mt-1 block break-all text-sm font-medium text-foreground transition hover:text-primary"
                    >
                      contact@terangabridgeafrica.com
                    </a>
                  </div>
                </li>

                <li className="group flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Horaires
                    </div>
                    <p className="mt-1 text-sm text-foreground">
                      Lun – Ven · 8h30 – 18h00 <span className="text-muted-foreground">(GMT)</span>
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-7 border-t border-border pt-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Suivez-nous
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/221783073636"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <iframe
                title="Localisation Teranga Bridge Africa — Dakar"
                src="https://www.google.com/maps?q=Sacre+Coeur+3+VDN+Dakar+Senegal&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-5 py-3">
                <div className="text-xs text-muted-foreground">
                  Sacré Cœur 3 VDN, Dakar
                </div>
                <a
                  href="https://www.google.com/maps?q=Sacre+Coeur+3+VDN+Dakar+Senegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Itinéraire
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* ----- RIGHT: Form OR Confirmation ----- */}
          <div className="lg:col-span-3" id="contact-confirmation">
            {sentInfo ? (
              <div
                role="status"
                aria-live="polite"
                className="animate-scale-in relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-8 shadow-[var(--shadow-elegant)] md:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-25 blur-3xl"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full opacity-20 blur-3xl"
                  style={{ background: "var(--gradient-gold)" }}
                />

                <div className="relative">
                  <div className="animate-glow-pulse mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] shadow-[var(--shadow-elegant)]">
                    <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.2} />
                  </div>

                  <div className="mt-7 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Message reçu
                    </span>
                    <h2 className="mt-5 font-display text-3xl font-bold text-foreground md:text-4xl">
                      Merci, <span className="text-primary">{sentInfo.name.split(" ")[0]}</span> !
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
                      Votre message a bien été transmis à notre équipe. Une confirmation a été
                      enregistrée pour{" "}
                      <strong className="text-foreground">{sentInfo.email}</strong>.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      { icon: CheckCircle2, label: "Reçu", value: "À l'instant" },
                      { icon: Clock, label: "Réponse", value: "Sous 48h ouvrées" },
                      { icon: ShieldCheck, label: "Confidentiel", value: "Vos données protégées" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-border bg-background/60 p-4 text-center backdrop-blur-sm"
                      >
                        <s.icon className="mx-auto h-5 w-5 text-primary" />
                        <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {s.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-foreground">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSentInfo(null);
                        setTimeout(() => {
                          document
                            .getElementById("contact-confirmation")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 50);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                    >
                      <Send className="h-4 w-4" />
                      Envoyer un autre message
                    </button>
                    <Link
                      to="/"
                      className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:-translate-y-0.5"
                    >
                      Retour à l'accueil
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <p className="mt-6 text-center text-xs text-muted-foreground">
                    Besoin d'une réponse immédiate ?{" "}
                    <a
                      href="https://wa.me/221783073636"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      Contactez-nous sur WhatsApp
                    </a>
                    .
                  </p>
                </div>
              </div>
            ) : (
            <form
              onSubmit={submit}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-elegant)] md:p-10"
            >
              {/* Subtle corner accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--gradient-gold)" }}
              />

              <div className="mb-7 flex items-center gap-2">
                <div className="h-px w-8 bg-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  Formulaire
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Envoyez-nous un message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Remplissez le formulaire — un membre de l'équipe revient vers vous sous{" "}
                <strong className="text-foreground">48h ouvrées</strong>.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Nom complet" required>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    placeholder="Aïssatou Diop"
                    className="form-input"
                    required
                  />
                </Field>

                <Field label="Email professionnel" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    placeholder="vous@entreprise.com"
                    className="form-input"
                    required
                  />
                </Field>

                <Field label="Société">
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    maxLength={120}
                    placeholder="Nom de votre entreprise"
                    className="form-input"
                  />
                </Field>

                <Field label="Sujet" required>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="form-input appearance-none bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat pr-10"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    }}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Votre message" required>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={1000}
                    placeholder="Décrivez votre besoin (volumes, produits, délais, destination)…"
                    className="form-input resize-y"
                    required
                  />
                  <div className="mt-1.5 flex justify-end text-[11px] text-muted-foreground">
                    {form.message.length} / 1000
                  </div>
                </Field>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary/40 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-[color:var(--primary)]"
                  required
                />
                <span className="text-muted-foreground">
                  J'accepte que mes données soient utilisées pour répondre à ma demande,
                  conformément à la{" "}
                  <span className="font-medium text-foreground">
                    politique de confidentialité
                  </span>{" "}
                  de Teranga Bridge Africa.
                </span>
              </label>

              <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Vos données restent confidentielles. Aucun spam, jamais.
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition group-hover:-rotate-12" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
            )}

            {/* Below-form micro reassurance */}
            {!sentInfo && (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  "Réponse sous 48h ouvrées",
                  "Devis gratuit & sans engagement",
                  "NDA disponible sur demande",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              Questions fréquentes
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Avant de nous écrire
            </h2>
            <p className="mt-3 text-muted-foreground">
              Les réponses aux questions que l'on nous pose le plus souvent.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-base font-semibold text-foreground">
                    {item.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="container mx-auto px-4 pb-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-14"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-gold)" }}
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                Un projet plus large ?
              </h3>
              <p className="mt-3 max-w-xl text-white/80">
                Demandez un devis détaillé pour vos opérations de sourcing,
                d'approvisionnement ou de logistique.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Nos services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                hash="devis"
                className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-gold)] px-6 py-3 font-semibold text-[color:var(--gold-foreground)] shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />

      {/* Scoped form input style */}
      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--input);
          background: var(--background);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .form-input::placeholder { color: oklch(0.6 0.02 155); }
        .form-input:hover { border-color: oklch(0.82 0.02 140); }
        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px oklch(0.55 0.13 150 / 0.18);
          background: var(--card);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-[color:var(--gold)]">*</span>}
      </span>
      {children}
    </label>
  );
}

const FAQ = [
  {
    q: "Quels sont vos délais de réponse ?",
    a: "Toute demande reçue via le formulaire, par email ou par téléphone reçoit une première réponse sous 48h ouvrées. Pour les demandes urgentes, contactez-nous directement par WhatsApp.",
  },
  {
    q: "Quels types de projets accompagnez-vous ?",
    a: "Sourcing de matières premières (agro-industrie, BTP, énergie), recherche de partenaires fournisseurs, logistique import/export et représentation commerciale en Afrique de l'Ouest.",
  },
  {
    q: "Couvrez-vous toute l'Afrique ?",
    a: "Notre cœur d'expertise couvre l'Afrique de l'Ouest (Sénégal, Côte d'Ivoire, Mali, Guinée, Burkina, Bénin, Togo). Nous étudions toute autre demande au cas par cas.",
  },
  {
    q: "Signez-vous des accords de confidentialité (NDA) ?",
    a: "Oui, systématiquement sur demande. Un modèle de NDA bilingue (FR/EN) peut vous être transmis avant toute discussion détaillée.",
  },
  {
    q: "Comment sont facturés vos services ?",
    a: "Selon la mission : forfait, commission sur sourcing ou retainer mensuel. Nous établissons un devis transparent après notre premier échange.",
  },
];
