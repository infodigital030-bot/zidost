"use client";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, ChevronRight, Phone, Mail, MapPin,
  Hammer, Home, Wrench, Layers, PaintBucket, ShieldCheck,
  Star, CheckCircle2, ArrowUpRight, Building2, Users, Award, Clock
} from "lucide-react";

/* ─── Navigation ──────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Referenzen", href: "#referenzen" },
    { label: "Über uns", href: "#ueber-uns" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(13,36,97,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        padding: scrolled ? "0" : "0",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="ZidOst Logo" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
        </a>

        {/* Desktop */}
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
          <a href="#kontakt"
            className="bg-white text-[#1B3585] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#EFF1F7] transition-colors">
            Angebot anfragen
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0D2461] border-t border-white/10 px-6 py-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3.5 text-white/80 border-b border-white/08 text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#kontakt" onClick={() => setOpen(false)}
            className="block mt-4 bg-white text-[#1B3585] text-sm font-bold py-3.5 rounded-xl text-center">
            Angebot anfragen
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Slider images ──────────────────────────────────────────────────── */
const HERO_SLIDES = [
  { src: "/hero-1.jpg", alt: "Renoviertes Wohnzimmer mit Holzboden – ZidOst Berlin" },
  { src: "/hero-2.jpg", alt: "Modernes Wohnzimmer nach Renovierung – ZidOst Berlin" },
  { src: "/hero-3.jpg", alt: "Helle Altbau-Wohnung nach Sanierung – ZidOst Berlin" },
  { src: "/hero-4.jpg", alt: "Modernisierte Wohnung mit Marmorböden – ZidOst Berlin" },
];

/* ─── Hero ────────────────────────────────────────────────────────────────── */
const CORE = [
  {
    icon: Wrench,
    title: "Renovierung",
    desc: "Komplette Wohnungs- und Hausrenovierungen – termingerecht und im Budget.",
    href: "/leistungen/renovierung",
  },
  {
    icon: Building2,
    title: "Sanierung",
    desc: "Altbausanierung, Fassade, Keller, Dach – substanzerhaltend und wertsteigend.",
    href: "#leistungen",
  },
  {
    icon: Home,
    title: "Modernisierung",
    desc: "Energetische und gestalterische Modernisierung nach aktuellen Standards.",
    href: "/leistungen/modernisierung",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setFading(true);
      setCurrent(c => (c + 1) % HERO_SLIDES.length);
      setTimeout(() => { setPrev(null); setFading(false); }, 1200);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background slider */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Previous slide fading out */}
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={HERO_SLIDES[prev].src}
            alt={HERO_SLIDES[prev].alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: fading ? 0 : 1, transition: "opacity 1.2s ease-in-out", zIndex: 1 }}
          />
        )}
        {/* Current slide */}
        <img
          key={`cur-${current}`}
          src={HERO_SLIDES[current].src}
          alt={HERO_SLIDES[current].alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1, zIndex: 2 }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(13,36,97,0.88) 0%, rgba(13,36,97,0.70) 50%, rgba(13,36,97,0.30) 100%)" }} />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 z-10 opacity-5"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setFading(true); setCurrent(i); setTimeout(() => { setPrev(null); setFading(false); }, 1200); }}
            className="transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#C8A45A" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center pt-32 pb-12 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm tracking-widest uppercase">
              <MapPin size={12} /> Berlin & Brandenburg
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Ihr Bauunternehmen<br />
              <span style={{ color: "#C8A45A" }}>für Berlin.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              Renovierung, Sanierung und Modernisierung von Wohnungen, Häusern
              und Altbauten – professionell, termingerecht und mit Berliner Qualität.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#kontakt"
                className="inline-flex items-center gap-2 bg-white text-[#1B3585] font-semibold px-7 py-4 rounded-full hover:bg-[#EFF1F7] transition-all duration-200 text-sm shadow-xl">
                Kostenloses Angebot <ArrowRight size={16} />
              </a>
              <a href="#referenzen"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-200 text-sm backdrop-blur-sm">
                Referenzen ansehen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Core service cards — overlapping bottom */}
      <div className="relative z-20 px-8 lg:px-16 pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CORE.map((item, i) => (
              <a key={i} href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                style={{ marginBottom: "-48px" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(27,53,133,0.08)" }}>
                    <item.icon size={22} style={{ color: "#1B3585" }} />
                  </div>
                  <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#1B3585] transition-colors" />
                </div>
                <h3 className="font-bold text-[#0D2461] text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="h-16 relative z-0" style={{ background: "#F7F8FC" }} />
    </section>
  );
}

/* ─── Stats ───────────────────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { n: "15+", label: "Jahre Erfahrung" },
    { n: "500+", label: "Projekte in Berlin" },
    { n: "98%", label: "Kundenzufriedenheit" },
    { n: "48h", label: "Antwortzeit" },
  ];
  return (
    <section style={{ background: "#F7F8FC", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "#1B3585", fontFamily: "'Playfair Display', serif" }}>
                {item.n}
              </div>
              <div className="text-sm text-gray-500 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Leistungen ──────────────────────────────────────────────────────────── */
