import React, { useState } from 'react';
import Home from './components/Home';
import Research from './components/Research';
import Teaching from './components/Teaching';
import Simulation from './components/Simulation';
import Tutorials from './components/Tutorials';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { translations } from './data/translations';

function App() {
  const [lang, setLang] = useState('fr');
  const [activeTab, setActiveTab] = useState('home');

  const t = translations[lang] || translations.fr;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home lang={lang} t={t} setActiveTab={setActiveTab} />;
      case 'research':
        return <Research lang={lang} t={t} />;
      case 'teaching':
        return <Teaching lang={lang} t={t} setActiveTab={setActiveTab} />;
      case 'simulation':
        return <Simulation lang={lang} t={t} />;
      case 'tutorials':
        return <Tutorials lang={lang} t={t} />;
      case 'contact':
        return <Contact lang={lang} t={t} />;
      default:
        return <Home lang={lang} t={t} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        t={t} 
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="bg-slate-950 border-t border-slate-800 text-center py-6 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Dr. Djamel OUNNAS - Université de Tébessa</p>
      </footer>
    </div>
  );
}

export default App;