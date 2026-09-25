import {
  BaseContentEntity,
  ContentEntityType,
  ServiceEntity,
  IndustryEntity,
  RoleEntity,
  LocationEntity,
  InsightEntity,
  CaseStudyEntity
} from '../types/content';

import { servicesData } from './services';
import { industriesData } from './industries';
import { rolesData } from './roles';
import { locationsData } from './locations';
import { insightsData } from './insights';
import { caseStudiesData } from './caseStudies';
import { locationRolesData, getLocationRole, isValidLocationRole, getAllPublishedLocationRoles } from './locationRoles';

// Re-export all individual datasets
export { servicesData } from './services';
export { industriesData } from './industries';
export { rolesData } from './roles';
export {
  insightsData,
  getAllInsights,
  getInsightsByCategory,
  getRelatedInsights
} from './insights';
export { caseStudiesData } from './caseStudies';
export { locationRolesData, getLocationRole, isValidLocationRole, getAllPublishedLocationRoles } from './locationRoles';
export {
  CONTENT_PLAN_CATEGORIES,
  contentPlanDatabase,
  getAllContentPlans,
  getContentPlanById,
  getContentPlansByCategory,
  getContentPlansByStatus,
  getApprovedContentPlans,
  filterContentPlans,
  getContentPlanningMetrics
} from './contentPlan';

// Entity lookup by slug helpers
export function getServiceBySlug(slug: string): ServiceEntity | undefined {
  return servicesData.find((item) => item.slug === slug);
}

export function getIndustryBySlug(slug: string): IndustryEntity | undefined {
  return industriesData.find((item) => item.slug === slug);
}

export function getRoleBySlug(slug: string): RoleEntity | undefined {
  return rolesData.find((item) => item.slug === slug);
}

export function getLocationBySlug(slug: string): LocationEntity | undefined {
  return locationsData.find((item) => item.slug === slug);
}

export function getInsightBySlug(slug: string): InsightEntity | undefined {
  return insightsData.find((item) => item.slug === slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntity | undefined {
  return caseStudiesData.find((item) => item.slug === slug);
}

// Universal lookup by entity type & slug
export function getEntityBySlugAndType(
  type: ContentEntityType,
  slug: string
): BaseContentEntity | undefined {
  switch (type) {
    case 'service':
      return getServiceBySlug(slug);
    case 'industry':
      return getIndustryBySlug(slug);
    case 'role':
      return getRoleBySlug(slug);
    case 'location':
      return getLocationBySlug(slug);
    case 'insight':
      return getInsightBySlug(slug);
    case 'caseStudy':
      return getCaseStudyBySlug(slug);
    default:
      return undefined;
  }
}

// Resolver for cross-linked relational entities
export interface ResolvedEntityRelations {
  services: ServiceEntity[];
  industries: IndustryEntity[];
  roles: RoleEntity[];
  locations: LocationEntity[];
}

export function getRelatedEntities(entity: BaseContentEntity): ResolvedEntityRelations {
  const services = (entity.relatedServices || [])
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServiceEntity => Boolean(item));

  const industries = (entity.relatedIndustries || [])
    .map((slug) => getIndustryBySlug(slug))
    .filter((item): item is IndustryEntity => Boolean(item));

  const roles = (entity.relatedRoles || [])
    .map((slug) => getRoleBySlug(slug))
    .filter((item): item is RoleEntity => Boolean(item));

  const locations = (entity.relatedLocations || [])
    .map((slug) => getLocationBySlug(slug))
    .filter((item): item is LocationEntity => Boolean(item));

  return {
    services,
    industries,
    roles,
    locations
  };
}

// Collect all route URLs across all entities
export interface ContentRouteEntry {
  type: ContentEntityType;
  slug: string;
  path: string;
  title: string;
  updatedAt?: string;
}

export function getAllContentRoutes(): ContentRouteEntry[] {
  const routes: ContentRouteEntry[] = [];

  servicesData.forEach((s) => {
    routes.push({
      type: 'service',
      slug: s.slug,
      path: `/services/${s.slug}`,
      title: s.title
    });
  });

  industriesData.forEach((i) => {
    routes.push({
      type: 'industry',
      slug: i.slug,
      path: `/industries/${i.slug}`,
      title: i.title
    });
  });

  rolesData.forEach((r) => {
    routes.push({
      type: 'role',
      slug: r.slug,
      path: `/roles/${r.slug}`,
      title: r.title
    });
  });

  locationsData.forEach((l) => {
    routes.push({
      type: 'location',
      slug: l.slug,
      path: `/locations/${l.slug}`,
      title: l.title
    });
  });

  insightsData.forEach((ins) => {
    routes.push({
      type: 'insight',
      slug: ins.slug,
      path: `/insights/${ins.slug}`,
      title: ins.title,
      updatedAt: ins.updatedAt || ins.publishedAt
    });
  });

  caseStudiesData.forEach((cs) => {
    routes.push({
      type: 'caseStudy',
      slug: cs.slug,
      path: `/case-studies/${cs.slug}`,
      title: cs.title
    });
  });

  return routes;
}
