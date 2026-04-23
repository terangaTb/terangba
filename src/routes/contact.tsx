import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Teranga Bridge Africa" },
      { name: "description", content: "Contactez-nous à Dakar : +221 33 892 07 21 — contact@terangabridgeafrica.com" },
      { property: "og:title", content: "Contact — Teranga Bridge Africa" },
      { property: "og:description", content: "Discutons de vos besoins en approvisionnement industriel." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Demande de ${r.data.name}`);
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:contact@terangabridgeafrica.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Votre client mail s'est ouvert. Merci !");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster />

      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Contact</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Notre équipe vous répond sous 48h ouvrées.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">Coordonnées</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <span>Sacré Cœur 3 VDN, 57<br />Dakar, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <a href="tel:+221338920721" className="hover:text-primary">+221 33 892 07 21</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <a href="mailto:contact@terangabridgeafrica.com" className="hover:text-primary">contact@terangabridgeafrica.com</a>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Carte Dakar"
              src="https://www.google.com/maps?q=Sacre+Coeur+3+VDN+Dakar+Senegal&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-display text-lg font-semibold">Envoyez-nous un message</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nom</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {sending ? "Envoi..." : "Envoyer le message"}
            </button>
          </div>
        </form>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