const LEISTUNGEN = [
  { icon: Wrench, title: "Renovierung", desc: "Vollständige Wohnungs- und Hausrenovierungen – vom Einzelzimmer bis zur Komplettrenovierung über mehrere Etagen.", tag: "Kernangebot" },
  { icon: Building2, title: "Sanierung", desc: "Altbausanierung, energetische Sanierung, Fassadensanierung, Keller- und Dachsanierung nach aktuellen Normen.", tag: "Kernangebot" },
  { icon: Home, title: "Modernisierung", desc: "Gestalterische und energetische Modernisierung: neue Grundrisse, Barrierefreiheit, moderne Haustechnik.", tag: "Kernangebot" },
  { icon: Layers, title: "Innenausbau", desc: "Trockenbau, Decken, Böden, Türen und Fenster – der komplette Innenausbau aus einer Hand.", tag: "" },
  { icon: PaintBucket, title: "Maler- & Putzarbeiten", desc: "Innen- und Außenanstriche, Verputzarbeiten, Tapezieren – sauber und präzise ausgeführt.", tag: "" },
  { icon: Hammer, title: "Komplettsanierung", desc: "Von der Entkernung bis zur schlüsselfertigen Übergabe – wir koordinieren alle Gewerke für Sie.", tag: "" },
];

