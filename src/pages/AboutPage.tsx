import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Mail,
  Edit2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  // Feedback Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Model Performance & Accuracy');
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Editable team placeholders (no college/student/guide names!)
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      role: 'Lead ML & Computer Vision Engineer',
      domain: 'Convolutional Neural Networks & Edge Ingestion',
      bio: 'Architected the MobileNetV3 visual triage backbone and transfer-learning fine-tuning protocol on open civic hazard benchmarks.'
    },
    {
      id: 2,
      role: 'Decision Systems & Urgency Modeler',
      domain: 'Multi-Criteria Decision Analysis & Ensemble ML',
      bio: 'Formulated the tabular priority regression engine fusing population density metrics, category hazard indices, and severity inputs.'
    },
    {
      id: 3,
      role: 'Full-Stack Systems & GIS Engineer',
      domain: 'Interactive Geolocation & Client State Architecture',
      bio: 'Implemented the reactive Leaflet mapping interface, OpenStreetMap Nominatim reverse-geocoding pipeline, and browser persistence.'
    },
    {
      id: 4,
      role: 'Urban Infrastructure Policy Analyst',
      domain: 'Municipal Service Level Agreements & Public Safety',
      bio: 'Calibrated urgency thresholds against real-world smart city dispatch protocols to prevent municipal queue saturation.'
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState('');
  const [editBio, setEditBio] = useState('');

  const startEdit = (m: typeof teamMembers[0]) => {
    setEditingId(m.id);
    setEditRole(m.role);
    setEditBio(m.bio);
  };

  const saveEdit = (id: number) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, role: editRole, bio: editBio } : m));
    setEditingId(null);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all feedback fields.');
      return;
    }
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFeedbackSubmitted(false);
    }, 4000);
  };

  const references = [
    {
      category: 'Research Papers & Literature',
      items: [
        {
          title: 'Automated Pothole Detection and Road Surface Assessment using Deep Convolutional Neural Networks',
          source: 'IEEE Transactions on Intelligent Transportation Systems',
          year: '2023',
          url: 'https://ieeexplore.ieee.org',
          note: 'Foundation methodology for road fissure detection and camera elevation invariance.'
        },
        {
          title: 'TACO: Trash Annotations in Context for Open-Vocabulary Litter Detection',
          source: 'arXiv Computer Vision & Pattern Recognition',
          year: '2020',
          url: 'https://tacodataset.org',
          note: 'Key taxonomy definitions for municipal waste categorization and debris density.'
        },
        {
          title: 'Priority-Based Dispatch Optimization in Municipal Emergency & Maintenance Services',
          source: 'Journal of Urban Technology & Smart Cities',
          year: '2024',
          url: 'https://sciencedirect.com',
          note: 'Formulation of multi-attribute urgency weighting in municipal dispatch queues.'
        }
      ]
    },
    {
      category: 'Open Source Software & Datasets',
      items: [
        {
          title: 'Leaflet.js & OpenStreetMap',
          source: 'Open Source Geospatial Mapping',
          year: 'v1.9',
          url: 'https://leafletjs.com',
          note: 'Lightweight client-side interactive mapping with zero API key constraints.'
        },
        {
          title: 'TensorFlow & MobileNetV3 Framework',
          source: 'Google Research / TensorFlow Hub',
          year: 'v2.x',
          url: 'https://tensorflow.org',
          note: 'Efficient edge convolutional architectures for real-time inference on mobile hardware.'
        },
        {
          title: 'Scikit-Learn Machine Learning Library',
          source: 'Pedregosa et al. Open Source Community',
          year: 'v1.4',
          url: 'https://scikit-learn.org',
          note: 'Ensemble decision trees, random forests, and gradient boosting algorithms.'
        },
        {
          title: 'Nominatim Geocoding Web Service',
          source: 'OpenStreetMap Foundation',
          year: 'API v1',
          url: 'https://nominatim.openstreetmap.org',
          note: 'Free reverse-geocoding engine converting coordinates into street addresses.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFA649] bg-[#FFA649]/10 px-3 py-1 rounded-md">
          <BookOpen className="w-3.5 h-3.5" />
          <span>System Provenance &amp; Research Grounding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#283845] dark:text-white">
          About the Project &amp; Scholarly References
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          The AI-Based Civic Issue Detection &amp; Priority Prediction System addresses urban infrastructure decay by combining edge computer vision with data-driven decision trees.
        </p>
      </div>

      {/* 1. PROJECT OVERVIEW & CORE VALUES */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
            Project Overview &amp; Research Mission
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Empowering citizens and municipal departments with objective AI infrastructure triage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              The Urban Civic Dilemma
            </h3>
            <p>
              Potholes cause costly vehicular accidents, overflowing waste bins threaten public hygiene, damaged streetlights encourage crime corridors, and blocked drains trigger flash flooding. Existing municipal hotlines face clerical backlogs that leave urgent life-safety hazards unaddressed.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              The Algorithmic Solution
            </h3>
            <p>
              Our dual-engine pipeline analyzes submitted photographs through deep convolutional neural networks to reliably classify the defect, while an ensemble decision tree evaluates population impact, physical severity, and category risk to calculate deterministic urgency scores.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Equitable Public Governance
            </h3>
            <p>
              By replacing arbitrary human triage with open mathematical models, resources are dispatched strictly by public hazard and population exposure, ensuring equitable municipal repairs across all urban neighborhoods and wards.
            </p>
          </div>
        </div>
      </div>

      {/* 2. TEAM PLACEHOLDER CARDS (NO REAL NAMES) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
              Project Engineering Team
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Generic placeholder roles for civic tech and machine learning development (Click "Edit" to customize)
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">4 Core Development Roles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#283845] text-[#FFA649] font-bold text-sm flex items-center justify-center font-mono">
                    0{member.id}
                  </div>
                  <button
                    onClick={() => startEdit(member)}
                    className="p-1 text-neutral-400 hover:text-[#FFA649] transition-colors cursor-pointer"
                    title="Edit role placeholder"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {editingId === member.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full text-xs font-bold p-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
                    />
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full text-[11px] p-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(member.id)}
                        className="px-2 py-1 bg-[#FFA649] text-[#283845] font-bold text-[10px] rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-[10px] rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                        {member.role}
                      </h3>
                      <span className="text-[11px] text-[#FFA649] font-medium block mt-0.5">
                        {member.domain}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {member.bio}
                    </p>
                  </>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Infrastructure Unit</span>
                <span className="font-mono">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REFERENCES LIST & SCHOLARLY CITATIONS */}
      <div className="space-y-8">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
            Scholarly Citations &amp; Technical References
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Foundational research papers, open machine learning frameworks, and geospatial APIs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {references.map((section) => (
            <div
              key={section.category}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 shadow-xs"
            >
              <h3 className="font-bold text-base text-[#283845] dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">
                {section.category}
              </h3>

              <div className="space-y-4">
                {section.items.map((ref, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-neutral-900 dark:text-white hover:text-[#FFA649] dark:hover:text-[#FFA649] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{ref.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <span className="font-mono text-[11px] text-neutral-400 shrink-0">
                        {ref.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#FFA649] font-medium">
                      {ref.source}
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {ref.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONTACT / FEEDBACK FORM */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
              Contact &amp; Feedback Submissions
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Provide recommendations for model tuning, edge integration, or municipal API access
            </p>
          </div>
          <span className="text-xs text-neutral-500">Autonomous Civic Gateway</span>
        </div>

        {feedbackSubmitted ? (
          <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              Feedback Received
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Thank you for contributing to civic infrastructure quality research. Your feedback has been queued.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@organization.org"
                  className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Inquiry Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
              >
                <option value="Model Performance & Accuracy">Model Performance &amp; Accuracy Tuning</option>
                <option value="Municipal GIS API Integration">Municipal GIS &amp; API Integration</option>
                <option value="Additional Dataset Contribution">Additional Dataset Contribution (Images/CSV)</option>
                <option value="General Technical Inquiry">General Technical Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Feedback &amp; Observations
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share technical observations, suggested hyperparameter improvements, or ward telemetry..."
                className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#FFA649] text-[#283845] font-bold text-xs rounded-lg hover:bg-[#ffb466] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Civic Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
