import React from 'react';
import { GraduationCap, BookOpen, Award, Video, Mail, Cpu, Globe } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: GraduationCap },
    { id: 'teaching', label: t.teaching, icon: BookOpen },
    { id: 'simulation', label: t.simulation, icon: Cpu },
    { id: 'research', label: t.research, icon: Award },
    { id: 'tutorials', label: t.tutorials, icon: Video },
    { id: 'contact', label: t.contact, icon: Mail },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Dr. Djamel OUNNAS</h1>
              <p className="text-xs text-blue-400 font-medium">{t.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Menu de navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Bouton de bascule de langue FR / EN */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 rounded-lg text-xs font-semibold transition"
              title="Changer la langue / Change language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}