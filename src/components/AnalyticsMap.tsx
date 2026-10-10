import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CivicReport } from '../types/civic';

interface AnalyticsMapProps {
  reports: CivicReport[];
  selectedReportId?: string | null;
  onSelectReport?: (report: CivicReport) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: '#DC2626', // Crimson red
  High: '#FFA649',     // Amber
  Medium: '#2563EB',   // Royal blue
  Low: '#16A34A',      // Forest green
};

export const AnalyticsMap: React.FC<AnalyticsMapProps> = ({
  reports,
  selectedReportId,
  onSelectReport,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialCenter: [number, number] = reports.length > 0 
      ? [reports[0].location.lat, reports[0].location.lng]
      : [37.7749, -122.4194];

    const map = L.map(containerRef.current, {
      center: initialCenter,
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = layerGroup;
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when reports change
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    if (reports.length === 0) return;

    const bounds = L.latLngBounds([]);

    reports.forEach((report) => {
      const color = PRIORITY_COLORS[report.priority] || '#283845';
      const isSelected = selectedReportId === report.id;

      const markerHtml = `
        <div style="position: relative; width: 28px; height: 28px;">
          <div style="
            width: ${isSelected ? '28px' : '22px'};
            height: ${isSelected ? '28px' : '22px'};
            background-color: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 3px 8px rgba(0,0,0,0.35);
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
          ">
            ${report.priority === 'Critical' ? '!' : ''}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'civic-marker-node',
        html: markerHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([report.location.lat, report.location.lng], { icon });

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; font-size: 13px; line-height: 1.4; min-width: 200px;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #1e293b;">${report.title}</div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="display: inline-block; padding: 2px 6px; font-size: 11px; font-weight: 600; border-radius: 4px; background: ${color}20; color: ${color};">
              ${report.priority} Priority
            </span>
            <span style="font-size: 11px; color: #64748b;">${report.category}</span>
          </div>
          <p style="margin: 4px 0 6px; color: #475569; font-size: 12px;">${report.description.slice(0, 90)}...</p>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">📍 ${report.location.address || 'Address provided'}</div>
          <a href="https://www.google.com/maps/search/?api=1&query=${report.location.lat},${report.location.lng}" 
             target="_blank" 
             rel="noreferrer" 
             style="color: #2563eb; font-weight: 600; font-size: 11px; text-decoration: none;">
            Open in Google Maps &rarr;
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectReport) onSelectReport(report);
      });

      markersLayerRef.current?.addLayer(marker);
      bounds.extend([report.location.lat, report.location.lng]);
    });

    if (reports.length > 0 && bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [reports, selectedReportId, onSelectReport]);

  return (
    <div className="relative w-full h-[450px] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div ref={containerRef} className="w-full h-full" />
      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 dark:bg-[#1E293B]/95 p-3 rounded-md shadow-md border border-neutral-200 dark:border-neutral-700 text-xs">
        <div className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Priority Legend</div>
        <div className="grid grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FFA649]"></span>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#2563EB]"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#16A34A]"></span>
            <span>Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
