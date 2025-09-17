import React, { useState } from 'react';
import { X, Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, PieChart } from 'lucide-react';

interface AIAnalyticsPanelProps {
  selectedState: string;
  onClose: () => void;
}

export const AIAnalyticsPanel: React.FC<AIAnalyticsPanelProps> = ({ selectedState, onClose }) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'predictions' | 'alerts'>('insights');

  const getStateDisplayName = (stateId: string) => {
    const names = {
      'madhya-pradesh': 'Madhya Pradesh',
      'tripura': 'Tripura',
      'odisha': 'Odisha',
      'telangana': 'Telangana'
    };
    return names[stateId as keyof typeof names] || 'Unknown State';
  };

  const mockInsights = {
    'madhya-pradesh': {
      trends: [
        { metric: 'FRA Applications', change: '+12%', status: 'increasing' },
        { metric: 'Title Approvals', change: '+8%', status: 'increasing' },
        { metric: 'Forest Cover', change: '-2%', status: 'decreasing' },
        { metric: 'Processing Time', change: '-15%', status: 'improving' }
      ],
      predictions: [
        'Expected 25% increase in FRA applications over next 6 months',
        'Forest cover stabilization predicted by end of year',
        'Processing efficiency improvement of 20% with current digitization efforts'
      ],
      alerts: [
        { severity: 'high', message: 'Unusual deforestation activity detected in Kanha region' },
        { severity: 'medium', message: '45 FRA applications pending beyond statutory timeline' },
        { severity: 'low', message: 'Seasonal migration patterns may affect data collection in remote areas' }
      ]
    }
  };

  const currentData = mockInsights[selectedState as keyof typeof mockInsights] || mockInsights['madhya-pradesh'];

  return (
    <div className="w-96 h-full bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">AI Analytics</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          aria-label="Close AI analytics panel"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* State Info */}
      <div className="p-4 bg-slate-700 border-b border-slate-600">
        <div className="text-sm text-slate-300">Analyzing</div>
        <div className="text-lg font-semibold text-white">{getStateDisplayName(selectedState)}</div>
        <div className="text-xs text-slate-400 mt-1">Last updated: 2 hours ago</div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-600">
        {[
          { id: 'insights', label: 'Insights', icon: BarChart3 },
          { id: 'predictions', label: 'Predictions', icon: TrendingUp },
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'insights' && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-slate-200">Key Trends</div>
            <div className="space-y-3">
              {currentData.trends.map((trend, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{trend.metric}</span>
                    <span className={`text-sm font-bold ${
                      trend.status === 'increasing' || trend.status === 'improving' 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {trend.change}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {trend.status === 'increasing' ? 'Trending upward' :
                     trend.status === 'decreasing' ? 'Trending downward' :
                     trend.status === 'improving' ? 'Performance improving' : 'Stable'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium text-slate-200 mb-3">Performance Overview</div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-center h-32 text-slate-400">
                  <PieChart className="w-8 h-8 mr-2" />
                  <span className="text-sm">Interactive charts loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-slate-200">AI Predictions</div>
            <div className="space-y-3">
              {currentData.predictions.map((prediction, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white">{prediction}</p>
                      <div className="text-xs text-slate-400 mt-1">
                        Confidence: {85 + index * 3}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-200">Model Insights</span>
              </div>
              <p className="text-xs text-blue-300">
                Predictions are based on historical data analysis, seasonal patterns, and policy implementation trends.
                Accuracy improves with more data collection.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-slate-200">Active Alerts</div>
            <div className="space-y-3">
              {currentData.alerts.map((alert, index) => (
                <div key={index} className={`rounded-lg p-3 border ${
                  alert.severity === 'high' 
                    ? 'bg-red-900 bg-opacity-30 border-red-700' :
                  alert.severity === 'medium'
                    ? 'bg-yellow-900 bg-opacity-30 border-yellow-700' :
                    'bg-blue-900 bg-opacity-30 border-blue-700'
                }`}>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      alert.severity === 'high' ? 'text-red-400' :
                      alert.severity === 'medium' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`} />
                    <div>
                      <p className="text-sm text-white">{alert.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          alert.severity === 'high' 
                            ? 'bg-red-600 text-red-100' :
                          alert.severity === 'medium'
                            ? 'bg-yellow-600 text-yellow-100' :
                            'bg-blue-600 text-blue-100'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Mark All as Reviewed</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};