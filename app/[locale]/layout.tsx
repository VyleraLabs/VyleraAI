import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";

import FooterStatus from "@/components/FooterStatus";
import NeuralStatusBar from "@/components/NeuralStatusBar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import SchemaLD from "@/components/SchemaLD";
import ContactModal from "@/components/ContactModal";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vylera Labs | Intelligence for Fragmented IoT",
  description: "Vylera transforms your home into a proactive, context-aware sanctuary. Powered by Google Vertex AI and Sovereign Edge logic.",
  keywords: ["Ambient AI", "IoT Operating System", "Privacy-First Smart Home", "Vylera Labs", "Vertex AI Home", "Edge Computing"],
  authors: [{ name: "Vylera Labs Team" }],
  openGraph: {
    title: "Vylera Labs | The Ambient Operating System",
    description: "From Smart to Sentient. Proactive context-aware intelligence for the modern home.",
    url: "https://vyleralabs.com",
    siteName: "Vylera Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://vyleralabs.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Vylera Labs - Sovereign Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vylera Labs | Intelligence for Fragmented IoT",
    description: "The Sovereign OS for Fragmented IoT hardware.",
    images: ["https://vyleralabs.com/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased pb-24`}>
        <NextIntlClientProvider messages={messages}>
          <SchemaLD />
          <NextAuthProvider>
            {children}
            <Footer />
            <ContactModal />
            <NeuralStatusBar />
            <FooterStatus />
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
