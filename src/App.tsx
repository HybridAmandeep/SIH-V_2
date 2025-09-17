import React, { useState, useEffect } from 'react';
import { MapContainer } from './components/MapContainer';
import { NavigationControls } from './components/NavigationControls';
import { SearchPanel } from './components/SearchPanel';
import { LayerPanel } from './components/LayerPanel';
import { InfoOverlay } from './components/InfoOverlay';
import { AIAnalyticsPanel } from './components/AIAnalyticsPanel';
import { StateSelector } from './components/StateSelector';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { Globe, Menu, X } from 'lucide-react';

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

function App() {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 77.1025,
    latitude: 22.9734,
    zoom: 5,
    pitch: 0,
    bearing: 0
  });

  const [selectedState, setSelectedState] = useState<string>('madhya-pradesh');
  const [activeLayers, setActiveLayers] = useState<LayerConfig[]>([
    { id: 'satellite', name: 'Satellite Imagery', type: 'satellite', visible: true, opacity: 1 },
    { id: 'forest', name: 'Forest Cover', type: 'forest', visible: true, opacity: 0.7 },
    { id: 'boundaries', name: 'FRA Boundaries', type: 'boundaries', visible: true, opacity: 0.8 },
    { id: 'settlements', name: 'Settlements', type: 'settlements', visible: false, opacity: 0.6 },
    { id: 'terrain', name: 'Terrain', type: 'terrain', visible: false, opacity: 0.5 }
  ]);

  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiPanelOpen, setAIPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const states = [
    { id: 'madhya-pradesh', name: 'Madhya Pradesh', center: [77.4126, 23.2599] },
    { id: 'tripura', name: 'Tripura', center: [91.9882, 23.9408] },
    { id: 'odisha', name: 'Odisha', center: [85.0985, 20.9517] },
    { id: 'telangana', name: 'Telangana', center: [79.0193, 17.1232] }
  ];

  const handleStateChange = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    if (state) {
      setSelectedState(stateId);
      setViewState(prev => ({
        ...prev,
        longitude: state.center[0],
        latitude: state.center[1],
        zoom: 7
      }));
    }
  };

  const handleLayerToggle = (layerId: string) => {
    setActiveLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleLayerOpacityChange = (layerId: string, opacity: number) => {
    setActiveLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  const handleLocationSelect = (location: LocationInfo) => {
    setSelectedLocation(location);
    setViewState(prev => ({
      ...prev,
      longitude: location.coordinates[0],
      latitude: location.coordinates[1],
      zoom: 12
    }));
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    // Simulate API call for search
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const resetView = () => {
    const state = states.find(s => s.id === selectedState);
    if (state) {
      setViewState({
        longitude: state.center[0],
        latitude: state.center[1],
        zoom: 7,
        pitch: 0,
        bearing: 0
      });
    }
  };

  return (
    <div className="h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Header */}
      <Header 
        selectedState={selectedState}
        onStateChange={handleStateChange}
        states={states}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onAIPanelToggle={() => setAIPanelOpen(!aiPanelOpen)}
      />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <div className="space-y-4">
            <SearchPanel 
              query={searchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
              selectedState={selectedState}
            />
            
            <LayerPanel 
              layers={activeLayers}
              onLayerToggle={handleLayerToggle}
              onOpacityChange={handleLayerOpacityChange}
            />

            <StateSelector 
              selectedState={selectedState}
              states={states}
              onStateChange={handleStateChange}
            />
          </div>
        </Sidebar>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer 
            viewState={viewState}
            onViewStateChange={setViewState}
            layers={activeLayers}
            onLocationSelect={handleLocationSelect}
          />

          {/* Navigation Controls */}
          <NavigationControls 
            onZoomIn={() => setViewState(prev => ({ ...prev, zoom: Math.min(prev.zoom + 1, 20) }))}
            onZoomOut={() => setViewState(prev => ({ ...prev, zoom: Math.max(prev.zoom - 1, 1) }))}
            onResetView={resetView}
            onToggle3D={() => setViewState(prev => ({ ...prev, pitch: prev.pitch === 0 ? 60 : 0 }))}
            viewState={viewState}
          />

          {/* Info Overlay */}
          {selectedLocation && (
            <InfoOverlay 
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </div>

        {/* AI Analytics Panel */}
        {aiPanelOpen && (
          <AIAnalyticsPanel 
            selectedState={selectedState}
            onClose={() => setAIPanelOpen(false)}
          />
        )}
      </div>

      {/* Status Bar */}
      <StatusBar 
        coordinates={[viewState.longitude, viewState.latitude]}
        zoom={viewState.zoom}
        selectedState={selectedState}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;