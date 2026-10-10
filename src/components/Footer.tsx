import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#283845] text-neutral-300 border-t border-neutral-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#FFA649] text-[#283845] flex items-center justify-center font-bold text-xs font-display">
                F
              </span>
              <span className="font-display font-bold text-white text-base">
                Fixmystreets &middot; Civic Issue Detection &amp; Priority Prediction
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md">
              An intelligent municipal triage platform applying deep convolutional neural networks for automated civic problem detection from citizen images and ensemble machine learning for data-driven priority prediction.
            </p>
            <div className="text-xs text-neutral-400 flex items-center gap-2 pt-1">
              <span>OpenStreetMap &amp; Leaflet</span>
              <span>·</span>
              <span>Computer Vision CNN</span>
              <span>·</span>
              <span>Priority Regressor</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Platform Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFA649] transition-colors cursor-pointer"
                >
                  Home &amp; Report Submission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-[#FFA649] transition-colors cursor-pointer"
                >
                  Methodology &amp; Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analytics')}
                  className="hover:text-[#FFA649] transition-colors cursor-pointer"
                >
                  Spatial Analytics &amp; Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solution')}
                  className="hover:text-[#FFA649] transition-colors cursor-pointer"
                >
                  Municipal Solution &amp; Scope
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FFA649] transition-colors cursor-pointer"
                >
                  About &amp; Research Citations
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Civic Issue Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>Potholes &amp; Road Surface Hazards</li>
              <li>Garbage Overflow &amp; Sanitation</li>
              <li>Illegal Waste &amp; Rubble Dumping</li>
              <li>Damaged Streetlights &amp; Dark Spots</li>
              <li>Blocked Stormwater Drains</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 AI-Based Civic Issue Detection &amp; Priority Prediction System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Autonomous Municipal Infrastructure Framework</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
