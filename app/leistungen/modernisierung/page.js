"use client";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown, Phone,
  Thermometer, Cpu, DoorOpen, Sun, TrendingUp, ArrowLeft,
  AlertCircle, FileText, Euro
} from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

const BEREICHE = [
  {
    icon: Thermometer,
    color: "#1B3585",
    title: "Energetische Modernisierung",
    badge: "KfW-förderfähig",
    items: [
      "Außenwand-Dämmung (WDVS) nach GEG 2024",
      "Dach- und Kellerdeckendämmung",
      "Fenster & Außentüren (U-Wert-optimiert)",
      "Wärmepumpen-Integration (Kooperation)",
      "Lüftungsanlage mit Wärmerückgewinnung",
      "Vorbereitung für Photovoltaik-Anschluss",
    ],
  },
  {
    icon: DoorOpen,
    color: "#1B3585",
    title: "Grundriss & Raumaufteilung",
    badge: "Individuelle Planung",
    items: [
      "Nicht-tragende Wände entfernen oder versetzen",
      "Offene Wohn-Koch-Bereiche schaffen",
      "Kinderzimmer teilen oder zusammenlegen",
      "Neue Badezimmer-Positionen planen",
      "Dachgeschoss-Ausbau & Gauben",
      "Statik-Prüfung bei tragenden Bauteilen",
    ],
  },
  {
    icon: Cpu,
    color: "#1B3585",
    title: "Smart Home & Technik",
    badge: "Zukunftssicher",
    items: [
      "KNX / KNX-IP Bussysteme",
      "Smarte Heizungssteuerung (Thermostate)",
      "Automatisierte Beschattung & Beleuchtung",
      "Glasfaser-Infrastruktur & strukturierte Verkabelung",
      "E-Ladeinfrastruktur (Wallbox-Vorbereitung)",
      "Videosprechanlage & Zutrittssystem",
    ],
  },
  {
    icon: Sun,
    color: "#C8A45A",
    title: "Barrierefreiheit & Komfort",
    badge: "KfW 455-B förderfähig",
    items: [
      "Schwellenfreie Zugänge & bodengleiche Dusche",
      "Haltegriffe & Sicherheitsausstattung Bad",
      "Treppenlifter-Vorbereitung oder -Einbau",
      "Breitere Türöffnungen (mind. 90 cm)",
      "Rutschfeste Bodenbeläge & kontrastreiche Gestaltung",
      "Altersgerechtes Bad nach DIN 18040",
    ],
  },
];

const FOERDERUNGEN = [
  {
    programm: "BEG – Bundesförderung Effiziente Gebäude",
    behoerde: "KfW / BAFA",
    details: "Bis zu 70 % Förderquote bei umfassender energetischer Modernisierung. Einzelmaßnahmen wie Dämmung, Fenster oder Heizungstausch werden separat gefördert.",
    link: "#",
    highlight: true,
  },
  {
    programm: "KfW 455-B – Barrierereduzierung",
    behoerde: "KfW",
    details: "Zuschuss von 10 % der förderfähigen Kosten (max. 5.000 € je Wohneinheit) für barrierereduzierende Maßnahmen in Bestandsgebäuden.",
    link: "#",
    highlight: false,
  },
  {
    programm: "Steuerliche Absetzbarkeit § 35c EStG",
    behoerde: "Finanzamt",
    details: "Selbstnutzer können 20 % der Kosten für energetische Maßnahmen über 3 Jahre von der Steuer absetzen (max. 40.000 € Vorteil je Objekt).",
    link: "#",
    highlight: false,
  },
  {
    programm: "Berliner Modernisierungsprogramm (IBB)",
    behoerde: "Investitionsbank Berlin",
    details: "Zinsgünstige Darlehen für Berliner Eigentümer. Kombinierbar mit KfW-Förderung. Fokus auf energetische Verbesserung und altersgerechten Umbau.",
    link: "#",
    highlight: false,
  },
];

const MIETRECHT = [
  {
    frage: "Darf man während des Mietverhältnisses modernisieren?",
    antwort: "Ja – Modernisierungsmaßnahmen sind nach § 555b BGB grundsätzlich zulässig. Mieter können nur in wenigen Ausnahmen widersprechen. Ankündigung mindestens 3 Monate vorher ist Pflicht.",
  },
  {
    frage: "Wie viel darf die Miete nach einer Modernisierung steigen?",
    antwort: "Laut § 559 BGB dürfen Vermieter 8 % der aufgewendeten Modernisierungskosten pro Jahr auf die Jahresmiete umlegen. Kappungsgrenze: max. 3 €/m² in 6 Jahren (2 €/m² bei Mieten unter 7 €/m²).",
  },
  {
    frage: "Muss ZidOst die Mieter direkt informieren?",
    antwort: "Auf Wunsch übernehmen wir die Terminabstimmung mit Mietern und Hausverwaltung. Das schriftliche Ankündigungsschreiben nach § 555c BGB verantwortet der Eigentümer, wir liefern alle technischen Angaben.",
  },
];

