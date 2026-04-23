import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2, LogOut, Mail, RefreshCw, Inbox, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Demandes de contact" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type ContactStatus = "new" | "in_progress" | "done";
interface ContactRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | ContactStatus>("all");

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/admin/login" });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user && isAdmin) void load();
  }, [user, isAdmin]);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Impossible de charger les demandes");
      return;
    }
    setRequests((data ?? []) as ContactRequest[]);
  }

  async function updateStatus(id: string, status: ContactStatus) {
    const { error } = await supabase.from("contact_requests").update({ status }).eq("id", id);
    if (error) return toast.error("Erreur de mise à jour");
    toast.success("Statut mis à jour");
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-elegant)]">
          <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="mt-4 font-display text-xl font-bold">Accès refusé</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre compte n'a pas le rôle administrateur. Contactez un administrateur pour obtenir l'accès.
          </p>
          <button
            onClick={() => signOut().then(() => navigate({ to: "/admin/login" }))}
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    done: requests.filter((r) => r.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster />
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] font-display text-lg font-bold text-primary-foreground">
                T
              </span>
              <span className="hidden font-display font-bold sm:inline">Admin · Teranga Bridge</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <RefreshCw className="h-4 w-4" /> Actualiser
            </button>
            <button
              onClick={() => signOut().then(() => navigate({ to: "/admin/login" }))}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div>
          <h1 className="font-display text-3xl font-bold">Demandes de contact</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connecté en tant que {user?.email}</p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { l: "Total", v: stats.total, k: "all" as const, icon: Inbox, color: "text-foreground" },
            { l: "Nouvelles", v: stats.new, k: "new" as const, icon: Mail, color: "text-primary" },
            { l: "En cours", v: stats.in_progress, k: "in_progress" as const, icon: Clock, color: "text-gold" },
            { l: "Traitées", v: stats.done, k: "done" as const, icon: CheckCircle2, color: "text-primary" },
          ].map((s) => (
            <button
              key={s.k}
              onClick={() => setFilter(s.k)}
              className={`flex items-center justify-between rounded-xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 ${
                filter === s.k ? "border-primary shadow-[var(--shadow-elegant)]" : "border-border"
              }`}
            >
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
              </div>
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Aucune demande {filter !== "all" ? `« ${filter} »` : ""} pour le moment.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((r) => (
                <li key={r.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.name}</h3>
                        <StatusBadge status={r.status} />
                      </div>
                      <a
                        href={`mailto:${r.email}`}
                        className="mt-0.5 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" /> {r.email}
                      </a>
                      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{r.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("fr-FR")}
                      </span>
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as ContactStatus)}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        <option value="new">Nouvelle</option>
                        <option value="in_progress">En cours</option>
                        <option value="done">Traitée</option>
                      </select>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: ContactStatus }) {
  const map = {
    new: { l: "Nouvelle", c: "bg-primary/10 text-primary border-primary/20" },
    in_progress: { l: "En cours", c: "bg-gold/15 text-gold-foreground border-gold/30" },
    done: { l: "Traitée", c: "bg-muted text-muted-foreground border-border" },
  } as const;
  const s = map[status];
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.c}`}>
      {s.l}
    </span>
  );
}
