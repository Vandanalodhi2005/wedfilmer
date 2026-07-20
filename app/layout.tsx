import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { StickyContactButtons } from "@/components/StickyContactButtons";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wed Filmer - Premium Wedding & Event Photography",
  description:
    "Professional wedding photography and videography services. Capturing love stories that last forever with cinematic elegance. Specializing in weddings, pre-wedding shoots, corporate events, and family celebrations.",
  keywords: [
    "wedding photography",
    "wedding videography",
    "pre-wedding shoot",
    "destination wedding photographer",
    "corporate event photography",
    "cinematic wedding films",
    "Mumbai wedding photographer",
    "professional photography",
    "event photography",
    "family photography",
  ],
  authors: [{ name: "Wed Filmer" }],
  creator: "Wed Filmer",
  publisher: "Wed Filmer",
  metadataBase: new URL("https://wedfilmer.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wedfilmer.com",
    title: "Wed Filmer - Premium Wedding & Event Photography",
    description:
      "Professional wedding photography that transforms memories into timeless stories. 500+ events covered, 8+ years experience.",
    siteName: "Wed Filmer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wed Filmer - Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wed Filmer - Premium Wedding & Event Photography",
    description:
      "Professional wedding photography that transforms memories into timeless stories. 500+ events covered, 8+ years experience.",
    images: ["/og-image.jpg"],
    creator: "@wedfilmer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollProgress />
        <StickyContactButtons />
        <ScrollToTop />
      </body>
    </html>
  );
}
