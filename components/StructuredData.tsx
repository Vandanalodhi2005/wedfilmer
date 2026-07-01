export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://wedfilmer.com/#business",
        name: "Wed Filmer",
        alternateName: "WedFilmer",
        url: "https://wedfilmer.com",
        logo: "https://wedfilmer.com/logo.png",
        image: "https://wedfilmer.com/og-image.jpg",
        description:
          "Professional wedding and event photography services specializing in capturing love stories with cinematic elegance.",
        priceRange: "₹₹₹",
        telephone: "+91-98765-43210",
        email: "hello@wedfilmer.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Studio 204, Creative Hub, Bandra West",
          addressLocality: "Mumbai",
          postalCode: "400050",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.0596,
          longitude: 72.8295,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "19:00",
        },
        sameAs: [
          "https://instagram.com/wedfilmer",
          "https://facebook.com/wedfilmer",
          "https://youtube.com/@wedfilmer",
          "https://pinterest.com/wedfilmer",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1000",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://wedfilmer.com/#service",
        name: "Wed Filmer Photography Services",
        serviceType: [
          "Wedding Photography",
          "Pre-Wedding Photography",
          "Cinematic Videography",
          "Corporate Event Photography",
          "Birthday Photography",
          "Family Photography",
        ],
        provider: {
          "@id": "https://wedfilmer.com/#business",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Wedding Photography Packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Silver Package",
                description: "Perfect for intimate celebrations and small events.",
              },
              price: "25000",
              priceCurrency: "INR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Gold Package",
                description: "Ideal for weddings and premium events.",
              },
              price: "55000",
              priceCurrency: "INR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Platinum Package",
                description: "The ultimate luxury experience for grand celebrations.",
              },
              price: "100000",
              priceCurrency: "INR",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://wedfilmer.com/#website",
        url: "https://wedfilmer.com",
        name: "Wed Filmer",
        description: "Premium Wedding & Event Photography",
        publisher: {
          "@id": "https://wedfilmer.com/#business",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://wedfilmer.com/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://wedfilmer.com/#organization",
        name: "Wed Filmer",
        url: "https://wedfilmer.com",
        logo: {
          "@type": "ImageObject",
          url: "https://wedfilmer.com/logo.png",
          width: 400,
          height: 400,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-98765-43210",
          contactType: "Customer Service",
          email: "hello@wedfilmer.com",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
