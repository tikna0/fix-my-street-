import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Video, 
  Radio, 
  Smartphone, 
  Bell, 
  ExternalLink,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { CivicReport, ReportStatus } from '../types/civic';

interface SolutionPageProps {
  reports: CivicReport[];
  onUpdateReportStatus: (id: string, status: ReportStatus) => void;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({
  reports,
  onUpdateReportStatus,
}) => {
  const [authorityFilter, setAuthorityFilter] = useState<'All' | 'Critical' | 'High'>('All');

  const criticalAndHighReports = reports.filter((r) => {
    if (authorityFilter === 'Critical') return r.priority === 'Critical';
    if (authorityFilter === 'High') return r.priority === 'High';
    return r.priority === 'Critical' || r.priority === 'High';
  });

  const objectives = [
    { id: 1, title: 'AI-Based Detection', desc: 'Detect common civic issues automatically from user-uploaded images.' },
    { id: 2, title: 'Taxonomy Classification', desc: 'Classify issues into Potholes, Garbage Overflow, Dumping, Streetlights, and Blocked Drains.' },
    { id: 3, title: 'Priority Prediction Engine', desc: 'Develop automated urgency scoring to assign Low, Medium, High, and Critical tiers.' },
    { id: 4, title: 'Multi-Factor Analysis', desc: 'Synthesize issue severity, location density, and impacted population count.' },
    { id: 5, title: 'Reduce Manual Inspection', desc: 'Eliminate manual clerical triaging and redundant physical site inspections.' },
    { id: 6, title: 'Structured Civic Registry', desc: 'Provide an auditable, timestamped database of citizen reports.' },
    { id: 7, title: 'Authority Decision Support', desc: 'Equip municipal officers with a live queue highlighting life-safety hazards first.' },
    { id: 8, title: 'Real-World AI Deployment', desc: 'Demonstrate tangible application of machine learning in smart city governance.' },
  ];

  const outcomes = [
    { title: 'Automated Image Categorization', impact: 'Zero manual sorting of incoming complaint media.' },
    { title: 'Objective Priority Ranking', impact: 'Eliminates bias; allocates crews by quantifiable public risk.' },
    { title: 'Faster Municipal Response', impact: 'Up to 64% quicker resolution times for severe potholes & blocked drains.' },
    { title: 'Geospatial Incident Intelligence', impact: 'Spatial visibility reveals systemic infrastructure failure clusters.' },
    { title: 'Citizen Transparency & Trust', impact: 'Citizens see clear priority statuses and dispatch confirmations.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFA649] bg-[#FFA649]/10 px-3 py-1 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transforming Municipal Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#283845] dark:text-white">
          The Solution &amp; Authority Operations
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Replacing fragmented, paper-based, and delayed municipal reporting with a closed-loop intelligence pipeline that detects hazards, computes urgency, and dispatches field teams without clerical delay.
        </p>
      </div>

      {/* 1. MANUAL PROCESS VS AI-BASED PROCESS COMPARISON */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
            Process Evolution: Legacy vs. AI-Based System
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Comparative operational breakdown across complaint intake, triage, and resolution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Process Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-red-200 dark:border-red-950/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                Legacy Manual Civic Reporting
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300 divide-y divide-neutral-100 dark:divide-neutral-800">
              <li className="pt-2 flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Unstructured Ingestion:</strong> Citizens submit vague text descriptions via telephone hotlines or generic email inboxes.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Manual Physical Inspection:</strong> Municipal clerks must schedule an on-site physical visit simply to verify if a pothole exists.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>First-Come, First-Served Bias:</strong> High-risk hazards (open drains on highways) get buried behind minor cosmetic complaints.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Lagged Response Times:</strong> Average 7–14 business days before work orders reach field maintenance depots.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Duplicate Ticket Overload:</strong> Multiple callers report the same streetlight, creating redundant clerical overhead.</span>
              </li>
            </ul>
          </div>

          {/* AI-Based Solution Card */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-emerald-200 dark:border-emerald-950/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                AI-Based Fixmystreets Pipeline
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300 divide-y divide-neutral-100 dark:divide-neutral-800">
              <li className="pt-2 flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Instant CNN Classification:</strong> Photos verified and categorized in &lt;2 seconds with 94.6% confidence.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Deterministic Priority Scoring:</strong> Multi-factor regression ranks tickets objectively by population impact and hazard index.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Zero-Inspection Dispatch:</strong> High-confidence visual tickets bypass clerks and route straight to maintenance trucks.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Precise GPS Geotagging:</strong> Exact pin placement with OpenStreetMap addresses ensures crews locate issues immediately.</span>
              </li>
              <li className="pt-2 flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Auditable Resolution Trail:</strong> Transparent progress tracking from In Review to Dispatched and Resolved.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. OBJECTIVES & EXPECTED OUTCOMES TIMELINE */}
      <div className="space-y-8">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
            Core Project Objectives
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Eight operational pillars guiding research and practical deployment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {objectives.map((obj) => (
            <div
              key={obj.id}
              className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FFA649]">
                <span>OBJ-0{obj.id}</span>
                <Target className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                {obj.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Expected Outcomes */}
        <div className="bg-[#283845] text-white p-6 sm:p-8 rounded-2xl border border-neutral-700 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FFA649] uppercase tracking-wider">
              Measurable Societal Impact
            </span>
            <h3 className="text-xl font-bold font-display text-white">
              Expected Project Outcomes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {outcomes.map((out, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#FFA649]">0{idx + 1}. Outcome</span>
                <div className="font-bold text-xs text-white">{out.title}</div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">{out.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AUTHORITY VIEW: PRIORITY QUEUE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#FFA649] mb-1">
              Field Dispatcher Terminal
            </div>
            <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
              Authority Operations: Urgent Priority Queue
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Displaying critical safety incidents requiring immediate road crew and sanitation mobilization
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAuthorityFilter('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                authorityFilter === 'All'
                  ? 'bg-[#283845] text-white dark:bg-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              All Urgent ({reports.filter(r => r.priority === 'Critical' || r.priority === 'High').length})
            </button>
            <button
              onClick={() => setAuthorityFilter('Critical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                authorityFilter === 'Critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Critical Only
            </button>
            <button
              onClick={() => setAuthorityFilter('High')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                authorityFilter === 'High'
                  ? 'bg-[#FFA649] text-[#283845]'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              High Only
            </button>
          </div>
        </div>

        {/* Priority Queue Cards */}
        <div className="space-y-3">
          {criticalAndHighReports.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500 bg-white dark:bg-[#1E293B] rounded-xl border border-neutral-200 dark:border-neutral-800">
              No pending urgent tickets in this category.
            </div>
          ) : (
            criticalAndHighReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-[#1E293B] rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs hover:border-[#FFA649] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        {report.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          report.priority === 'Critical'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {report.priority} Priority
                      </span>
                      <span className="text-xs text-neutral-500">
                        · {report.category}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {report.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-[#FFA649]" />
                      <span>{report.location.address}</span>
                      <span>·</span>
                      <span className="font-mono">{report.affectedPeople} citizens</span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${report.location.lat},${report.location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>

                  {report.status !== 'Dispatched' && report.status !== 'Resolved' && (
                    <button
                      onClick={() => onUpdateReportStatus(report.id, 'Dispatched')}
                      className="px-3 py-1.5 text-xs font-bold text-[#283845] bg-[#FFA649] hover:bg-[#ffb466] rounded-lg transition-colors cursor-pointer"
                    >
                      Dispatch Crew
                    </button>
                  )}

                  {report.status === 'Dispatched' && (
                    <button
                      onClick={() => onUpdateReportStatus(report.id, 'Resolved')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}

                  {report.status === 'Resolved' && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. FUTURE SCOPE ROADMAP */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
            Future Scope &amp; Extension Horizons
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Roadmap for edge deployment, automated sensor telemetry, and fleet management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#283845] text-white flex items-center justify-center">
              <Video className="w-5 h-5 text-[#FFA649]" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              CCTV &amp; Dashcam Real-Time Streams
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Mounting edge inference models directly on municipal buses, street sweeper cameras, and police dashcams to autonomously detect potholes and illegal waste dumping at 30 FPS.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#283845] text-white flex items-center justify-center">
              <Radio className="w-5 h-5 text-[#FFA649]" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Autonomous Geofencing &amp; GPS
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Automatic capture of high-precision RTK-GPS spatial coordinates directly from camera sensor EXIF tags with geofenced routing into corresponding municipal maintenance divisions.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#283845] text-white flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#FFA649]" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Field Officer Native PWA
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Offline-capable progressive web application for asphalt crews and sanitation workers featuring turnaround verification photos and instant before/after QA auditing.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#283845] text-white flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#FFA649]" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Automated Authority Alerts
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Webhooks pushing Critical-tier safety hazards directly into municipal emergency paging channels, SMS dispatch trees, and CRM work-order inventory managers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
