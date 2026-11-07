import React, { useState } from 'react';

function Navbar({ lang, setLang, activeTab, setActiveTab, t }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t?.nav?.home || 'Accueil' },
    { id: 'research', label: t?.nav?.research || 'Recherche' },
    { id: 'teaching', label: t?.nav?.teaching || 'Enseignement' },
    { id: 'simulation', label: t?.nav?.simulation || 'Laboratoire Virtuel' },
    { id: 'tutorials', label: t?.nav?.tutorials || 'Tutoriels' },
    { id: 'contact', label: t?.nav?.contact || 'Contact' },
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Titre / Logo */}
        <div 
          className="cursor-pointer flex items-center gap-2"
          onClick={() => { setActiveTab('home'); setIsOpen(false); }}
        >
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Dr. Djamel OUNNAS
          </span>
        </div>

        {/* Boutons Droit (Langue + Menu Burger Mobile) */}
        <div className="flex items-center gap-3">
          {/* Sélecteur de langue */}
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 text-xs rounded border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
          >
            {lang === 'fr' ? 'EN 🇬🇧' : 'FR 🇫🇷'}
          </button>

          {/* Bouton Burger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Ordinateur (Écrans larges) */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Navigation Mobile (Menu Déroulant quand cliqué) */}
      {isOpen && (
        <nav className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;