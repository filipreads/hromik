import React, { useState } from 'react';
import { getTechRecommendation } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { LoadingState, TechRecommendation } from '../../types';
import { Radio, BatteryCharging } from 'lucide-react';

export const TechAdvisor: React.FC = () => {
  const [venue, setVenue] = useState('Venkovní prostranství');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<TechRecommendation | null>(null);

  const handleSubmit = async () => {
    setStatus(LoadingState.LOADING);
    try {
      const data = await getTechRecommendation(venue);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Radio className="text-hrom-gold" />
        Tech Advisor
      </h3>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Typ prostoru</label>
        <select 
          className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-hrom-gold focus:border-hrom-gold outline-none"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option>Venkovní prostranství (festival)</option>
          <option>Průmyslová hala</option>
          <option>Hotelový sál</option>
          <option>Klub / Bar</option>
          <option>Soukromá vila</option>
        </select>
        
        <Button variant="secondary" onClick={handleSubmit} isLoading={status === LoadingState.LOADING} className="w-full">
          Doporučit techniku
        </Button>
      </div>

      {result && (
        <div className="mt-6 space-y-4 animate-in fade-in">
            <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-hrom-gold">
                <h4 className="text-white font-bold mb-2">Základní výbava (Must-have)</h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {result.essentials.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-white font-bold mb-2">Profi upgrade</h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {result.advanced.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1"><BatteryCharging className="w-3 h-3"/> Powered by Gemini Flash</span>
                <span>Est. posádka: {result.estimatedCrewSize} os.</span>
            </div>
        </div>
      )}
    </div>
  );
};