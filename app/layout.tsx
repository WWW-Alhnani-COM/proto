import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const SITE_URL = "https://alhanani.vercel.app";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "محمد عبدالرووف الحناني | مهندس برمجيات ومطوّر Full-Stack",
  description:
    "الموقع المهني لمحمد عبدالرووف الحناني (Muhammad Abdulraoof Al-Hanani)، مهندس برمجيات ومطوّر Full-Stack من اليمن. استعرض الخبرات والمهارات والمشاريع في تطوير الويب والأنظمة المؤسسية والتطبيقات.",
  keywords: [
    "محمد عبدالرووف الحناني",
    "محمد الحناني",
    "الحناني",
    "Muhammad Abdulraoof Al-Hanani",
    "Muhammad Al-Hanani",
    "Mohammed Al-Hanani",
    "مبرمج يمني",
    "مهندس برمجيات يمني",
    "مبرمج عربي",
    "مطور Full-Stack",
    "Full-Stack Software Engineer",
    "Full-Stack Web Developer",
    "تطوير ويب",
    "تطوير الأنظمة المؤسسية",
    "ERP",
    "CRM",
    "C#",
    ".NET",
    "ASP.NET Core",
    "React",
    "Next.js",
    "Angular",
    "Laravel",
    "Flutter",
    "PostgreSQL",
    "MongoDB",
    "Yemen",
    "Software Engineer",
  ],
  openGraph: {
    title: "محمد عبدالرووف الحناني | مهندس برمجيات ومطوّر Full-Stack",
    description:
      "الخبرات والمهارات والمشاريع والحسابات المهنية الرسمية لمحمد عبدالرووف الحناني، مهندس برمجيات يمني.",
    url: SITE_URL,
    siteName: "Mohammed Al-Hanani Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Al-Hanani — Full-Stack Software Engineer",
      },
    ],
    locale: "ar_YE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد عبدالرووف الحناني | مهندس برمجيات ومطوّر Full-Stack",
    description:
      "الموقع المهني لمحمد عبدالرووف الحناني، مهندس برمجيات ومطوّر Full-Stack من اليمن.",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Muhammad Abdulraoof Al-Hanani", url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
