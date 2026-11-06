import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Globe, 
  TrendingUp, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus, 
  BarChart2, 
  Clock, 
  ShieldCheck,
  MapPin
} from 'lucide-react';

export default function VisitorCounterCard({ lang = 'fr' }) {
  // Initialize state from LocalStorage or default values
  const [totalVisitors, setTotalVisitors] = useState(() => {
    const saved = localStorage.getItem('site_total_visitors');
    return saved !== null ? parseInt(saved, 10) : 12480;
  });

  const [todayVisitors, setTodayVisitors] = useState(() => {
    const saved = localStorage.getItem('site_today_visitors');
    return saved !== null ? parseInt(saved, 10) : 142;
  });

  const [activeUsers, setActiveUsers] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastVisited, setLastVisited] = useState(new Date().toLocaleTimeString());

  // Country breakdown data
  const [countryStats, setCountryStats] = useState([
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿', count: 8620, percent: 69 },
    { code: 'FR', name: 'France', flag: '🇫🇷', count: 1870, percent: 15 },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳', count: 750, percent: 6 },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', count: 620, percent: 5 },
    { code: 'OTHER', name: 'Autres', flag: '🌐', count: 620, percent: 5 },
  ]);

  // Hourly traffic history for mini chart
  const hourlyData = [
    { hour: '08:00', count: 12 },
    { hour: '10:00', count: 34 },
    { hour: '12:00', count: 48 },
    { hour: '14:00', count: 29 },
    { hour: '16:00', count: 52 },
    { hour: '18:00', count: 41 },
    { hour: '20:00', count: 22 },
  ];

  // Save to LocalStorage on update
  useEffect(() => {
    localStorage.setItem('site_total_visitors', totalVisitors.toString());
    localStorage.setItem('site_today_visitors', todayVisitors.toString());
  }, [totalVisitors, todayVisitors]);

  // Simulation timer
  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setTotalVisitors(prev => prev + 1);
        setTodayVisitors(prev => prev + 1);
        setLastVisited(new Date().toLocaleTimeString());
        setActiveUsers(Math.floor(Math.random() * 6) + 2);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleIncrement = () => {
    setTotalVisitors(prev => prev + 1);
    setTodayVisitors(prev => prev + 1);
    setLastVisited(new Date().toLocaleTimeString());
  };

  const handleDecrement = () => {
    if (totalVisitors > 0) setTotalVisitors(prev => prev - 1);
    if (todayVisitors > 0) setTodayVisitors(prev => prev - 1);
  };

  const handleReset = () => {
    if (window.confirm(lang === 'fr' ? 'Réinitialiser le compteur de visites ?' : 'Reset visitor count?')) {
      setTotalVisitors(0);
      setTodayVisitors(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span>{lang === 'fr' ? 'Statistiques de Fréquentation' : 'Visitor Analytics'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'fr' ? 'Mesure d\'audience et origine géographique des visiteurs.' : 'Traffic measurement and geographical origin.'}
          </p>
        </div>

        {/* Live Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{activeUsers} {lang === 'fr' ? 'en ligne en ce moment' : 'active now'}</span>
        </div>
      </div>

      {/* Main Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Visitors */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>{lang === 'fr' ? 'Total Visiteurs' : 'Total Visitors'}</span>
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {totalVisitors.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'fr' ? 'Vérifié par stockage local' : 'Verified count'}</span>
          </p>
        </div>

        {/* Today Visitors */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>{lang === 'fr' ? 'Aujourd\'hui' : 'Today'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-slate-800 font-mono">
            +{todayVisitors.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'fr' ? `Dernier accès : ${lastVisited}` : `Last hit: ${lastVisited}`}</span>
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-900 mb-2">
            {lang === 'fr' ? 'Contrôle Manuel & Simulation' : 'Manual Controls'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleIncrement}
              className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
              title="Ajouter une visite"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1</span>
            </button>
            <button
              onClick={handleDecrement}
              className="py-1.5 px-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition"
              title="Diminuer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                isSimulating 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
              title="Simulation automatique"
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Pause' : 'Auto'}</span>
            </button>
            <button
              onClick={handleReset}
              className="py-1.5 px-2 bg-white hover:bg-red-50 text-red-600 border border-slate-200 rounded-lg text-xs font-bold transition"
              title="Réinitialiser"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Country Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'fr' ? 'Origine des Visiteurs' : 'Geographical Origin'}</span>
          </h4>
          <div className="space-y-2.5">
            {countryStats.map((item) => (
              <div key={item.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <span>{item.flag}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="font-mono text-slate-500 font-semibold">{item.percent}% ({item.count})</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Activity Chart */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'fr' ? 'Activité Aujourd\'hui (par heure)' : 'Hourly Traffic'}</span>
          </h4>
          <div className="h-40 bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-end justify-between gap-2">
            {hourlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div 
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-t-md transition-all duration-300 relative"
                  style={{ height: `${(d.count / 60) * 100}%` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded transition font-mono">
                    {d.count}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{d.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}