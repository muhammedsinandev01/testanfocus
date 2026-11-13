import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import Services from '@/components/sections/Services';
import HowWeWork from '@/components/sections/HowWeWork';
import WhyUs from '@/components/sections/WhyUs';
import Portfolio from '@/components/sections/Portfolio';
import About from '@/components/sections/About';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  // JSON-LD Structured Data for LocalBusiness & CreativeStudio
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AN FOCUS',
    alternateName: 'A.N. Industries - AN FOCUS Studio',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-icon.png`,
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    telephone: siteConfig.contact.phones[0],
    email: siteConfig.contact.email,
    sameAs: [siteConfig.contact.instagramUrl],
    openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
    priceRange: '₹₹₹',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'AdministrativeArea', name: 'Worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Studio Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Live Events & QR Ticketing',
            description:
              'Concerts, corporate events, college festivals and cultural programmes with online ticket booking and QR entry.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Film & Commercial Photography Production',
            description:
              'Product and commercial photography, promotional videos, reels and corporate films.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing & Growth Ads',
            description:
              'Social media management, Meta Ads, Google Ads and lead-generation systems.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technology & Web Platforms',
            description:
              'Fast mobile-first websites, landing pages, event registration and online ticketing.',
          },
        },
      ],
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header Navigation */}
      <Navigation />

      {/* Main Experience Content */}
      <main className="relative flex flex-col w-full overflow-hidden">
        <Hero />
        <Introduction />
        <Services />
        <HowWeWork />
        <WhyUs />
        <Portfolio />
        <About />
        <FAQ />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      <WhatsAppButton />
    </>
  );
}
