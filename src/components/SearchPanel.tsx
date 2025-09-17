import React, { useState, useRef } from 'react';
import { Search, MapPin, Clock, Filter } from 'lucide-react';

interface SearchPanelProps {
  query: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
  selectedState: string;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  query,
  onSearch,
  isLoading,
  selectedState
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Kanha National Park',
    'Bandhavgarh Tiger Reserve',
    'Pench National Park'
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    { name: 'Kanha National Park', type: 'Protected Area', state: 'Madhya Pradesh' },
    { name: 'Tribal Settlement Area', type: 'FRA Zone', state: 'Odisha' },
    { name: 'Community Forest Rights', type: 'FRA Implementation', state: 'Tripura' },
    { name: 'Individual Forest Rights', type: 'FRA Implementation', state: 'Telangana' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setSearchHistory(prev => [query, ...prev.filter(item => item !== query)].slice(0, 5));
      setShowSuggestions(false);
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Search Locations</h3>
        <Filter className="w-4 h-4 text-slate-400" />
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search forests, settlements, FRA zones..."
            className="w-full pl-10 pr-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Search suggestions */}
        {showSuggestions && (query || searchHistory.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-600 border border-slate-500 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {query && (
              <div>
                <div className="px-3 py-2 text-xs text-slate-300 font-medium border-b border-slate-500">
                  Suggestions
                </div>
                {suggestions
                  .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onSearch(item.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-500 transition-colors flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{item.name}</div>
                        <div className="text-xs text-slate-400 truncate">{item.type} • {item.state}</div>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            {searchHistory.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs text-slate-300 font-medium border-b border-slate-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Recent Searches</span>
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSearch(item);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-500 transition-colors flex items-center space-x-2"
                  >
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-sm text-slate-200 truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </form>

      {/* Quick filters */}
      <div className="space-y-2">
        <div className="text-xs text-slate-300 font-medium">Quick Filters</div>
        <div className="flex flex-wrap gap-2">
          {['Forest Rights', 'Protected Areas', 'Settlements', 'Mining Areas'].map((filter) => (
            <button
              key={filter}
              className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 rounded transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};