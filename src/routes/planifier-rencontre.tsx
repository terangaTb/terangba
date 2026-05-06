import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Handshake,
  Briefcase,
  Package,
  Lightbulb,
  MapPin,
  CalendarDays,
  Clock,
  User2,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SITE_URL = "https://terangba.lovable.app";

export const Route = createFileRoute("/planifier-rencontre")({
  head: () => ({
    meta: [
      { title: "Planifier une rencontre — SENEFOOD | Teranga Bridge Africa" },
      {
        name: "description",
        content:
          "Réservez un rendez-vous avec notre équipe pendant SENEFOOD : B2B, partenariats, packaging, conseil ou visite de stand. Réservation simple en quelques étapes.",
      },
      { property: "og:title", content: "Planifier une rencontre — SENEFOOD" },
      {
        property: "og:description",
        content:
          "Réservez votre créneau avec l'équipe Teranga Bridge Africa pendant l'événement SENEFOOD à Dakar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/planifier-rencontre` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/planifier-rencontre` }],
  }),
  component: PlanifierRencontre,
});

const MEETING_TYPES = [
  { id: "b2b", label: "Rencontre B2B", desc: "Échange commercial, sourcing, distribution.", Icon: Briefcase },
  { id: "partenariat", label: "Partenariat", desc: "Collaboration stratégique long-terme.", Icon: Handshake },
  { id: "packaging", label: "Packaging", desc: "Solutions d'emballage et conditionnement.", Icon: Package },
  { id: "conseil", label: "Conseil", desc: "Accompagnement export & marché africain.", Icon: Lightbulb },
  { id: "visite", label: "Visite de stand", desc: "Découverte produits sur place SENEFOOD.", Icon: MapPin },
] as const;

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

const schema = z.object({
  meeting_type: z.string().min(1),
  preferred_date: z.string().min(1),
  time_slot: z.string().min(1),
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30).regex(/^[+0-9\s().-]+$/, "Format invalide"),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = {
  meeting_type: string;
  preferred_date: Date | undefined;
  time_slot: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  description: string;
};

const STEPS = [
  { id: 1, label: "Type", Icon: Sparkles },
  { id: 2, label: "Date & créneau", Icon: CalendarDays },
  { id: 3, label: "Coordonnées", Icon: User2 },
  { id: 4, label: "Besoin", Icon: FileText },
  { id: 5, label: "Confirmation", Icon: CheckCircle2 },
] as const;

function PlanifierRencontre() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [eventLink, setEventLink] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    meeting_type: "",
    preferred_date: undefined,
    time_slot: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    description: "",
  });

  const selectedType = MEETING_TYPES.find((t) => t.id === form.meeting_type);
  const progress = useMemo(() => ((step - 1) / (STEPS.length - 1)) * 100, [step]);

  const canNext = () => {
    if (step === 1) return !!form.meeting_type;
    if (step === 2) return !!form.preferred_date && !!form.time_slot;
    if (step === 3) {
      return (
        form.name.trim().length >= 2 &&
        /\S+@\S+\.\S+/.test(form.email) &&
        form.phone.trim().length >= 6
      );
    }
    if (step === 4) return true;
    return true;
  };

  const next = () => {
    if (!canNext()) {
      toast.error("Merci de compléter les champs requis.");
      return;
    }
    setStep((s) => Math.min(STEPS.length, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    const payload = {
      meeting_type: form.meeting_type,
      preferred_date: form.preferred_date ? form.preferred_date.toISOString().slice(0, 10) : "",
      time_slot: form.time_slot,
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      country: form.country,
      description: form.description,
    };
    const r = schema.safeParse(payload);
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("meeting_requests").insert({
      ...r.data,
      company: r.data.company || null,
      country: r.data.country || null,
      description: r.data.description || null,
    });
    setSubmitting(false);
    if (error) {
      setSubmitting(false);
      toast.error("Erreur lors de l'enregistrement. Réessayez.");
      return;
    }

    // Create Google Calendar event
    try {
      const [h, m] = form.time_slot.split(":").map(Number);
      const start = new Date(form.preferred_date!);
      start.setHours(h, m, 0, 0);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      const res = await fetch("/api/calendar-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: `Rencontre SENEFOOD — ${selectedType?.label ?? form.meeting_type}`,
          description: `Type: ${selectedType?.label}\nContact: ${form.name} (${form.email}, ${form.phone})${form.company ? `\nEntreprise: ${form.company}` : ""}${form.country ? `\nPays: ${form.country}` : ""}${form.description ? `\n\nBesoin:\n${form.description}` : ""}`,
          location: "SENEFOOD — Dakar, Sénégal",
          startISO: start.toISOString(),
          endISO: end.toISOString(),
          timeZone: "Africa/Dakar",
          attendeeEmail: form.email,
          attendeeName: form.name,
        }),
      });
      const json = await res.json();
      if (res.ok && json.htmlLink) {
        setEventLink(json.htmlLink);
        toast.success("Rendez-vous confirmé et ajouté à Google Calendar !");
      } else {
        toast.success("Votre rendez-vous a été enregistré !");
      }
    } catch {
      toast.success("Votre rendez-vous a été enregistré !");
    }

    setSubmitting(false);
    setDone(true);
  };

  // Google Calendar link
  const gcalLink = useMemo(() => {
    if (!form.preferred_date || !form.time_slot) return "#";
    const [h, m] = form.time_slot.split(":").map(Number);
    const start = new Date(form.preferred_date);
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Rencontre SENEFOOD — ${selectedType?.label ?? ""}`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: `Rendez-vous avec Teranga Bridge Africa pendant SENEFOOD.\n\nType : ${selectedType?.label}\nContact : ${form.name} (${form.email}, ${form.phone})\n${form.company ? `Entreprise : ${form.company}\n` : ""}${form.description ? `\nBesoin : ${form.description}` : ""}`,
      location: "SENEFOOD — Dakar, Sénégal",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [form, selectedType]);

  // Disable past + Sundays
  const disabledMatcher = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today || d.getDay() === 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      <Header />
      <Toaster richColors position="top-center" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-[image:var(--gradient-primary)] text-primary-foreground">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--gold)]/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              SENEFOOD · Dakar
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-tight">
              Planifier une rencontre <span className="text-[var(--gold)]">avec notre équipe</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/85 max-w-2xl">
              Réservez votre créneau en quelques étapes. B2B, partenariat, packaging, conseil ou visite de stand — choisissez le format qui vous convient.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10 md:py-14">
        {/* Stepper */}
        <div className="mx-auto max-w-4xl">
          <ol className="flex items-center justify-between gap-2 mb-3">
            {STEPS.map((s) => {
              const active = step === s.id;
              const completed = step > s.id || done;
              return (
                <li key={s.id} className="flex-1 flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                      completed
                        ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--gold-foreground)] shadow-[var(--shadow-gold)]"
                        : active
                          ? "bg-primary border-primary text-primary-foreground scale-110"
                          : "bg-background border-border text-muted-foreground",
                    )}
                  >
                    {completed ? <CheckCircle2 className="h-5 w-5" /> : <s.Icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={cn(
                      "hidden md:inline text-sm font-medium truncate",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-[image:var(--gradient-gold)] transition-all duration-500 ease-out"
              style={{ width: `${done ? 100 : progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)] overflow-hidden">
          <div className="p-6 md:p-10">
            {done ? (
              <ConfirmationView form={form} selectedType={selectedType} gcalLink={eventLink ?? gcalLink} eventCreated={!!eventLink} />
            ) : (
              <div key={step} className="animate-fade-in-up">
                {step === 1 && <StepType form={form} setForm={setForm} />}
                {step === 2 && <StepDate form={form} setForm={setForm} disabledMatcher={disabledMatcher} />}
                {step === 3 && <StepInfo form={form} setForm={setForm} />}
                {step === 4 && <StepDescription form={form} setForm={setForm} selectedType={selectedType} />}
                {step === 5 && <StepReview form={form} selectedType={selectedType} />}
              </div>
            )}
          </div>

          {!done && (
            <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-6 py-4 md:px-10">
              <Button
                variant="outline"
                onClick={prev}
                disabled={step === 1 || submitting}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" /> Précédent
              </Button>

              <span className="text-xs text-muted-foreground">
                Étape {step} / {STEPS.length}
              </span>

              {step < STEPS.length ? (
                <Button onClick={next} className="rounded-full bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
                  Suivant <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={submitting}
                  className="rounded-full bg-[var(--gold)] text-[var(--gold-foreground)] hover:brightness-105 shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                >
                  {submitting ? "Envoi…" : "Confirmer le rendez-vous"} <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-muted-foreground">
          Vous recevrez une notification par email après confirmation. Besoin d'aide ?{" "}
          <Link to="/contact" className="text-primary underline-offset-4 hover:underline">Contactez-nous</Link>.
        </p>
      </main>

      <WhatsAppFab />
      <Footer />
    </div>
  );
}

/* -------- Steps -------- */

function StepType({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold">Quel type de rencontre ?</h2>
      <p className="mt-2 text-muted-foreground">Sélectionnez le format qui correspond à votre objectif.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEETING_TYPES.map(({ id, label, desc, Icon }) => {
          const active = form.meeting_type === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setForm((f) => ({ ...f, meeting_type: id }))}
              className={cn(
                "group relative text-left rounded-xl border-2 p-5 transition-all duration-300 hover-lift",
                active
                  ? "border-primary bg-primary/5 shadow-[var(--shadow-elegant)]"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              {active && (
                <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-[var(--gold)] p-1 text-[var(--gold-foreground)] animate-scale-in">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDate({
  form,
  setForm,
  disabledMatcher,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  disabledMatcher: (d: Date) => boolean;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold">Choisissez votre créneau</h2>
      <p className="mt-2 text-muted-foreground">Sélectionnez d'abord une date, puis un horaire disponible.</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card p-3 flex justify-center">
          <Calendar
            mode="single"
            selected={form.preferred_date}
            onSelect={(d) => setForm((f) => ({ ...f, preferred_date: d ?? undefined, time_slot: "" }))}
            disabled={disabledMatcher}
            className={cn("p-3 pointer-events-auto")}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Créneaux disponibles
          </div>
          {!form.preferred_date ? (
            <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground text-center">
              Sélectionnez une date pour afficher les créneaux.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((t) => {
                const active = form.time_slot === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, time_slot: t }))}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] scale-105"
                        : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StepInfo({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold">Vos coordonnées</h2>
      <p className="mt-2 text-muted-foreground">Pour vous envoyer la confirmation et préparer votre rendez-vous.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nom complet" required>
          <Input value={form.name} maxLength={100} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Aminata Diop" />
        </Field>
        <Field label="Email" required>
          <Input type="email" value={form.email} maxLength={255} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="vous@entreprise.com" />
        </Field>
        <Field label="Téléphone" required>
          <Input type="tel" value={form.phone} maxLength={30} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+221 78 307 36 36" />
        </Field>
        <Field label="Entreprise">
          <Input value={form.company} maxLength={150} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Nom de la société" />
        </Field>
        <Field label="Pays">
          <Input value={form.country} maxLength={100} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} placeholder="Sénégal" />
        </Field>
      </div>
    </div>
  );
}

function StepDescription({
  form, setForm, selectedType,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  selectedType?: typeof MEETING_TYPES[number];
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold">Décrivez votre besoin</h2>
      <p className="mt-2 text-muted-foreground">
        Quelques détails sur votre projet {selectedType ? `(${selectedType.label.toLowerCase()})` : ""} nous aident à préparer la rencontre.
      </p>
      <div className="mt-6">
        <Field label="Description (optionnel)">
          <Textarea
            value={form.description}
            maxLength={1000}
            rows={7}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Volumes, marchés visés, problématique packaging, attentes commerciales…"
          />
        </Field>
        <p className="mt-1 text-right text-xs text-muted-foreground">{form.description.length}/1000</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/50 py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}

function StepReview({ form, selectedType }: { form: FormState; selectedType?: typeof MEETING_TYPES[number] }) {
  const dateStr = form.preferred_date
    ? form.preferred_date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold">Récapitulatif</h2>
      <p className="mt-2 text-muted-foreground">Vérifiez les informations avant de confirmer.</p>

      <div className="mt-6 rounded-xl border border-border/60 bg-secondary/40 p-5">
        <Row label="Type" value={selectedType?.label} />
        <Row label="Date" value={dateStr} />
        <Row label="Heure" value={form.time_slot} />
        <Row label="Nom" value={form.name} />
        <Row label="Email" value={form.email} />
        <Row label="Téléphone" value={form.phone} />
        <Row label="Entreprise" value={form.company} />
        <Row label="Pays" value={form.country} />
        {form.description && <Row label="Besoin" value={<span className="whitespace-pre-wrap">{form.description}</span>} />}
      </div>
    </div>
  );
}

function ConfirmationView({
  form, selectedType, gcalLink, eventCreated,
}: {
  form: FormState;
  selectedType?: typeof MEETING_TYPES[number];
  gcalLink: string;
  eventCreated?: boolean;
}) {
  const dateStr = form.preferred_date
    ? form.preferred_date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";
  return (
    <div className="text-center animate-fade-in-up">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--gold-foreground)] shadow-[var(--shadow-gold)] animate-scale-in">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h2 className="mt-5 font-display text-3xl font-bold">Rendez-vous confirmé !</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Merci {form.name?.split(" ")[0]}.{" "}
        {eventCreated
          ? <>L'événement a été créé dans Google Calendar et une invitation a été envoyée à <span className="font-medium text-foreground">{form.email}</span>.</>
          : <>Une confirmation va vous être envoyée à <span className="font-medium text-foreground">{form.email}</span>.</>}
        {" "}Notre équipe reviendra vers vous rapidement.
      </p>

      <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border/60 bg-secondary/40 p-5 text-left">
        <Row label="Type" value={selectedType?.label} />
        <Row label="Date" value={dateStr} />
        <Row label="Heure" value={form.time_slot} />
        <Row label="Lieu" value="SENEFOOD — Dakar" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a href={gcalLink} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
            <CalendarDays className="h-4 w-4" /> {eventCreated ? "Voir l'événement Calendar" : "Ajouter à Google Calendar"}
          </Button>
        </a>
        <Link to="/">
          <Button variant="outline" className="rounded-full">
            <Download className="h-4 w-4" /> Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
