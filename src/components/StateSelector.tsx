import React from 'react';
import { MapPin, Users, TreePine, FileText } from 'lucide-react';

interface State {
  id: string;
  name: string;
  center: [number, number];
}

interface StateSelectorProps {
  selectedState: string;
  states: State[];
  onStateChange: (stateId: string) => void;
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  selectedState,
  states,
  onStateChange
}) => {
  const getStateStats = (stateId: string) => {
    const stats = {
      'madhya-pradesh': {
        fraApplications: '45,234',
        titlesGranted: '38,567',
        forestArea: '77,414 km²',
        tribalPopulation: '15.3M'
      },
      'tripura': {
        fraApplications: '8,456',
        titlesGranted: '7,234',
        forestArea: '8,073 km²',
        tribalPopulation: '1.2M'
      },
      'odisha': {
        fraApplications: '52,678',
        titlesGranted: '41,234',
        forestArea: '51,619 km²',
        tribalPopulation: '9.6M'
      },
      'telangana': {
        fraApplications: '23,456',
        titlesGranted: '19,876',
        forestArea: '27,292 km²',
        tribalPopulation: '3.2M'
      }
    };
    return stats[stateId as keyof typeof stats] || stats['madhya-pradesh'];
  };

  const currentStats = getStateStats(selectedState);

  return (
    <div className="bg-slate-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-slate-300" />
        <h3 className="text-sm font-semibold text-slate-200">State Overview</h3>
      </div>

      <div className="space-y-3">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => onStateChange(state.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedState === state.id
                ? 'bg-green-600 bg-opacity-50 border border-green-500'
                : 'bg-slate-600 hover:bg-slate-500 border border-transparent'
            }`}
          >
            <div className="font-medium text-white">{state.name}</div>
            <div className="text-xs text-slate-300 mt-1">
              Lat: {state.center[1].toFixed(4)}, Lng: {state.center[0].toFixed(4)}
            </div>
          </button>
        ))}
      </div>

      {/* State Statistics */}
      <div className="pt-3 border-t border-slate-600 space-y-3">
        <div className="text-xs text-slate-300 font-medium">Key Statistics</div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-600 p-2 rounded text-center">
            <FileText className="w-4 h-4 mx-auto mb-1 text-blue-400" />
            <div className="text-xs text-slate-300">Applications</div>
            <div className="text-sm font-bold text-white">{currentStats.fraApplications}</div>
          </div>
          
          <div className="bg-slate-600 p-2 rounded text-center">
            <Users className="w-4 h-4 mx-auto mb-1 text-green-400" />
            <div className="text-xs text-slate-300">Titles Granted</div>
            <div className="text-sm font-bold text-white">{currentStats.titlesGranted}</div>
          </div>
          
          <div className="bg-slate-600 p-2 rounded text-center">
            <TreePine className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
            <div className="text-xs text-slate-300">Forest Area</div>
            <div className="text-sm font-bold text-white">{currentStats.forestArea}</div>
          </div>
          
          <div className="bg-slate-600 p-2 rounded text-center">
            <Users className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
            <div className="text-xs text-slate-300">Tribal Pop.</div>
            <div className="text-sm font-bold text-white">{currentStats.tribalPopulation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};