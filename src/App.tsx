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
  Briefcase,
  Upload,
  FileText,
  Loader,
  AlertCircle,
  Settings,
  LogOut,
  Search,
  ChevronDown} from 'lucide-react';
import { DatabaseService } from './services/database';
import { AuthForm } from './components/AuthForm';
import { ForgotPassword } from './components/ForgotPassword';
import { DashboardPage } from './pages/DashboardPage';
import { CareersPage } from './pages/CareersPage';
import type { CandidateApplication, ContactForm, AuthUser, UserProfile } from './lib/supabase';
type ViewType = 'home' | 'auth' | 'forgot-password' | 'dashboard' | 'careers';
function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [initialDashboardEditMode, setInitialDashboardEditMode] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
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
  }, []);

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
        // Load user profile
        const profileResult = await DatabaseService.getProfile(result.user.id);
        if (profileResult.success && profileResult.data) {
          setUserProfile(profileResult.data);
        }
      }
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      setApplicationError('An unexpected error occurred');
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setApplicationError('Please upload a PDF or Word document');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setApplicationError('File size must be less than 5MB');
        return;
      }
      
      setCvFile(file);
      setApplicationError('');
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-talento-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
    return (
      <CareersPage onBack={handleBackFromCareers} />
    );
  }

  if (currentView === 'dashboard' && user) {
    return (
      <DashboardPage 
        user={user}
        userProfile={userProfile}
        initialEditMode={initialDashboardEditMode}
        onBack={() => setCurrentView('home')}
        onSignOut={handleSignOut}
        onProfileUpdate={(updatedProfile: React.SetStateAction<UserProfile | null>) => setUserProfile(updatedProfile)}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.jpg" alt="TALENTO" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <a href="#home" className="text-gray-700 hover:text-talento-600 px-3 py-2 text-base md:text-lg font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-talento-600 px-3 py-2 text-base md:text-lg font-medium transition-colors">About</a>
              <button
                onClick={() => window.open('https://app.talento.agency/', '_blank')}
                className="text-gray-700 hover:text-talento-600 px-3 py-2 text-base md:text-lg font-medium transition-colors"                
              >
                Careers
              </button>
              <a href="#contact" className="text-gray-700 hover:text-talento-600 px-3 py-2 text-base md:text-lg font-medium transition-colors">Contact</a>
              <a href="#apply" className="text-gray-700 hover:text-talento-600 px-3 py-2 text-base md:text-lg font-medium transition-colors">Apply</a>
              {user ? (
                <div className="relative" data-profile-dropdown>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-2 ring-talento-100">
                      {userProfile?.profile_photo_url ? (
                        <img
                          src={userProfile.profile_photo_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setInitialDashboardEditMode(false);
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Edit Profile
                      </button>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                  className="bg-talento-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-talento-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-talento-600 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-900 hover:text-talento-600 block px-3 py-2 text-base font-medium">Home</a>
              <button
  onClick={() => {
    window.location.href = 'https://app.talento.agency/';
  }}
  className="flex items-center w-full text-left text-gray-700 px-3 py-2 text-base font-medium hover:bg-gray-50 transition-colors"
>
  Careers
</button>
              <a href="#about" className="text-gray-700 hover:text-talento-600 block px-3 py-2 text-base font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-talento-600 block px-3 py-2 text-base font-medium">Contact</a>
              <a href="#apply" className="text-gray-700 hover:text-talento-600 block px-3 py-2 text-base font-medium">Apply</a>
              {user ? (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center px-3 py-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-2 ring-talento-100 mr-3">
                      {userProfile?.profile_photo_url ? (
                        <img
                          src={userProfile.profile_photo_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('dashboard');
                      setInitialDashboardEditMode(false);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left text-gray-700 px-3 py-2 text-base font-medium hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('dashboard');
                      setInitialDashboardEditMode(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left text-gray-700 px-3 py-2 text-base font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left text-red-600 px-3 py-2 text-base font-medium hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCurrentView('auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-talento-600 text-white px-3 py-2 text-base font-medium hover:bg-talento-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      
      <section
  id="home"
  className="relative bg-gradient-to-br from-slate-50 to-talento-50 pt-24 pb-16 md:pt-32 md:pb-0 lg:py-24 lg:min-h-screen overflow-hidden"
>
  {/* Animated background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-talento-200 rounded-full filter blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-talento-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
  </div>
  
  {/* Animated connection lines - hidden on mobile for performance */}
  <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M100,200 Q400,100 700,200" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-draw" />
      <path d="M100,300 Q400,400 700,300" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-draw" style={{ animationDelay: '1s' }} />
    </svg>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16">

      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left mb-12 lg:mb-0 pb-0">
        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-talento-100 text-talento-700 rounded-full text-sm font-medium mb-4">
            Connecting Talent with Opportunity
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          Scale your team with<br />
          <span className="text-talento-600">high quality, vetted</span><br />
          professionals
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-10 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 leading-relaxed">
          From dynamic start-ups to multinational corporations, exceptional leadership is the key to success. 
          <strong className="font-semibold"> TALENTO</strong> specializes in cultivating that leadership through strategic talent acquisition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-10">
        <button
  onClick={() => window.open('https://app.talento.agency/', '_blank')}
  className="group relative overflow-hidden bg-talento-600 hover:bg-talento-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
>
  <span className="relative z-10 flex items-center">
    <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
    Explore Careers
  </span>
  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
</button>
          <a 
            href="https://calendly.com/talentoagency2/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white hover:bg-gray-50 text-talento-600 border border-talento-200 px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center">
              Schedule a Consultation
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </a>
        </div>
        
        {/* Stats bar - responsive */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
          <div className="text-center lg:text-left">
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Placements</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
        </div>
      </div>

{/* Right Image - with professional animation */}
<div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-0 lg:mt-0">

  {/* Animated nodes - hidden on mobile */}
  <div className="hidden lg:block absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-talento-400 rounded-full animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-talento-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-talento-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-talento-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
  </div>

  {/* Image container with enhanced animation effects */}
  <div className="relative p-1 sm:p-2 lg:p-1 rounded-3xl shadow-2xl bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md border border-white/50 w-[85%] sm:w-[75%] md:w-[65%] lg:w-full overflow-hidden">

    {/* Gradient overlay for depth */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-talento-100/30 to-transparent"></div>

    {/* Animated glowing ring behind image */}
    <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-talento-300/40 via-talento-200/30 to-transparent blur-3xl animate-pulse-slow"></div>

    {/* Subtle orbit animation elements */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] border border-talento-300/20 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] border border-talento-400/10 rounded-full animate-reverse-spin-slow"></div>
    </div>

    {/* Main image */}
    <div className="relative overflow-hidden rounded-3xl z-10">
      <img
        src="/talento.hero.webp"
        alt="Talento Hero"
        className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl"></div>
    </div>
    </div>
</div>
    </div>
  </div>
</section>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive talent acquisition solutions tailored to your organization's unique needs
          </p>
        </div>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: C-Suite Talent Hunt */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">C-Suite Talent Hunt</h3>
            <p className="text-gray-600 leading-relaxed text-center">Executive leadership recruitment for the highest organizational levels</p>
          </div>
          
          {/* Card 2: Premium Executive Search */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Premium Executive Search</h3>
            <p className="text-gray-600 leading-relaxed text-center">Comprehensive search solutions for senior management positions</p>
          </div>
          
          {/* Card 3: Interim Permanent Impact Recruitment */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Interim Permanent Impact Recruitment</h3>
            <p className="text-gray-600 leading-relaxed text-center">Strategic interim and permanent placement solutions</p>
          </div>
          
          {/* Card 4: Business Critical & Niche Role Discovery */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Business Critical & Niche Role Discovery</h3>
            <p className="text-gray-600 leading-relaxed text-center">Specialized recruitment for mission-critical positions</p>
          </div>
          
          {/* Card 5: Specialist Talent Sourcing */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Specialist Talent Sourcing</h3>
            <p className="text-gray-600 leading-relaxed text-center">Expert sourcing for highly specialized technical roles</p>
          </div>
          
          {/* Card 6: On-Demand Freelancer Search */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-talento-600/20 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-talento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">On-Demand Freelancer Search</h3>
            <p className="text-gray-600 leading-relaxed text-center">Flexible talent solutions for project-based requirements</p>
          </div>
        </div>
      </div>
      
      <section id="industries" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries Expertise</h2>
            <p className="text-xl text-gray-600 mb-2">Your Industry. Our Network.</p>
            <p className="text-lg text-talento-600 font-semibold">Global Leaders, Delivered.</p>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              We work across dynamic sectors, connecting exceptional talent with forward-thinking organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                Tech Business | Start-ups
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                Apparel Business
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                  <circle cx="20" cy="10" r="2"></circle>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                Healthcare & Life Science
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                FMCG & Marketplaces
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                  <line x1="6" x2="6" y1="2" y2="4"></line>
                  <line x1="10" x2="10" y1="2" y2="4"></line>
                  <line x1="14" x2="14" y1="2" y2="4"></line>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                Hospitality
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                NGO & International Organizations
              </h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-talento-50 transition-colors group">
              <div className="text-gray-600 group-hover:text-talento-600 mb-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M7 20h10"></path>
                  <path d="M10 20c5.5-2.5.8-6.4 3-10"></path>
                  <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"></path>
                  <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-talento-600 transition-colors">
                Agri-Business
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose TALENTO?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                As a boutique firm, we provide personalized attention and deep industry expertise that larger firms cannot match. Our proven methodology ensures successful placements that drive organizational success.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-talento-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rigorous Vetting Process</h4>
                    <p className="text-gray-600">Multi-stage assessment ensuring cultural and technical fit</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-talento-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Industry Expertise</h4>
                    <p className="text-gray-600">Deep knowledge across technology, healthcare, and FMCG sectors</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-talento-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Confidential Process</h4>
                    <p className="text-gray-600">Discreet handling of sensitive executive searches</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-talento-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Long-term Partnership</h4>
                    <p className="text-gray-600">Ongoing support and relationship management</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-talento-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Track Record</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-talento-100">Successful Placements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-talento-100">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-talento-100">Partner Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-talento-100">Industry Sectors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's Discuss Your Hiring Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to find exceptional talent? Contact us to discuss how we can help you build a world-class team.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-talento-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@talento.agency</p>
                    <p className="text-gray-600">hire.rubz@talento.agency</p>
                    <p className="text-gray-600">hire.tuli@talento.agency</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-talento-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+880-19730-591514</p>
                    <p className="text-gray-600">+880-01341-749853</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-talento-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="h-6 w-6 text-talento-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">LinkedIn</h4>
                    <a
                      href="https://www.linkedin.com/company/talento-bespoke-premium-headhunting/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-talento-600 transition"
                    >
                      linkedin.com/talento-agency
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={contactForm.full_name}
                      onChange={(e) => setContactForm({...contactForm, full_name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Tell us about your hiring needs..."
                  />
                </div>
                {contactError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-700 text-sm">{contactError}</p>
                    </div>
                  </div>
                )}
                {contactSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <p className="text-green-700 text-sm">Thank you! We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full bg-talento-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-talento-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Candidate Application Section */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Talent Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Are you an exceptional professional looking for your next career opportunity? Submit your application to be considered for exclusive positions.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleCandidateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="candidate-name" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="candidate-name"
                    required
                    value={candidateForm.full_name}
                    onChange={(e) => setCandidateForm({...candidateForm, full_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="candidate-citizenship" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Citizenship *
                  </label>
                  <input
                    type="text"
                    id="candidate-citizenship"
                    required
                    value={candidateForm.citizenship}
                    onChange={(e) => setCandidateForm({...candidateForm, citizenship: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Your citizenship"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="candidate-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="candidate-phone"
                    required
                    value={candidateForm.phone}
                    onChange={(e) => setCandidateForm({...candidateForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="+880 1234-567890"
                  />
                </div>
                
                <div>
                  <label htmlFor="candidate-email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="candidate-email"
                    required
                    value={candidateForm.email}
                    onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="candidate-role" className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="inline w-4 h-4 mr-1" />
                    Main Role *
                  </label>
                  <select
                    id="candidate-role"
                    required
                    value={candidateForm.main_role}
                    onChange={(e) => setCandidateForm({...candidateForm, main_role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your main role</option>
                    <option value="Executive/C-Suite">Executive/C-Suite</option>
                    <option value="Senior Management">Senior Management</option>
                    <option value="Middle Management">Middle Management</option>
                    <option value="Technical Lead">Technical Lead</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="candidate-sector" className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline w-4 h-4 mr-1" />
                    Business Sector *
                  </label>
                  <select
                    id="candidate-sector"
                    required
                    value={candidateForm.business_sector}
                    onChange={(e) => setCandidateForm({...candidateForm, business_sector: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select business sector</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="FMCG">FMCG</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="candidate-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="candidate-title"
                    required
                    value={candidateForm.job_title}
                    onChange={(e) => setCandidateForm({...candidateForm, job_title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Your current job title"
                  />
                </div>
                
                <div>
                  <label htmlFor="candidate-employer" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Employer *
                  </label>
                  <input
                    type="text"
                    id="candidate-employer"
                    required
                    value={candidateForm.current_employer}
                    onChange={(e) => setCandidateForm({...candidateForm, current_employer: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                    placeholder="Your current company"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="candidate-linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                  <Linkedin className="inline w-4 h-4 mr-1" />
                  LinkedIn Profile URL *
                </label>
                <input
                  type="url"
                  id="candidate-linkedin"
                  required
                  value={candidateForm.linkedin_url}
                  onChange={(e) => setCandidateForm({...candidateForm, linkedin_url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-talento-500 focus:border-transparent transition-colors"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label htmlFor="candidate-cv" className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Upload CV/Resume
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-talento-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="candidate-cv"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-talento-600 hover:text-talento-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-talento-500"
                      >
                        <span>Upload a file</span>
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
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                    {cvFile && (
                      <p className="text-sm text-talento-600 font-medium">{cvFile.name}</p>
                    )}
                  </div>
                </div>
              </div>
              {applicationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-700 text-sm">{applicationError}</p>
                  </div>
                </div>
              )}
              {applicationSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <p className="text-green-700 text-sm">
                      Application submitted successfully! We'll review your profile and contact you if there's a suitable opportunity.
                    </p>
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmittingApplication}
                className="w-full bg-talento-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-talento-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isSubmittingApplication ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo.jpg" alt="TALENTO" className="h-10 w-auto mb-4" />
              <p className="text-gray-300 leading-relaxed max-w-md">
                TALENTO is a boutique headhunting firm specializing in executive search and leadership recruitment. We connect exceptional talent with forward-thinking organizations.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Executive Search</li>
                <li>Leadership Recruitment</li>
                <li>Specialized Recruitment</li>
                <li>Talent Advisory</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>info@talento.agency</li>
                <li>+880-19730-591514</li>
                <li>Uttara, Dhaka-1230, Bangladesh</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TALENTO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;