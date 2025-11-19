import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatBot } from './components/ChatBot';
import { AiLab } from './components/ai-lab/AiLab';
import { Preloader } from './components/ui/Preloader';
import { ViewState } from './types';
import { Shield, UserCheck, Building, Flame, Check } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Simulate initial loading/system check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const MainContent = () => (
    <main>
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center bg-cover bg-center bg-fixed bg-no-repeat pt-20"
        style={{ 
            backgroundImage: "linear-gradient(rgba(17, 17, 17, 0.85), rgba(17, 17, 17, 0.9)), url('https://images.unsplash.com/photo-1485062633509-940652c9c082?q=80&w=2000&auto=format&fit=crop')" 
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="opacity-0 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://i.ibb.co/bXf9q7s/logo-transparent-4x.png" 
              alt="HROM SECURITY Logo" 
              className="h-32 md:h-48 mx-auto mb-8 drop-shadow-2xl animate-float"
            />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-none mb-6">
            <span className="block opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>VAŠE AKCE.</span>
            <span className="block opacity-0 animate-reveal" style={{ animationDelay: '0.6s' }}>NAŠE PRAVIDLA.</span>
            <span className="block text-hrom-gold opacity-0 animate-reveal" style={{ animationDelay: '0.8s' }}>TOTÁLNÍ KLID.</span>
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light opacity-0 animate-reveal" 
            style={{ animationDelay: '1.0s' }}
          >
            Zapomeňte na stres. Naše gorily a bleskurychlé reakce pohlídají všechno – od vaší svatby po největší fesťák. 
            Vy se jen bavte.
          </p>
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-reveal" 
            style={{ animationDelay: '1.2s' }}
          >
             <a 
               href="#contact" 
               onClick={(e) => handleSmoothScroll(e, 'contact')} 
               className="bg-hrom-gold text-black font-bold py-4 px-10 rounded-lg text-lg hover:bg-yellow-400 transition-transform hover:scale-105 shadow-lg shadow-yellow-900/30 inline-block text-center"
             >
               Chci klid na duši!
             </a>
             <button onClick={() => setCurrentView(ViewState.AI_LAB)} className="bg-transparent border-2 border-gray-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:border-hrom-gold hover:text-hrom-gold transition-colors">
               Vyzkoušet AI Lab
             </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-hrom-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4">ČÍM VÁS KRYJEME?</h2>
             <p className="text-gray-400 text-lg">Máme víc než jen svaly. Tady je náš vercajk pro každou situaci.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Akce pod palcem", desc: "Od malých večírků po obří festivaly. S námi máte jistotu." },
              { icon: UserCheck, title: "Osobní strážce", desc: "Váš diskrétní stín, který odradí každého potížistu." },
              { icon: Building, title: "Pevnost 24/7", desc: "Váš majetek v bezpečí, i když spíte. Nedobytná tvrz." },
              { icon: Flame, title: "Andělí strážní", desc: "Požární a zdravotní dohled, který vám kryje záda." },
            ].map((s, i) => (
               <div key={i} className="bg-hrom-bg p-8 rounded-xl hover:shadow-2xl hover:shadow-yellow-900/10 transition-all hover:-translate-y-2 border border-gray-800 hover:border-hrom-gold group hover:border-hrom-gold">
                  <s.icon className="w-12 h-12 text-hrom-gold mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section id="about" className="py-24 bg-hrom-bg">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="grid grid-cols-2 gap-4">
                   <img 
                     src="https://images.unsplash.com/photo-1546755998-2000e6136d40?auto=format&fit=crop&q=80&w=500" 
                     className="rounded-2xl w-full h-64 object-cover transform translate-y-8" 
                     alt="Guard 1"
                     loading="lazy"
                     decoding="async"
                   />
                   <img 
                     src="https://images.unsplash.com/photo-1606923297044-055a9f1c6308?auto=format&fit=crop&q=80&w=500" 
                     className="rounded-2xl w-full h-64 object-cover" 
                     alt="Guard 2"
                     loading="lazy"
                     decoding="async"
                   />
                </div>
                <div>
                   <h2 className="text-3xl md:text-5xl font-black text-white mb-6">NEJSME OBYČEJNÁ OCHRANKA.</h2>
                   <p className="text-gray-400 text-lg mb-6">
                     V džungli plný nástrah je HROM králem. Nehasíme problémy, my je předvídáme. 
                     Žádný unavený vrátný. Naši lidi jsou nabití energií jako bouřka.
                   </p>
                   <ul className="space-y-4 mb-8">
                      {['Fyzická zdatnost', 'Taktické myšlení', 'První pomoc', 'De-eskalace konfliktů'].map((item) => (
                         <li key={item} className="flex items-center text-white font-bold">
                            <Check className="w-6 h-6 text-hrom-gold mr-3" /> {item}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
      </section>

      {/* CTA Contact */}
      <section id="contact" className="py-24 bg-hrom-surface relative overflow-hidden">
         {/* Decor */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-hrom-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              UŽ ŽÁDNEJ STRES.<br />
              <span className="text-hrom-gold">PUSŤTE TO Z HLAVY.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
               Ozvi se. Dáme ti nabídku rychlejc, než řekneš 'gorila'.
            </p>
            
            <div className="bg-hrom-bg p-8 md:p-12 rounded-2xl shadow-2xl text-left border border-gray-800 min-h-[450px] flex flex-col justify-center">
               {!formSubmitted ? (
                 <form className="w-full animate-in fade-in duration-300" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                       <div>
                          <label className="block text-gray-500 text-sm font-bold mb-2">Jméno</label>
                          <input type="text" className="w-full bg-gray-800 border border-gray-7