import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github, LogOut, Trash2, ShieldOff, RefreshCw, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/aide/github")({
  component: GithubHelpPage,
  head: () => ({
    meta: [
      { title: "Aide — Reconnecter GitHub | Teranga Bridge Africa" },
      { name: "description", content: "Étapes pour déconnecter et reconnecter un autre compte GitHub à votre projet." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type LinkBtn = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const links: LinkBtn[] = [
  {
    href: "https://github.com/settings/installations",
    label: "Désinstaller l'app GitHub (Installations)",
    description: "Sur la page, descends en bas et clique « Uninstall » pour l'app Lovable.",
    icon: Trash2,
  },
  {
    href: "https://github.com/settings/applications",
    label: "Révoquer l'accès OAuth",
    description: "Trouve « Lovable » dans la liste et clique « Revoke ».",
    icon: ShieldOff,
  },
  {
    href: "https://github.com/logout",
    label: "Se déconnecter de GitHub",
    description: "Étape essentielle pour ne pas réutiliser la session actuelle.",
    icon: LogOut,
  },
  {
    href: "https://github.com/login",
    label: "Se reconnecter avec le nouveau compte",
    description: "Connecte-toi avec l'adresse e-mail souhaitée.",
    icon: Github,
  },
];

const steps = [
  "Dans Lovable : ouvre Connectors → GitHub → Disconnect.",
  "Clique « Désinstaller l'app GitHub » ci-dessous puis Uninstall.",
  "Clique « Révoquer l'accès OAuth » et confirme.",
  "Clique « Se déconnecter de GitHub ».",
  "Clique « Se reconnecter » avec ton nouveau compte e-mail.",
  "Retourne dans Lovable : Connectors → GitHub → Connect project.",
];

function GithubHelpPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Github className="h-3.5 w-3.5" /> Aide GitHub
        </div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">Changer de compte GitHub</h1>
        <p className="mt-3 text-muted-foreground">
          Suis ces étapes dans l'ordre pour forcer GitHub à oublier la session actuelle et te
          reconnecter avec un autre e-mail.
        </p>
      </header>

      <section className="mb-10 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
          <RefreshCw className="h-5 w-5 text-primary" /> Étapes de reconnexion
        </h2>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {links.map(({ href, label, description, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary hover:bg-accent"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-primary" />
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <div className="font-semibold text-foreground">{label}</div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </a>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm text-foreground">
            <strong>Astuce :</strong> si GitHub te reconnecte automatiquement avec l'ancien compte,
            ouvre les liens dans une fenêtre <em>navigation privée</em>.
          </p>
        </div>
      </section>
    </main>
  );
}