const FAQS = [
  {
    q: "Was ist der Unterschied zwischen Modernisierung und Sanierung?",
    a: "Sanierung bedeutet, Schäden oder Mängel an der Bausubstanz zu beseitigen (z. B. Schimmel, Feuchtigkeit, Risse). Modernisierung dagegen verbessert den Standard über das ursprüngliche Niveau hinaus – neue Heizung, bessere Dämmung, barrierefreies Bad, Grundrissveränderung. In der Praxis überschneiden sich beide Maßnahmen häufig, und wir führen sie koordiniert durch.",
  },
  {
    q: "Lohnt sich eine energetische Modernisierung in Berlin finanziell?",
    a: "In den meisten Fällen ja – insbesondere bei Häusern aus den 1960er–1990er Jahren. Die Kombination aus Heizkosteneinsparung, Wertsteigerung der Immobilie und staatlichen Förderungen macht die Maßnahme oft innerhalb von 10–15 Jahren rentabel. Wir rechnen Ihnen das gerne konkret durch.",
  },
  {
    q: "Kann ich Modernisierungsmaßnahmen auf Mieter umlegen?",
    a: "Ja, im Rahmen von § 559 BGB können Vermieter 8 % der Modernisierungskosten jährlich auf die Miete umlegen – bei Einhaltung der Kappungsgrenze. Wichtig: Reine Instandhaltungsmaßnahmen sind nicht umlagefähig. Wir dokumentieren alle Maßnahmen so, dass eine saubere Abgrenzung möglich ist.",
  },
  {
    q: "Welche KfW-Förderungen sind 2025 aktuell?",
    a: "Das Hauptprogramm ist die Bundesförderung Effiziente Gebäude (BEG) über KfW und BAFA. Für Einzelmaßnahmen wie Dämmung oder Fenster gibt es Zuschüsse bis 20 %, für umfassende Sanierungen zum Effizienzhaus bis 45–70 %. Da Programme und Konditionen sich ändern, empfehlen wir immer, vor Beauftragung beim zuständigen Energieberater nachzufragen – den können wir auf Wunsch empfehlen.",
  },
  {
    q: "Brauche ich für Grundrissveränderungen eine Baugenehmigung?",
    a: "Das hängt von der Art der Maßnahme ab. Das Entfernen von nicht-tragenden Wänden ist in Berlin meist genehmigungsfrei, aber anzeigepflichtig. Tragende Wände, neue Öffnungen oder Nutzungsänderungen erfordern eine Baugenehmigung. Wir klären das im Aufmaßtermin mit Ihnen und übernehmen auf Wunsch die Kommunikation mit den Behörden.",
  },
  {
    q: "Wie lange dauert eine energetische Modernisierung?",
    a: "Eine Außendämmung (WDVS) an einem Mehrfamilienhaus dauert je nach Größe 3–8 Wochen. Der Fensteraustausch in einer 3-Zimmer-Wohnung ist in 1–2 Tagen erledigt. Grundrissveränderungen benötigen 2–4 Wochen inklusive aller Nacharbeiten. Wir erstellen immer einen detaillierten Zeitplan, bevor wir starten.",
  },
  {
    q: "Kann ZidOst auch die Förderanträge übernehmen?",
    a: "Wir begleiten den Prozess und liefern alle notwendigen technischen Nachweise und Dokumentationen, die für einen Förderantrag benötigt werden. Die formale Antragstellung erfolgt über einen zertifizierten Energieberater (BEG-Pflicht) – auf Wunsch vermitteln wir einen.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? "#1B3585" : "#E5E8F0" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
        style={{ background: open ? "rgba(27,53,133,0.03)" : "#fff" }}>
        <span className="font-semibold text-[#0D2461] text-sm sm:text-base">{q}</span>
        <ChevronDown size={18} className="shrink-0 transition-transform duration-200"
          style={{ color: "#1B3585", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed"
          style={{ borderTop: "1px solid #EFF1F7" }}>
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ModernisierungPage() {
  return (
    <>
      <SiteNav transparent />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-0"
        style={{ background: "linear-gradient(135deg, #0D2461 0%, #1B3585 60%, #2A4BA0 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16 pt-40 pb-20 w-full">
          <a href="/" className="inline-flex items-center gap-2 text-white/50 text-sm mb-8 hover:text-white/80 transition-colors">
            <ArrowLeft size={14} /> Zurück zur Startseite
          </a>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            <TrendingUp size={12} /> Leistung
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Modernisierung<br />
            <span style={{ color: "#C8A45A" }}>die sich rechnet.</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
            Energetische Optimierung nach GEG, Grundrissveränderungen, barrierefreier Umbau und
            Smart-Home-Integration – alles aus einer Hand, mit voller Unterstützung bei KfW- und
            BAFA-Förderungen.
          </p>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
            {[
              { n: "Bis 70 %", l: "KfW-Förderquote möglich" },
              { n: "GEG 2024", l: "Alle Normen eingehalten" },
              { n: "§ 559", l: "Mietrechts-Expertise" },
              { n: "48h", l: "Angebot nach Aufmaß" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to top, #F7F8FC, transparent)" }} />
      </section>

      {/* ── Leistungsbereiche ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#F7F8FC" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B3585" }}>Vier Bereiche</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Was wir modernisieren
          </h2>
          <p className="text-gray-500 max-w-2xl mb-14 leading-relaxed">
            Modernisierung ist mehr als neue Farbe. Je nach Ziel – Energieeffizienz, Komfort,
            Barrierefreiheit oder Wertsteigerung – kombinieren wir die richtigen Maßnahmen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BEREICHE.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(27,53,133,0.08)" }}>
                      <b.icon size={20} style={{ color: b.color }} />
                    </div>
                    <h3 className="font-bold text-[#0D2461] text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}>{b.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: "rgba(27,53,133,0.07)", color: "#1B3585" }}>
                    {b.badge}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {b.items.map(item => (
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

      {/* ── Förderungen ───────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A45A" }}>
                Ihr Geld zurück
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0D2461] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Förderungen, die<br />
                <span style={{ color: "#1B3585" }}>wirklich helfen.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Der deutsche Förderdschungel ist unübersichtlich – aber die Mittel sind da.
                Wir kennen die Programme und stellen sicher, dass alle Maßnahmen förderfähig
                dokumentiert werden. Im Schnitt decken unsere Kunden 25–45 % der Modernisierungskosten
                durch Zuschüsse oder Steuervorteile.
              </p>
              <div className="p-5 rounded-2xl border flex gap-3"
                style={{ borderColor: "#DDE1EF", background: "rgba(27,53,133,0.03)" }}>
                <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#1B3585" }} />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-[#0D2461]">Wichtig:</strong> Für die meisten KfW/BAFA-Programme
                  muss der Förderantrag <strong>vor Baubeginn</strong> gestellt werden.
                  Sprechen Sie uns an, bevor Sie Aufträge vergeben.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {FOERDERUNGEN.map(f => (
                <div key={f.programm}
                  className="p-6 rounded-2xl border transition-all"
                  style={{
                    borderColor: f.highlight ? "#1B3585" : "#EFF1F7",
                    background: f.highlight ? "rgba(27,53,133,0.04)" : "#fff",
                  }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Euro size={13} style={{ color: f.highlight ? "#1B3585" : "#8892B0" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: f.highlight ? "#1B3585" : "#8892B0" }}>
                          {f.behoerde}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#0D2461] text-sm">{f.programm}</h4>
                    </div>
                    {f.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: "rgba(200,164,90,0.12)", color: "#9A7A35" }}>
                        Wichtigstes
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mietrecht ─────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#0D2461" }}>
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A45A" }}>Für Vermieter</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Modernisierung<br />
                <span style={{ color: "#C8A45A" }}>im Mietverhältnis.</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Berliner Vermieter stehen oft vor der Frage: Darf ich modernisieren, wenn die
                Wohnung bewohnt ist? Und wie nutze ich die Investition mietrechtlich?
                Wir kennen die Anforderungen und dokumentieren alle Maßnahmen wasserdicht.
              </p>
              <a href="/#kontakt"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-colors"
                style={{ background: "#C8A45A", color: "#0D2461" }}
                onMouseEnter={e => e.currentTarget.style.background = "#B8944A"}
                onMouseLeave={e => e.currentTarget.style.background = "#C8A45A"}>
                <FileText size={16} /> Beratungsgespräch anfragen
              </a>
            </div>
            <div className="space-y-4">
              {MIETRECHT.map(m => (
                <div key={m.frage} className="p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h4 className="font-bold text-white text-sm mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}>{m.frage}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{m.antwort}</p>
                </div>
              ))}
            </div>
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
            Alles zur Modernisierung<br />
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
              Jetzt durchrechnen lassen
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Wieviel Potenzial<br />
              <span style={{ color: "#C8A45A" }}>steckt in Ihrer Immobilie?</span>
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Kostenloses Erstgespräch: Wir analysieren Ihr Gebäude, zeigen relevante Förderungen
              auf und erstellen ein individuelles Modernisierungskonzept.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#kontakt"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full transition-colors"
                style={{ background: "#fff", color: "#1B3585" }}
                onMouseEnter={e => e.currentTarget.style.background = "#EFF1F7"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                Kostenloses Konzept anfragen <ArrowRight size={16} />
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
