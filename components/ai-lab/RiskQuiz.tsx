import React, { useState } from 'react';
import { getRiskAssessment } from '../../services/geminiService';
import { Button } from '../ui/Button';
import { LoadingState, RiskAssessment } from '../../types';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

export const RiskQuiz: React.FC = () => {
  const [formData, setFormData] = useState({ type: 'Soukromá oslava', size: 'Do 100 lidí', concern: 'Nezvaní hosté' });
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<RiskAssessment | null>(null);

  const handleSubmit = async () => {
    setStatus(LoadingState.LOADING);
    try {
      const data = await getRiskAssessment(formData.type, formData.size, formData.concern);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  const getRiskColor = (level: string) => {
    if (level.toLowerCase().includes('vysok')) return 'text-red-500';
    if (level.toLowerCase().includes('kritick')) return 'text-red-600';
    if (level.toLowerCase().includes('střed')) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <AlertTriangle className="text-hrom-gold" />
        Vyhodnocení rizik
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Typ akce</label>
          <select 
            className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-hrom-gold focus:border-hrom-gold outline-none"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option>Soukromá oslava</option>
            <option>Koncert / Festival</option>
            <option>Firemní večírek</option>
            <option>Sportovní událost</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Počet lidí</label>
          <select 
            className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-hrom-gold focus:border-hrom-gold outline-none"
            value={formData.size}
            onChange={(e) => setFormData({...formData, size: e.target.value})}
          >
            <option>Do 100 lidí</option>
            <option>100 - 500 lidí</option>
            <option>500 - 2000 lidí</option>
            <option>Více než 2000 lidí</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Největší obava</label>
          <select 
            className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-1 focus:ring-hrom-gold focus:border-hrom-gold outline-none"
            value={formData.concern}
            onChange={(e) => setFormData({...formData, concern: e.target.value})}
          >
            <option>Nezvaní hosté</option>
            <option>Konflikty v davu</option>
            <option>Krádeže</option>
            <option>Zdravotní incidenty</option>
          </select>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          isLoading={status === LoadingState.LOADING} 
          className="w-full mt-4"
        >
          Vyhodnotit rizika
        </Button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-900 p-5 rounded-lg border border-gray-700 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Úroveň rizika</span>
            <span className={`font-black text-xl ${getRiskColor(result.riskLevel)}`}>{result.riskLevel.toUpperCase()}</span>
          </div>
          <p className="text-gray-300 mb-4 italic">"{result.summary}"</p>
          
          <h4 className="text-hrom-gold font-bold text-sm mb-2">Klíčové hrozby:</h4>
          <ul className="space-y-2 mb-4">
            {result.keyRisks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <AlertOctagon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          <h4 className="text-hrom-gold font-bold text-sm mb-2">Doporučení HROMU:</h4>
          <div className="flex items-start gap-2 text-sm text-white bg-gray-800 p-3 rounded">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            {result.mitigation}
          </div>
        </div>
      )}
    </div>
  );
};