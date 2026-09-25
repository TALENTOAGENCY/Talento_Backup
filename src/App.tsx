import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  User,
  Building,
  Upload,
  Loader,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Globe,
  ShieldCheck,
  Target,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { DatabaseService } from './services/database';
import { AuthForm } from './components/AuthForm';
import { ForgotPassword } from './components/ForgotPassword';
import { DashboardPage } from './pages/DashboardPage';
import { CareersPage } from './pages/CareersPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { RolesPage } from './pages/RolesPage';
import { RoleDetailPage } from './pages/RoleDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { LocationRolePage } from './pages/LocationRolePage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { ContentPlanningPage } from './pages/ContentPlanningPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ThemeToggle from './components/ThemeToggle';
import { SEO } from './components/SEO';
import { organizationSchema, websiteSchema, servicesSchema } from './lib/schemas';
import { servicesData } from './data/services';
import { industriesData } from './data/industries';
import { rolesData } from './data/roles';
import { locationsData } from './data/locations';
import { insightsData } from './data/insights';
import { caseStudiesData } from './data/caseStudies';
import type { CandidateApplication, ContactForm, AuthUser, UserProfile } from './lib/supabase';

type ViewType =
  | 'home'
  | 'auth'
  | 'forgot-password'
  | 'dashboard'
  | 'careers'
  | 'services'
  | 'service-detail'
  | 'industries'
  | 'industry-detail'
  | 'roles'
  | 'role-detail'
  | 'locations'
  | 'location-detail'
  | 'location-role'
  | 'insights'
  | 'insight-detail'
  | 'content-planning'
  | 'not-found';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('executive-search');
  const [selectedIndustrySlug, setSelectedIndustrySlug] = useState<string>('technology');
  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>('software-engineers');
  const [selectedLocationSlug, setSelectedLocationSlug] = useState<string>('usa');
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string>('usa');
  const [selectedRoleSlugForLocation, setSelectedRoleSlugForLocation] = useState<string>('software-engineers');
  const [selectedInsightSlug, setSelectedInsightSlug] = useState<string>('cross-border-tech-recruitment-index-2026');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [initialDashboardEditMode, setInitialDashboardEditMode] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact form state
  const [contactForm, setContactForm] = useState<ContactForm>({
    full_name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  // Candidate application state
  const [candidateForm, setCandidateForm] = useState<CandidateApplication>({
    full_name: '',
    citizenship: '',
    phone: '',
    email: '',
    main_role: '',
    business_sector: '',
    job_title: '',
    current_employer: '',
    linkedin_url: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicationError, setApplicationError] = useState('');

  useEffect(() => {
    checkUser();
    syncRouteFromLocation();

    const handlePopState = () => {
      syncRouteFromLocation();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const syncRouteFromLocation = () => {
    const path = window.location.pathname;
    if (path === '/services' || path === '/services/') {
      setCurrentView('services');
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').replace(/\/$/, '');
      if (slug) {
        setSelectedServiceSlug(slug);
        setCurrentView('service-detail');
      }
    } else if (path === '/industries' || path === '/industries/') {
      setCurrentView('industries');
    } else if (path.startsWith('/industries/')) {
      const slug = path.replace('/industries/', '').replace(/\/$/, '');
      if (slug) {
        setSelectedIndustrySlug(slug);
        setCurrentView('industry-detail');
      }
    } else if (path === '/roles' || path === '/roles/') {
      setCurrentView('roles');
    } else if (path.startsWith('/roles/')) {
      const slug = path.replace('/roles/', '').replace(/\/$/, '');
      if (slug) {
        setSelectedRoleSlug(slug);
        setCurrentView('role-detail');
      }
    } else if (path === '/locations' || path === '/locations/') {
      setCurrentView('locations');
    } else if (path.startsWith('/locations/')) {
      const cleanPath = path.replace(/^\/locations\//, '').replace(/\/$/, '');
      const segments = cleanPath.split('/').filter(Boolean);
      if (segments.length === 1) {
        setSelectedLocationSlug(segments[0]);
        setCurrentView('location-detail');
      } else if (segments.length === 2) {
        const [country, role] = segments;
        setSelectedCountrySlug(country);
        setSelectedRoleSlugForLocation(role);
        setCurrentView('location-role');
      } else {
        setCurrentView('not-found');
      }
    } else if (path === '/insights' || path === '/insights/') {
      setCurrentView('insights');
    } else if (path.startsWith('/insights/')) {
      const slug = path.replace('/insights/', '').replace(/\/$/, '');
      if (slug) {
        setSelectedInsightSlug(slug);
        setCurrentView('insight-detail');
      }
    } else if (path === '/content-planning' || path === '/content-planning/') {
      setCurrentView('content-planning');
    } else if (path === '/careers' || path === '/careers/') {
      setCurrentView('careers');
    }
  };

  const handleNavigateToServices = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/services');
    setCurrentView('services');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToServiceDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/services/${slug}`);
    setSelectedServiceSlug(slug);
    setCurrentView('service-detail');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToIndustries = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/industries');
    setCurrentView('industries');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToIndustryDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/industries/${slug}`);
    setSelectedIndustrySlug(slug);
    setCurrentView('industry-detail');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRoles = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/roles');
    setCurrentView('roles');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRoleDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/roles/${slug}`);
    setSelectedRoleSlug(slug);
    setCurrentView('role-detail');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLocations = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/locations');
    setCurrentView('locations');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLocationDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/locations/${slug}`);
    setSelectedLocationSlug(slug);
    setCurrentView('location-detail');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLocationRole = (countrySlug: string, roleSlug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/locations/${countrySlug}/${roleSlug}`);
    setSelectedCountrySlug(countrySlug);
    setSelectedRoleSlugForLocation(roleSlug);
    setCurrentView('location-role');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInsights = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/insights');
    setCurrentView('insights');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInsightDetail = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', `/insights/${slug}`);
    setSelectedInsightSlug(slug);
    setCurrentView('insight-detail');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContentPlanning = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/content-planning');
    setCurrentView('content-planning');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/');
    setCurrentView('home');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-profile-dropdown]')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const checkUser = async () => {
    setIsCheckingAuth(true);
    try {
      const result = await DatabaseService.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
        const profileResult = await DatabaseService.getProfile(result.user.id);
        if (profileResult.success && profileResult.data) {
          setUserProfile(profileResult.data);
        }
      }
    } catch {
      // Silently handle auth check errors
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleBackFromCareers = () => {
    setCurrentView('home');
  };

  const handleAuthSuccess = () => {
    checkUser();
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setUserProfile(null);
    setCurrentView('home');
    setShowProfileDropdown(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setContactError('');
    try {
      const result = await DatabaseService.submitContactForm(contactForm);
      if (result.success) {
        setContactSuccess(true);
        setContactForm({ full_name: '', email: '', company: '', message: '' });
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        setContactError(result.error || 'Failed to submit contact form');
      }
    } catch {
      setContactError('An unexpected error occurred');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApplication(true);
    setApplicationError('');
    try {
      let cvData = {};

      if (cvFile) {
        const uploadResult = await DatabaseService.uploadCV(cvFile, candidateForm.email);
        if (uploadResult.success) {
          cvData = {
            cv_file_path: uploadResult.filePath,
            cv_file_name: uploadResult.fileName,
            cv_file_size: uploadResult.fileSize,
            cv_file_type: uploadResult.fileType
          };
        } else {
          setApplicationError(uploadResult.error || 'Failed to upload CV');
          setIsSubmittingApplication(false);
          return;
        }
      }
      const applicationData = { ...candidateForm, ...cvData };
      const result = await DatabaseService.submitCandidateApplication(applicationData);

      if (result.success) {
        setApplicationSuccess(true);
        setCandidateForm({
          full_name: '',
          citizenship: '',
          phone: '',
          email: '',
          main_role: '',
          business_sector: '',
          job_title: '',
          current_employer: '',
          linkedin_url: ''
        });
        setCvFile(null);
        setTimeout(() => setApplicationSuccess(false), 5000);
      } else {
        setApplicationError(result.error || 'Failed to submit application');
      }
    } catch {
      setApplicationError('An unexpected error occurred');
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        setApplicationError('Please upload a PDF or Word document');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setApplicationError('File size must be less than 5MB');
        return;
      }

      setCvFile(file);
      setApplicationError('');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const homepageFaqs = [
    {
      q: 'What differentiates TALENTO from traditional recruitment agencies?',
      a: 'TALENTO operates as a boutique executive search and bespoke headhunting firm rather than a transactional resume broker. Every mandate is led by senior talent partners who actively map passive, market-leading executives and conduct comprehensive technical, leadership, and reference evaluations.'
    },
    {
      q: 'How does TALENTO handle confidentiality for high-profile executive searches?',
      a: 'We adhere to rigorous non-disclosure protocols. Confidential searches are conducted under strict mutual NDAs with anonymized briefing dossiers, protecting both your organization’s market positioning and the privacy of executive candidates.'
    },
    {
      q: 'What is the typical timeline for an executive search or C-suite placement?',
      a: 'Our standard executive search lifecycle delivers a curated, calibrated shortlist within 10 to 14 business days. Full placement and offer acceptance typically concludes within 4 to 6 weeks, depending on executive notice periods.'
    },
    {
      q: 'What engagement models do you provide for employers?',
      a: 'We offer structured Retained Executive Search for C-suite and board mandates, Contingency Search for specialized roles, Embedded Talent Advisory for fast-scaling startups, and Interim Executive Placement for turnaround leadership.'
    },
    {
      q: 'Does TALENTO provide cross-border and international recruitment capabilities?',
      a: 'Yes. While headquartered in Dhaka, our executive search network spans key talent corridors in the UAE, Singapore, the United Kingdom, and the United States, placing expatriate leaders and managing diaspora repatriation mandates.'
    }
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-talento-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading TALENTO...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <AuthForm
        onSuccess={handleAuthSuccess}
        onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPassword
        onBack={() => setCurrentView('auth')}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'careers') {
    return <CareersPage onBack={handleBackFromCareers} />;
  }

  if (currentView === 'services') {
    return (
      <ServicesPage
        onBackToHome={handleBackToHome}
        onNavigateService={handleNavigateToServiceDetail}
      />
    );
  }

  if (currentView === 'service-detail') {
    return (
      <ServiceDetailPage
        slug={selectedServiceSlug}
        onBackToServices={handleNavigateToServices}
        onBackToHome={handleBackToHome}
        onNavigateService={handleNavigateToServiceDetail}
      />
    );
  }

  if (currentView === 'industries') {
    return (
      <IndustriesPage
        onBackToHome={handleBackToHome}
        onNavigateIndustry={handleNavigateToIndustryDetail}
      />
    );
  }

  if (currentView === 'industry-detail') {
    return (
      <IndustryDetailPage
        slug={selectedIndustrySlug}
        onBackToIndustries={handleNavigateToIndustries}
        onBackToHome={handleBackToHome}
        onNavigateIndustry={handleNavigateToIndustryDetail}
      />
    );
  }

  if (currentView === 'roles') {
    return (
      <RolesPage
        onBackToHome={handleBackToHome}
        onNavigateRole={handleNavigateToRoleDetail}
      />
    );
  }

  if (currentView === 'role-detail') {
    return (
      <RoleDetailPage
        slug={selectedRoleSlug}
        onBackToRoles={handleNavigateToRoles}
        onBackToHome={handleBackToHome}
        onNavigateRole={handleNavigateToRoleDetail}
      />
    );
  }

  if (currentView === 'locations') {
    return (
      <LocationsPage
        onBackToHome={handleBackToHome}
        onNavigateLocation={handleNavigateToLocationDetail}
      />
    );
  }

  if (currentView === 'location-detail') {
    return (
      <LocationDetailPage
        slug={selectedLocationSlug}
        onBackToLocations={handleNavigateToLocations}
        onBackToHome={handleBackToHome}
        onNavigateLocation={handleNavigateToLocationDetail}
      />
    );
  }

  if (currentView === 'location-role') {
    return (
      <LocationRolePage
        countrySlug={selectedCountrySlug}
        roleSlug={selectedRoleSlugForLocation}
        onBackToLocations={handleNavigateToLocations}
        onBackToCountry={handleNavigateToLocationDetail}
        onBackToRole={handleNavigateToRoleDetail}
        onBackToHome={handleBackToHome}
        onNavigateService={handleNavigateToServiceDetail}
      />
    );
  }

  if (currentView === 'insights') {
    return (
      <InsightsPage
        onBackToHome={handleBackToHome}
        onNavigateInsight={handleNavigateToInsightDetail}
      />
    );
  }

  if (currentView === 'insight-detail') {
    return (
      <InsightDetailPage
        slug={selectedInsightSlug}
        onBackToInsights={handleNavigateToInsights}
        onBackToHome={handleBackToHome}
        onNavigateInsight={handleNavigateToInsightDetail}
      />
    );
  }

  if (currentView === 'content-planning') {
    return (
      <ContentPlanningPage
        onBackToHome={handleBackToHome}
        onNavigateService={handleNavigateToServiceDetail}
        onNavigateIndustry={handleNavigateToIndustryDetail}
        onNavigateRole={handleNavigateToRoleDetail}
        onNavigateLocation={handleNavigateToLocationDetail}
      />
    );
  }

  if (currentView === 'not-found') {
    return <NotFoundPage onBackToHome={handleBackToHome} />;
  }

  if (currentView === 'dashboard' && user) {
    return (
      <DashboardPage
        user={user}
        initialEditMode={initialDashboardEditMode}
        onBack={() => setCurrentView('home')}
        onSignOut={handleSignOut}
        onProfileUpdate={(updatedProfile: React.SetStateAction<UserProfile | null>) =>
          setUserProfile(updatedProfile)
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title="Boutique Headhunting & Executive Search Agency | TALENTO"
        description="TALENTO is a premier boutique headhunting firm specializing in executive search, leadership recruitment, and strategic talent acquisition across tech, manufacturing, healthcare, FMCG, and emerging markets."
        canonicalUrl="https://www.talento.agency/"
        schemas={[organizationSchema, websiteSchema, servicesSchema]}
      />

      {/* Navigation Bar */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 transition-colors duration-200 border-b border-gray-100 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <a href="#home" className="flex items-center space-x-3">
                <img
                  src="/logo.png"
                  alt="TALENTO - Boutique Headhunting Agency"
                  width="130"
                  height="42"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-7">
              <a
                href="/services"
                onClick={handleNavigateToServices}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="/industries"
                onClick={handleNavigateToIndustries}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Industries
              </a>
              <a
                href="/roles"
                onClick={handleNavigateToRoles}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Roles
              </a>
              <a
                href="/locations"
                onClick={handleNavigateToLocations}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Locations
              </a>
              <a
                href="/insights"
                onClick={handleNavigateToInsights}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Insights
              </a>
              <a
                href="#process"
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Process
              </a>
              <button
                onClick={() => setCurrentView('careers')}
                className="text-gray-700 dark:text-gray-200 hover:text-talento-600 dark:hover:text-talento-400 text-sm font-medium transition-colors"
              >
                Careers
              </button>

              <a
                href="#contact"
                className="bg-talento-600 hover:bg-talento-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Hire Talent
              </a>

              {user ? (
                <div className="relative" data-profile-dropdown>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden ring-2 ring-talento-500/20">
                      {userProfile?.profile_photo_url ? (
                        <img
                          src={userProfile.profile_photo_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setInitialDashboardEditMode(false);
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setInitialDashboardEditMode(true);
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Edit Profile
                      </button>
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView('auth')}
                  className="text-gray-700 dark:text-gray-300 hover:text-talento-600 dark:hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              )}

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-200 p-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {isMenuOpen && (
            <div className="md:hidden px-3 pt-2 pb-5 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <a
                href="/services"
                onClick={handleNavigateToServices}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Services
              </a>
              <a
                href="/industries"
                onClick={handleNavigateToIndustries}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Industries
              </a>
              <a
                href="/roles"
                onClick={handleNavigateToRoles}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Roles
              </a>
              <a
                href="/locations"
                onClick={handleNavigateToLocations}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Locations
              </a>
              <a
                href="/insights"
                onClick={handleNavigateToInsights}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Insights & Reports
              </a>
              <a
                href="#process"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Recruitment Process
              </a>
              <button
                onClick={() => {
                  setCurrentView('careers');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
              >
                Careers
              </button>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-talento-600 text-white px-4 py-2.5 rounded-lg text-base font-semibold"
              >
                Hire Talent
              </a>
              <a
                href="#apply"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center border border-talento-600 text-talento-600 dark:text-talento-400 px-4 py-2 rounded-lg text-base font-medium"
              >
                Join Talent Network
              </a>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-20">
        {/* 1. HERO SECTION */}
        <section
          id="home"
          className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 py-16 md:py-24 lg:py-28 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100/80 dark:bg-talento-950/80 border border-talento-200 dark:border-talento-800/60 mb-6">
                  <ShieldCheck className="w-4 h-4 text-talento-700 dark:text-talento-400" />
                  <span className="text-xs sm:text-sm font-semibold text-talento-800 dark:text-talento-300 tracking-wide uppercase">
                    Boutique Executive Search & Headhunting
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.15] tracking-tight mb-6">
                  Executive Search for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-talento-600 to-talento-800 dark:from-talento-400 dark:to-talento-200">
                    Visionary Leaders
                  </span>{' '}
                  & High-Impact Teams
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  TALENTO partners with founders, CEOs, and enterprise boards to headhunt proven C-suite executives, strategic directors, and specialized technical leaders across South Asia and global markets.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-10">
                  <a
                    href="https://calendly.com/talentoagency2/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-talento-600 hover:bg-talento-700 text-white px-7 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base"
                  >
                    <span>Schedule Executive Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  <a
                    href="#services"
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-7 py-4 rounded-xl font-semibold transition-all flex items-center justify-center text-base"
                  >
                    Explore Search Practices
                  </a>
                </div>

                {/* Verified Metrics Strip */}
                <div className="pt-6 border-t border-gray-200/80 dark:border-gray-800 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-talento-700 dark:text-talento-400">100+</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Executive Placements</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-talento-700 dark:text-talento-400">95%</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Placement Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-talento-700 dark:text-talento-400">15+</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Industry Practices</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-talento-400/20 to-talento-600/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <img
                      src="/talento.hero.webp"
                      alt="TALENTO Executive Search & Leadership Headhunting"
                      width="520"
                      height="520"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/90 rounded-xl mt-3 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                        <span className="font-semibold text-talento-600 dark:text-talento-400">Confidential Search Practice</span>
                        <span>Dhaka & Cross-Border Hubs</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        Headhunting C-Suite, VP Engineering, Product, and Industrial Operations Leadership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST & PROOF SECTION (Verified Data Only) */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200/80 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700">
                <ShieldCheck className="w-6 h-6 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Confidential Retained Search</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Discreet executive mapping under strict non-disclosure governance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700">
                <Target className="w-6 h-6 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Multi-Tier Competency Vetting</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Technical depth, board alignment, and track record verification.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700">
                <Globe className="w-6 h-6 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Cross-Border Executive Reach</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Direct talent corridors across South Asia, UAE, Singapore, UK, and US.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700">
                <TrendingUp className="w-6 h-6 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">100+ Verified Placements</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Proven delivery across venture startups and large industrial groups.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. RECRUITMENT SERVICES SECTION */}
        <section id="services" className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Search Practices & Models
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Specialized Executive Search Solutions
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Tailored recruitment practices engineered to solve critical talent bottlenecks for high-growth enterprises and transforming corporations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-50/70 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 hover:border-talento-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-talento-100 dark:bg-talento-950 text-talento-800 dark:text-talento-300 mb-4">
                      {service.engagementModel}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-talento-600 dark:group-hover:text-talento-400 transition-colors">
                      <a
                        href={`/services/${service.slug}`}
                        onClick={(e) => handleNavigateToServiceDetail(service.slug, e)}
                      >
                        {service.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Key Search Deliverables:
                      </div>
                      {service.keyDeliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-talento-600 dark:text-talento-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Timeline: {service.searchTimeline || '3-5 Weeks'}
                    </span>
                    <a
                      href={`/services/${service.slug}`}
                      onClick={(e) => handleNavigateToServiceDetail(service.slug, e)}
                      className="text-sm font-semibold text-talento-600 dark:text-talento-400 hover:text-talento-700 flex items-center"
                    >
                      <span>Explore Practice</span> <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Services Directory Banner */}
            <div className="mt-12 text-center">
              <a
                href="/services"
                onClick={handleNavigateToServices}
                className="inline-flex items-center space-x-2 bg-talento-50 dark:bg-gray-800 hover:bg-talento-100 dark:hover:bg-gray-700 text-talento-700 dark:text-talento-300 border border-talento-200 dark:border-gray-700 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              >
                <span>View Comprehensive /services Directory</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. INDUSTRIES EXPERTISE SECTION */}
        <section id="industries" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Industry Practice Groups
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Sector-Specific Leadership Networks
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Our partners have deep, long-standing talent networks across primary economic drivers and high-velocity innovation sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industriesData.map((industry) => (
                <div
                  key={industry.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-talento-50 dark:bg-talento-950 text-talento-600 dark:text-talento-400">
                      <Building className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {industry.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {industry.shortDescription}
                  </p>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                    Key Placements:
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {industry.typicalPlacements.slice(0, 3).map((placement, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {placement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ROLES & TALENT EXPERTISE */}
        <section id="roles" className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Executive & Specialist Roles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Leadership Archetypes We Place
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Headhunting vetted leadership capable of driving enterprise strategy, engineering velocity, and operational scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rolesData.map((role) => (
                <div
                  key={role.id}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200/80 dark:border-gray-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-talento-100 dark:bg-talento-950 text-talento-700 dark:text-talento-300">
                        {role.seniorityLevel}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Avg: {role.averageTimeToHire}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {role.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {role.shortDescription}
                    </p>

                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                      Core Competencies:
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {role.coreCompetencies.slice(0, 3).map((comp, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-talento-600 dark:text-talento-400 mr-1.5 flex-shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <a
                      href="#contact"
                      className="text-xs font-semibold text-talento-600 dark:text-talento-400 hover:text-talento-700 flex items-center justify-between"
                    >
                      <span>Initiate {role.name.split('(')[0]} Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. RECRUITMENT PROCESS SECTION */}
        <section id="process" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Our 4-Phase Executive Search Lifecycle
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                A disciplined, partner-led recruitment methodology delivering calibrated candidates without operational downtime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 relative">
                <div className="w-10 h-10 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-base mb-4">
                  01
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Mandate Calibration & Scoping
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  In-depth briefing with founders and hiring committees to define technical scorecards, P&L scope, and cultural alignment metrics.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 relative">
                <div className="w-10 h-10 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-base mb-4">
                  02
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Discreet Headhunting & Mapping
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Direct engagement of passive, top-tier leaders from target organizations and competitor benchmarks under strict mutual NDAs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 relative">
                <div className="w-10 h-10 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-base mb-4">
                  03
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Multi-Tier Competency Vetting
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Structured competency interviews, architecture/case evaluation, and 360-degree confidential reference checks across past boards.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700 relative">
                <div className="w-10 h-10 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-base mb-4">
                  04
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Offer Structuring & Integration
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Advisory on equity vesting, bonus targets, and smooth transition management with post-placement executive integration check-ins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. WHY TALENTO SECTION */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                  Boutique Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6 leading-tight">
                  Why Leading Organizations Choose TALENTO
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Unlike mass automated recruitment platforms, TALENTO delivers partner-led attention, deep market intelligence, and curated shortlists that minimize executive hiring risk.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Partner-Led Search Execution</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Every project is handled directly by senior partners with industry depth, not handed off to junior recruiters.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">100% Verified Executive Profiles</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Thorough vetting of track records, systems architecture, and leadership references before presentation.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Strict Non-Disclosure Protocols</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Complete discretion protects your strategic business decisions and market standing.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">High Retention Guarantee</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Our placements are built for multi-year tenure and sustainable cultural fit.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-talento-700 to-talento-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Our Verified Track Record</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-talento-100">100+</div>
                    <div className="text-xs text-talento-200">Successful Placements</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-talento-100">95%</div>
                    <div className="text-xs text-talento-200">Client Satisfaction</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-talento-100">15+</div>
                    <div className="text-xs text-talento-200">Industry Verticals</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-talento-100">10-14</div>
                    <div className="text-xs text-talento-200">Days to Shortlist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CASE STUDIES & PROOF */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Search Proof & Placements
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Executive Placements in Action
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Real-world examples of how TALENTO’s executive search practice delivers transformative leaders under tight timelines.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudiesData.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded bg-talento-50 dark:bg-talento-950 text-talento-700 dark:text-talento-300">
                      {caseStudy.clientIndustry}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Filled in {caseStudy.timeToHire}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {caseStudy.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {caseStudy.shortDescription}
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl mb-4 border border-gray-100 dark:border-gray-800">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                      Search Outcomes:
                    </div>
                    <ul className="space-y-1.5">
                      {caseStudy.outcome.map((res, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-talento-600 dark:text-talento-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {caseStudy.clientTestimonial && (
                    <blockquote className="text-xs italic text-gray-600 dark:text-gray-400 border-l-2 border-talento-500 pl-3">
                      "{caseStudy.clientTestimonial.quote}"
                      <footer className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1 not-italic">
                        — {caseStudy.clientTestimonial.clientRole}, {caseStudy.clientTestimonial.companyType}
                      </footer>
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. GLOBAL RECRUITMENT CAPABILITY */}
        <section id="global" className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Cross-Border Networks
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Global Executive Reach & Hubs
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Operating active cross-border talent corridors connecting South Asia with regional business and innovation capitals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {locationsData.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-200/80 dark:border-gray-800 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-talento-100 dark:bg-talento-950 flex items-center justify-center text-talento-700 dark:text-talento-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                    {loc.name.split('(')[0]}
                  </h3>
                  <p className="text-xs text-talento-600 dark:text-talento-400 font-medium mb-2">
                    {loc.region}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {loc.isPhysicalOffice ? 'Dhaka HQ & Talent Advisory' : 'Cross-Border Search Corridor'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ SECTION */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Common questions from founders, CEOs, and HR leaders regarding our executive search practice.
              </p>
            </div>

            <div className="space-y-4">
              {homepageFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                    >
                      <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-talento-600 dark:text-talento-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. EMPLOYER CTA & CONTACT SECTION */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Start Your Search
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Consult With Our Executive Search Partners
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Whether you need to headhunt a Chief Executive, build a distributed engineering team, or discuss compensation benchmarks, our partners are ready to assist.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Contact details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Talent Advisory Office
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-white">Headquarters</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Plot 37, Floor 3, Road 11, Block H, Banani, Dhaka-1213, Bangladesh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-white">Executive Inquiries</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">info@talento-glb.com</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">rubz@talento-glb.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-white">Direct Line</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">+880 1973 591514</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">+880 1341 749853</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Linkedin className="w-5 h-5 text-talento-600 dark:text-talento-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-white">LinkedIn</h4>
                        <a
                          href="https://www.linkedin.com/company/talento-bespoke-premium-headhunting/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-talento-600 dark:text-talento-400 hover:underline"
                        >
                          linkedin.com/company/talento-agency
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-talento-600 text-white p-6 rounded-2xl shadow-lg">
                  <h4 className="font-bold text-base mb-2">Book a 30-Minute Search Briefing</h4>
                  <p className="text-xs text-talento-100 mb-4 leading-relaxed">
                    Direct calendar access to our managing partners for urgent hiring mandates.
                  </p>
                  <a
                    href="https://calendly.com/talentoagency2/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-white text-talento-700 font-semibold px-4 py-2.5 rounded-lg text-xs hover:bg-talento-50 transition-colors"
                  >
                    Select Meeting Time on Calendly
                  </a>
                </div>
              </div>

              {/* Right Column: Employer Contact Form */}
              <div className="lg:col-span-7 bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={contactForm.full_name}
                        onChange={(e) => setContactForm({ ...contactForm, full_name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent text-sm"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent text-sm"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Company Name & Location
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent text-sm"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Role Requirements / Mandate Details *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent text-sm"
                      placeholder="Describe target role, seniority level, timeline, and key requirements..."
                    />
                  </div>

                  {contactError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-xs text-red-700 dark:text-red-400">
                      {contactError}
                    </div>
                  )}

                  {contactSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-xs text-green-700 dark:text-green-400">
                      Thank you! Our executive search team will contact you within 24 hours.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full bg-talento-600 hover:bg-talento-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmittingContact ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        <span>Submitting Mandate...</span>
                      </>
                    ) : (
                      <span>Submit Search Request</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CANDIDATE TALENT NETWORK APPLICATION SECTION */}
        <section id="apply" className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-talento-600 dark:text-talento-400 text-sm font-semibold tracking-wider uppercase">
                Confidential Candidate Network
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                Join Our Executive & Specialist Roster
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Are you an executive leader or specialist open to discreet career opportunities? Submit your profile for confidential representation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700">
              <form onSubmit={handleCandidateSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="candidate-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="candidate-name"
                      required
                      value={candidateForm.full_name}
                      onChange={(e) => setCandidateForm({ ...candidateForm, full_name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-citizenship" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Citizenship / Current Location *
                    </label>
                    <input
                      type="text"
                      id="candidate-citizenship"
                      required
                      value={candidateForm.citizenship}
                      onChange={(e) => setCandidateForm({ ...candidateForm, citizenship: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="e.g. Bangladesh / Singapore"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="candidate-phone" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="candidate-phone"
                      required
                      value={candidateForm.phone}
                      onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="+880 1973 591514"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="candidate-email"
                      required
                      value={candidateForm.email}
                      onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="candidate-role" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Seniority Level *
                    </label>
                    <select
                      id="candidate-role"
                      required
                      value={candidateForm.main_role}
                      onChange={(e) => setCandidateForm({ ...candidateForm, main_role: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                    >
                      <option value="">Select seniority level</option>
                      <option value="Executive/C-Suite">Executive / C-Suite</option>
                      <option value="Senior Management">Senior Management / Director</option>
                      <option value="Technical Lead">Technical Lead / Architect</option>
                      <option value="Specialist">Specialist / Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="candidate-sector" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Primary Industry Sector *
                    </label>
                    <select
                      id="candidate-sector"
                      required
                      value={candidateForm.business_sector}
                      onChange={(e) => setCandidateForm({ ...candidateForm, business_sector: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology & Software</option>
                      <option value="Apparel & RMG">Apparel & Textiles</option>
                      <option value="Healthcare">Healthcare & Life Sciences</option>
                      <option value="FMCG">FMCG & Marketplaces</option>
                      <option value="Financial Services">Financial Services & Fintech</option>
                      <option value="NGO">NGO & International Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="candidate-title" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Current Job Title *
                    </label>
                    <input
                      type="text"
                      id="candidate-title"
                      required
                      value={candidateForm.job_title}
                      onChange={(e) => setCandidateForm({ ...candidateForm, job_title: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="e.g. VP of Engineering"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-employer" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Current Organization *
                    </label>
                    <input
                      type="text"
                      id="candidate-employer"
                      required
                      value={candidateForm.current_employer}
                      onChange={(e) => setCandidateForm({ ...candidateForm, current_employer: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                      placeholder="Current company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="candidate-linkedin" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    LinkedIn Profile URL *
                  </label>
                  <input
                    type="url"
                    id="candidate-linkedin"
                    required
                    value={candidateForm.linkedin_url}
                    onChange={(e) => setCandidateForm({ ...candidateForm, linkedin_url: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-talento-500 text-sm"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label htmlFor="candidate-cv" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Executive CV / Resume (PDF or DOCX, max 5MB)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-talento-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-xs text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="candidate-cv"
                          className="relative cursor-pointer bg-white dark:bg-gray-800 rounded font-semibold text-talento-600 dark:text-talento-400 hover:text-talento-500"
                        >
                          <span>Upload dossier</span>
                          <input
                            id="candidate-cv"
                            name="candidate-cv"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 5MB</p>
                      {cvFile && (
                        <p className="text-xs text-talento-600 dark:text-talento-400 font-semibold">{cvFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {applicationError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-xs text-red-700 dark:text-red-400">
                    {applicationError}
                  </div>
                )}

                {applicationSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-xs text-green-700 dark:text-green-400">
                    Profile received. All submissions are held in strict confidence.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingApplication}
                  className="w-full bg-talento-600 hover:bg-talento-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmittingApplication ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      <span>Submitting Candidate Profile...</span>
                    </>
                  ) : (
                    <span>Submit Confidential Profile</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Col 1: Brand overview */}
            <div className="lg:col-span-2 space-y-4">
              <img
                src="/logo.png"
                alt="TALENTO - Executive Search & Headhunting"
                width="140"
                height="45"
                className="h-10 w-auto object-contain"
              />
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                TALENTO is a premier boutique headhunting firm specializing in executive search, leadership recruitment, and strategic talent acquisition across South Asia, UAE, Singapore, UK, and global markets.
              </p>
              <div className="text-xs text-gray-400 space-y-1 pt-2">
                <p>📍 Plot 37, Floor 3, Road 11, Block H, Banani, Dhaka-1213, Bangladesh</p>
                <p>✉️ info@talento-glb.com | rubz@talento-glb.com</p>
                <p>📞 +880 1973 591514 | +880 1341 749853</p>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                <a href="/services" onClick={handleNavigateToServices} className="hover:text-talento-400 transition-colors">
                  Search Practices
                </a>
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                {servicesData.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`/services/${s.slug}`}
                      onClick={(e) => handleNavigateToServiceDetail(s.slug, e)}
                      className="hover:text-white transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Industries */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                <a href="/industries" onClick={handleNavigateToIndustries} className="hover:text-talento-400 transition-colors">
                  Industry Verticals
                </a>
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                {industriesData.map((i) => (
                  <li key={i.id}>
                    <a
                      href={`/industries/${i.slug}`}
                      onClick={(e) => handleNavigateToIndustryDetail(i.slug, e)}
                      className="hover:text-white transition-colors"
                    >
                      {i.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Roles */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                <a href="/roles" onClick={handleNavigateToRoles} className="hover:text-talento-400 transition-colors">
                  Talent Functions
                </a>
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                {rolesData.slice(0, 5).map((r) => (
                  <li key={r.id}>
                    <a
                      href={`/roles/${r.slug}`}
                      onClick={(e) => handleNavigateToRoleDetail(r.slug, e)}
                      className="hover:text-white transition-colors"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Global Corridors */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                <a href="/locations" onClick={handleNavigateToLocations} className="hover:text-talento-400 transition-colors">
                  Global Corridors
                </a>
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                {locationsData.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`/locations/${l.slug}`}
                      onClick={(e) => handleNavigateToLocationDetail(l.slug, e)}
                      className="hover:text-white transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
            <p>&copy; 2026 TALENTO Agency. All rights reserved. Boutique Executive Search & Talent Advisory.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <a href="#home" onClick={handleBackToHome} className="hover:text-gray-400">Home</a>
              <a href="/services" onClick={handleNavigateToServices} className="hover:text-gray-400">Services</a>
              <a href="/industries" onClick={handleNavigateToIndustries} className="hover:text-gray-400">Industries</a>
              <a href="/roles" onClick={handleNavigateToRoles} className="hover:text-gray-400">Roles</a>
              <a href="/locations" onClick={handleNavigateToLocations} className="hover:text-gray-400">Locations</a>
              <a href="/insights" onClick={handleNavigateToInsights} className="hover:text-gray-400">Insights</a>
              <a href="/content-planning" onClick={handleNavigateToContentPlanning} className="hover:text-gray-400">Content Planning</a>
              <a href="#contact" className="hover:text-gray-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
