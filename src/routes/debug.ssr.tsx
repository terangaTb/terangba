import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHost, getRequestHeader } from "@tanstack/react-start/server";
import { useState } from "react";

/**
 * Debug route — fetches the SSR-rendered HTML of a given path (default "/")
 * directly from the server so you can verify that __root.tsx + index.tsx
 * produce real HTML (not just a hydration shell).
 *
 * Usage: navigate to /debug/ssr  (optional ?path=/services)
 */

type SsrSnapshot = {
  url: string;
  status: number;
  contentType: string | null;
  byteLength: number;
  durationMs: number;
  rootMarkupFound: boolean;
  hasH1: boolean;
  hasHeaderTag: boolean;
  hasFooterTag: boolean;
  titleTag: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  bodyPreview: string;
  fullHtml: string;
  fetchedAt: string;
};

const fetchSsrHtml = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    const raw = (input as { path?: string } | undefined)?.path ?? "/";
    // Only allow same-origin internal paths.
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    if (path.startsWith("//")) {
      throw new Error("Invalid path");
    }
    return { path };
  })
  .handler(async ({ data }): Promise<SsrSnapshot> => {
    const host = getRequestHost();
    const proto =
      getRequestHeader("x-forwarded-proto") ??
      (host?.includes("localhost") ? "http" : "https");
    const url = `${proto}://${host}${data.path}`;

    const start = Date.now();
    const res = await fetch(url, {
      headers: {
        // Identify ourselves so we can be filtered in logs.
        "user-agent": "TBA-SSR-Debug/1.0",
        accept: "text/html",
      },
    });
    const html = await res.text();
    const durationMs = Date.now() - start;

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(
      /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
    );
    const ogMatch = html.match(
      /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i,
    );
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyInner = bodyMatch?.[1] ?? "";

    return {
      url,
      status: res.status,
      contentType: res.headers.get("content-type"),
      byteLength: html.length,
      durationMs,
      // TanStack Start mounts the app inside the body — we look for clues
      // that the React tree was actually rendered server-side.
      rootMarkupFound:
        bodyInner.includes("<div") || bodyInner.includes("<main"),
      hasH1: /<h1[\s>]/i.test(html),
      hasHeaderTag: /<header[\s>]/i.test(html),
      hasFooterTag: /<footer[\s>]/i.test(html),
      titleTag: titleMatch?.[1] ?? null,
      metaDescription: descMatch?.[1] ?? null,
      ogTitle: ogMatch?.[1] ?? null,
      bodyPreview: bodyInner.slice(0, 1500),
      fullHtml: html,
      fetchedAt: new Date().toISOString(),
    };
  });

