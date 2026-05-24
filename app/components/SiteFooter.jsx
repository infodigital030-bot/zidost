import { Phone, Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  const leistungen = [
    { label: "Renovierung", href: "/leistungen/renovierung" },
    { label: "Sanierung", href: "/leistungen/sanierung" },
    { label: "Modernisierung", href: "/leistungen/modernisierung" },
    { label: "Innenausbau", href: "/#leistungen" },
    { label: "Komplettsanierung", href: "/#leistungen" },
  ];

  return (
    <footer style={{ background: "#0D2461", padding: "48px 0 24px" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          <div>
            <img src="/logo.png" alt="ZidOst" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/50 text-sm leading-relaxed">
              Renovierung, Sanierung &amp; Modernisierung<br />
              in Berlin und Brandenburg.
            </p>
          </div>
          <div>
            <h5 className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-4">Leistungen</h5>
            {leistungen.map(l => (
              <a key={l.label} href={l.href}
                className="block text-white/60 text-sm mb-2 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <div>
            <h5 className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-4">Kontakt</h5>
            <div className="space-y-3">
              <p className="text-white/60 text-sm flex items-center gap-2"><Phone size={13} /> +49 30 –</p>
              <p className="text-white/60 text-sm flex items-center gap-2"><Mail size={13} /> info@zidost-bau.de</p>
              <p className="text-white/60 text-sm flex items-center gap-2"><MapPin size={13} /> Berlin &amp; Brandenburg</p>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© 2026 ZidOst – Bau und Immobilien UG (haftungsbeschränkt)</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Impressum</a>
            <a href="#" className="hover:text-white/60 transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
