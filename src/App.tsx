import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SolutionPage } from './pages/SolutionPage';
import { AboutPage } from './pages/AboutPage';
import { CivicReport, ReportStatus } from './types/civic';
import { getStoredReports, saveStoredReports } from './data/initialReports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('fixmystreets_theme');
      if (savedTheme !== null) return savedTheme === 'dark';
      const legacy = localStorage.getItem('civicpulse_theme_dark');
      if (legacy !== null) return legacy === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Load reports from localStorage on mount
  useEffect(() => {
    const loaded = getStoredReports();
    setReports(loaded);
  }, []);

  // Sync dark mode class across html, body, and storage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('fixmystreets_theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('civicpulse_theme_dark', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReport = (newReport: CivicReport) => {
    const updated = [newReport, ...reports];
    setReports(updated);
    saveStoredReports(updated);
  };

  const handleUpdateReportStatus = (reportId: string, status: ReportStatus) => {
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status,
          resolvedAt: status === 'Resolved' ? new Date().toISOString() : undefined,
        };
      }
      return r;
    });
    setReports(updated);
    saveStoredReports(updated);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''} bg-neutral-50 dark:bg-[#1a252f] text-neutral-900 dark:text-neutral-100 transition-colors duration-200`}>
      {/* Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            reports={reports}
            onAddReport={handleAddReport}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'methodology' && <MethodologyPage />}

        {currentPage === 'analytics' && (
          <AnalyticsPage
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}

        {currentPage === 'solution' && (
          <SolutionPage
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}

        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
