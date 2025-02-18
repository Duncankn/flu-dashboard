import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import CookieConsentBanner from "@/components/cookieConsentBanner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hong Kong Flu Express | ILI Surveillance Dashboard",
  description: "Real-time monitoring dashboard for influenza-like illness (ILI) surveillance in Hong Kong, tracking cases across clinics, schools, and community settings.",
  icons: {
    icon: '/tracker-logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/*<CookieConsentBanner />*/}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8470057760537876"
          crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
