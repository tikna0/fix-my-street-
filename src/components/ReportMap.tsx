import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface ReportMapProps {
  lat: number;
  lng: number;
  accuracy?: number;
  onLocationChange: (lat: number, lng: number) => void;
  isTracking?: boolean;
}

export const ReportMap: React.FC<ReportMapProps> = ({
  lat,
  lng,
  accuracy,
  onLocationChange,
  isTracking = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 15,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Modern custom marker pin with SVG icon in #FFA649 / #283845
    const customIcon = L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
          <div style="width: 28px; height: 28px; background: #FFA649; border: 3px solid #283845; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <div style="width: 8px; height: 8px; background: #283845; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 32],
    });

    const marker = L.marker([lat, lng], {
      draggable: true,
      icon: customIcon,
    }).addTo(map);

    marker.bindPopup('<b>Incident Location</b><br/>Drag pin or click map to reposition.').openPopup();

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      onLocationChange(pos.lat, pos.lng);
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      onLocationChange(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync coords changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;

    const currentPos = markerRef.current.getLatLng();
    if (Math.abs(currentPos.lat - lat) > 0.0001 || Math.abs(currentPos.lng - lng) > 0.0001) {
      markerRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.setView([lat, lng], mapInstanceRef.current.getZoom());
    }

    // Accuracy circle for live GPS
    if (accuracy && accuracy > 0) {
      if (circleRef.current) {
        circleRef.current.setLatLng([lat, lng]);
        circleRef.current.setRadius(accuracy);
      } else {
        circleRef.current = L.circle([lat, lng], {
          radius: accuracy,
          color: '#FFA649',
          fillColor: '#FFA649',
          fillOpacity: 0.15,
          weight: 1.5,
        }).addTo(mapInstanceRef.current);
      }
    } else if (circleRef.current) {
      circleRef.current.remove();
      circleRef.current = null;
    }
  }, [lat, lng, accuracy]);

  return (
    <div className="relative w-full h-full min-h-[260px] rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '260px' }} />
      {isTracking && (
        <div className="absolute top-3 right-3 z-[400] bg-white/95 dark:bg-[#283845]/95 text-xs font-semibold px-2.5 py-1 rounded shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Live GPS Active</span>
        </div>
      )}
    </div>
  );
};