function Leistungen() {
  return (
    <section id="leistungen" style={{ padding: "100px 0", background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B3585" }}>
              Was wir tun
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Unsere Leistungen
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-sm leading-relaxed lg:text-right">
            Drei Kernleistungen. Ein Ansprechpartner. Alles aus einer Hand –
            von der ersten Planung bis zur fertigen Übergabe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEISTUNGEN.map((l, i) => (
            <div key={i}
              className="group relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default"
              style={{ borderColor: "#EFF1F7", background: i < 3 ? "rgba(27,53,133,0.03)" : "#fff" }}>
              {l.tag && (
                <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(27,53,133,0.08)", color: "#1B3585" }}>
                  {l.tag}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(27,53,133,0.08)" }}>
                <l.icon size={22} style={{ color: "#1B3585" }} />
              </div>
              <h3 className="font-bold text-[#0D2461] text-xl mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {l.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{l.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#1B3585" }}>
                Mehr erfahren <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Warum ZidOst ────────────────────────────────────────────────────────── */
function WhyUs() {
  const points = [
    { icon: ShieldCheck, title: "Geprüfte Qualität", desc: "Alle Arbeiten nach DIN-Norm, eingewiesenes Fachpersonal und lückenlose Dokumentation." },
    { icon: Clock, title: "Termintreue", desc: "Verbindliche Zeitpläne und transparente Kommunikation – keine Überraschungen." },
    { icon: Users, title: "Fester Ansprechpartner", desc: "Ein Projektleiter für Ihr gesamtes Bauvorhaben, von Anfang bis Schluss." },
    { icon: Award, title: "Berliner Expertise", desc: "15+ Jahre Erfahrung mit Berliner Altbauten, Mietrecht und lokalen Behörden." },
  ];

  return (
    <section style={{ padding: "100px 0", background: "#0D2461" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C8A45A" }}>
              Warum ZidOst
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Bau­qualität, die Sie<br />
              <span style={{ color: "#C8A45A" }}>sehen und spüren.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Als Berliner Bauunternehmen kennen wir die Stadt, ihre Altbauten und
              die Ansprüche unserer Kunden. Wir bauen nicht für Zahlen –
              wir bauen für Menschen.
            </p>
            <a href="#kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#1B3585] font-semibold px-6 py-3.5 rounded-full hover:bg-[#EFF1F7] transition-colors text-sm">
              Kostenlos beraten lassen <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {points.map((p, i) => (
              <div key={i} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,164,90,0.15)" }}>
                  <p.icon size={20} style={{ color: "#C8A45A" }} />
                </div>
                <h4 className="font-bold text-white mb-2 text-base">{p.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Referenzen ──────────────────────────────────────────────────────────── */
const REFS = [
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    title: "Altbausanierung Prenzlauer Berg",
    meta: "6-Zimmer-Wohnung · 142 m²",
    tags: ["Sanierung", "Denkmalschutz"],
  },
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "Komplettrenovierung Charlottenburg",
    meta: "Einfamilienhaus · 3 Etagen",
    tags: ["Renovierung", "Innenausbau"],
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Modernisierung Mitte",
    meta: "MFH 8 Einheiten · Brandenburg",
    tags: ["Modernisierung", "Energie"],
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    title: "Energetische Sanierung Pankow",
    meta: "Gründerzeit-Altbau · 1908",
    tags: ["Sanierung", "Fassade"],
  },
];

function Referenzen() {
  return (
    <section id="referenzen" style={{ padding: "100px 0", background: "#F7F8FC" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B3585" }}>
            Unsere Arbeiten
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Referenzprojekte
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REFS.map((r, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(27,53,133,0.7)", color: "#fff" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-white font-bold text-sm leading-snug mb-1">{r.title}</h4>
                <p className="text-white/60 text-xs">{r.meta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#kontakt"
            className="inline-flex items-center gap-2 border-2 text-[#1B3585] font-semibold px-7 py-3.5 rounded-full hover:bg-[#1B3585] hover:text-white transition-all duration-200 text-sm"
            style={{ borderColor: "#1B3585" }}>
            Alle Referenzen anfragen <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Über uns ────────────────────────────────────────────────────────────── */
function UeberUns() {
  return (
    <section id="ueber-uns" style={{ padding: "100px 0", background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="ZidOst Team"
                className="w-full h-96 lg:h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(27,53,133,0.08)" }}>
                  <Star size={18} style={{ color: "#C8A45A" }} fill="#C8A45A" />
                </div>
                <div>
                  <div className="font-bold text-[#0D2461] text-sm">5,0 / 5,0</div>
                  <div className="text-xs text-gray-400">Google-Bewertung</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1B3585" }}>
              Über uns
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              ZidOst – Bau &<br />
              <span style={{ color: "#1B3585" }}>Immobilien Berlin.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Die <strong>ZidOst – Bau und Immobilien UG</strong> ist ein Berliner Bauunternehmen
              mit Spezialisierung auf Renovierung, Sanierung und Modernisierung von
              Wohn- und Gewerbeobjekten in Berlin und Brandenburg.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Wir stehen für handwerkliche Präzision, transparente Kommunikation und
              zuverlässige Umsetzung – ob kleines Bad, komplette Wohnung oder
              mehrgeschossiger Altbau.
            </p>
            {[
              "Eingetragenes Unternehmen, Berlin",
              "Alle Gewerke aus einer Hand",
              "Berliner Altbau-Expertise seit über 15 Jahren",
              "Feste Ansprechpartner, klare Verträge",
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={18} style={{ color: "#1B3585", flexShrink: 0 }} />
                <span className="text-gray-700 text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Kontakt ─────────────────────────────────────────────────────────────── */
function Kontakt() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" style={{ padding: "100px 0", background: "#F7F8FC" }}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1B3585" }}>
              Kontakt
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Kostenlos<br />beraten lassen.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              Schildern Sie uns kurz Ihr Vorhaben – wir melden uns innerhalb von 48 Stunden
              mit einer ersten Einschätzung und einem unverbindlichen Angebot.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Telefon", val: "+49 30 – " },
                { icon: Mail, label: "E-Mail", val: "info@zidost-bau.de" },
                { icon: MapPin, label: "Standort", val: "Berlin & Brandenburg" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(27,53,133,0.08)" }}>
                    <Icon size={18} style={{ color: "#1B3585" }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-[#0D2461]">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(27,53,133,0.08)" }}>
                  <CheckCircle2 size={32} style={{ color: "#1B3585" }} />
                </div>
                <h3 className="text-2xl font-bold text-[#0D2461] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Vielen Dank!
                </h3>
                <p className="text-gray-500 text-sm">Wir melden uns innerhalb von 48 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h3 className="text-xl font-bold text-[#0D2461] mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Angebot anfragen
                </h3>
                {[
                  { name: "name", label: "Ihr Name", type: "text", placeholder: "Max Mustermann" },
                  { name: "phone", label: "Telefonnummer", type: "tel", placeholder: "+49 ..." },
                  { name: "email", label: "E-Mail", type: "email", placeholder: "max@email.de" },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required={f.name !== "email"}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={e => setForm(d => ({ ...d, [f.name]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:ring-2 transition"
                      style={{ "--tw-ring-color": "rgba(27,53,133,0.3)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Ihr Vorhaben
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Beschreiben Sie kurz Ihr Bauvorhaben ..."
                    value={form.msg}
                    onChange={e => setForm(d => ({ ...d, msg: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:ring-2 transition resize-none"
                    style={{ "--tw-ring-color": "rgba(27,53,133,0.3)" }}
                  />
                </div>
                <button type="submit"
                  className="w-full text-white font-bold py-4 rounded-xl transition-colors text-sm mt-2"
                  style={{ background: "#1B3585" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#0D2461"}
                  onMouseLeave={e => e.currentTarget.style.background = "#1B3585"}>
                  Jetzt kostenlos anfragen →
                </button>
                <p className="text-xs text-gray-400 text-center">Unverbindlich · Kostenlos · Antwort in 48h</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
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
            {["Renovierung", "Sanierung", "Modernisierung", "Innenausbau", "Komplettsanierung"].map(l => (
              <a key={l} href="#leistungen" className="block text-white/60 text-sm mb-2 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div>
            <h5 className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-4">Kontakt</h5>
            <div className="space-y-3">
              <p className="text-white/60 text-sm flex items-center gap-2"><Phone size={13} /> +49 30 – </p>
              <p className="text-white/60 text-sm flex items-center gap-2"><Mail size={13} /> info@zidost-bau.de</p>
              <p className="text-white/60 text-sm flex items-center gap-2"><MapPin size={13} /> Berlin & Brandenburg</p>
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

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Leistungen />
        <WhyUs />
        <Referenzen />
        <UeberUns />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
