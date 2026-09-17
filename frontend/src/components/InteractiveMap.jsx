import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { RAJAHMUNDRY_CENTER, RAJAHMUNDRY_LOCALITIES } from '../data/locations';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';

export default function InteractiveMap({
  workers = [],
  selectedWorkerId = null,
  onSelectWorker = null,
  center = [RAJAHMUNDRY_CENTER.lat, RAJAHMUNDRY_CENTER.lng],
  zoom = 13,
  height = '480px',
  showLocalityChips = true,
  showControls = true,
  radiusKm = null, // if provided, draws a coverage circle
  singlePin = null // if provided, pins a single custom location { lat, lng, title }
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const circleRef = useRef(null);
  const [activeLocality, setActiveLocality] = useState('ALL');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapLayer, setMapLayer] = useState('streets'); // 'streets' or 'topo'

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false, // We render custom modern zoom controls
        attributionControl: false
      });

      // Default OpenStreetMap tiles
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }).addTo(map);

      mapInstanceRef.current = map;
      mapInstanceRef.current._tileLayer = tileLayer;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer if changed
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (map._tileLayer) {
      map.removeLayer(map._tileLayer);
    }

    const url = mapLayer === 'streets'
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

    map._tileLayer = L.tileLayer(url, {
      maxZoom: 18,
      subdomains: ['a', 'b', 'c']
    }).addTo(map);
  }, [mapLayer]);

  // Update Radius Circle (e.g. for worker profile coverage zone)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (circleRef.current) {
      map.removeLayer(circleRef.current);
      circleRef.current = null;
    }

    if (radiusKm && center) {
      circleRef.current = L.circle(center, {
        radius: radiusKm * 1000,
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '6, 6'
      }).addTo(map);
    }
  }, [radiusKm, center]);

  // Update Single Custom Pin (e.g. for Post Job or Worker Profile center)
  useEffect(() => {
    if (!mapInstanceRef.current || !singlePin) return;
    const map = mapInstanceRef.current;

    const iconHtml = `
      <div style="
        background: #2563eb;
        color: #ffffff;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(37,99,235,0.45);
        border: 3px solid #ffffff;
        font-size: 18px;
      ">
        📍
      </div>
    `;

    const customIcon = L.divIcon({
      html: iconHtml,
      className: 'custom-single-pin',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const marker = L.marker([singlePin.lat, singlePin.lng], { icon: customIcon }).addTo(map);
    if (singlePin.title) {
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <strong style="font-size: 14px; color: #0f172a; display: block;">${singlePin.title}</strong>
          <span style="font-size: 12px; color: #64748b;">${singlePin.subtitle || 'Selected Location in Rajahmundry'}</span>
        </div>
      `).openPopup();
    }

    map.setView([singlePin.lat, singlePin.lng], 14);

    return () => {
      map.removeLayer(marker);
    };
  }, [singlePin]);

  // Render Multi-Worker Pins
  useEffect(() => {
    if (!mapInstanceRef.current || singlePin) return;
    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    workers.forEach(worker => {
      if (!worker.lat || !worker.lng) return;

      const isSelected = selectedWorkerId === worker.id;
      const isAvailable = worker.availability_status === 'AVAILABLE';

      // Category Emoji
      const catIcons = {
        Plumber: '🔧',
        Electrician: '⚡',
        Carpenter: '🪚',
        Painter: '🎨',
        'AC Technician': '❄️',
        Mechanic: '⚙️',
        Cleaner: '🧹'
      };
      const iconEmoji = catIcons[worker.category] || '🛠️';

      // Custom HTML DivIcon
      const markerHtml = `
        <div style="
          position: relative;
          cursor: pointer;
          transform: translate(-50%, -100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s ease;
        ">
          <!-- Price Badge Pill -->
          <div style="
            background-color: ${isSelected ? '#1e40af' : '#1e293b'};
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 9999px;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            margin-bottom: 2px;
            display: flex;
            align-items: center;
            gap: 2px;
          ">
            <span>₹${worker.hourly_rate}</span>
          </div>

          <!-- Avatar Pin -->
          <div style="
            width: ${isSelected ? '44px' : '36px'};
            height: ${isSelected ? '44px' : '36px'};
            border-radius: 50%;
            border: 3px solid ${isSelected ? '#2563eb' : '#ffffff'};
            background-color: #2563eb;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-size: cover;
            background-position: center;
            background-image: url('${worker.photo || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100"}');
          ">
            <!-- Availability Indicator Dot -->
            <span style="
              position: absolute;
              bottom: -2px;
              right: -2px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: ${isAvailable ? '#10b981' : '#f59e0b'};
              border: 2px solid #ffffff;
            "></span>

            <!-- Category Icon Corner Badge -->
            <span style="
              position: absolute;
              top: -4px;
              left: -4px;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            ">
              ${iconEmoji}
            </span>
          </div>

          <!-- Pointer Tip -->
          <div style="
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid ${isSelected ? '#2563eb' : '#ffffff'};
            margin-top: -1px;
          "></div>
        </div>
      `;

      const divIcon = L.divIcon({
        html: markerHtml,
        className: `worker-marker-${worker.id}`,
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50]
      });

      const marker = L.marker([worker.lat, worker.lng], { icon: divIcon }).addTo(map);

      // Popup with rich worker info
      const popupHtml = `
        <div style="font-family: inherit; width: 220px; padding: 4px;">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
            <img
              src="${worker.photo || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100'}"
              alt="${worker.name}"
              style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb;"
            />
            <div>
              <strong style="font-size: 14px; color: #0f172a; display: flex; align-items: center; gap: 4px;">
                ${worker.name}
                <span style="color: #2563eb; font-size: 13px;">✓</span>
              </strong>
              <div style="font-size: 12px; color: #2563eb; font-weight: 600;">${worker.category}</div>
              <div style="font-size: 11px; color: #eab308; font-weight: 700;">★ ${worker.rating} (${worker.review_count})</div>
            </div>
          </div>

          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
            <span>📍</span>
            <span><strong>${worker.locality || 'Rajahmundry'}</strong>, Rajahmundry</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 6px 8px; background: #f8fafc; border-radius: 6px;">
            <span style="font-size: 11px; color: #475569;">Rate:</span>
            <span style="font-size: 13px; font-weight: 800; color: #2563eb;">₹${worker.hourly_rate}/hr</span>
          </div>

          <div style="display: flex; gap: 6px;">
            <a
              href="/workers/${worker.id}"
              style="
                flex: 1;
                text-align: center;
                padding: 6px 8px;
                background-color: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 700;
                display: block;
              "
            >
              View Profile
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        if (onSelectWorker) onSelectWorker(worker);
      });

      markersRef.current[worker.id] = marker;
    });
  }, [workers, selectedWorkerId]);

  // Handle flyTo when selectedWorkerId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedWorkerId) return;
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (worker && worker.lat && worker.lng) {
      mapInstanceRef.current.flyTo([worker.lat, worker.lng], 15, { duration: 1 });
      const marker = markersRef.current[worker.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 400);
      }
    }
  }, [selectedWorkerId]);

  // Quick jump to a locality
  const handleLocalityJump = (locality) => {
    setActiveLocality(locality.id);
    if (!mapInstanceRef.current) return;

    if (locality.id === 'ALL') {
      mapInstanceRef.current.flyTo([RAJAHMUNDRY_CENTER.lat, RAJAHMUNDRY_CENTER.lng], 13, { duration: 1 });
    } else {
      mapInstanceRef.current.flyTo([locality.lat, locality.lng], 15, { duration: 1 });
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([RAJAHMUNDRY_CENTER.lat, RAJAHMUNDRY_CENTER.lng], 13, { duration: 1 });
      setActiveLocality('ALL');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: isFullScreen ? '100vh' : height,
        position: isFullScreen ? 'fixed' : 'relative',
        top: isFullScreen ? 0 : 'auto',
        left: isFullScreen ? 0 : 'auto',
        right: isFullScreen ? 0 : 'auto',
        bottom: isFullScreen ? 0 : 'auto',
        zIndex: isFullScreen ? 99999 : 1,
        borderRadius: isFullScreen ? 0 : '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid #cbd5e1',
        backgroundColor: '#e2e8f0'
      }}
    >
      {/* Top Locality Quick-Filter Bar */}
      {showLocalityChips && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 1000,
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => handleLocalityJump({ id: 'ALL' })}
            type="button"
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: activeLocality === 'ALL' ? '#2563eb' : 'rgba(255, 255, 255, 0.95)',
              color: activeLocality === 'ALL' ? '#ffffff' : '#1e293b',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.15s ease'
            }}
          >
            📍 All Rajahmundry ({workers.length})
          </button>

          {RAJAHMUNDRY_LOCALITIES.slice(0, 8).map(loc => {
            const isCur = activeLocality === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleLocalityJump(loc)}
                type="button"
                style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: isCur ? '#2563eb' : 'rgba(255, 255, 255, 0.95)',
                  color: isCur ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: isCur ? '700' : '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.15s ease'
                }}
              >
                {loc.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Modern Map Controls (Right Side) */}
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '14px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {/* Layer Switcher */}
          <button
            onClick={() => setMapLayer(mapLayer === 'streets' ? 'topo' : 'streets')}
            title="Switch Map Style (Streets / Topo)"
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <Layers size={17} />
          </button>

          {/* Reset Center */}
          <button
            onClick={handleResetCenter}
            title="Reset to Rajahmundry Center"
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <Navigation size={17} />
          </button>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <ZoomIn size={17} />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <ZoomOut size={17} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Map"}
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            {isFullScreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      )}

      {/* Bottom Live Watermark / Info Badge */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(4px)'
      }}>
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
        <span><strong>Workify Live Radar:</strong> Rajahmundry & Godavari Belt</span>
      </div>

      {/* Leaflet Map DOM Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
