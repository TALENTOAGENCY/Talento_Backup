# TALENTO — SEO & Information Architecture Documentation

## 1. Executive Overview

This document specifies the scalable Information Architecture (IA) and Programmatic SEO framework for TALENTO (https://www.talento.agency/).

The architecture is designed to scale across hundreds of indexed pages without risk of duplicate content penalties, crawl budget exhaustion, or keyword cannibalization.

---

## 2. URL Structure & Directory Hierarchy

```text
https://www.talento.agency/
│
├── / (Homepage)
│
├── /about
│   ├── /about/methodology
│   └── /about/team
│
├── /services
│   ├── /services/c-suite-talent-hunt
│   ├── /services/executive-search
│   ├── /services/interim-impact-recruitment
│   ├── /services/niche-role-discovery
│   ├── /services/specialist-talent-sourcing
│   └── /services/on-demand-freelancer-search
│
├── /industries
│   ├── /industries/tech-startups
│   ├── /industries/apparel-textiles
│   ├── /industries/healthcare-life-sciences
│   ├── /industries/fmcg-marketplaces
│   ├── /industries/hospitality
│   ├── /industries/ngo-international-development
│   └── /industries/agri-business
│
├── /roles
│   ├── /roles/chief-executive-officer-ceo
│   ├── /roles/chief-technology-officer-cto
│   ├── /roles/chief-financial-officer-cfo
│   ├── /roles/chief-operating-officer-coo
│   ├── /roles/vp-engineering
│   └── /roles/head-of-product
│
├── /locations
│   ├── /locations/bangladesh
│   │   ├── /locations/bangladesh/cto-headhunting
│   │   ├── /locations/bangladesh/cfo-recruitment
│   │   └── /locations/bangladesh/coo-search
│   ├── /locations/uae
│   │   ├── /locations/uae/c-suite-executive-search
│   │   └── /locations/uae/fintech-leadership-search
│   ├── /locations/singapore
│   ├── /locations/united-kingdom
│   └── /locations/united-states
│
├── /case-studies
│   ├── /case-studies/series-a-fintech-cto-placement
│   ├── /case-studies/multinational-apparel-coo-search
│   └── /case-studies/healthcare-clinical-director-headhunt
│
├── /insights
│   ├── /insights/bangladesh-tech-salary-report-2026
│   ├── /insights/how-to-hire-a-startup-cto
│   └── /insights/executive-retention-strategies-asia
│
├── /careers
│   ├── /careers/sr-executive-recruitment-dhaka
│   └── /careers/ai-data-labelling-associate
│
├── /apply
├── /contact
│
├── /privacy-policy
├── /terms-of-service
│
├── /robots.txt
└── /sitemap.xml
```

---

## 3. Section Matrix & Intent Mapping

| Section | Target Query Intent | Primary Schema.org Type | Key Conversion Destination |
| :--- | :--- | :--- | :--- |
| **Homepage** | Navigational / Broad Brand Authority | `Organization`, `WebSite` | `/contact` (Consultation) |
| **Services** | High-Commercial B2B Search | `Service`, `FAQPage` | `/contact` (Request Search) |
| **Industries** | Vertical-Specific Executive Search | `ProfessionalService` | `/contact` (Industry Consultation) |
| **Roles** | Functional Headhunting Queries | `Occupation`, `Service` | `/contact` / `/careers` |
| **Locations** | Geo-Targeted Programmatic Search | `LocalBusiness`, `PostalAddress`| `/contact` (Local Practice) |
| **Case Studies**| Proof & Decision Validation | `CreativeWork` | `/contact` (Replicate Success) |
| **Insights** | Top-of-Funnel Informational Guides | `Article`, `BlogPosting` | Inline CTA to Services |
| **Careers** | Candidate Job Application | `JobPosting` | `/careers/[job-slug]` -> `/apply` |
| **About** | E-E-A-T Brand Trust & Credentials | `AboutPage`, `Person` | `/contact` |
| **Contact** | Direct Transactional Inquiries | `ContactPage` | Direct Lead Capture |

---

## 4. Crawl Budget & Anti-Thin-Content Rules

1. **Maximum Click Depth <= 3**: Every indexed page must be reachable within 3 clicks of the homepage via hierarchical or lateral links.
2. **Entity-Enriched Programmatic Pages**: `/locations/[country]/[role]` pages MUST include unique localized compensation medians, regulatory context, and verified local recruiter quotes. Pages lacking verified data points return 404 or `noindex`.
3. **Structured Breadcrumb Markup**: Every spoke implements `BreadcrumbList` JSON-LD reflecting its parent hub.
4. **Sitemap Index Architecture**: As pages exceed 100+, split into segmented sitemaps:
   * `sitemap-main.xml`
   * `sitemap-services.xml`
   * `sitemap-industries.xml`
   * `sitemap-roles.xml`
   * `sitemap-locations.xml`
   * `sitemap-insights.xml`
   * `sitemap-careers.xml`
