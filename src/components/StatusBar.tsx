import React from 'react';
import { MapPin, Zap, Wifi, Clock } from 'lucide-react';

interface StatusBarProps {
  coordinates: [number, number];
  zoom: number;
  selectedState: string;
  isLoading: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  coordinates,
  zoom,
  selectedState,
  isLoading
}) => {
  const formatCoordinate = (coord: number, isLongitude: boolean = false) => {
    const direction = isLongitude 
      ? (coord >= 0 ? 'E' : 'W')
      : (coord >= 0 ? 'N' : 'S');
    return `${Math.abs(coord).toFixed(4)}°${direction}`;
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700 px-4 py-2">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-4">
          {/* Coordinates */}
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>
              {formatCoordinate(coordinates[1])} {formatCoordinate(coordinates[0], true)}
            </span>
          </div>

          {/* Zoom Level */}
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Zoom: {zoom.toFixed(1)}x</span>
          </div>

          {/* Loading Status */}
          <div className="flex items-center space-x-1">
            <Wifi className={`w-3 h-3 ${isLoading ? 'text-yellow-400' : 'text-green-400'}`} />
            <span>{isLoading ? 'Loading...' : 'Connected'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Selected State */}
          <div className="capitalize">
            State: {selectedState.replace('-', ' ')}
          </div>

          {/* Current Time */}
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{getCurrentTime()} IST</span>
          </div>

          {/* Data Status */}
          <div className="text-green-400">
            Data: Real-time
          </div>
        </div>
      </div>
    </div>
  );
};