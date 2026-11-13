import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig, seoConfig } from '@/config/site';
import Analytics from '@/components/Analytics';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoConfig.home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.home.description,
  keywords: [
    'Creative Studio Kerala',
    'Event Management Kerala',
    'Film and Photography Production India',
    'Digital Marketing Agency Kerala',
    'Web Development Kerala',
    'Online Ticketing QR Entry',
    'AN FOCUS',
    'A.N. Industries',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Premium Creative Studio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/logo-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#080808] text-[#F5F5F5] font-sans antialiased selection:bg-[#A78BFA] selection:text-[#080808]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
