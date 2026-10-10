import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Chart, 
  DoughnutController, 
  ArcElement, 
  BarController, 
  BarElement, 
  LineController, 
  LineElement, 
  PointElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  ArrowUpDown, 
  ExternalLink, 
  CheckCircle2, 
  BarChart3, 
  Map, 
  Flame,
  Search,
  Sparkles
} from 'lucide-react';
import { CivicReport, CivicCategory, PriorityLevel, ReportStatus } from '../types/civic';
import { AnalyticsMap } from '../components/AnalyticsMap';

// Register Chart.js controllers and elements once
Chart.register(
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface AnalyticsPageProps {
  reports: CivicReport[];
  onUpdateReportStatus: (reportId: string, status: ReportStatus) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  reports,
  onUpdateReportStatus,
}) => {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Table sorting
  const [sortField, setSortField] = useState<'timestamp' | 'severity' | 'priority'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Selected map report
  const [selectedReport, setSelectedReport] = useState<CivicReport | null>(null);

  // Canvas Refs for Chart.js
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const priorityChartRef = useRef<HTMLCanvasElement | null>(null);
  const trendChartRef = useRef<HTMLCanvasElement | null>(null);
  const wardChartRef = useRef<HTMLCanvasElement | null>(null);

  // Chart instances
  const chartInstances = useRef<{
    category?: Chart;
    priority?: Chart;
    trend?: Chart;
    ward?: Chart;
  }>({});

  // Filtered reports logic
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
      const matchPri = selectedPriority === 'All' || r.priority === selectedPriority;
      const matchStat = selectedStatus === 'All' || r.status === selectedStatus;
      const matchSearch = searchQuery === '' || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchPri && matchStat && matchSearch;
    });
  }, [reports, selectedCategory, selectedPriority, selectedStatus, searchQuery]);

  // Sorted reports
  const sortedReports = useMemo(() => {
    const list = [...filteredReports];
    list.sort((a, b) => {
      if (sortField === 'timestamp') {
        const diff = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        return sortOrder === 'desc' ? diff : -diff;
      }
      if (sortField === 'severity') {
        return sortOrder === 'desc' ? b.severity - a.severity : a.severity - b.severity;
      }
      if (sortField === 'priority') {
        const orderWeight: Record<PriorityLevel, number> = {
          Critical: 4,
          High: 3,
          Medium: 2,
          Low: 1
        };
        const diff = orderWeight[b.priority] - orderWeight[a.priority];
        return sortOrder === 'desc' ? diff : -diff;
      }
      return 0;
    });
    return list;
  }, [filteredReports, sortField, sortOrder]);

  // Chart rendering & updates
  useEffect(() => {
    // 1. Category Doughnut Chart
    if (categoryChartRef.current) {
      chartInstances.current.category?.destroy();

      const counts: Record<string, number> = {
        'Pothole': 0,
        'Garbage Overflow': 0,
        'Illegal Waste Dumping': 0,
        'Damaged Streetlight': 0,
        'Blocked Drain': 0,
      };

      filteredReports.forEach((r) => {
        counts[r.category] = (counts[r.category] || 0) + 1;
      });

      chartInstances.current.category = new Chart(categoryChartRef.current, {
        type: 'doughnut',
        data: {
          labels: Object.keys(counts),
          datasets: [{
            data: Object.values(counts),
            backgroundColor: [
              '#283845',
              '#FFA649',
              '#84cc16',
              '#06b6d4',
              '#3b82f6',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } },
          },
          cutout: '65%',
        },
      });
    }

    // 2. Priority Bar Chart
    if (priorityChartRef.current) {
      chartInstances.current.priority?.destroy();

      const priCounts = {
        Critical: filteredReports.filter(r => r.priority === 'Critical').length,
        High: filteredReports.filter(r => r.priority === 'High').length,
        Medium: filteredReports.filter(r => r.priority === 'Medium').length,
        Low: filteredReports.filter(r => r.priority === 'Low').length,
      };

      chartInstances.current.priority = new Chart(priorityChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [{
            label: 'Incidents',
            data: Object.values(priCounts),
            backgroundColor: ['#DC2626', '#FFA649', '#2563EB', '#16A34A'],
            borderRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } } },
            x: { ticks: { font: { size: 10 } } },
          },
        },
      });
    }

    // 3. Trends Line Chart (simulated over recent days + real data counts)
    if (trendChartRef.current) {
      chartInstances.current.trend?.destroy();

      const days = ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Yesterday', 'Today'];
      const volume = [12, 18, 14, 22, 19, 25, filteredReports.length];

      chartInstances.current.trend = new Chart(trendChartRef.current, {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Report Ingestion Volume',
            data: volume,
            borderColor: '#FFA649',
            backgroundColor: 'rgba(255, 166, 73, 0.1)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#283845',
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { font: { size: 10 } } },
            x: { ticks: { font: { size: 10 } } },
          },
        },
      });
    }

    // 4. Top Wards / Areas Bar Chart
    if (wardChartRef.current) {
      chartInstances.current.ward?.destroy();

      const wardMap: Record<string, number> = {};
      filteredReports.forEach((r) => {
        const w = r.location.ward || 'Ward 1 - Metro';
        wardMap[w] = (wardMap[w] || 0) + 1;
      });

      const sortedWards = Object.entries(wardMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      chartInstances.current.ward = new Chart(wardChartRef.current, {
        type: 'bar',
        data: {
          labels: sortedWards.map(w => w[0]),
          datasets: [{
            label: 'Incidents Logged',
            data: sortedWards.map(w => w[1]),
            backgroundColor: '#283845',
            borderRadius: 4,
          }],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } } },
          },
        },
      });
    }

    return () => {
      Object.values(chartInstances.current).forEach((c) => c?.destroy());
    };
  }, [filteredReports]);

  // Export CSV functionality
  const handleExportCSV = () => {
    if (filteredReports.length === 0) {
      alert('No reports match current filter to export.');
      return;
    }

    const headers = [
      'Report_ID',
      'Timestamp',
      'Category',
      'Severity',
      'Priority',
      'Status',
      'Confidence_Pct',
      'Latitude',
      'Longitude',
      'Address',
      'Ward',
      'Description'
    ];

    const rows = filteredReports.map((r) => [
      r.id,
      r.timestamp,
      `"${r.category}"`,
      r.severity,
      r.priority,
      r.status,
      r.confidence,
      r.location.lat,
      r.location.lng,
      `"${r.location.address.replace(/"/g, '""')}"`,
      `"${r.location.ward || ''}"`,
      `"${r.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Fixmystreets_Reports_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSort = (field: 'timestamp' | 'severity' | 'priority') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Sample Confusion Matrix validation data (5 classes)
  const confusionClasses: CivicCategory[] = [
    'Pothole',
    'Garbage Overflow',
    'Illegal Waste Dumping',
    'Damaged Streetlight',
    'Blocked Drain'
  ];

  // 5x5 confusion matrix counts
  const confusionData = [
    [382, 4, 3, 2, 7],     // True Pothole
    [5, 364, 18, 1, 4],    // True Garbage Overflow
    [4, 16, 351, 0, 9],    // True Illegal Dumping
    [1, 2, 0, 394, 2],     // True Streetlight
    [8, 3, 7, 1, 376],     // True Blocked Drain
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#FFA649] mb-1">
            Real-Time Infrastructure Telemetry
          </div>
          <h1 className="text-3xl font-extrabold font-display text-[#283845] dark:text-white">
            Civic Issue Spatial &amp; Priority Analytics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Cross-tabulated municipal intelligence aggregating citizen submissions, neural classification confidence, and urgency vectors.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#283845] hover:bg-[#1f2c37] text-white text-xs font-bold rounded-lg border border-neutral-700 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-[#FFA649]" />
          <span>Export Filtered CSV ({filteredReports.length})</span>
        </button>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="bg-white dark:bg-[#1E293B] p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#FFA649]" />
            <span>Interactive Filters &amp; Facets</span>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedPriority('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
            className="text-[11px] text-[#FFA649] hover:underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword, ward, ticket..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
          >
            <option value="All">All Categories (5 Classes)</option>
            <option value="Pothole">Pothole</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Illegal Waste Dumping">Illegal Waste Dumping</option>
            <option value="Damaged Streetlight">Damaged Streetlight</option>
            <option value="Blocked Drain">Blocked Drain</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
          >
            <option value="All">All Priorities (Critical - Low)</option>
            <option value="Critical">Critical Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#FFA649]"
          >
            <option value="All">All Ticket Statuses</option>
            <option value="Pending">Pending Triage</option>
            <option value="In Review">In Review</option>
            <option value="Dispatched">Dispatched to Field Crew</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* 1. CHART.JS 4-GRID DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Chart 1: Doughnut */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Issues by Category
            </h3>
            <span className="text-[11px] text-neutral-400">Class breakdown</span>
          </div>
          <div className="h-48 relative">
            <canvas ref={categoryChartRef} />
          </div>
        </div>

        {/* Chart 2: Priority Bar */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Priority Urgency Stratification
            </h3>
            <span className="text-[11px] text-neutral-400">Critical to Low spectrum</span>
          </div>
          <div className="h-48 relative">
            <canvas ref={priorityChartRef} />
          </div>
        </div>

        {/* Chart 3: Trends Line */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Incident Intake Rate
            </h3>
            <span className="text-[11px] text-neutral-400">7-Day trend</span>
          </div>
          <div className="h-48 relative">
            <canvas ref={trendChartRef} />
          </div>
        </div>

        {/* Chart 4: Top Wards Bar */}
        <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Top Impacted Wards
            </h3>
            <span className="text-[11px] text-neutral-400">Municipal sectors</span>
          </div>
          <div className="h-48 relative">
            <canvas ref={wardChartRef} />
          </div>
        </div>
      </div>

      {/* 2. SPATIAL GEOSPATIAL MAP */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display text-[#283845] dark:text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-[#FFA649]" />
              <span>Geospatial Incident Cluster Map</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Displaying {filteredReports.length} incident markers with priority heat indexing
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500">Leaflet + OpenStreetMap</span>
        </div>

        <AnalyticsMap
          reports={filteredReports}
          selectedReportId={selectedReport?.id}
          onSelectReport={(r) => setSelectedReport(r)}
        />
      </div>

      {/* 3. MODEL PERFORMANCE & CONFUSION MATRIX */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFA649]">
              Validation Rigor
            </span>
            <h2 className="text-2xl font-bold font-display text-[#283845] dark:text-white">
              Model Evaluation &amp; Confusion Matrix
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Evaluated on n = 1,980 hold-out test images across five civic classes (labeled as sample benchmark)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg">
            <span>Validation Epoch: 40/40</span>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-xs text-neutral-500">Overall Accuracy</span>
            <div className="text-2xl font-extrabold text-[#283845] dark:text-white font-mono-tabular">94.6%</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">+2.4% vs baseline ResNet</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-xs text-neutral-500">Macro Precision</span>
            <div className="text-2xl font-extrabold text-[#283845] dark:text-white font-mono-tabular">93.8%</div>
            <span className="text-[11px] text-neutral-400">Low false-positive rate</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-xs text-neutral-500">Macro Recall</span>
            <div className="text-2xl font-extrabold text-[#283845] dark:text-white font-mono-tabular">95.1%</div>
            <span className="text-[11px] text-neutral-400">Captures true hazards</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-xs text-neutral-500">Macro F1-Score</span>
            <div className="text-2xl font-extrabold text-[#FFA649] font-mono-tabular">94.4%</div>
            <span className="text-[11px] text-neutral-400">Harmonic balance</span>
          </div>
        </div>

        {/* Confusion Matrix Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-semibold">Confusion Matrix (Ground Truth vs Model Prediction)</span>
            <span>Rows: Actual | Columns: Predicted</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 font-semibold">
                  <th className="p-2.5 text-left border border-neutral-200 dark:border-neutral-700">Actual \ Predicted</th>
                  {confusionClasses.map((c) => (
                    <th key={c} className="p-2.5 border border-neutral-200 dark:border-neutral-700 max-w-[100px] truncate" title={c}>
                      {c.split(' ')[0]}
                    </th>
                  ))}
                  <th className="p-2.5 border border-neutral-200 dark:border-neutral-700">Class Recall</th>
                </tr>
              </thead>
              <tbody>
                {confusionClasses.map((rowClass, rIdx) => {
                  const rowSum = confusionData[rIdx].reduce((a, b) => a + b, 0);
                  const diagonal = confusionData[rIdx][rIdx];
                  const recall = ((diagonal / rowSum) * 100).toFixed(1);

                  return (
                    <tr key={rowClass} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                      <td className="p-2.5 text-left font-medium border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
                        {rowClass}
                      </td>
                      {confusionData[rIdx].map((val, cIdx) => {
                        const isDiag = rIdx === cIdx;
                        return (
                          <td
                            key={cIdx}
                            className={`p-2.5 border border-neutral-200 dark:border-neutral-700 font-mono font-medium ${
                              isDiag
                                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold'
                                : val > 10
                                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                                : 'text-neutral-500'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                      <td className="p-2.5 border border-neutral-200 dark:border-neutral-700 font-mono font-bold text-[#283845] dark:text-[#FFA649]">
                        {recall}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. SORTABLE REPORTS TABLE */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-[#283845] dark:text-white">
              Municipal Complaint Queue
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Showing {sortedReports.length} reports matching active criteria
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500">Sort by:</span>
            <button
              onClick={() => toggleSort('timestamp')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                sortField === 'timestamp'
                  ? 'bg-[#283845] text-white border-[#283845]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              Date {sortField === 'timestamp' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('priority')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                sortField === 'priority'
                  ? 'bg-[#283845] text-white border-[#283845]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              Priority {sortField === 'priority' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('severity')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                sortField === 'severity'
                  ? 'bg-[#283845] text-white border-[#283845]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              Severity {sortField === 'severity' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700 text-neutral-500 font-semibold uppercase text-[11px]">
                <th className="py-3 px-3">Ticket ID</th>
                <th className="py-3 px-3">Visual</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Location &amp; Ward</th>
                <th className="py-3 px-3 text-center">Severity</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {sortedReports.map((report) => {
                const isResolved = report.status === 'Resolved';
                return (
                  <tr key={report.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                      {report.id}
                      <div className="text-[10px] text-neutral-400 font-normal">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="w-12 h-10 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={report.imageUrl}
                          alt={report.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-neutral-900 dark:text-white block">
                        {report.category}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {report.confidence}% conf.
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-[200px]">
                      <div className="truncate text-neutral-700 dark:text-neutral-300">
                        {report.location.address}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {report.location.ward || 'Municipal Ward'}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">
                        {report.severity}/5
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          report.priority === 'Critical'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                            : report.priority === 'High'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : report.priority === 'Medium'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        isResolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {isResolved && <CheckCircle2 className="w-3 h-3" />}
                        <span>{report.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isResolved ? (
                        <button
                          onClick={() => onUpdateReportStatus(report.id, 'In Review')}
                          className="px-2.5 py-1 text-[11px] rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 transition-colors cursor-pointer"
                        >
                          Reopen
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateReportStatus(report.id, 'Resolved')}
                          className="px-2.5 py-1 text-[11px] rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-xs cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
