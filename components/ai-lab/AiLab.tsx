import React from 'react';
import { RiskQuiz } from './RiskQuiz';
import { TechAdvisor } from './TechAdvisor';
import { Sparkles, BrainCircuit, Users, ArrowLeft } from 'lucide-react';
import { ViewState } from '../../types';
import { Button } from '../ui/Button';
import { getDeEscalationAdvice, getTeamBuilder, getCaseStudy } from '../../services/geminiService';

// Simple wrapper components for the other features to keep file count managed but logical
const DeEscalation: React.FC = () => {
    const [input, setInput] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handle = async () => {
        setLoading(true);
        try { const res = await getDeEscalationAdvice(input); setResponse(res); } 
        catch { setResponse("Error."); }
        setLoading(false);
    }

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full">
            <h3 className="text-xl font-bold text-white mb-4 flex gap-2"><BrainCircuit className="text-hrom-gold" /> De-eskalace</h3>
            <textarea className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg mb-3 text-sm" rows={3} placeholder="Popište konflikt..." value={input} onChange={e => setInput(e.target.value)} />
            <Button variant="secondary" onClick={handle} isLoading={loading} className="w-full text-sm py-2">Poradit</Button>
            {response && <div className="mt-4 bg-gray-900 p-3 rounded text-sm text-gray-300 border-l-2 border-hrom-gold">"{response}"</div>}
        </div>
    )
}

const TeamBuilder: React.FC = () => {
    const [input, setInput] = React.useState('');
    const [result, setResult] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    const handle = async () => {
        setLoading(true);
        try { const res = await getTeamBuilder(input); setResult(res); } 
        catch { }
        setLoading(false);
    }

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full">
            <h3 className="text-xl font-bold text-white mb-4 flex gap-2"><Users className="text-hrom-gold" /> Team Builder</h3>
            <textarea className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg mb-3 text-sm" rows={3} placeholder="Popište akci (např. Svatba 150 lidí)..." value={input} onChange={e => setInput(e.target.value)} />
            <Button variant="secondary" onClick={handle} isLoading={loading} className="w-full text-sm py-2">Sestavit tým</Button>
            {result && (
                <div className="mt-4 space-y-2">
                    <div className="text-hrom-gold font-bold text-lg">{result.squadName}</div>
                    <div className="text-xs text-gray-400 italic mb-2">{result.strategy}</div>
                    {result.roles.map((r: any, i: number) => (
                        <div key={i} className="flex justify-between bg-gray-900 p-2 rounded text-sm text-gray-300">
                            <span>{r.role}</span>
                            <span className="font-bold text-white">{r.count}x</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

interface AiLabProps {
    onBack: () => void;
}

export const AiLab: React.FC<AiLabProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <button onClick={onBack} className="flex items-center gap-2 text-hrom-gold mb-8 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" /> Zpět na hlavní stránku
      </button>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          GORILÍ <span className="text-hrom-gold">LABORATOŘ</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Tady si hrajeme s ohněm, abyste vy nemuseli. Vyzkoušejte naše AI nástroje, které používáme pro strategické plánování.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RiskQuiz />
        <TechAdvisor />
        <div className="space-y-8">
            <DeEscalation />
            <TeamBuilder />
        </div>
      </div>

      <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <Sparkles className="w-12 h-12 text-hrom-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Case Study Generator</h2>
          <p className="text-gray-400 mb-6">Zadejte fiktivní scénář a podívejte se, jak by ho HROM vyřešil.</p>
          {/* Placeholder for simplified interaction */}
          <div className="max-w-xl mx-auto flex gap-2">
             <input type="text" placeholder="např. Útok zombie na koncertě" className="flex-grow bg-gray-900 border-gray-700 rounded-lg px-4 text-white" id="cs-input" />
             <Button 
                onClick={async () => {
                    const el = document.getElementById('cs-input') as HTMLInputElement;
                    const resEl = document.getElementById('cs-result');
                    if(el && resEl) {
                        resEl.innerHTML = 'Generuji...';
                        const text = await getCaseStudy(el.value);
                        resEl.innerHTML = text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b class="text-hrom-gold">$1</b>');
                    }
                }}
             >Generovat</Button>
          </div>
          <div id="cs-result" className="mt-6 text-left text-gray-300 bg-gray-900 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap"></div>
      </div>
    </div>
  );
};