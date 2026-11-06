import React, { useState } from 'react';
import { Award, BookMarked, Globe, Download, Calendar, Search, Filter, RefreshCw } from 'lucide-react';
import { translations, publicationsData } from '../data/translations';

export default function Research({ lang = 'fr' }) {
  const [activeTab, setActiveTab] = useState('journals');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const t = translations[lang]?.research || {
    title: "Publications Scientifiques & Conférences",
    journalsTab: "Revues Internationales",
    conferencesTab: "Conférences Internationales",
    download: "Télécharger"
  };

  const rawList = activeTab === 'journals' ? publicationsData.journals : publicationsData.conferences;

  // Extraire toutes les années disponibles pour le filtre
  const years = ['all', ...Array.from(new Set(rawList.map(item => item.year))).sort((a, b) => b - a)];

  // Filtrage combiné par recherche textuelle et par année
  const filteredList = rawList.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;

    return matchesSearch && matchesYear;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedYear('all');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* En-tête principal */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-7 h-7 text-blue-600" />
            <span>{t.title}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {publicationsData.journals.length} Revues Internationales | {publicationsData.conferences.length} Conférences
          </p>
        </div>

        {/* Navigation par Onglets (Revues / Conférences) */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto">
          <button
            onClick={() => { setActiveTab('journals'); resetFilters(); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'journals'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>{t.journalsTab} ({publicationsData.journals.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('conferences'); resetFilters(); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'conferences'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{t.conferencesTab} ({publicationsData.conferences.length})</span>
          </button>
        </div>
      </div>

      {/* Barre de Recherche et Filtre par Année */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        {/* Recherche par mot-clé */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={lang === 'fr' ? "Rechercher par titre, auteur, journal (ex: Takagi-Sugeno, IEEE...)" : "Search title, author, journal..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Sélection par Année */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="all">
              {lang === 'fr' ? "Toutes les années" : "All years"}
            </option>
            {years.filter(y => y !== 'all').map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {/* Bouton Réinitialiser */}
          {(searchTerm !== '' || selectedYear !== 'all') && (
            <button
              onClick={resetFilters}
              title="Réinitialiser les filtres"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Liste Filtrée */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        {filteredList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredList.map((pub, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">
                        <Calendar className="w-3 h-3" />
                        <span>{pub.year}</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base leading-snug pt-0.5">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-blue-600 italic font-medium">
                      {pub.source}
                    </p>
                    <p className="text-xs text-slate-500">
                      {pub.authors}
                    </p>
                  </div>

                  {pub.hasDownload && (
                    <a
                      href={`/downloads/pub_${pub.year}_${idx}.pdf`}
                      download
                      className="shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-200 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.download}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-500 text-sm font-medium">
              {lang === 'fr' 
                ? "Aucune publication ne correspond à vos critères de recherche." 
                : "No publications match your search criteria."}
            </p>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              {lang === 'fr' ? "Réinitialiser les filtres" : "Reset filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}