export const Route = createFileRoute("/debug/ssr")({
  validateSearch: (search: Record<string, unknown>) => ({
    path: typeof search.path === "string" ? search.path : "/",
  }),
  loaderDeps: ({ search: { path } }) => ({ path }),
  loader: ({ deps }) => fetchSsrHtml({ data: { path: deps.path } }),
  head: () => ({
    meta: [
      { title: "SSR Debug — Teranga Bridge Africa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SsrDebug,
});

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ok
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-red-500/15 text-red-700 dark:text-red-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {label}: {ok ? "OK" : "MISSING"}
    </span>
  );
}

function SsrDebug() {
  const snap = Route.useLoaderData();
  const { path } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [tab, setTab] = useState<"summary" | "source" | "preview">("summary");
  const [pathInput, setPathInput] = useState(path);

  const ssrLooksGood =
    snap.status === 200 &&
    snap.rootMarkupFound &&
    snap.titleTag !== null &&
    snap.byteLength > 1000;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 font-mono text-sm text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="font-sans text-2xl font-bold">🔬 SSR Debug</h1>
          <p className="font-sans text-slate-600 dark:text-slate-400">
            Récupère le HTML rendu côté serveur pour vérifier que{" "}
            <code className="rounded bg-slate-200 px-1 dark:bg-slate-800">
              __root.tsx
            </code>{" "}
            produit bien du HTML pré-rendu (et pas une coquille vide hydratée).
          </p>
        </header>

        {/* Path picker */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ search: { path: pathInput || "/" } });
          }}
          className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
        >
          <label className="font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
            Chemin
          </label>
          <input
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
            placeholder="/"
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950"
          />
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Re-fetch SSR
          </button>
          {(["/", "/services", "/engagements", "/contact", "/a-propos"] as const).map(
            (p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPathInput(p);
                  void navigate({ search: { path: p } });
                }}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                {p}
              </button>
            ),
          )}
        </form>

        {/* Verdict */}
        <div
          className={`rounded-lg border p-4 ${
            ssrLooksGood
              ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
              : "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40"
          }`}
        >
          <p className="font-sans text-base font-semibold">
            {ssrLooksGood
              ? "✅ Le SSR fonctionne — le HTML est bien généré côté serveur par __root.tsx."
              : "⚠️ Le SSR semble incomplet — vérifiez les indicateurs ci-dessous."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800">
          {(["summary", "source", "preview"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-t-md px-4 py-2 font-sans text-sm font-medium ${
                tab === t
                  ? "border-b-2 border-slate-900 text-slate-900 dark:border-white dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              {t === "summary"
                ? "Résumé"
                : t === "source"
                  ? "HTML source"
                  : "Aperçu rendu"}
            </button>
          ))}
        </div>

        {tab === "summary" && (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="URL" value={snap.url} />
              <Field label="Status HTTP" value={String(snap.status)} />
              <Field label="Content-Type" value={snap.contentType ?? "—"} />
              <Field
                label="Taille HTML"
                value={`${snap.byteLength.toLocaleString()} octets`}
              />
              <Field label="Durée fetch SSR" value={`${snap.durationMs} ms`} />
              <Field label="Récupéré à" value={snap.fetchedAt} />
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-sans text-base font-semibold">
                Indicateurs SSR
              </h2>
              <div className="flex flex-wrap gap-2">
                <StatusPill ok={snap.status === 200} label="HTTP 200" />
                <StatusPill ok={snap.rootMarkupFound} label="Markup React rendu" />
                <StatusPill ok={snap.hasH1} label="<h1>" />
                <StatusPill ok={snap.hasHeaderTag} label="<header>" />
                <StatusPill ok={snap.hasFooterTag} label="<footer>" />
                <StatusPill ok={snap.titleTag !== null} label="<title>" />
                <StatusPill
                  ok={snap.metaDescription !== null}
                  label="meta description"
                />
                <StatusPill ok={snap.ogTitle !== null} label="og:title" />
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-sans text-base font-semibold">
                Métadonnées extraites
              </h2>
              <Field label="<title>" value={snap.titleTag ?? "(absent)"} />
              <Field
                label="meta description"
                value={snap.metaDescription ?? "(absent)"}
              />
              <Field label="og:title" value={snap.ogTitle ?? "(absent)"} />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-2 font-sans text-base font-semibold">
                Aperçu &lt;body&gt; (1500 premiers caractères)
              </h2>
              <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded bg-slate-100 p-3 text-xs leading-relaxed dark:bg-slate-950">
                {snap.bodyPreview || "(vide)"}
              </pre>
            </div>
          </div>
        )}

        {tab === "source" && (
          <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-800">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
                HTML SSR brut ({snap.byteLength.toLocaleString()} octets)
              </span>
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(snap.fullHtml);
                }}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 font-sans text-xs hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                Copier
              </button>
            </div>
            <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-all p-4 text-xs leading-relaxed">
              {snap.fullHtml}
            </pre>
          </div>
        )}

        {tab === "preview" && (
          <div className="space-y-2">
            <p className="font-sans text-xs text-slate-500">
              Aperçu rendu via <code>srcDoc</code> du HTML SSR pur (avant
              hydratation React). Si la mise en page apparaît, c&apos;est que le
              serveur a vraiment envoyé du HTML.
            </p>
            <iframe
              title="SSR preview"
              srcDoc={snap.fullHtml}
              sandbox="allow-same-origin"
              className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white dark:border-slate-800"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
      <div className="font-sans text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 break-all">{value}</div>
    </div>
  );
}
