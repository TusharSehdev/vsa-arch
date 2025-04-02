import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/logo2.png",
  ogType = "website",
  breadcrumb = false,
}) => {
  // Base URL for the site
  const siteUrl = "https://vsaarchitect.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Generate breadcrumb schema based on the current page
  const generateBreadcrumbSchema = () => {
    if (!breadcrumb || !canonicalUrl) return null;

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ];

    // If we're on the home page, just return home
    if (canonicalUrl === "/" || !canonicalUrl) {
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      });
    }

    // Remove leading slash and split path segments
    const pathSegments = canonicalUrl.replace(/^\//, "").split("/");
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      if (!segment) return;

      currentPath += `/${segment}`;

      // Format the name (capitalize first letter and replace hyphens with spaces)
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbItems.push({
        "@type": "ListItem",
        position: index + 2,
        name: name,
        item: `${siteUrl}${currentPath}`,
      });
    });

    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });
  };

  // Generate site navigation schema for main navigation links
  const siteNavigationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Home", "Projects", "About Us", "Contact Us"],
    url: [
      `${siteUrl}/`,
      `${siteUrl}/projects`,
      `${siteUrl}/about`,
      `${siteUrl}/contact`,
    ],
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>
        {title
          ? `${title} - VSA Architects`
          : "VSA Architects - Premier Architecture Firm in Jalandhar, Punjab"}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta
        property="og:title"
        content={title ? `${title} - VSA Architects` : "VSA Architects"}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta
        property="twitter:title"
        content={title ? `${title} - VSA Architects` : "VSA Architects"}
      />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="VSA Architects" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-PB" />
      <meta name="geo.placename" content="Jalandhar" />

      {/* Structured Data - Breadcrumbs */}
      {breadcrumb && (
        <script type="application/ld+json">{generateBreadcrumbSchema()}</script>
      )}

      {/* Structured Data - Site Navigation */}
      <script type="application/ld+json">{siteNavigationSchema}</script>
    </Helmet>
  );
};

export default SEO;
