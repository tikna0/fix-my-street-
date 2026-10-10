import React, { useState } from 'react';
import { Sun, Moon, AlertTriangle, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'solution', label: 'Solution' },
    { id: 'about', label: 'About & References' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#283845] text-white border-b border-neutral-700/60 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-98 cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded bg-[#FFA649] text-[#283845] flex items-center justify-center font-bold text-lg font-display shadow-sm">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-[#FFA649] transition-colors whitespace-nowrap">
                Fixmy<span className="text-[#FFA649]">streets</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#FFA649] font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFA649] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Toggle & Report Issue CTA) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-neutral-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer text-xs"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-[#FFA649]" />
                  <span className="text-[11px] font-semibold text-[#FFA649]">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-neutral-300" />
                  <span className="text-[11px] font-medium text-neutral-200">Dark Mode</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('report-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('report-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFA649] text-[#283845] font-semibold text-xs tracking-wide rounded-md hover:bg-[#ffb466] active:scale-98 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report an Issue</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFA649]" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-700 bg-[#283845] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === link.id
                  ? 'bg-white/10 text-[#FFA649] font-semibold'
                  : 'text-neutral-200 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 space-y-2 border-t border-neutral-700">
            <button
              onClick={onToggleDarkMode}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md bg-white/5 text-neutral-200 border border-white/10"
            >
              <span className="flex items-center gap-2">
                {isDarkMode ? <Sun className="w-4 h-4 text-[#FFA649]" /> : <Moon className="w-4 h-4" />}
                <span>{isDarkMode ? 'Theme: Dark (Switch to Light)' : 'Theme: Light (Switch to Dark)'}</span>
              </span>
              <span className="text-[#FFA649] font-mono">{isDarkMode ? 'Dark' : 'Light'}</span>
            </button>
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('report-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FFA649] text-[#283845] font-semibold text-xs rounded-md"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report an Issue</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
