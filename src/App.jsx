import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Teaching from './components/Teaching';
import Simulation from './components/Simulation';
import Research from './components/Research';
import Tutorials from './components/Tutorials';
import Contact from './components/Contact';
import { translations } from './data/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('fr');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} lang={lang} />}
        {activeTab === 'teaching' && <Teaching lang={lang} />}
        {activeTab === 'simulation' && <Simulation lang={lang} />}
        {activeTab === 'research' && <Research lang={lang} />}
        {activeTab === 'tutorials' && <Tutorials lang={lang} />}
        {activeTab === 'contact' && <Contact lang={lang} />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm border-t border-slate-800">
        <p>© 2026 Dr. Djamel OUNNAS — Université de Tébessa. {translations[lang].footer}</p>
      </footer>
    </div>
  );
}