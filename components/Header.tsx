import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = "text-sm font-medium text-gray-300 hover:text-hrom-gold transition-colors cursor-pointer";
  const mobileNavLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-hrom-gold hover:bg-gray-800";

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (currentView !== ViewState.HOME) {
      onNavigate(ViewState.HOME);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView !== ViewState.HOME) {
      onNavigate(ViewState.HOME);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-md border-b border-gray-800' : 'bg-black/50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
             <a 
               href="#" 
               onClick={handleLogoClick}
               className="flex items-center"
             >
               <img 
                 src="https://i.ibb.co/bXf9q7s/logo-transparent-4x.png" 
                 alt="HROM SECURITY" 
                 className="h-14 w-auto hover:scale-105 transition-transform duration-300"
               />
             </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={navLinkClass}>Služby</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={navLinkClass}>O nás</a>
              <button 
                onClick={() => onNavigate(ViewState.AI_LAB)} 
                className={`${navLinkClass} ${currentView === ViewState.AI_LAB ? 'text-hrom-gold' : ''}`}
              >
                AI Laboratoř
              </button>
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="bg-hrom-gold text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20"
              >
                Nezávazná poptávka
              </a>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={mobileNavLinkClass}>Služby</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={mobileNavLinkClass}>O nás</a>
            <button onClick={() => { onNavigate(ViewState.AI_LAB); setIsMobileMenuOpen(false); }} className={`${mobileNavLinkClass} w-full text-left`}>AI Laboratoř</button>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`${mobileNavLinkClass} text-hrom-gold font-bold`}>Poptávka</a>
          </div>
        </div>
      )}
    </header>
  );
};