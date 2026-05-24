"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function SiteNav({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!transparent);

  useEffect(() => {
    if (!transparent) return;
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [transparent]);

  const links = [
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Referenzen", href: "/#referenzen" },
    { label: "Über uns", href: "/#ueber-uns" },
    { label: "Kontakt", href: "/#kontakt" },
  ];

  const bg = scrolled ? "rgba(13,36,97,0.97)" : "transparent";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: bg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="ZidOst Logo" className="h-10 w-auto"
            style={{ filter: "brightness(0) invert(1)" }} />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+49" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <Phone size={14} /> Kostenlos anfragen
          </a>
          <a href="/#kontakt"
            className="bg-white text-[#1B3585] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#EFF1F7] transition-colors">
            Angebot anfragen
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0D2461] border-t border-white/10 px-6 py-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3.5 text-white/80 border-b border-white/08 text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="/#kontakt" onClick={() => setOpen(false)}
            className="block mt-4 bg-white text-[#1B3585] text-sm font-bold py-3.5 rounded-xl text-center">
            Angebot anfragen
          </a>
        </div>
      )}
    </nav>
  );
}
