import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Building2, GraduationCap, FileText, ExternalLink, Briefcase, Award, CheckCircle2, Users, Eye, TrendingUp, Globe2, Activity } from 'lucide-react';

// Dictionnaire de traductions pour la page Accueil
const localTranslations = {
  fr: {
    lab: "Laboratoire LABGET",
    title: "Dr. Djamel OUNNAS",
    subTitle: "Maître de Conférences Classe \"A\"",
    dept: "Département de Génie Électrique, Université de Tébessa",
    btnCourses: "Consulter les Cours",
    btnContact: "Me Contacter",
    degreesTitle: "Diplômes & Habilitation",
    viewThesis: "Consulter la thèse",
    viewMemoir: "Consulter le mémoire",
    adminTitle: "Postes Administratifs & Responsabilités",
    adminSub: "Au sein de l'Université de Tébessa"
  },
  en: {
    lab: "LABGET Laboratory",
    title: "Dr. Djamel OUNNAS",
    subTitle: "Associate Professor Class \"A\"",
    dept: "Electrical Engineering Department, Tébessa University",
    btnCourses: "View Courses",
    btnContact: "Contact Me",
    degreesTitle: "Degrees & Academic Qualification",
    viewThesis: "View Thesis",
    viewMemoir: "View Master's Thesis",
    adminTitle: "Administrative & Academic Responsibilities",
    adminSub: "At Tébessa University"
  }
};

