import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bigsam-portfolio.vercel.app"),
  title: {
    default: "Samuel (BigSam) | Gadex® — Full-Stack Engineer",
    template: "%s | Samuel (Gadex®)",
  },
  description:
    "Portfolio of Samuel (BigSam / Gadex®), a Full-Stack Engineer architecting scalable web applications, resilient backend APIs, and high-performance user interfaces.",
  keywords: [
    "Samuel",
    "BigSam",
    "Gadex",
    "Full-Stack Engineer",
    "Next.js Developer",
    "TypeScript",
    "Software Engineer Portfolio",
    "React",
    "Node.js",
    "Frontend Architect",
  ],
  authors: [{ name: "BigSam (Gadex®)", url: "https://github.com/akanbisamuel045-tech" }],
  creator: "BigSam",
  icons: {
    icon: "/assets/gadex-logo.png",
    apple: "/assets/gadex-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bigsam-portfolio.vercel.app",
    title: "Samuel (BigSam) | Gadex® — Full-Stack Engineer",
    description:
      "Portfolio of Samuel (BigSam / Gadex®), a Full-Stack Engineer architecting scalable web applications, resilient backend APIs, and high-performance user interfaces.",
    siteName: "Gadex® Engineering Portfolio",
    images: [
      {
        url: "/assets/samuel-impact.png",
        width: 1200,
        height: 630,
        alt: "BigSam (Gadex®) — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel (BigSam) | Gadex® — Full-Stack Engineer",
    description:
      "Portfolio of Samuel (BigSam / Gadex®), a Full-Stack Engineer architecting scalable web applications, resilient backend APIs, and high-performance user interfaces.",
    images: ["/assets/samuel-impact.png"],
    creator: "@akanbisamuel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-[#F6F6F6] text-[#111111] font-body antialiased selection:bg-[#E84511] selection:text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
