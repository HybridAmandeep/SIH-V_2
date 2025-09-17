import React from 'react';
import { X, MapPin, Mountain, TreePine, Home, CheckCircle, AlertTriangle } from 'lucide-react';

interface LocationInfo {
  name: string;
  coordinates: [number, number];
  elevation: number;
  fraStatus: string;
  forestCover: number;
  settlements: number;
}

interface InfoOverlayProps {
  location: LocationInfo;
  onClose: () => void;
}

export const InfoOverlay: React.FC<InfoOverlayProps> = ({ location, onClose }) => {
  return (
    <div className="absolute top-4 left-4 w-80 bg-slate-800 bg-opacity-95 rounded-lg shadow-xl border border-slate-600">
      <div className="flex items-center justify-between p-4 border-b border-slate-600">
        <h3 className="text-lg font-bold text-white">{location.name}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          aria-label="Close information panel"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Coordinates */}
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="text-slate-300">
            {location.coordinates[1].toFixed(6)}, {location.coordinates[0].toFixed(6)}
          </span>
        </div>

        {/* Elevation */}
        <div className="flex items-center space-x-2 text-sm">
          <Mountain className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-slate-300">Elevation: {location.elevation}m</span>
        </div>

        {/* FRA Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-sm font-medium text-slate-200">FRA Status</span>
          </div>
          <div className="ml-6 p-2 bg-green-900 bg-opacity-50 rounded text-sm text-green-200 border border-green-700">
            {location.fraStatus}
          </div>
        </div>

        {/* Environmental Data */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-200">Environmental Data</div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TreePine className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Forest Cover</span>
              </div>
              <span className="text-sm font-bold text-green-400">{location.forestCover}%</span>
            </div>
            
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${location.forestCover}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Settlements</span>
            </div>
            <span className="text-sm font-bold text-white">{location.settlements}</span>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-200">Compliance Status</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Documentation</span>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Complete</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Survey Verification</span>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Verified</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Environmental Clearance</span>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">
            View Details
          </button>
          <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};