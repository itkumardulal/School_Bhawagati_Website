import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Bhagawati Secondary School - Best School in Sindhuli, Nepal",
  description = "Bhagawati Secondary School is the best school in Sindhuli, offering world-class education with modern facilities, experienced teachers, and comprehensive academic programs. Join us for a bright future.",
  keywords = "best school in Sindhuli, top school Sindhuli, quality education Sindhuli, Bhagawati Secondary School, Sindhuli school, Nepal education, academic excellence",
  image = "https://www.hamrobhagawati.com/assets/logo1.png",
  url = "https://www.hamrobhagawati.com",
  type = "website",
  structuredData = null,
}) => {
  const fullTitle = title.includes("Bhagawati Secondary School")
    ? title
    : `${title} - Bhagawati Secondary School`;

  const fullUrl = url.startsWith("http")
    ? url
    : `https://www.hamrobhagawati.com${url}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Bhagawati Secondary School" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Bhagawati Secondary School" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Pre-defined SEO configurations for different pages
export const SEOConfigs = {
  home: {
    title: "Bhagawati Secondary School - Best School in Sindhuli, Nepal",
    description:
      "Bhagawati Secondary School is the best school in Sindhuli, offering world-class education with modern facilities, experienced teachers, and comprehensive academic programs. Join us for a bright future.",
    keywords:
      "best school in Sindhuli, top school Sindhuli, quality education Sindhuli, Bhagawati Secondary School, Sindhuli school, Nepal education, academic excellence, best secondary school Sindhuli",
    url: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Bhagawati Secondary School",
      url: "https://www.hamrobhagawati.com",
      logo: "https://www.hamrobhagawati.com/assets/logo1.png",
      description:
        "Bhagawati Secondary School is the best school in Sindhuli, offering world-class education with modern facilities, experienced teachers, and comprehensive academic programs.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sindhuli",
        addressRegion: "Bagmati Province",
        addressCountry: "Nepal",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Admissions",
        availableLanguage: ["English", "Nepali"],
      },
      sameAs: ["https://www.facebook.com/Bhagawatienglishschool"],
    },
  },

  about: {
    title: "About Us - Best School in Sindhuli",
    description:
      "Learn about Bhagawati Secondary School, the best school in Sindhuli. Discover our mission to provide quality education, experienced faculty, modern facilities, and commitment to student success.",
    keywords:
      "about us, best school Sindhuli, mission, vision, faculty, facilities, school history, top school Sindhuli",
    url: "/about",
  },

  academics: {
    title: "Academics - Quality Education Programs in Sindhuli",
    description:
      "Explore our comprehensive academic programs, curriculum, teaching methods, and educational excellence at Bhagawati Secondary School, the best school in Sindhuli.",
    keywords:
      "academics Sindhuli, curriculum, programs, education, subjects, teaching, best school Sindhuli, quality education",
    url: "/academics",
  },

  admissions: {
    title: "Admissions - Join Best School in Sindhuli",
    description:
      "Apply for admission to Bhagawati Secondary School, the best school in Sindhuli. Learn about admission requirements, application process, fees, and scholarship opportunities.",
    keywords:
      "admissions Sindhuli, apply, enrollment, fees, scholarship, requirements, best school Sindhuli, top school Sindhuli",
    url: "/admissions",
  },

  contact: {
    title: "Contact Us - Best School in Sindhuli",
    description:
      "Contact Bhagawati Secondary School, the best school in Sindhuli, for inquiries, admissions, or general information. Find our location, phone numbers, and office hours.",
    keywords:
      "contact Sindhuli, location, phone, email, office hours, inquiries, best school Sindhuli, top school Sindhuli",
    url: "/contact",
  },

  gallery: {
    title: "Gallery - School Photos & Events in Sindhuli",
    description:
      "View photos of our school facilities, events, activities, and student life at Bhagawati Secondary School, the best school in Sindhuli.",
    keywords:
      "gallery Sindhuli, photos, events, facilities, activities, school life, best school Sindhuli",
    url: "/gallery",
  },

  news: {
    title: "Latest News & Updates - Best School in Sindhuli",
    description:
      "Stay updated with the latest news, announcements, and events happening at Bhagawati Secondary School, the best school in Sindhuli.",
    keywords:
      "news Sindhuli, updates, announcements, events, latest, best school Sindhuli, top school Sindhuli",
    url: "/news",
  },

  notices: {
    title: "Important Notices & Announcements - Sindhuli School",
    description:
      "Read important notices, announcements, and official communications from Bhagawati Secondary School, the best school in Sindhuli.",
    keywords:
      "notices Sindhuli, announcements, official, important, communications, best school Sindhuli",
    url: "/notices",
  },

  blogs: {
    title: "Blog - Educational Articles & Insights from Sindhuli",
    description:
      "Read educational articles, insights, and informative content from Bhagawati Secondary School's blog, the best school in Sindhuli.",
    keywords:
      "blog Sindhuli, articles, educational, insights, content, best school Sindhuli, education blog",
    url: "/blogs",
  },

  club: {
    title: "Student Clubs & Activities - Best School in Sindhuli",
    description:
      "Explore various student clubs, extracurricular activities, and programs at Bhagawati Secondary School, the best school in Sindhuli.",
    keywords:
      "clubs Sindhuli, activities, extracurricular, students, programs, best school Sindhuli, student activities",
    url: "/club",
  },
};

export default SEO;
