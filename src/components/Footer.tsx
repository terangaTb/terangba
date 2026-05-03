import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] font-display text-lg font-bold text-primary-foreground">
              T
            </span>
            <span className="font-display font-bold">Teranga Bridge Africa</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Votre partenaire de confiance pour l'approvisionnement industriel en Afrique.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
            <li><Link to="/a-propos" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/engagements" className="hover:text-primary">Engagements</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/aide/github" className="hover:text-primary">Aide GitHub</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>4P - 6, Imm. Elh Omar DIA, Boulevard de l'Est x Rue 9, Point E, Dakar (SN)</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /><span>+221 78 307 36 36</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /><span>contact@terangabridgeafrica.com</span></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Horaires</h4>
          <p className="text-sm text-muted-foreground">Lun – Ven : 8h – 18h<br />Sam : 9h – 13h</p>
          <a
            href="https://wa.me/221783073636"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-gold)] px-4 py-2 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)]"
          >
            WhatsApp Business
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Teranga Bridge Africa. Tous droits réservés.
      </div>
    </footer>
  );
}
