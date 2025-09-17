import React from 'react';
import { Menu, Globe, Brain, Settings, HelpCircle } from 'lucide-react';

interface State {
  id: string;
  name: string;
  center: [number, number];
}

interface HeaderProps {
  selectedState: string;
  onStateChange: (stateId: string) => void;
  states: State[];
  onMenuToggle: () => void;
  onAIPanelToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedState,
  onStateChange,
  states,
  onMenuToggle,
  onAIPanelToggle
}) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-3">
          <Globe className="w-6 h-6 text-green-500" />
          <div>
            <h1 className="text-lg font-bold text-white">FRA Atlas</h1>
            <p className="text-xs text-slate-300">Forest Rights Act Monitoring System</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {states.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <button
          onClick={onAIPanelToggle}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
        >
          <Brain className="w-4 h-4" />
          <span>AI Analytics</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <button
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};