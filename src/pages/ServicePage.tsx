import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

interface ServicePageProps {
  slug: string;
  onBackToServices?: () => void;
  onBackToHome?: () => void;
  onNavigateService?: (slug: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = (props) => {
  return <ServiceDetailPage {...props} />;
};

export default ServicePage;
