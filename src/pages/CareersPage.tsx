import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase, 
  Heart, 
  Star,
  ChevronRight,
  Mail,
  Calendar,
  Building,
  Globe,
  Award,
  Coffee,
  Zap,
  Shield,
  TrendingUp,
  Target,
  BookOpen,
  Headphones,
  Share2
} from 'lucide-react';

interface CareersPageProps {
  onBack: () => void;
  initialJobId?: string | null;
  onJobIdChange?: (jobId: string | null) => void;
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange?: string;
  remote: boolean;
  deadline: string;
  description: string;
  responsibilities: string[];
  required: string[];
  preferred: string[];
  benefits: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: 'Unique Code',
    title: 'AI Data Labelling Associate-2',
    department: 'Machine Learning, Data Annotation',
    location: 'Uttara, Dhaka, Bangladesh',
    type: 'Full-time',
    salaryRange: 'BDT 16,000 - 22,000',
    remote: false,
    deadline: '2024-07-31',
    description: 'Bridging human excellence and machine efficiency, our client provides high-quality training data at scale through powerful annotation technology and a dedicated service team. An end-to-end solution for machine learning needs, it empowers AI companies to achieve accelerated, scalable results—without sacrificing precision or quality.',
    responsibilities: [
      'Analyze and review team members\' work output against guidelines/standards and provide feedback',
      'Identify team members\' strengths and weaknesses. Provide feedback to Delivery Leads on identified areas that individual members of the team need to improve on for coaching',
      'Liaise with Delivery Leads to ensure that feedback and the identified quality gaps are addressed with the individual/team members',
      'Manage a team of up to 10 annotators/ delivery assistant',
      'Identify project-specific challenges and communicate them with the Delivery Lead and Project Management team accordingly',
      'Collaborate with the management team to ensure that best quality assurance and annotation standards are revised and updated where need be',
      'Ensure real-time tracking of Project Charter',
      'Provide feedback and recommendations on recurring and widespread gaps that should be addressed through training',
      'Keep an up-to-date record of team members\' quality performance for use in performance reviews',
      'Participate in team briefings to understand the project guidelines and requirements',
      'Prepare the Quality Assurance process as per the project requirements',
      'Assist Delivery Lead in preparing reports for projects (if needed)',
      'Ensure all team members meet their quality expectations and deadlines',
      'Perform ad-hoc daily tasks when necessary. Tasks include annotations, training, onboarding new annotators, maintaining daily progress reports, etc.'
    ],
    required: [
      'Graduation Degree from any reputed university preferably in Computer Science or Business',
      'Excellent communication skills in English, both verbal and written',
      'Proficiency in Microsoft Office and Google Ecosystem',
      'Preferable 0-1 year of experience working with any BPO company. Freshers are also encouraged to apply',
      'Experience in working with a start-up will be an advantage'
    ],
    preferred: [
      'Highly organized and able to multitask',
      'Strong attention to detail and problem-solving skills',
      'Able to work independently and as part of a team',
      'Ability to lead a team'
    ],
    benefits: ['Yearly Salary Review', 'Festival Bonus', 'Working Days: Sunday – Friday (Sunday is Work from Home)', 'Working Hours: 9:30 am – 6:30 pm']
  },
  {
    id: 'sr-executive-recruitment',
    title: 'Sr. Executive - Recruitment and Employer Branding',
    department: 'Machine Learning, Data Annotation',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    salaryRange: 'Negotiable based on experience',
    remote: false,
    deadline: '2025-08-31',
    description: 'Our client combines human expertise with machine efficiency to deliver high-quality annotated data at scale. They help AI companies achieve faster, scalable results without compromising precision or quality. Their clients range from ambitious startups and academic institutions to Fortune 500 companies, spanning industries like autonomous driving, retail, security, and geospatial. They proudly support a global network of customers across all continents. Despite our growth, they remain committed to transparency, fair pricing, personalized service, and delivering exceptional results.',
    responsibilities: [
      'Talent Acquisition Strategy: Develop and implement strategic hiring plans for both local and international markets based on current and future needs.',
      'Full Cycle Recruitment: Manage the recruitment process, from job requisition to onboarding for technical and non-technical roles.',
      'Global Hiring: Source, engage and hire talent from global markets while understanding regional labor laws, market trends and sourcing best practices.',
      'Employer Branding: Partner with the marketing and leadership teams to promote clients\' AI as an employer of choice in key markets.',
      'Stakeholder Management: Collaborate with hiring managers and leadership across departments to deeply understand hiring requirements and provide guidance on talent market availability.',
      'ATS & Data Management: Maintain accurate records and reports in Applicant Tracking System (ATS); analyze metrics to improve recruitment performance.',
      'Talent Pipeline Building: Proactively build and maintain a pipeline of high-quality candidates for critical and frequently hired roles.',
      'Diversity & Inclusion: Champion diversity hiring and inclusive recruitment practices.',
      'Vendor and platform management: Manage relationships with third-party recruiters, job boards, and global talent platforms.'
    ],
    required: [
      '2-4 years of proven experience in full-cycle recruiting, especially in Tech/AI/Outsourcing Sectors.',
      'Experience in hiring across local and international markets.',
      'Strong knowledge of global sourcing strategies and tools (LinkedIn Recruiter, Boolean search, global job boards, etc.)',
      'Exceptional communication, negotiation, and stakeholder management skills.',
      'Hands-on experience with Applicant Tracking System (e.g,. Greenhouse, Lever, or equivalent)',
      'Ability to manage multiple priorities in a fast-paced environment.',
      'Passion for building diverse, high-performing teams.',
      'Bachelor\'s degree in HR, Business, or related field (Master\'s is a plus)'
    ],
    preferred: [
      'Experience in hiring for AI/ML, data annotation, or tech-driven service companies.',
      'Prior exposure to working in start-ups or high-growth environments.'
    ],
    benefits: [
      'Competitive salary and festival bonuses to reward your hard work and achievements.',
      'The chance to collaborate with a dynamic team, working with clients across diverse industries and continents.',
      'Opportunities to make a tangible impact on our growth and contribute to projects that are shaping the future of AI.',
      'A fast-paced, high-energy environment where innovation, ambition, and teamwork thrive.',
      'Education and training assistance stipends to support your professional development.',
      'Clear growth opportunities to advance your career within the company.'
    ]
  }
];

