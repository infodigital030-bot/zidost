import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-inter" });

export const metadata = {
  title: "ZidOst Bauunternehmen Berlin | Renovierung · Sanierung · Modernisierung",
  description: "Ihr Bauunternehmen in Berlin und Brandenburg. Spezialisiert auf Renovierung, Sanierung und Modernisierung von Wohnungen, Häusern und Altbauten.",
  openGraph: {
    title: "ZidOst – Bau und Immobilien Berlin",
    description: "Renovierung, Sanierung und Modernisierung in Berlin & Brandenburg. Professionell, termingerecht, hochwertig.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
