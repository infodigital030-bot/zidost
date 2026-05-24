"use client";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown, Phone, Mail,
  Wrench, PaintBucket, Layers, ShowerHead, Zap, ArrowLeft,
  Clock, Shield, Users, Star
} from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

const LEISTUNGSUMFANG = [
  {
    icon: PaintBucket,
    title: "Malerarbeiten & Wandgestaltung",
    items: [
      "Untergrundvorbereitung & Spachteln",
      "Innenanstrich mit Premiumfarben",
      "Tapetenentfernung & Neuvertapelung",
      "Strukturputze & dekorative Oberflächen",
      "Farbkonzept-Beratung auf Wunsch",
    ],
  },
  {
    icon: Layers,
    title: "Böden & Estrich",
    items: [
      "Parkett schleifen, ölen, lackieren",
      "Laminat, Vinyl & Designboden verlegen",
      "Fliesen in Küche, Bad & Flur",
      "Ausgleichsestrich & Bodenaufbau",
      "Sockelleisten & Übergänge",
    ],
  },
  {
    icon: ShowerHead,
    title: "Bad & Sanitär",
    items: [
      "Komplette Badsanierung im Zuge der Renovierung",
      "Fliesen erneuern & Fugen sanieren",
      "Sanitärinstallation (Kooperation mit Fachbetrieb)",
      "Barrierefreie Dusche statt Wanne",
      "Lüftungsanlage & Feuchtigkeitsschutz",
    ],
  },
  {
    icon: Zap,
    title: "Elektro & Kleininstallationen",
    items: [
      "Steckdosen & Lichtschalter erneuern",
      "Unterputz-Leerrohre für neue Leitungswege",
      "LED-Beleuchtungsplanung & Montage",
      "Türzargen, Türblätter & Beschläge",
      "Innentüren & Schallschutz",
    ],
  },
];

const PROZESS = [
  {
    nr: "01",
    title: "Kostenloses Erstgespräch",
    text: "Wir kommen zu Ihnen – entweder vor Ort oder per Video. Gemeinsam besprechen wir Umfang, Wünsche und Zeitplan. Keine Verkaufsgespräche, nur ehrliche Einschätzungen.",
  },
  {
    nr: "02",
    title: "Aufmaß & Bestandsanalyse",
    text: "Unser Projektleiter nimmt exaktes Aufmaß und prüft Untergrund, Leitungsführung und mögliche Altlasten (Schimmel, Asbest, alte Elektrik). So gibt es später keine bösen Überraschungen.",
  },
  {
    nr: "03",
    title: "Detailliertes Festpreisangebot",
    text: "Innerhalb von 72 Stunden erhalten Sie ein transparentes Festpreisangebot – aufgeschlüsselt nach Gewerk. Kein Stundenlohn-Wildwuchs. Kein verstecktes Nachtragsrisiko.",
  },
  {
    nr: "04",
    title: "Professionelle Ausführung",
    text: "Unser eingespieltes Team arbeitet sauber, strukturiert und zuverlässig. Tägliche Status-Updates auf Wunsch, fester Bauleiter vor Ort, lückenlose Dokumentation aller Arbeiten.",
  },
  {
    nr: "05",
    title: "Gemeinsame Abnahme",
    text: "Kein Schlüsselübergabe ohne Ihre Freigabe. Wir gehen jeden Punkt der Leistungsliste gemeinsam durch – und beheben eventuelle Mängel sofort.",
  },
];

