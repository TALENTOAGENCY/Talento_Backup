import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; item: string }>;
  schemas?: object[];
}

const DEFAULT_TITLE = 'TALENTO - Boutique Headhunting Agency | Executive Search & Leadership Recruitment';
const DEFAULT_DESCRIPTION =
  'TALENTO is a boutique headhunting firm specializing in executive search, leadership recruitment, and talent acquisition across tech, healthcare, FMCG, apparel, and emerging industries.';
const BASE_URL = 'https://www.talento.agency';
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.png`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = BASE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'TALENTO - Boutique Headhunting Agency',
  twitterCard = 'summary_large_image',
  noindex = false,
  breadcrumbs,
  schemas = []
}) => {
  const fullTitle = title
    ? `${title} | TALENTO`
    : DEFAULT_TITLE;

  const absoluteCanonical = canonicalUrl.startsWith('http')
    ? canonicalUrl
    : `${BASE_URL}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;

  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${BASE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta description
    setMetaTag('name', 'description', description);

    // 3. Robots
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. OpenGraph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', absoluteCanonical);
    setMetaTag('property', 'og:image', absoluteOgImage);
    setMetaTag('property', 'og:image:alt', ogImageAlt);
    setMetaTag('property', 'og:site_name', 'TALENTO');
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card
    setMetaTag('property', 'twitter:card', twitterCard);
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:url', absoluteCanonical);
    setMetaTag('property', 'twitter:image', absoluteOgImage);

    // 6. Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', absoluteCanonical);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'dynamic-seo-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdData: object[] = [...schemas];

    // Add breadcrumb schema if available
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item.startsWith('http') ? crumb.item : `${BASE_URL}${crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`}`
        }))
      });
    }

    if (jsonLdData.length > 0) {
      scriptTag.textContent = JSON.stringify(jsonLdData.length === 1 ? jsonLdData[0] : jsonLdData);
    } else {
      scriptTag.textContent = '';
    }

    return () => {
      // Clean up dynamic schema on unmount if needed
    };
  }, [fullTitle, description, absoluteCanonical, ogType, absoluteOgImage, ogImageAlt, twitterCard, noindex, breadcrumbs, schemas]);

  return null;
};

export default SEO;
