import { useInView } from "@/hooks/use-in-view";

export function OurStory() {
  const label = useInView<HTMLSpanElement>(0.3);
  const title = useInView<HTMLHeadingElement>(0.3);
  const content = useInView<HTMLDivElement>(0.15);
  const accent = useInView<HTMLDivElement>(0.3);

  return (
    <section className="relative overflow-hidden bg-[#F8F8F6] cv-auto">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 85% -10%, rgba(200,169,107,0.10), transparent 60%), radial-gradient(900px 500px at -10% 110%, rgba(17,17,17,0.05), transparent 60%)",
        }}
      />
      {/* Soft blurred orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#C8A96B]/10 blur-3xl"
      />

      <div className="container relative mx-auto px-6 py-28 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 lg:items-start">
          {/* Left column */}
          <div className="lg:col-span-5">
            <span
              ref={label.ref}
              className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A96B] transition-all duration-700 ease-out ${
                label.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="h-px w-8 bg-[#C8A96B]" />
              Notre histoire
            </span>
            <h2
              ref={title.ref}
              className={`mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111111] md:text-6xl transition-all duration-1000 ease-out ${
                title.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ fontFeatureSettings: '"ss01", "cv11"' }}
            >
              Une vision née de
              <br />
              l'<span className="text-[#C8A96B]">hospitalité</span>
              <br />
              sénégalaise
            </h2>

            {/* Decorative element */}
            <div
              ref={accent.ref}
              className={`mt-12 hidden lg:flex items-center gap-4 transition-all duration-1000 ease-out delay-200 ${
                accent.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="h-px w-16 bg-gradient-to-r from-[#C8A96B] to-transparent" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#4B5563]">
                Depuis Dakar · Vers toute l'Afrique
              </span>
            </div>
          </div>

          {/* Right column */}
          <div
            ref={content.ref}
            className={`lg:col-span-7 transition-all duration-1000 ease-out ${
              content.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl border border-white/60 bg-white/40 p-8 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_20px_50px_-25px_rgba(17,17,17,0.15)] backdrop-blur-xl md:p-12">
              {/* Vertical gold accent */}
              <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[#C8A96B] to-transparent" />

              <div className="max-w-[58ch] space-y-7 pl-2">
                <p className="text-lg leading-[1.8] text-[#111111] transition-colors duration-300 hover:text-black">
                  <strong className="font-semibold text-[#111111]">Teranga Bridge Africa</strong>{" "}
                  est née de la conviction que l'Afrique mérite un approvisionnement industriel à la
                  hauteur de ses ambitions. Le mot{" "}
                  <em className="not-italic font-medium text-[#C8A96B]">Teranga</em>, qui incarne
                  l'hospitalité sénégalaise, guide chacune de nos relations clients et partenaires.
                </p>

                <div className="h-px w-12 bg-[#C8A96B]/40" />

                <p className="text-[15px] leading-[1.85] text-[#4B5563] transition-colors duration-300 hover:text-[#111111]">
                  Nous accompagnons les industriels africains dans la sécurisation de leurs flux de{" "}
                  <span className="font-medium text-[#111111]">matières premières</span> et{" "}
                  <span className="font-medium text-[#111111]">d'équipements agroalimentaires</span>
                  . Grâce à un réseau international soigneusement sélectionné, nous garantissons{" "}
                  <span className="text-[#C8A96B] font-medium">
                    qualité, traçabilité et compétitivité
                  </span>{" "}
                  — du sourcing à la livraison sur site.
                </p>

                <p className="text-[15px] leading-[1.85] text-[#4B5563] transition-colors duration-300 hover:text-[#111111]">
                  Notre ancrage local, combiné à une expertise globale, fait de nous le{" "}
                  <span className="font-medium text-[#111111]">pont naturel</span> entre les
                  producteurs internationaux et les transformateurs africains.
                </p>
              </div>

              {/* Signature row */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#111111]/5 pt-6 pl-2">
                {[
                  { k: "2020", v: "Année de création" },
                  { k: "15+", v: "Pays desservis" },
                  { k: "200+", v: "Industriels servis" },
                ].map((s) => (
                  <div key={s.k} className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-[#111111]">{s.k}</span>
                    <span className="text-xs uppercase tracking-wider text-[#4B5563]">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
