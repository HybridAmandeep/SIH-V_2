import React from 'react';
import { ZoomIn, ZoomOut, Home, RotateCcw, Cuboid as Cube } from 'lucide-react';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface NavigationControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggle3D: () => void;
  viewState: ViewState;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggle3D,
  viewState
}) => {
  return (
    <div className="absolute top-4 right-4 space-y-2">
      {/* Zoom Controls */}
      <div className="bg-slate-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onZoomIn}
          className="block w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors border-b border-slate-600"
          disabled={viewState.zoom >= 20}
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={onZoomOut}
          className="block w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors"
          disabled={viewState.zoom <= 1}
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      {/* View Controls */}
      <div className="bg-slate-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onResetView}
          className="block w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors border-b border-slate-600"
          aria-label="Reset view"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={onToggle3D}
          className={`block w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors border-b border-slate-600 ${
            viewState.pitch > 0 ? 'bg-blue-600 text-white' : ''
          }`}
          aria-label="Toggle 3D view"
        >
          <Cube className="w-5 h-5" />
        </button>
        <button
          className="block w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors"
          aria-label="Reset bearing"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Compass */}
      <div className="bg-slate-800 bg-opacity-90 rounded-lg p-3 shadow-lg">
        <div className="w-8 h-8 relative">
          <div 
            className="absolute inset-0 border-2 border-slate-600 rounded-full"
            style={{ transform: `rotate(${-viewState.bearing}deg)` }}
          >
            <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-red-500 transform -translate-x-0.5" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-bold">N</div>
          </div>
        </div>
      </div>
    </div>
  );
};