const FAQS = [
  {
    q: "Was kostet eine Renovierung in Berlin?",
    a: "Die Kosten einer Renovierung hängen stark vom Umfang ab. Eine Einzelzimmer-Renovierung (Malern, Böden, Elektrokleinarbeiten) liegt je nach Größe zwischen 1.200 und 3.500 €. Eine 3-Zimmer-Wohnung mit Bad kostet vollständig renoviert typischerweise zwischen 8.000 und 18.000 €. Bei älteren Berliner Altbauten können Untergrundarbeiten den Preis erhöhen. Wir erstellen Ihnen ein kostenfreies Festpreisangebot.",
  },
  {
    q: "Wie lange dauert eine komplette Wohnungsrenovierung?",
    a: "Eine 3-Zimmer-Wohnung renovieren wir in der Regel in 10–15 Werktagen. Bei leerstehenden Objekten können wir parallel in mehreren Räumen arbeiten und den Zeitplan deutlich verkürzen. Größere Häuser oder Renovierungen bei bewohnten Objekten planen wir individuell, damit der Alltag so wenig wie möglich gestört wird.",
  },
  {
    q: "Macht ZidOst auch Renovierungen bei bewohnten Wohnungen?",
    a: "Ja. Wir haben Erfahrung mit Renovierungen im bewohnten Zustand – Zimmer für Zimmer, mit Staubschutz und täglicher Reinigung der Arbeitsbereiche. Wir besprechen vorab einen Zeitplan, der zu Ihrem Alltag passt.",
  },
  {
    q: "Was ist der Unterschied zwischen Renovierung und Sanierung?",
    a: "Eine Renovierung umfasst klassisch Schönheitsreparaturen und Auffrischungsarbeiten: Malern, Böden, Tapeten, Kleinreparaturen. Eine Sanierung geht tiefer – sie beseitigt Schäden an der Bausubstanz (Schimmel, Risse, Feuchtigkeitsschäden, marode Leitungen). Häufig kombinieren wir beides, wenn beim Aufmaß Substanzschäden sichtbar werden.",
  },
  {
    q: "Bietet ZidOst Renovierungen für Vermieter & Hausverwaltungen an?",
    a: "Ja, das ist ein wichtiges Segment unserer Arbeit. Bei Mieterwechsel-Renovierungen sind wir auf schnelle Übergaben eingestellt – oft innerhalb von 5–7 Werktagen bei Standardwohnungen. Wir haben Rahmenverträge mit mehreren Berliner Wohnungsverwaltungen und kennen die Anforderungen an Mietspiegel-konforme Qualität.",
  },
  {
    q: "Bekomme ich einen festen Ansprechpartner?",
    a: "Immer. Jedes Projekt wird von einem festen Projektleiter begleitet – vom Erstgespräch bis zur Abnahme. Keine Weiterleitungen, keine Missverständnisse. Sie haben eine direkte Handynummer.",
  },
  {
    q: "Wie kurzfristig kann ZidOst starten?",
    a: "Bei kleineren Projekten (Einzelzimmer, 1–2 Zimmer-Wohnungen) können wir häufig innerhalb von 2 Wochen starten. Bei größeren Renovierungen empfehlen wir eine Vorlaufzeit von 3–4 Wochen für Planung und Materialbestellung. Anfragen gerne auch für dringende Fälle.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? "#1B3585" : "#E5E8F0" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
        style={{ background: open ? "rgba(27,53,133,0.03)" : "#fff" }}
      >
        <span className="font-semibold text-[#0D2461] text-sm sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-200"
          style={{ color: "#1B3585", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed" style={{ borderTop: "1px solid #EFF1F7" }}>
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function RenovierungPage() {
  return (
    <>
      <SiteNav transparent />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-end pb-0"
        style={{ background: "linear-gradient(135deg, #0D2461 0%, #1B3585 60%, #2A4BA0 100%)" }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16 pt-40 pb-20 w-full">
          <a href="/" className="inline-flex items-center gap-2 text-white/50 text-sm mb-8 hover:text-white/80 transition-colors">
            <ArrowLeft size={14} /> Zurück zur Startseite
          </a>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            <Wrench size={12} /> Leistung
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Renovierung<br />
            <span style={{ color: "#C8A45A" }}>in Berlin.</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
            Ob Mieterwechsel, Eigennutzung oder Wertsteigerung vor dem Verkauf – wir renovieren
            Einzelzimmer, komplette Wohnungen und ganze Häuser. Festpreisgarantie, termingerecht,
            mit Berliner Altbau-Erfahrung seit über 15 Jahren.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
            {[
              { n: "15+", l: "Jahre Berliner Erfahrung" },
              { n: "500+", l: "Renovierungen abgeschlossen" },
              { n: "48h", l: "Angebot nach Aufmaß" },
              { n: "5 J.", l: "Gewährleistung" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to top, #F7F8FC, transparent)" }} />
      </section>

      {/* ── Leistungsumfang ───────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#F7F8FC" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B3585" }}>Was inbegriffen ist</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Unser Leistungsumfang
          </h2>
          <p className="text-gray-500 max-w-2xl mb-14 leading-relaxed">
            Eine Renovierung durch ZidOst ist keine Tapeten-und-Farbe-Aktion. Wir koordinieren
            alle Gewerke aus einer Hand – von der Vorbereitung bis zur schlüsselfertigen Übergabe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEISTUNGSUMFANG.map((block) => (
              <div key={block.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(27,53,133,0.08)" }}>
                    <block.icon size={20} style={{ color: "#1B3585" }} />
                  </div>
                  <h3 className="font-bold text-[#0D2461] text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}>{block.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {block.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "#1B3585" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Für wen? ──────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A45A" }}>Typische Auftraggeber</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Für wen ist eine<br />
                <span style={{ color: "#1B3585" }}>Renovierung sinnvoll?</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Renovierungen haben unterschiedliche Auslöser – und jeder braucht eine andere
                Herangehensweise. Wir kennen alle Szenarien und haben den richtigen Prozess dafür.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: "Vermieter & Hausverwaltungen",
                    text: "Schnelle Mieterwechsel-Renovierung innerhalb von 5–10 Werktagen. Wir kennen die Anforderungen an Berliner Mietwohnungen und arbeiten mit festen Rahmenpreisen für Verwaltungen.",
                  },
                  {
                    icon: Star,
                    title: "Eigentümer vor dem Einzug",
                    text: "Sie haben gekauft und wollen vor dem Einzug modernisieren? Wir koordinieren alle Gewerke in Ihrer Abwesenheit und übergeben schlüsselfertig – inklusive professioneller Endreinigung.",
                  },
                  {
                    icon: Shield,
                    title: "Vor dem Immobilienverkauf",
                    text: "Aufgewertete Immobilien erzielen in Berlin bis zu 15 % höhere Verkaufspreise. Wir renovieren gezielt die Bereiche, die Käufer überzeugen – Bad, Böden, frische Wände.",
                  },
                  {
                    icon: Clock,
                    title: "Bestandswohnungen & Altbauten",
                    text: "Berliner Gründerzeithäuser und 60er-Jahre-Bauten haben besondere Anforderungen: Stuckarbeiten, Holzböden, alte Elektrik. Unsere Handwerker kennen die typischen Herausforderungen.",
                  },
                ].map(p => (
                  <div key={p.title} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#DDE1EF] transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(27,53,133,0.06)" }}>
                      <p.icon size={18} style={{ color: "#1B3585" }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D2461] text-sm mb-1">{p.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Preisbeispiele */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#1B3585" }}>Orientierungspreise Berlin 2025</p>
              {[
                {
                  label: "Einzelzimmer-Renovierung",
                  desc: "Malern, Böden aufarbeiten, Türrahmen & Sockelleisten",
                  range: "1.200 – 2.800 €",
                  time: "2–4 Tage",
                },
                {
                  label: "2-Zimmer-Wohnung",
                  desc: "Alle Räume, ohne Bad",
                  range: "4.500 – 9.000 €",
                  time: "6–9 Tage",
                },
                {
                  label: "3-Zimmer-Wohnung komplett",
                  desc: "Inkl. Bad, neue Böden, Malerarbeiten",
                  range: "9.000 – 18.000 €",
                  time: "10–15 Tage",
                },
                {
                  label: "Einfamilienhaus",
                  desc: "Vollrenovierung inkl. Keller & Dachgeschoss",
                  range: "25.000 – 60.000 €",
                  time: "4–8 Wochen",
                },
              ].map(p => (
                <div key={p.label}
                  className="p-5 rounded-2xl border"
                  style={{ borderColor: "#EFF1F7", background: "rgba(27,53,133,0.02)" }}>
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h4 className="font-bold text-[#0D2461] text-sm">{p.label}</h4>
                    <span className="text-xs font-bold shrink-0 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(200,164,90,0.12)", color: "#9A7A35" }}>
                      {p.time}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{p.desc}</p>
                  <p className="text-[#1B3585] font-bold text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}>{p.range}</p>
                </div>
              ))}
              <p className="text-xs text-gray-400 pt-2">
                * Orientierungspreise für den Berliner Markt 2025. Finale Preise nach Aufmaß und Bestandsanalyse als verbindlicher Festpreis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prozess ───────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#0D2461" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A45A" }}>So läuft es ab</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Unser Renovierungs-<br />
            <span style={{ color: "#C8A45A" }}>Prozess.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROZESS.map((step, i) => (
              <div key={step.nr}
                className={`p-7 rounded-2xl border border-white/10 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-5xl font-bold mb-4" style={{ color: "#C8A45A", fontFamily: "'Playfair Display', serif", opacity: 0.6 }}>
                  {step.nr}
                </div>
                <h3 className="font-bold text-white text-lg mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#F7F8FC" }}>
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#1B3585" }}>
            Häufige Fragen
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-12 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Alles zur Renovierung<br />
            <span style={{ color: "#1B3585" }}>in Berlin.</span>
          </h2>

          <div className="space-y-3">
            {FAQS.map(faq => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="rounded-3xl p-10 sm:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #0D2461 0%, #1B3585 100%)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C8A45A" }}>
              Jetzt anfragen
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Bereit für Ihre<br />
              <span style={{ color: "#C8A45A" }}>Renovierung?</span>
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Kostenloses Aufmaß in Berlin & Brandenburg. Festpreisangebot innerhalb von 48 Stunden.
              Kein Stundensatz, kein Nachtragsrisiko.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#kontakt"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full transition-colors"
                style={{ background: "#fff", color: "#1B3585" }}
                onMouseEnter={e => e.currentTarget.style.background = "#EFF1F7"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                Kostenloses Angebot anfragen <ArrowRight size={16} />
              </a>
              <a href="tel:+49"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
                <Phone size={16} /> Direkt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
