import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // غيّر إلى رابط موقعك الفعلي
  title: "Mohammed Al-Hanani | Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer متخصص في تطوير تطبيقات الويب والموبايل باستخدام React, Next.js, Flutter, Laravel وغيرها. خبرة 4+ سنوات في بناء حلول برمجية مبتكرة.",
  keywords: [
    "Full-Stack",
    "Web Developer",
    "React",
    "Next.js",
    "Flutter",
    "Laravel",
    "Yemen",
    "Mohammed Al-Hanani",
    "برمجة",
    "تطوير ويب",
  ],
  openGraph: {
    title: "Mohammed Al-Hanani | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer متخصص في تطوير تطبيقات الويب والموبايل باستخدام React, Next.js, Flutter, Laravel وغيرها.",
    url: "https://your-domain.com", // غيّر إلى رابط موقعك
    siteName: "Mohammed Al-Hanani Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Al-Hanani Portfolio",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Al-Hanani | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer متخصص في تطوير تطبيقات الويب والموبايل.",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar" // غيّر إلى اللغة العربية
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