export function CareersPage({ onBack, initialJobId = null, onJobIdChange }: CareersPageProps) {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    // Set the current URL when component mounts
    setCurrentUrl(window.location.href);
    
    // Check for job ID in URL hash on component mount
    const hash = window.location.hash;
    if (hash.startsWith('#careers/')) {
      const jobId = hash.substring(9); // Remove '#careers/' prefix
      const job = jobPostings.find(j => j.id === jobId);
      if (job) {
        setSelectedJob(job);
        if (onJobIdChange) {
          onJobIdChange(jobId);
        }
      }
    } else if (initialJobId) {
      const job = jobPostings.find(j => j.id === initialJobId);
      if (job) {
        setSelectedJob(job);
      }
    }
  }, [initialJobId, onJobIdChange]);
  
  // Function to check if job is active based on deadline
  const isJobActive = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return today <= deadlineDate;
  };
  
  // Function to handle sharing job
  const handleShareJob = (job: JobPosting) => {
    // Create a shareable URL with the correct careers page URL and job ID as a hash parameter
    const baseUrl = 'https://talento.agency/careerspage';
    const shareUrl = `${baseUrl}#careers/${job.id}`;
    const text = `Check out this job opportunity: ${job.title} at ${job.department}`;
    
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: job.title,
        text: text,
        url: shareUrl,
      })
      .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text}\n${shareUrl}`)
        .then(() => {
          alert('Job link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  // Function to close job details modal and update URL
  const closeJobDetails = () => {
    setSelectedJob(null);
    if (onJobIdChange) {
      onJobIdChange(null);
    }
    
    // Update URL to include the careers hash without a specific job ID
    const baseUrl = 'https://talento.agency/careerspage';
    window.history.pushState({}, '', `${baseUrl}#careers/job-id`);
  };
  
  // Function to handle viewing job details
  const handleViewJobDetails = (job: JobPosting) => {
    setSelectedJob(job);
    if (onJobIdChange) {
      onJobIdChange(job.id);
    }
    // Update URL to include the job ID
    const baseUrl = 'https://talento.agency/careerspage';
    window.history.pushState({}, '', `${baseUrl}#careers/${job.id}`);
  };
  
  const handleApply = (jobId: string) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job) {
      const subject = `Application for ${job.title} Position`;
      const body = `Dear TALENTO Hiring Team,
I am writing to express my interest in the ${job.title} position in the ${job.department} department.
Please find my resume attached. I look forward to discussing how my skills and experience align with your requirements.
Best regards,
[Your Name]`;
      
      window.location.href = `mailto:apply2@talento.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };
  
  const renderJobCard = (job: JobPosting) => {
    const active = isJobActive(job.deadline);
    
    return (
      <div 
        key={job.id} 
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-talento-200 cursor-pointer"
        onClick={() => handleViewJobDetails(job)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {active ? 'Active' : 'Expired'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {job.department}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.type}
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            {job.salaryRange && (
              <div className="flex items-center text-talento-600 font-semibold mb-1">
                {job.salaryRange}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {job.remote ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Remote OK</span>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Onsite</span>
              )}
              <span className="bg-talento-100 text-talento-800 text-xs px-2 py-1 rounded-full">{job.type}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Apply by {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShareJob(job);
              }}
              className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors flex items-center flex-1 sm:flex-none"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApply(job.id);
              }}
              disabled={!active}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center flex-1 sm:flex-none ${
                active 
                  ? 'bg-gradient-to-r from-talento-600 to-talento-700 text-white hover:from-talento-700 hover:to-talento-800' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              {active ? 'Apply Now' : 'Expired'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderJobDetails = (job: JobPosting) => {
    const active = isJobActive(job.deadline);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mr-3">{job.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {active ? 'Active' : 'Expired'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  {job.remote ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Remote OK</span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Onsite</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareJob(job);
                  }}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={closeJobDetails}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Role</h3>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-talento-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Qualifications</h3>
              <ul className="space-y-2">
                {job.required.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-talento-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Qualifications</h3>
              <ul className="space-y-2">
                {job.preferred.map((preference, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{preference}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Offer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center bg-talento-50 rounded-lg p-3">
                    <Star className="w-4 h-4 text-talento-600 mr-2" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            {job.salaryRange && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-talento-600 mr-2" />
                  <span className="font-semibold text-gray-900">Salary Range: </span>
                  <span className="text-talento-600 font-semibold ml-1">{job.salaryRange}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 gap-4">
              <div className="text-sm text-gray-500">
                Application deadline: {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job.id);
                }}
                disabled={!active}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center w-full sm:w-auto ${
                  active 
                    ? 'bg-gradient-to-r from-talento-600 to-talento-700 text-white hover:from-talento-700 hover:to-talento-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Mail className="w-5 h-5 mr-2" />
                {active ? 'Apply for This Position' : 'Application Period Ended'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="inline-flex items-center text-talento-600 hover:text-talento-700 transition-colors mr-6 font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <img src="/logo.jpg" alt="TALENTO" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-talento-600 to-talento-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-talento-100 mb-8 max-w-3xl mx-auto">
            Build your career with TALENTO and help shape the future of talent acquisition. 
            We're looking for passionate individuals who want to make a difference.
          </p>
          <button
            className="bg-white text-talento-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View Open Positions
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting opportunities to grow your career with us. We're always looking for talented individuals to join our team.
          </p>
        </div>
        
        <div className="space-y-6">
          {jobPostings.map(renderJobCard)}
        </div>
      </div>
      
      {/* Job Details Modal */}
      {selectedJob && renderJobDetails(selectedJob)}
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-talento-600 to-talento-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl text-talento-100 mb-8">
            Don't see a position that fits? We're always interested in hearing from talented individuals.
          </p>
          <a
            href="https://talento.agency/#apply"
            className="inline-flex items-center bg-white text-talento-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send Us Your Resume
          </a>
        </div>
      </div>
    </div>
  );
}
