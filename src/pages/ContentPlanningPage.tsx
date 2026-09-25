import React, { useState, useMemo } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Layers,
  Target,
  Users,
  Compass,
  Link2,
  Calendar,
  Sparkles,
  ChevronRight,
  X,
  FileCheck,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  CONTENT_PLAN_CATEGORIES,
  contentPlanDatabase,
  filterContentPlans,
  getContentPlanningMetrics
} from '../data/contentPlan';
import {
  ContentPlanningCategory,
  ContentPlanRecord,
  EditorialStatus,
  SearchIntent,
  TargetAudience
} from '../types/contentPlan';

interface ContentPlanningPageProps {
  onBackToHome?: () => void;
  onNavigateService?: (slug: string) => void;
  onNavigateIndustry?: (slug: string) => void;
  onNavigateRole?: (slug: string) => void;
  onNavigateLocation?: (slug: string) => void;
}

export const ContentPlanningPage: React.FC<ContentPlanningPageProps> = ({
  onBackToHome,
  onNavigateService,
  onNavigateIndustry,
  onNavigateRole,
  onNavigateLocation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ContentPlanningCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<EditorialStatus | 'All'>('All');
  const [selectedIntent, setSelectedIntent] = useState<SearchIntent | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<ContentPlanRecord | null>(null);

  const metrics = useMemo(() => getContentPlanningMetrics(), []);

  const filteredRecords = useMemo(() => {
    return filterContentPlans({
      category: selectedCategory,
      status: selectedStatus,
      searchIntent: selectedIntent,
      searchQuery: searchQuery
    });
  }, [selectedCategory, selectedStatus, selectedIntent, searchQuery]);

  const getStatusBadge = (status: EditorialStatus, publishReady: boolean) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" /> Published
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'in-review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> In Review
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <FileText className="w-3.5 h-3.5" /> Draft
          </span>
        );
      case 'planned':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Calendar className="w-3.5 h-3.5" /> Planned
          </span>
        );
    }
  };

  const getIntentBadge = (intent: SearchIntent) => {
    switch (intent) {
      case 'commercial':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'transactional':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'informational':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const renderEntityList = (
    entities: string | string[],
    type: 'service' | 'industry' | 'role' | 'location'
  ) => {
    const list = Array.isArray(entities) ? entities : [entities];
    return (
      <div className="flex flex-wrap gap-1.5">
        {list.map((item) => (
          <span
            key={item}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            onClick={() => {
              if (type === 'service' && onNavigateService) onNavigateService(item);
              if (type === 'industry' && onNavigateIndustry) onNavigateIndustry(item);
              if (type === 'role' && onNavigateRole) onNavigateRole(item);
              if (type === 'location' && onNavigateLocation) onNavigateLocation(item);
            }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <SEO
        title="Structured Content Planning & Editorial Governance | TALENTO"
        description="Strategic content planning architecture across 10 recruitment categories. Enforcing strict human review and approval workflows before publishing."
        canonical="https://talento.agency/content-planning"
        ogType="website"
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Editorial Governance', href: '/content-planning' }
            ]}
          />

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Editorial Review & Quality Governance
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                TALENTO Content Planning System
              </h1>
              <p className="mt-2 text-base text-slate-300 max-w-3xl">
                Structured editorial pipeline spanning 10 core hiring disciplines. Ensures strict verification,
                keyword clustering, search intent calibration, and manual human approval prior to release.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">{metrics.totalRecords}</div>
                <div className="text-xs text-slate-400 mt-0.5">Planned Articles</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{metrics.approvedCount}</div>
                <div className="text-xs text-slate-400 mt-0.5">Human Approved</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">{metrics.inReviewCount + metrics.draftCount}</div>
                <div className="text-xs text-slate-400 mt-0.5">In Pipeline</div>
              </div>
            </div>
          </div>

          {/* Strict Human Review Banner */}
          <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="font-semibold text-amber-300">Strict Non-Automated Publishing Policy:</strong>{' '}
              TALENTO adheres to strict human-in-the-loop review. No AI-generated or synthetic articles are published automatically.
              Every article record must have verified statistics, peer-reviewed executive outlines, explicit cross-entity link targets,
              and formal governance approval before status is set to <code className="bg-amber-950/60 px-1 py-0.5 rounded text-amber-200">published</code>.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills Navigation (All 10 Categories) */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            10 Content Categories ({metrics.totalRecords} Total Planned)
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories ({metrics.totalRecords})
            </button>
            {CONTENT_PLAN_CATEGORIES.map((cat) => {
              const count = metrics.categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, primary keyword, secondary cluster..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-start md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="in-review">In Review</option>
                <option value="draft">Draft</option>
                <option value="planned">Planned</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Intent:</span>
              <select
                value={selectedIntent}
                onChange={(e) => setSelectedIntent(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
              >
                <option value="All">All Search Intents</option>
                <option value="commercial">Commercial</option>
                <option value="informational">Informational</option>
                <option value="transactional">Transactional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Plan Records List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Showing {filteredRecords.length} structured content records</span>
            <span>Governance: Human Review Required</span>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No content records match the criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-5 shadow-sm hover:shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Main Content Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {record.category}
                        </span>
                        {getStatusBadge(record.editorialWorkflow.status, record.editorialWorkflow.publishReady)}
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium border ${getIntentBadge(
                            record.searchIntent
                          )}`}
                        >
                          Intent: {record.searchIntent}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          Audience: {record.audience}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {record.title}
                      </h3>

                      <div className="text-xs text-slate-500 font-mono">
                        Slug: <span className="text-slate-700 font-semibold">/insights/{record.slug}</span>
                      </div>

                      {/* Keywords Matrix */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-700 shrink-0">Primary Keyword:</strong>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {record.primaryKeyword}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <strong className="text-slate-700 shrink-0">Keyword Cluster:</strong>
                          {record.secondaryKeywords.map((sec) => (
                            <span
                              key={sec}
                              className="bg-white px-2 py-0.5 rounded text-slate-600 border border-slate-200"
                            >
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Relational Entity Cross-Links */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-xs">
                        <div>
                          <span className="text-slate-400 block font-medium">Related Service:</span>
                          {renderEntityList(record.relatedService, 'service')}
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Related Industry:</span>
                          {renderEntityList(record.relatedIndustry, 'industry')}
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Related Role:</span>
                          {renderEntityList(record.relatedRole, 'role')}
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Related Location:</span>
                          {renderEntityList(record.relatedLocation, 'location')}
                        </div>
                      </div>
                    </div>

                    {/* CTA & Editorial Governance Side Panel */}
                    <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-5 flex flex-col justify-between space-y-4">
                      {/* CTA Configuration */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="text-xs font-semibold text-slate-700 flex items-center gap-1 mb-1">
                          <Target className="w-3.5 h-3.5 text-emerald-600" />
                          Configured CTA Action:
                        </div>
                        <div className="text-xs text-slate-800 font-medium">{record.cta.action}</div>
                        <div className="text-xs text-slate-500 mt-1">Goal: {record.cta.targetGoal}</div>
                        <div className="mt-2">
                          <a
                            href={record.cta.buttonHref}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                          >
                            <span>Button: &ldquo;{record.cta.buttonText}&rdquo;</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Editorial Metadata */}
                      <div className="text-xs text-slate-600 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Reviewer:</span>
                          <span className="font-medium text-slate-700">
                            {record.editorialWorkflow.reviewer || 'Pending Assignment'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Target Date:</span>
                          <span className="font-medium text-slate-700">
                            {record.editorialWorkflow.targetPublishDate || 'TBD'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Est. Words:</span>
                          <span className="font-medium text-slate-700">
                            {record.editorialWorkflow.estimatedWordCount || '1800'} words
                          </span>
                        </div>
                      </div>

                      {/* Action Button to Inspect Outline */}
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Editorial Outline & Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal / Drawer for Editorial Review Inspection */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {selectedRecord.category}
                    </span>
                    {getStatusBadge(
                      selectedRecord.editorialWorkflow.status,
                      selectedRecord.editorialWorkflow.publishReady
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 text-sm">
                {/* Governance Summary */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Editorial Review & Approval Log
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-400 block">Author:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedRecord.editorialWorkflow.authorAssigned || 'Senior Practice Lead'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Reviewer / Committee:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedRecord.editorialWorkflow.reviewer || 'Governance Board'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Approved Date:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedRecord.editorialWorkflow.approvedDate || 'Pending Final Sign-off'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Publish Ready Flag:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedRecord.editorialWorkflow.publishReady ? '✅ Verified Ready' : '🔒 Held in Review'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Notes */}
                {selectedRecord.editorialWorkflow.editorialNotes && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Reviewer Notes & Verification Directives
                    </h4>
                    <p className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                      {selectedRecord.editorialWorkflow.editorialNotes}
                    </p>
                  </div>
                )}

                {/* Content Outline */}
                {selectedRecord.editorialWorkflow.contentOutline && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Article Section Outline & Headings
                    </h4>
                    <ul className="space-y-2">
                      {selectedRecord.editorialWorkflow.contentOutline.map((section, idx) => (
                        <li
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Target CTA */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-emerald-800">Assigned CTA Action:</div>
                  <div className="text-xs text-slate-700 font-semibold">{selectedRecord.cta.action}</div>
                  <div className="text-xs text-slate-500">Destination: {selectedRecord.cta.buttonHref}</div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* System Architecture Explanation Section */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Editorial Workflow & Governance Safeguards
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-3xl">
            TALENTO’s structured content planning system eliminates low-quality and unverified automated publications.
            Every piece of content moves through strict lifecycle stages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs mb-2">
                1
              </div>
              <h4 className="text-sm font-semibold text-slate-900">1. Keyword Clustering</h4>
              <p className="text-xs text-slate-500 mt-1">
                Intent mapping, primary keyword calibration, and alignment to business conversion goals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs mb-2">
                2
              </div>
              <h4 className="text-sm font-semibold text-slate-900">2. Expert Drafting</h4>
              <p className="text-xs text-slate-500 mt-1">
                Written by recruitment practitioners with industry-specific case studies and verified data.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs mb-2">
                3
              </div>
              <h4 className="text-sm font-semibold text-slate-900">3. Human Peer Review</h4>
              <p className="text-xs text-slate-500 mt-1">
                Senior Partner sign-off, claim verification, entity linking validation, and compliance checks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs mb-2">
                4
              </div>
              <h4 className="text-sm font-semibold text-slate-900">4. Controlled Publish</h4>
              <p className="text-xs text-slate-500 mt-1">
                Automated publishing blocked until <code className="text-emerald-700">publishReady: true</code> and status is approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
