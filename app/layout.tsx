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
  title: "香港流感監測儀表板 | 即時流感活躍度指標",
  metadataBase: new URL('https://flu-dashboard.vercel.app'),
  alternates: {
    canonical: '/',
  },
  description: "即時監測香港流感活躍情況，提供最新流感指標、統計數據和趨勢分析",
  keywords: ['香港', '流感', '監測', '儀表板', '健康', '統計', 'flu', 'dashboard', 'health', 'trend'],
  authors: [{ name: 'Duncan Kwan' }],
  creator: 'Duncan Kwan',
  openGraph: {
    title: '香港流感監測儀表板',
    description: '即時監測香港流感活躍情況，提供最新流感指標、統計數據和趨勢分析。',
    url: 'https://flu-dashboard.vercel.app',
    siteName: '香港流感監測儀表板',
    images: [
      {
        url: 'https://flu-dashboard.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '香港流感監測儀表板預覽圖',
      },
    ],
    locale: 'zh_HK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '香港流感監測儀表板',
    description: '即時監測香港流感活躍情況，提供最新流感指標、統計數據和趨勢分析。',
    images: ['https://flu-dashboard.vercel.app/twitter-image.jpg'],
  },
  other: {
    'google-adsense-account': 'ca-pub-8470057760537876',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
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
