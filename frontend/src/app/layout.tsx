import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ORG } from "@/lib/site-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.secondstartinitiative.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} — Everyone deserves a second start`,
    template: `%s | ${ORG.name}`,
  },
  description:
    "Second Start Initiative supports young adults transitioning out of children's homes in Kenya with mentorship, life skills, education and work pathways, and community.",
  openGraph: {
    type: "website",
    siteName: ORG.name,
    title: `${ORG.name} — Everyone deserves a second start`,
    description:
      "We support young adults transitioning out of children's homes with guidance, opportunity, and dignity.",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORG.name} — Everyone deserves a second start`,
    description:
      "We support young adults transitioning out of children's homes with guidance, opportunity, and dignity.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-body antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
