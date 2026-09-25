import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Mail, 
  Calendar, 
  Building, 
  Share2,
  CheckCircle,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

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
    id: 'ai-data-labelling-associate',
    title: 'AI Data Labelling Associate-2',
    department: 'Machine Learning, Data Annotation',
    location: 'Uttara, Dhaka, Bangladesh',
    type: 'Full-time',
    salaryRange: 'BDT 16,000 - 22,000',
    remote: false,
    deadline: '2026-12-31',
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
    deadline: '2026-12-31',
    description: 'Our client combines human expertise with machine efficiency to deliver high-quality annotated data at scale. They help AI companies achieve faster, scalable results without compromising precision or quality. Their clients range from ambitious startups and academic institutions to Fortune 500 companies, spanning industries like autonomous driving, retail, security, and geospatial.',
    responsibilities: [
      'Develop and execute proactive sourcing strategies across multiple channels (job portals, LinkedIn, university networks, communities) to attract top-tier talent.',
      'Manage the full recruitment lifecycle: job posting, screening, interviewing, shortlisting, and candidate offer management.',
      'Build and nurture strong talent pipelines for ongoing and future hiring needs, with a focus on AI/ML and data operations roles.',
      'Lead and amplify employer branding initiatives across LinkedIn and other social platforms to position the company as an employer of choice.',
      'Collaborate with hiring managers to understand role requirements and provide market insights on talent availability and compensation trends.',
      'Track and report recruitment metrics (time-to-hire, cost-per-hire, source effectiveness) to drive continuous improvement.',
      'Represent the company at campus recruitment drives, job fairs, and industry networking events.'
    ],
    required: [
      '2–4 years of proven recruitment experience (agency or in-house), preferably within tech, BPO, or fast-growing startups',
      'Demonstrated expertise in LinkedIn sourcing, boolean search, and direct candidate outreach',
      'Experience managing end-to-end hiring processes independently',
      'Strong employer branding knowledge with hands-on experience in content creation or campaign management on professional networks',
      'Outstanding interpersonal and communication skills in English (both verbal and written)',
      'Data-driven approach with experience using ATS platforms and HR analytics tools',
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#careers/')) {
      const jobId = hash.substring(9);
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

  const isJobActive = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return today <= deadlineDate;
  };

  const handleShareJob = (job: JobPosting) => {
    const baseUrl = 'https://www.talento.agency/careers';
    const shareUrl = `${baseUrl}#careers/${job.id}`;
    const text = `Check out this job opportunity: ${job.title} at ${job.department}`;

    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: text,
        url: shareUrl,
      }).catch(() => {
        // Fallback silently
      });
    } else {
      navigator.clipboard.writeText(`${text}\n${shareUrl}`)
        .then(() => {
          alert('Job link copied to clipboard!');
        })
        .catch(() => {});
    }
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
    if (onJobIdChange) {
      onJobIdChange(null);
    }
    window.history.pushState({}, '', 'https://www.talento.agency/#careers');
  };

  const handleViewJobDetails = (job: JobPosting) => {
    setSelectedJob(job);
    if (onJobIdChange) {
      onJobIdChange(job.id);
    }
    window.history.pushState({}, '', `https://www.talento.agency/#careers/${job.id}`);
  };

  const handleApply = (jobId: string) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job) {
      const subject = `Application for ${job.title} Position`;
      const body = `Dear TALENTO Hiring Team,\n\nI am writing to express my interest in the ${job.title} position in the ${job.department} department.\n\nPlease find my resume attached. I look forward to discussing how my skills and experience align with your requirements.\n\nBest regards,\n[Your Name]`;
      window.location.href = `mailto:apply2@talento.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const jobSchemas = jobPostings.map(job => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: '2025-06-01',
    validThrough: `${job.deadline}T23:59:59Z`,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'TALENTO',
      sameAs: 'https://www.talento.agency',
      logo: 'https://www.talento.agency/logo.png'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'BD'
      }
    }
  }));

  const renderJobCard = (job: JobPosting) => {
    const active = isJobActive(job.deadline);

    return (
      <article
        key={job.id}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-talento-200 dark:hover:border-talento-600 cursor-pointer"
        onClick={() => handleViewJobDetails(job)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">{job.title}</h3>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {active ? 'Active' : 'Expired'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1 text-talento-600 dark:text-talento-400" />
                {job.department}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-talento-600 dark:text-talento-400" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-talento-600 dark:text-talento-400" />
                {job.type}
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            {job.salaryRange && (
              <div className="text-talento-600 dark:text-talento-400 font-semibold mb-1">
                {job.salaryRange}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {job.remote ? (
                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-full font-medium">Remote OK</span>
              ) : (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-medium">Onsite</span>
              )}
              <span className="bg-talento-100 text-talento-800 dark:bg-talento-900/40 dark:text-talento-300 text-xs px-2 py-1 rounded-full font-medium">{job.type}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{job.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            Apply by {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleShareJob(job);
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium text-sm transition-colors flex items-center flex-1 sm:flex-none"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleApply(job.id);
              }}
              disabled={!active}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center flex-1 sm:flex-none ${
                active 
                  ? 'bg-talento-600 text-white hover:bg-talento-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              {active ? 'Apply Now' : 'Expired'}
            </button>
          </div>
        </div>
      </article>
    );
  };

  const renderJobDetails = (job: JobPosting) => {
    const active = isJobActive(job.deadline);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 sm:px-8 py-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
            <button
              type="button"
              onClick={closeJobDetails}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-talento-600 dark:text-talento-400" />
                {job.department}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-talento-600 dark:text-talento-400" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-talento-600 dark:text-talento-400" />
                {job.type}
              </div>
              {job.salaryRange && (
                <div className="text-talento-600 dark:text-talento-400 font-semibold">
                  {job.salaryRange}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About the Role</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Required Qualifications</h3>
              <ul className="space-y-2">
                {job.required.map((req, i) => (
                  <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {job.preferred.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Preferred Qualifications</h3>
                <ul className="space-y-2">
                  {job.preferred.map((pref, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{pref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What We Offer</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-talento-600 dark:text-talento-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700 gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Application deadline: {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job.id);
                }}
                disabled={!active}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center w-full sm:w-auto ${
                  active 
                    ? 'bg-talento-600 text-white hover:bg-talento-700' 
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <SEO
        title={selectedJob ? `${selectedJob.title} - Careers` : 'Careers - Open Executive & Specialized Positions'}
        description={selectedJob ? selectedJob.description.slice(0, 155) : 'Explore executive search, leadership, and talent acquisition opportunities at TALENTO. Browse open roles and join our premier network.'}
        canonicalUrl="https://www.talento.agency/careers"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.talento.agency/' },
          { name: 'Careers', item: 'https://www.talento.agency/careers' }
        ]}
        schemas={jobSchemas}
      />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center text-talento-600 dark:text-talento-400 hover:text-talento-700 dark:hover:text-talento-300 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <img
                src="/logo.png"
                alt="TALENTO Logo"
                width="120"
                height="40"
                className="h-10 w-auto"
              />
            </div>
            <Breadcrumbs
              items={[
                { name: 'Home', onClick: onBack },
                { name: 'Careers' }
              ]}
              className="hidden sm:flex"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-talento-700 to-talento-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team & Talent Network</h1>
          <p className="text-xl text-talento-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build your career with TALENTO and help shape executive search and leadership recruitment across high-growth industries.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Open Positions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover opportunities to grow your career. We are always looking for exceptional individuals to join our network.
          </p>
        </div>

        <div className="space-y-6">
          {jobPostings.map(renderJobCard)}
        </div>
      </main>

      {/* Job Details Modal */}
      {selectedJob && renderJobDetails(selectedJob)}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-talento-800 to-talento-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Talent Network?</h2>
          <p className="text-xl text-talento-100 mb-8">
            Don't see a position that fits your profile? We are always interested in connecting with high-caliber talent.
          </p>
          <a
            href="https://www.talento.agency/#apply"
            onClick={onBack}
            className="inline-flex items-center bg-white text-talento-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send Us Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}

export default CareersPage;
