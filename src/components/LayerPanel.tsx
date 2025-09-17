import React from 'react';
import { Layers, Eye, EyeOff, Settings } from 'lucide-react';

interface LayerConfig {
  id: string;
  name: string;
  type: 'satellite' | 'terrain' | 'forest' | 'settlements' | 'boundaries';
  visible: boolean;
  opacity: number;
}

interface LayerPanelProps {
  layers: LayerConfig[];
  onLayerToggle: (layerId: string) => void;
  onOpacityChange: (layerId: string, opacity: number) => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  onLayerToggle,
  onOpacityChange
}) => {
  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'satellite':
        return '🛰️';
      case 'terrain':
        return '🗻';
      case 'forest':
        return '🌲';
      case 'settlements':
        return '🏘️';
      case 'boundaries':
        return '📍';
      default:
        return '📍';
    }
  };

  const getLayerColor = (type: string) => {
    switch (type) {
      case 'satellite':
        return 'text-blue-400';
      case 'terrain':
        return 'text-amber-400';
      case 'forest':
        return 'text-green-400';
      case 'settlements':
        return 'text-yellow-400';
      case 'boundaries':
        return 'text-orange-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-200">Data Layers</h3>
        </div>
        <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-300" />
      </div>

      <div className="space-y-3">
        {layers.map((layer) => (
          <div key={layer.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">{getLayerIcon(layer.type)}</span>
                <span className={`text-sm font-medium ${getLayerColor(layer.type)}`}>
                  {layer.name}
                </span>
              </div>
              <button
                onClick={() => onLayerToggle(layer.id)}
                className="p-1 hover:bg-slate-600 rounded transition-colors"
                aria-label={`Toggle ${layer.name}`}
              >
                {layer.visible ? (
                  <Eye className="w-4 h-4 text-green-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-500" />
                )}
              </button>
            </div>

            {layer.visible && (
              <div className="ml-6 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Opacity</span>
                  <span>{Math.round(layer.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layer.opacity}
                  onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${layer.opacity * 100}%, #475569 ${layer.opacity * 100}%, #475569 100%)`
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-slate-600">
        <div className="text-xs text-slate-300 font-medium mb-2">Legend</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-slate-400">Forest Cover</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-slate-400">FRA Boundaries</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-slate-400">Settlements</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-slate-400">Water Bodies</span>
          </div>
        </div>
      </div>
    </div>
  );
};