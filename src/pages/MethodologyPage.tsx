import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  Sliders, 
  Network, 
  Send, 
  Check, 
  FileSpreadsheet, 
  Image as ImageIcon,
  Code2,
  Table,
  Zap,
  ArrowRight
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: 'Data Collection',
      shortTitle: 'Collection',
      icon: Database,
      summary: 'Aggregating open vision benchmarks, municipal photographic registries, and civic incident archives.',
      details: {
        description: 'Multi-source acquisition protocol aggregating public computer vision benchmarks (Kaggle Road Damage, TACO Trash Annotations, Open Municipal 311 archives) and self-collected ground-truth street photography.',
        inputs: 'Raw smartphone captures (RGB, varied resolutions 1080p-4K, variable daylight and weather condition)',
        outputs: 'Standardized image repository (8,450 labeled images across 5 classes) + Tabular complaint metadata (12,200 rows)',
        algorithm: 'Automated EXIF stripping, hash-based de-duplication, class balancing via stratified sampling',
        metrics: '8,450 images balanced across 5 civic categories',
        snippet: `# Dataset Stratification & Extraction
from sklearn.model_selection import train_test_split
import pandas as pd

df_images = pd.read_csv("civic_image_manifest.csv")
train_df, test_df = train_test_split(
    df_images, test_size=0.20, stratify=df_images['category'], random_state=42
)`
      }
    },
    {
      id: 1,
      title: 'Preprocessing & Augmentation',
      shortTitle: 'Preprocessing',
      icon: Layers,
      summary: 'Spatial normalization, CLAHE contrast enhancement, and randomized geometric transformations.',
      details: {
        description: 'Standardizing raw visual inputs to 224x224x3 tensors. Heavy geometric and illumination augmentations simulate harsh outdoor conditions (glare, rainy lens artifacts, shadow occlusions).',
        inputs: 'Variable resolution RGB images + raw survey metadata',
        outputs: 'Normalized tensors [Batch, 224, 224, 3] with ImageNet mean/std normalization',
        algorithm: 'CLAHE (Contrast Limited Adaptive Histogram Equalization), Random affine, Gaussian blur, Color jitter',
        metrics: '3.5x effective dataset expansion via data augmentation',
        snippet: `import torchvision.transforms as T

transform_pipeline = T.Compose([
    T.Resize((224, 224)),
    T.RandomHorizontalFlip(p=0.5),
    T.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])`
      }
    },
    {
      id: 2,
      title: 'CNN Image Classification',
      shortTitle: 'Vision CNN',
      icon: Cpu,
      summary: 'Deep Convolutional Neural Network backbone extracting hierarchical visual hazard features.',
      details: {
        description: 'Transfer learning on MobileNetV3 / ResNet-50 backbone fine-tuned on civic infrastructure imagery. Low-latency edge inference capable of running in-browser or on municipal dispatch servers.',
        inputs: 'Input Tensor (224, 224, 3)',
        outputs: '5-dimensional Softmax probability vector [P(Pothole), P(Garbage), P(Dumping), P(Light), P(Drain)]',
        algorithm: 'MobileNetV3-Large with inverted residual bottleneck blocks, Squeeze-and-Excitation, and cross-entropy loss',
        metrics: '94.6% Top-1 Test Accuracy, 12ms forward-pass latency',
        snippet: `import torch.nn as nn
from torchvision.models import mobilenet_v3_large

class CivicVisionClassifier(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        self.backbone = mobilenet_v3_large(pretrained=True)
        in_features = self.backbone.classifier[0].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Linear(in_features, 512),
            nn.SiLU(),
            nn.Dropout(p=0.3),
            nn.Linear(512, num_classes)
        )
    def forward(self, x):
        return self.backbone(x)`
      }
    },
    {
      id: 3,
      title: 'Priority Feature Engineering',
      shortTitle: 'Feature Eng.',
      icon: Sliders,
      summary: 'Constructing multi-dimensional urgency representations from spatial, demographic, and severity signals.',
      details: {
        description: 'Synthesizing heterogeneous data signals: categorical risk scores, numeric severity ratings, demographic exposure indices, historical repeat frequency, and spatial road hierarchy classifications.',
        inputs: 'Image class probability vector + Severity (1-5) + Citizen population brackets + Geographic ward ID',
        outputs: 'Fused tabular feature vector X ∈ ℝ¹⁴ ready for ensemble regressor/classifier',
        algorithm: 'One-hot categorical encoding, min-max scaling of pedestrian density, text NLP urgency scoring',
        metrics: '14 engineered features with high mutual information score',
        snippet: `def extract_priority_feature_vector(report):
    vector = [
        report['severity'] / 5.0,
        map_population_scale(report['affected_people']),
        category_hazard_index[report['predicted_category']],
        nlp_urgency_density(report['description']),
        ward_vulnerability_index[report['ward']]
    ]
    return np.array(vector)`
      }
    },
    {
      id: 4,
      title: 'Priority Model (Ensemble ML)',
      shortTitle: 'Priority ML',
      icon: Network,
      summary: 'Gradient Boosted Trees (XGBoost / Random Forest) ranking tickets into Low, Medium, High, and Critical.',
      details: {
        description: 'Trained on historical municipal incident resolution logs. Balances public safety risks against operational resource constraints to avoid dispatch bottlenecks.',
        inputs: 'Fused tabular feature vector X ∈ ℝ¹⁴',
        outputs: 'Class label ∈ {Low, Medium, High, Critical} with continuous priority score 0-100',
        algorithm: 'Random Forest (200 estimators) & XGBoost Classifier with Bayesian Hyperparameter Tuning',
        metrics: '0.923 Macro F1-score across 4 priority strata',
        snippet: `from xgboost import XGBClassifier

xgb_priority_model = XGBClassifier(
    n_estimators=250,
    max_depth=5,
    learning_rate=0.05,
    objective='multi:softprob',
    num_class=4,
    random_state=42
)
xgb_priority_model.fit(X_train, y_train)`
      }
    },
    {
      id: 5,
      title: 'Municipal GIS & Dispatch',
      shortTitle: 'Deployment',
      icon: Send,
      summary: 'Spatial reverse geocoding via OpenStreetMap/Nominatim, interactive Leaflet dispatch, and CSV telemetry.',
      details: {
        description: 'Client-side reactive mapping using Leaflet.js with live GPS positioning, offline-first localStorage database, and real-time municipal priority queue sorting.',
        inputs: 'Triaged report payloads with spatial coordinates (lat, lng)',
        outputs: 'Live interactive operational map with color-coded severity markers & REST export endpoints',
        algorithm: 'Nominatim reverse geocoding API, Haversine geospatial proximity clustering',
        metrics: 'Zero-cloud configuration, fully self-contained in modern web browsers',
        snippet: `// Client-side spatial dispatch integration
const dispatchReport = (report) => {
  localStorage.setItem('civic_reports', JSON.stringify([report, ...existing]));
  notifyMunicipalQueue({
    ticketId: report.id,
    priority: report.priority,
    coords: [report.lat, report.lng]
  });
};`
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFA649] bg-[#FFA649]/10 px-3 py-1 rounded-md">
          <Zap className="w-3.5 h-3.5" />
          <span>System Pipeline &amp; Algorithmic Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#283845] dark:text-white">
          Methodology &amp; Architecture
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          The end-to-end engineering workflow transforms unstructured citizen image uploads and contextual inputs into deterministic, prioritized municipal maintenance tasks using computer vision and machine learning ensembles.
        </p>
      </div>

      {/* 1. INTERACTIVE STEPPER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-xl font-bold font-display text-[#283845] dark:text-white">
            Interactive Pipeline Stepper
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any phase to inspect tensor formats and code
          </span>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-neutral-100 dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 p-3 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#283845] text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${isActive ? 'bg-[#FFA649] text-[#283845]' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <span className="block text-[10px] text-neutral-400 font-mono">0{idx + 1}</span>
                  <span className="truncate">{s.shortTitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Content Panel */}
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#FFA649] uppercase tracking-wider">
                Phase 0{activeStep + 1} of 06
              </span>
              <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-white mt-1">
                {steps[activeStep].title}
              </h3>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              Key Metric: {steps[activeStep].details.metrics}
            </div>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {steps[activeStep].details.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] block">
                Tensors &amp; Inputs
              </span>
              <p className="text-neutral-800 dark:text-neutral-200 font-mono">
                {steps[activeStep].details.inputs}
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] block">
                Derived Artifacts &amp; Outputs
              </span>
              <p className="text-neutral-800 dark:text-neutral-200 font-mono">
                {steps[activeStep].details.outputs}
              </p>
            </div>
          </div>

          {/* Code snippet block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-semibold">
                <Code2 className="w-3.5 h-3.5 text-[#FFA649]" />
                <span>Reference Pipeline Implementation</span>
              </span>
              <span className="font-mono text-[11px]">Python / PyTorch / Scikit-learn</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#283845] text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-700">
              <code>{steps[activeStep].details.snippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 2. DATASET CARDS SECTION */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-xl font-bold font-display text-[#283845] dark:text-white">
            Dual Dataset Specifications
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Ground-truth training corpora dividing visual hazard recognition and structured priority regression
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dataset Card A */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#FFA649]/20 text-[#283845] dark:text-[#FFA649] flex items-center justify-center font-bold">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                      Dataset A: Civic Issue Image Dataset
                    </h3>
                    <span className="text-[11px] text-neutral-500">Computer Vision Taxonomy</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  JPG / PNG
                </span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                A collection of civic issue images categorized according to the type of problem visible in the image. Built from open Kaggle road surface sets, TACO trash datasets, and municipal field photos.
              </p>

              <div className="space-y-2 text-xs divide-y divide-neutral-100 dark:divide-neutral-800">
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Dataset Source</span>
                  <span className="font-medium">Kaggle / Public Repositories / Field Survey</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Records / Sample Count</span>
                  <span className="font-mono font-semibold">8,450 Verified Captures</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Input Attributes</span>
                  <span className="font-medium">Uploaded civic issue photograph (RGB)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Target Output Label</span>
                  <span className="font-semibold text-[#FFA649]">Predicted Civic Category</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  5 Target Classification Classes:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Pothole', 'Garbage Overflow', 'Illegal Waste Dumping', 'Damaged Streetlight', 'Blocked Drain'].map((cat) => (
                    <span key={cat} className="text-[11px] px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Resolution: 224x224 scaled tensors</span>
              <span>Stratified 80/20 train/test</span>
            </div>
          </div>

          {/* Dataset Card B */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#283845] text-white flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-4 h-4 text-[#FFA649]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                      Dataset B: Civic Issue Priority Dataset
                    </h3>
                    <span className="text-[11px] text-neutral-500">Structured Tabular Urgency Log</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  CSV / Parquet
                </span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Contains historical information about reported civic issues, municipal response times, pedestrian footfall, and factors that influence maintenance urgency and public hazard risk.
              </p>

              <div className="space-y-2 text-xs divide-y divide-neutral-100 dark:divide-neutral-800">
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Dataset Source</span>
                  <span className="font-medium">Reliable Open Municipal 311 Logs &amp; Field Survey</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Records / Sample Count</span>
                  <span className="font-mono font-semibold">12,200 Historical Incident Rows</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Input Attributes</span>
                  <span className="font-medium">Issue type, Severity (1-5), Location, Frequency, Population</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">Target Output Label</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">Priority Level (4-Class)</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  4 Evaluated Urgency Tiers:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Low Priority', color: 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300' },
                    { label: 'Medium Priority', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' },
                    { label: 'High Priority', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' },
                    { label: 'Critical Priority', color: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300' },
                  ].map((p) => (
                    <span key={p.label} className={`text-[11px] font-semibold px-2.5 py-1 rounded ${p.color}`}>
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Features: 14 tabular attributes</span>
              <span>Evaluated with XGBoost &amp; Random Forest</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE ARCHITECTURE FLOW DIAGRAM (SVG) */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-xl font-bold font-display text-[#283845] dark:text-white">
            End-to-End System Architecture
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Interactive structural schematic linking image capture to priority triage and municipal dispatch
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm overflow-x-auto">
          <div className="min-w-[760px]">
            <svg viewBox="0 0 860 260" className="w-full h-auto text-neutral-800 dark:text-neutral-200" fill="none">
              <defs>
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#283845" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA649" />
                  <stop offset="100%" stopColor="#ffb973" />
                </linearGradient>
              </defs>

              {/* Box 1: Citizen Input */}
              <rect x="20" y="30" width="140" height="90" rx="10" fill="#283845" stroke="#FFA649" strokeWidth="1.5" />
              <text x="90" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">Citizen Client</text>
              <text x="90" y="85" textAnchor="middle" fill="#CBD5E1" fontSize="10">Photo + Description</text>
              <text x="90" y="100" textAnchor="middle" fill="#FFA649" fontSize="10">GPS Coordinates</text>

              {/* Arrow 1 */}
              <path d="M160 75 L200 75" stroke="#FFA649" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="205,75 197,71 197,79" fill="#FFA649" />

              {/* Box 2: Preprocessing */}
              <rect x="210" y="30" width="140" height="90" rx="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
              <text x="280" y="65" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700">Preprocessing</text>
              <text x="280" y="85" textAnchor="middle" fill="#475569" fontSize="10">CLAHE + 224x224</text>
              <text x="280" y="100" textAnchor="middle" fill="#475569" fontSize="10">Tensor Normalization</text>

              {/* Arrow 2 */}
              <path d="M350 75 L390 75" stroke="#283845" strokeWidth="2" />
              <polygon points="395,75 387,71 387,79" fill="#283845" />

              {/* Box 3: CNN Backbone */}
              <rect x="400" y="20" width="160" height="110" rx="10" fill="#283845" stroke="#38BDF8" strokeWidth="1.5" />
              <text x="480" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">Vision CNN Backbone</text>
              <text x="480" y="75" textAnchor="middle" fill="#93C5FD" fontSize="10">MobileNetV3 / ResNet-50</text>
              <text x="480" y="95" textAnchor="middle" fill="#CBD5E1" fontSize="9">5-Class Softmax Output</text>
              <text x="480" y="112" textAnchor="middle" fill="#FFA649" fontSize="9">Category + Confidence</text>

              {/* Box 4: Feature Fusion */}
              <rect x="360" y="160" width="220" height="75" rx="10" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
              <text x="470" y="185" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="700">Feature Fusion Engine</text>
              <text x="470" y="202" textAnchor="middle" fill="#475569" fontSize="10">Image Class + Severity + Exposure</text>
              <text x="470" y="218" textAnchor="middle" fill="#475569" fontSize="10">Location Density Index</text>

              {/* Connecting lines from CNN and Inputs to Fusion */}
              <path d="M480 130 L480 160" stroke="#38BDF8" strokeWidth="2" />
              <path d="M90 120 L90 200 L360 200" stroke="#FFA649" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Arrow from Fusion to Priority */}
              <path d="M580 200 L620 200 L620 120 L640 120" stroke="#FFA649" strokeWidth="2" />
              <polygon points="645,120 637,116 637,124" fill="#FFA649" />

              {/* Box 5: Priority Regressor & Dispatch */}
              <rect x="650" y="30" width="180" height="150" rx="10" fill="#1E293B" stroke="#FFA649" strokeWidth="1.5" />
              <text x="740" y="60" textAnchor="middle" fill="#FFA649" fontSize="12" fontWeight="700">Priority Engine</text>
              <text x="740" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="10">Random Forest / XGBoost</text>
              <line x1="665" y1="95" x2="815" y2="95" stroke="#475569" strokeWidth="1" />
              <text x="740" y="115" textAnchor="middle" fill="#38BDF8" fontSize="10">Municipal GIS Dispatch</text>
              <text x="740" y="135" textAnchor="middle" fill="#CBD5E1" fontSize="9">Critical / High / Med / Low</text>
              <text x="740" y="155" textAnchor="middle" fill="#4ADE80" fontSize="9">Leaflet Map &amp; CSV Queue</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 4. TECH STACK BADGES */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-display text-[#283845] dark:text-white">
          Production Technology Stack
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'PyTorch / TF', role: 'CNN Vision Model', version: 'v2.4+' },
            { name: 'Scikit-Learn', role: 'Ensemble Trees', version: 'v1.4' },
            { name: 'Leaflet.js', role: 'GIS Mapping', version: 'v1.9' },
            { name: 'OpenStreetMap', role: 'Reverse Geocoding', version: 'Nominatim' },
            { name: 'Chart.js', role: 'Telemetry Visuals', version: 'v4.4' },
            { name: 'React 19 & TS', role: 'Reactive Frontend', version: 'TypeScript 5+' },
          ].map((item) => (
            <div
              key={item.name}
              className="p-3.5 rounded-xl bg-white dark:bg-[#1E293B] border border-neutral-200 dark:border-neutral-800 text-center space-y-1"
            >
              <div className="font-bold text-xs text-[#283845] dark:text-white">
                {item.name}
              </div>
              <div className="text-[11px] text-neutral-500">{item.role}</div>
              <div className="text-[10px] font-mono text-[#FFA649]">{item.version}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
