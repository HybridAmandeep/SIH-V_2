import React, { useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface LayerConfig {
  id: string;
  name: string;
  type: 'satellite' | 'terrain' | 'forest' | 'settlements' | 'boundaries';
  visible: boolean;
  opacity: number;
}

interface LocationInfo {
  name: string;
  coordinates: [number, number];
  elevation: number;
  fraStatus: string;
  forestCover: number;
  settlements: number;
}

interface MapContainerProps {
  viewState: ViewState;
  onViewStateChange: (viewState: ViewState) => void;
  layers: LayerConfig[];
  onLocationSelect: (location: LocationInfo) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  viewState,
  onViewStateChange,
  layers,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, this would initialize the 3D map library (e.g., Mapbox GL JS, Cesium)
    console.log('Map initialized with viewState:', viewState);
  }, []);

  const handleMapClick = (event: React.MouseEvent) => {
    // Simulate location selection
    const mockLocation: LocationInfo = {
      name: "Sample Forest Area",
      coordinates: [viewState.longitude, viewState.latitude],
      elevation: 450,
      fraStatus: "Community Forest Rights Granted",
      forestCover: 85.6,
      settlements: 3
    };
    onLocationSelect(mockLocation);
  };

  return (
    <div 
      ref={mapRef}
      className="w-full h-full bg-slate-900 relative cursor-crosshair"
      onClick={handleMapClick}
    >
      {/* Map placeholder with Earth-like visualization */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900 via-green-900 to-slate-900 opacity-60" />
      
      {/* Simulated satellite imagery overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center opacity-40"
             style={{
               backgroundImage: `url('https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
             }} 
        />
      </div>

      {/* Grid overlay for geographic reference */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="pointer-events-none">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Layer visualization indicators */}
      {layers.filter(layer => layer.visible).map(layer => (
        <div 
          key={layer.id}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: layer.opacity }}
        >
          {layer.type === 'forest' && (
            <div className="w-full h-full bg-green-500 opacity-20 mix-blend-multiply" />
          )}
          {layer.type === 'boundaries' && (
            <div className="absolute inset-0">
              <svg width="100%" height="100%">
                <rect 
                  x="20%" y="20%" 
                  width="60%" height="60%" 
                  fill="none" 
                  stroke="#f97316" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                  opacity="0.8"
                />
              </svg>
            </div>
          )}
          {layer.type === 'settlements' && (
            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg" />
          )}
        </div>
      ))}

      {/* Coordinates display */}
      <div className="absolute top-4 left-4 bg-slate-800 bg-opacity-90 px-3 py-2 rounded-lg text-xs font-mono">
        <div>Lat: {viewState.latitude.toFixed(4)}</div>
        <div>Lng: {viewState.longitude.toFixed(4)}</div>
        <div>Zoom: {viewState.zoom.toFixed(1)}</div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-slate-800 bg-opacity-90 px-3 py-2 rounded-lg">
        <Loader className="w-4 h-4 animate-spin text-green-500" />
        <span className="text-xs">Loading map data...</span>
      </div>
    </div>
  );
};