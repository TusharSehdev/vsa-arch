import React, { useEffect, useMemo, useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  Rectangle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Center position of the map
const position = [31.31437783056458, 75.59289214695548];

// Convert your SVG to Base64-encoded URL
const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="location"><path fill="#e3e2e1" d="M54.01 58.74C54.01 61.65 44.15 64 32 64c-12.15 0-22.01-2.35-22.01-5.26 0-2.6 7.9-4.74 18.26-5.18h7.5c10.37.44 18.26 2.58 18.26 5.18z"></path><path fill="#e82327" d="M32 0C20.7 0 11.54 9.15 11.54 20.45 11.54 31.75 32 58.74 32 58.74s20.45-26.99 20.45-38.29S43.3 0 32 0zm0 33.99c-7.48 0-13.54-6.06-13.54-13.54S24.52 6.91 32 6.91c7.48 0 13.54 6.06 13.54 13.54S39.48 33.99 32 33.99z"></path></svg>`;

// Convert SVG string to Base64
const svgUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

// Define custom icon using Leaflet's L.Icon class
const customIcon = new L.Icon({
  iconUrl: svgUrl,
  iconSize: [67, 67], // size of the icon
  iconAnchor: [32, 64], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -64], // point from which the popup should open relative to the iconAnchor
});

const MapComponent = () => {
  const map = useMap();

  // Example of using useMap to interact with the map
  map.setView(position, 14);

  return (
    <>
      <Marker position={position} icon={customIcon}>
        <Popup>VSA Architecture</Popup>
      </Marker>
    </>
  );
};

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [onChange]);
  useMapEvent(handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [parentMap, mapZoom]
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

const Map = () => {
 

  return (
    <>
      <div className="rounded-2xl m-4 text-white">
        <div className="max_padd_container2 pb-10">
            <h1 className="text-3xl md:text-5xl font-semibold">Where to find us?</h1>
            <div className="border border-primary my-4"></div>
          <div
            className="shadow-lg hover:shadow-2xl"
            style={{ borderRadius: "20px" }}
            data-aos="fade-up" 
            data-aos-duration="1500"
          >
            <MapContainer
              scrollWheelZoom={false}
              center={position}
              zoom={14}
              style={{ width: "100%", height: "400px", borderRadius: "20px" }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <MapComponent />
              <MinimapControl position="topright" />
            </MapContainer>
          </div>
        </div>
      </div>
      <img src="/pattern.png" alt="" className="gray hidden lg:block" />
    </>
  );
};

export default Map;