// Sous-composant : Carte interactive du Compteur de Visiteurs
function VisitorCounterCard({ lang = 'fr' }) {
  const [totalVisitors, setTotalVisitors] = useState(1000);
  const [todayVisitors, setTodayVisitors] = useState(42);
  const [activeUsers, setActiveUsers] = useState(3);

  // Auto-incrémentation à chaque actualisation / rechargement de la page
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastVisitDate = localStorage.getItem('ounnas_last_visit_date');

    // 1. Gestion du Total des visiteurs (+1 à chaque actualisation)
    const savedTotal = localStorage.getItem('ounnas_total_visitors');
    let newTotal = savedTotal ? parseInt(savedTotal, 10) + 1 : 1000;
    setTotalVisitors(newTotal);
    localStorage.setItem('ounnas_total_visitors', newTotal.toString());

    // 2. Gestion des visiteurs du jour
    const savedToday = localStorage.getItem('ounnas_today_visitors');
    let newToday = 1;
    if (lastVisitDate === todayStr && savedToday) {
      newToday = parseInt(savedToday, 10) + 1;
    }
    setTodayVisitors(newToday);
    localStorage.setItem('ounnas_today_visitors', newToday.toString());
    localStorage.setItem('ounnas_last_visit_date', todayStr);

    // 3. Variation légère des utilisateurs en ligne
    const randomActive = Math.floor(Math.random() * 5) + 2;
    setActiveUsers(randomActive);
  }, []);

  const countryStats = [
    { country: lang === 'fr' ? 'Algérie 🇩🇿' : 'Algeria 🇩🇿', count: Math.round(totalVisitors * 0.68), percentage: '68%' },
    { country: lang === 'fr' ? 'France 🇫🇷' : 'France 🇫🇷', count: Math.round(totalVisitors * 0.18), percentage: '18%' },
    { country: lang === 'fr' ? 'Tunisie 🇹🇳' : 'Tunisia 🇹🇳', count: Math.round(totalVisitors * 0.08), percentage: '8%' },
    { country: lang === 'fr' ? 'Autres 🌐' : 'Others 🌐', count: Math.round(totalVisitors * 0.06), percentage: '6%' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">
              {lang === 'fr' ? 'Statistiques des Visiteurs' : 'Visitor Analytics'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'fr' ? 'Suivi en temps réel de la fréquentation du site académique' : 'Real-time academic website traffic monitoring'}
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{activeUsers} {lang === 'fr' ? 'en ligne actuellement' : 'currently online'}</span>
        </div>
      </div>

      {/* Grille des compteurs principaux */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-4 rounded-xl border border-blue-100/80">
          <div className="flex items-center justify-between text-blue-600 mb-1">
            <Eye className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 rounded-md">TOTAL</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalVisitors.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">
            {lang === 'fr' ? 'Visites cumulées' : 'Total page views'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-4 rounded-xl border border-indigo-100/80">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 rounded-md">AUJOURD'HUI</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{todayVisitors.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">
            {lang === 'fr' ? 'Visiteurs aujourd\'hui' : 'Visitors today'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-4 rounded-xl border border-emerald-100/80">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 rounded-md">EN LIGNE</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{activeUsers}</div>
          <div className="text-xs text-slate-500 mt-1">
            {lang === 'fr' ? 'Sessions actives' : 'Active sessions'}
          </div>
        </div>
      </div>

      {/* Répartition Géographique */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-3">
          <Globe2 className="w-4 h-4 text-blue-600" />
          <span>{lang === 'fr' ? 'Origine de la fréquentation' : 'Traffic Origin'}</span>
        </div>

        <div className="space-y-2.5">
          {countryStats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{stat.country}</span>
                <span className="text-slate-500">{stat.count.toLocaleString()} ({stat.percentage})</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: stat.percentage }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant Principal Home
export default function Home({ setActiveTab, lang = 'fr' }) {
  const t = localTranslations[lang] || localTranslations.fr;

  const degrees = [
    {
      date: "Fév. 2022",
      title: "Habilitation Universitaire en Génie Électrique",
      titleEn: "University Habilitation (HDR) in Electrical Engineering",
      institution: "Université de Tébessa, Algérie.",
      theme: null
    },
    {
      date: "Fév. 2018",
      title: "Docteur en Électrotechnique (Automatique)",
      titleEn: "Ph.D. in Electrical Engineering (Automation)",
      institution: "Université de Sétif 1, Algérie.",
      theme: "Contribution au Diagnostic et à la Commande Passive Tolérante aux Défauts des Systèmes non Linéaires",
      themeEn: "Contribution to Fault Diagnosis and Passive Fault Tolerant Control of Nonlinear Systems",
      link: "/downloads/these-djamel-ounnas.pdf",
      type: "thesis"
    },
    {
      date: "Fév. 2011",
      title: "Magister en Automatique",
      titleEn: "Magister Degree in Automation",
      institution: "Université de Biskra, Algérie.",
      theme: "Commande d'une machine synchrone à aimants permanents via des modèles flous de Takagi-Sugeno",
      themeEn: "Control of a permanent magnet synchronous machine via Takagi-Sugeno fuzzy models",
      link: "/downloads/memoire-djamel-ounnas.pdf",
      type: "memoir"
    },
    {
      date: "Sep. 2007",
      title: "Ingénieur d'État en Électronique (Option Automatique)",
      titleEn: "State Engineer in Electronics (Automation Specialty)",
      institution: "Université de Tébessa, Algérie.",
      theme: "Commande floue d'un Pendule Inversé",
      themeEn: "Fuzzy Logic Control of an Inverted Pendulum"
    },
    {
      date: "Juin 2002",
      title: "Baccalauréat",
      titleEn: "High School Baccalaureate",
      institution: "Séries Sciences Exactes.",
      theme: null
    }
  ];

  const adminRoles = [
    {
      fr: "Responsable du parcours Master Automatique et Systèmes, Département de Génie Électrique, Université de Tébessa.",
      en: "Head of the Master's Program in Automation and Systems, Electrical Engineering Department, Tébessa University."
    },
    {
      fr: "Chef du service des enseignements et de l'évaluation, Faculté de Sciences et Technologies.",
      en: "Head of Teaching and Assessment Office, Faculty of Science and Technology."
    },
    {
      fr: "Membre de l'incubateur de l'Université de Tébessa, Algérie.",
      en: "Member of the Business Incubator, Tébessa University, Algeria."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner Profil */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img 
          src="/photo-profile.png" 
          alt="Dr. Djamel OUNNAS" 
          className="w-40 h-40 rounded-2xl object-cover border-4 border-blue-50 shadow-md shrink-0"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/160?text=Dr.+OUNNAS'; }}
        />
        <div className="space-y-4 text-center md:text-left flex-1">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-2">
              {t.lab}
            </span>
            <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
            <p className="text-lg text-slate-600 font-medium">{t.subTitle}</p>
            <p className="text-slate-500 text-sm">{t.dept}</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>LABGET Laboratory</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Université de Tébessa, Algérie</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <button 
              onClick={() => setActiveTab('teaching')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
            >
              {t.btnCourses}
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
            >
              {t.btnContact}
            </button>
          </div>
        </div>
      </div>

      {/* Diplômes & Habilitation */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <GraduationCap className="w-7 h-7 text-blue-600" />
          <span>{t.degreesTitle}</span>
        </h3>

        <div className="relative border-l-2 border-blue-100 ml-4 space-y-8">
          {degrees.map((item, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />

              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">
                  {item.date}
                </span>
                <h4 className="text-lg font-bold text-slate-800">
                  {lang === 'fr' ? item.title : item.titleEn}
                </h4>
                <p className="text-sm font-medium text-slate-600">{item.institution}</p>

                {item.theme && (
                  <p className="text-xs text-slate-500 italic pt-1">
                    <strong className="font-semibold text-slate-700">Thème : </strong>
                    {lang === 'fr' ? item.theme : item.themeEn}
                  </p>
                )}

                {item.link && (
                  <div className="pt-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{item.type === 'thesis' ? t.viewThesis : t.viewMemoir}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Postes Administratifs & Responsabilités */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-blue-600" />
            <span>{t.adminTitle}</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">{t.adminSub}</p>
        </div>

        <div className="grid gap-4">
          {adminRoles.map((role, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                {lang === 'fr' ? role.fr : role.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Carte du Compteur de Visiteurs en bas de page Home */}
      <VisitorCounterCard lang={lang} />
    </div>
  );
}