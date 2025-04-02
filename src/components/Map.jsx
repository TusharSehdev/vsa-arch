import React, { useEffect, useState, useRef, useMemo, memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Fix for Leaflet default icon issues with bundlers
// Delete these lines if using a custom SVG icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create icons once outside of component render
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom CSS for map container
const mapStyles = {
  container: {
    width: "100%",
    height: "500px",
    borderRadius: "0.75rem",
  },
  darkMapContainer: {
    filter: "brightness(0.85)",
  }
};

// Center position of the map
const position = [31.31437783056458, 75.59289214695548];

// Create a simpler SVG marker for minimalist design - light version
const lightSvgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="3"></circle>
  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
</svg>`;

// Create a simpler SVG marker for minimalist design - dark version
const darkSvgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="3"></circle>
  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
</svg>`;

// Create safer versions of the SVG URLs that work with all browsers
const encodedLightSvg = encodeURIComponent(lightSvgString);
const lightSvgUrl = `data:image/svg+xml;charset=utf-8,${encodedLightSvg}`;

const encodedDarkSvg = encodeURIComponent(darkSvgString);
const darkSvgUrl = `data:image/svg+xml;charset=utf-8,${encodedDarkSvg}`;

// Pre-create both icons to avoid re-creating during render
const lightCustomIcon = L.icon({
  iconUrl: lightSvgUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const darkCustomIcon = L.icon({
  iconUrl: darkSvgUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

// Component to update map view - memoized to prevent unnecessary re-renders
const MapComponent = memo(({ isDarkMode }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, 15);
  }, [map]);

  // Use the correct icon based on theme
  const icon = isDarkMode ? lightCustomIcon : darkCustomIcon;

  return (
    <Marker position={position} icon={icon}>
      <Popup className="minimalist-popup">
        <div className="font-medium py-1">VSA Architects</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Jalandhar, Punjab</div>
      </Popup>
    </Marker>
  );
});

// Main Map component - memoized to prevent unnecessary re-renders
const Map = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Tile URLs - defined outside of render
  // URLs for light and dark map tiles
  const lightTileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";
  const darkTileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
  
  // Check for dark mode preference only once on mount and when theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();
    setMapLoaded(true);

    // Listen for changes to the theme with MutationObserver
    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Memoize the tile URL to prevent recalculation
  // FIX: Swapped the URL selection to match dark mode with dark map
  // and light mode with light map
  const tileUrl = useMemo(() => 
    isDarkMode ? darkTileUrl : lightTileUrl, 
    [isDarkMode]
  );

  // Memoize the attribution to prevent recreation
  const attribution = useMemo(() => 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    []
  );

  if (!mapLoaded) {
    return (
      <motion.div 
        className="w-full max-w-6xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col mb-8">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Visit Our Office</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Urban Estate Phase II, Jalandhar, Punjab, India</p>
        </div>
        
        <div className="h-[500px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto px-4 pb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col mb-8">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Visit Our Office</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Urban Estate Phase II, Jalandhar, Punjab, India</p>
      </div>
      
      <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={15}
          style={mapStyles.container}
          zoomControl={false}
          attributionControl={true}
          className="z-0"
          preferCanvas={true}
        >
          <TileLayer 
            url={tileUrl} 
            attribution={attribution}
          />
          <ZoomControl position="bottomright" />
          <MapComponent isDarkMode={isDarkMode} />
        </MapContainer>
      </div>
    </motion.div>
  );
});

export default Map;
