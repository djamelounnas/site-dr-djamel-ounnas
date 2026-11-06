import React from 'react';
import { BookOpen, Download, Cpu, Activity, Settings, Wrench, Layers } from 'lucide-react';
import { translations } from '../data/translations';

export default function Teaching({ lang = 'fr' }) {
  const t = translations[lang].teaching;

  // 1. Module 1 : Systèmes asservis échantillonnés
  const m1 = {
    badge: "🎓 M1 ELT — Électrotechnique Industrielle",
    title: "⚙️ Module : Systèmes asservis échantillonnés et Régulation Numérique",
    desc: "Les systèmes asservis échantillonnés et la régulation numérique constituent un domaine fondamental de l’automatique moderne, où les signaux continus sont traités sous forme discrète via des dispositifs numériques. Ils permettent l’analyse et la commande de systèmes dynamiques à l’aide de modèles discrets, notamment par l’utilisation de la transformée en z et des équations aux différences.",
    note: "🔹 Ressources destinées aux étudiants M1 ELT.",
    resources: [
      { label: "📘 Cours", sub: "Systèmes asservis échantillonnés & régulation numérique", link: "https://drive.google.com/file/d/1GdGFRBPn1MaPzmBO-EjxxWZTANJzhwaW/view?usp=sharing", isCourse: true },
      { label: "🧩 TD 1", sub: "Signaux et systèmes échantillonnés", link: "https://drive.google.com/file/d/13PetnL9oHp4rMgHkxmpG5L4DcQlYB2CW/view?usp=sharing" },
      { label: "🧩 TD 2", sub: "Transformée en z et réponses des systèmes discrets", link: "https://drive.google.com/file/d/1v9Y8rO4UVX0tVBHvF4ug7kRQjDgz2UJt/view?usp=sharing" },
      { label: "🧩 TD 3", sub: "Systèmes asservis linéaires échantillonnés", link: "https://drive.google.com/file/d/1tc2CBGA0vfsJbKoClMPvCLBjMo7aqrd4/view?usp=sharing" },
      { label: "🧩 TD 4", sub: "Analyse de la stabilité", link: "https://drive.google.com/file/d/1xoErSTmkA5AyKT3ylGla7ZXRpPAp1THC/view?usp=sharing" },
      { label: "🧩 TD 5", sub: "Analyse des Performances : Précision et Réponse Transitoire", link: "https://drive.google.com/file/d/1HFD8zgXx6yd0yvv1rsYHOWc6vJd2RKDD/view?usp=sharing" },
      { label: "🧩 TD 6", sub: "Synthèse de Correcteurs PID Numériques", link: "https://drive.google.com/file/d/1TBHNZyJNrfL6GCSXuvd5PFs_NMeEwLj1/view?usp=sharing" },
      { label: "🧩 Problème", sub: "Synthèse de Correcteurs Numériques pour un MCC", link: "https://drive.google.com/file/d/1Jd6NRW2TkblC_SEOm4xgq60TZBTKcn63/view?usp=sharing" },
    ]
  };

  // 2. Module 2 : TP Systèmes asservis échantillonnés
  const m2 = {
    badge: "🎓 M1 ELT — Électrotechnique Industrielle",
    title: "🧪 TP : Systèmes asservis échantillonnés et Régulation Numérique",
    desc: "Les systèmes asservis échantillonnés et la régulation numérique constituent un domaine fondamental de l’automatique moderne. Ce module de TP permet d'appliquer les méthodes de discrétisation et de régulation sous environnement MATLAB/Simulink.",
    note: "🔹 Ressources destinées aux étudiants M1 ELT.",
    resources: [
      { label: "⚙️ TP 1", sub: "Échantillonnage des signaux continus", link: "https://drive.google.com/file/d/1iabuAHTNOF0pvwh2F2UYz-O0jkZm6oBU/view" },
      { label: "🧩 TP 2", sub: "Étude et comparaison des bloqueurs d’ordre zéro et d’ordre un", link: "https://drive.google.com/file/d/1QuMwHYvg_GnUUcrrSiZP8RxsQ0IeMtZK/view?usp=sharing" },
      { label: "📌 TP 3", sub: "Modélisation et réponses des systèmes discrets", link: "https://drive.google.com/file/d/1ryqMkZTFUrxIEf0rkb4WzxFWPjT2ZdoQ/view?usp=sharing" },
      { label: "📌 TP 4", sub: "Systèmes LTI Discrets et Discrétisation", link: "https://drive.google.com/file/d/1_qggld0ok9Sz2bgBr9e2A9w4uV_lO9lz/view" },
      { label: "📌 TP 5", sub: "Analyse de la Stabilité des Systèmes Échantillonnés", link: "https://drive.google.com/file/d/1xKfi3V2rW7FTMBRRwQ14wzEDx6abdFCM/view?usp=sharing" },
      { label: "📌 TP 6", sub: "Régulation PID Numérique", link: "https://drive.google.com/file/d/1SiUadlRRFYBpWJxWwiEvrR7rL2Sivpet/view?usp=sharing" },
      { label: "📌 TP 7", sub: "Identification et Contrôle d'un Moteur CC en temps réel", link: "https://drive.google.com/file/d/1goNaPhZYda-s3rqC2VK0MH5X1JU1jIRR/view?usp=sharing" },
    ]
  };

  // 3. Module 3 : Capteurs Intelligents
  const m3 = {
    badge: "🎓 M1 Auto et Info. Ind.",
    title: "⚙️ Module : Capteurs Intelligents",
    desc: "Ce module présente les principes fondamentaux des capteurs intelligents : structure, fonctionnement, conditionnement du signal, acquisition de données et intégration dans les systèmes électroniques et industriels.",
    note: "🔹 Ressources destinées aux étudiants de Master I en Automatique et informatique industrielle.",
    resources: [
      { label: "Cours", sub: "Capteurs Intelligents", link: "https://drive.google.com/file/d/1BtvsrnVq7vTyJsK9iak25GqvYOisFYgZ/view?usp=sharing", isCourse: true },
      { label: "Exercices 1", sub: "Introduction aux Capteurs Intelligents", link: "https://drive.google.com" },
      { label: "Exercices 2", sub: "Convertisseurs CAN et CNA", link: "https://drive.google.com/file/d/14R0wbv5722JFIGVVfHxoL0-Ej_jV6V9o/view" },
      { label: "Exercices 3", sub: "Filtrage numérique", link: "https://drive.google.com/file/d/1L7BpHLNNRsZUcgFH_gq01KcrrN-NFvk6/view?usp=sharing" },
    ]
  };

  // 4. Module 4 : Control of Linear Systems (L3 Automatic)
  const m4 = {
    badge: "🎓 Automatic L3",
    title: "⚙️ Module: Lab Work — Control of Linear Systems",
    desc: "This laboratory module introduces students to linear control systems through hands-on experiments and simulations using MATLAB and Simulink.",
    note: "🔹 Resources for Bachelor 3 students in Electrical Engineering.",
    resources: [
      { label: "Lab Work 1", sub: "Initiation to Control Systems with MATLAB", link: "https://drive.google.com/file/d/1Cd8_Zye3us9-Wnv6E1wr9ffZbE9bA9G6/view", isCourse: true },
      { label: "Lab Work 2", sub: "Phase-Lead Compensator Design for Position Control", link: "https://drive.google.com/file/d/19pbeyMDIgqra-WpAhhUXJpjK68_BH_Af/view" },
      { label: "Lab Work 3", sub: "State-Space Modeling and Stability of a Physical System", link: "https://drive.google.com/file/d/1_NGB-NmCxgzPl524H1d3TUjQ9lhVbWYi/view?usp=sharing" },
      { label: "Lab Work 4", sub: "Controllability of Linear State-Space Systems", link: "https://drive.google.com/file/d/1-yYh8n-hbdZeWQ6Jbz327pFUPvyOINhz/view?usp=sharing" },
      { label: "Lab Work 5", sub: "State Feedback Control of Linear Systems", link: "https://drive.google.com/file/d/1hbCRkS33MtXakyYQWZ3kEoTmWXN3ftmi/view?usp=sharing" },
    ]
  };

  // 5. Module 5 : Sensors and metrology (L3 ELT)
  const m5 = {
    badge: "🎓 ELT L3",
    title: "⚙️ Module: Sensors and metrology",
    desc: "Complete lectures and tutorial work covering temperature, photo, strain, pressure, and level sensors.",
    note: "🔹 Resources for L3 students in Electrical Engineering.",
    resources: [
      { label: "Cours", sub: "Sensors and metrology Course", link: "https://drive.google.com/file/d/1Fz8rU0L_5fMxZiTV64vagUHVy8sssrsE/view?usp=sharing", isCourse: true },
      { label: "Tutorial Work No. 1", sub: "Temperature sensors", link: "https://drive.google.com/file/d/1QEY7zF3UVf6WC7EMB-7q9t-6cymDN7kT/view?usp=sharing" },
      { label: "Tutorial Work No. 2", sub: "Photo Sensors", link: "https://drive.google.com/file/d/1pPF0zTzkUGE6k4IKFqCMTMH4JEcmTduv/view?usp=sharing" },
      { label: "Tutorial Work No. 3", sub: "Strain Sensors", link: "https://drive.google.com/file/d/1ToPxkH20GIIrJuOMhDO-8dbGQM1XXiif/view?usp=sharing" },
      { label: "Tutorial Work No. 4", sub: "Pressure Sensors", link: "https://drive.google.com/file/d/10kgaQZwRLY7oepOX1hls3rRF4iTDfifa/view?usp=sharing" },
      { label: "Tutorial Work No. 5", sub: "Level Sensors", link: "https://drive.google.com/file/d/1q-myl8xysHpZ0gqgvMSoKaLiRKnIkpyz/view?usp=sharing" },
    ]
  };

  // 6. Module 6 : Projet de fin d'étude
  const m6 = {
    badge: "🎓 Module — Projet de fin d'étude",
    title: "📘 Module : Projet de fin d'étude",
    desc: "Ce module vise à développer des compétences pratiques en conception, modélisation et commande de systèmes dynamiques à travers des projets appliqués en électronique, régulation industrielle et robotique.",
    note: "🔹 Projets encadrés destinés aux étudiants de Master.",
    resources: [
      { label: "🔧 Projet 0", sub: "Réalisation d'une Carte Électronique PCB avec ATmega328P", link: "https://drive.google.com/file/d/1bs6VDzKlSjgR0meDOMXdeBRZ6Ug5ik8r/view?usp=sharing" },
      { label: "🌡 Projet 1", sub: "Contrôle de Température d'une Petite Chambre Thermique par PID", link: "https://drive.google.com/file/d/1VWm80vVGMlUkXyfKZibQughiUcqOji8B/view" },
      { label: "⚖️ Projet 2", sub: "Équilibrage de balle avec PID", link: "https://drive.google.com/file/d/1vjYOa2R5SI9gxG2-rVLwjzRHcM4dsbSa/view" },
      { label: "🤖 Projet 3", sub: "Robot Auto-Équilibré avec PID", link: "https://drive.google.com/file/d/1_w4Mjb85Nn2firjrHDu0JVj6mkiHCkp7/view" },
      { label: "⚙️ Projet 4", sub: "Commande de Vitesse et de Position d'un Moteur à Courant Continu", link: "https://drive.google.com/file/d/1MvybgEt3LGqv2LjpUd0Vtj5Q97D4s3Mx/view?usp=sharing" },
      { label: "🚁 Projet 5", sub: "Stabilisation d'un Drone Fixe avec PID", link: "https://drive.google.com/file/d/1vacnEA4sr3BktsBRzcqutXQsimAzjEv6/view" },
    ]
  };

  const modulesList = [m1, m2, m3, m4, m5, m6];

  return (
    <div className="space-y-8">
      {/* En-tête principal */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <span>{t.title}</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Accédez ci-dessous à l'ensemble des cours, fiches de travaux dirigés (TD), travaux pratiques (TP) et projets de fin d'études.
        </p>
      </div>

      {/* Cartes de modules */}
      {modulesList.map((mod, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
          {/* Badge */}
          <div className="inline-block px-3.5 py-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs rounded-full shadow-sm">
            {mod.badge}
          </div>

          {/* Titre & Description */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-blue-900 leading-snug">
              {mod.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Description : </strong> {mod.desc}
            </p>
          </div>

          {/* Liste des ressources téléchargeables */}
          <div className="space-y-3 pt-2">
            {mod.resources.map((res, rIdx) => (
              <div 
                key={rIdx} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl gap-3 hover:bg-blue-50/50 transition"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800 text-sm">
                    {res.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {res.sub}
                  </div>
                </div>

                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm flex items-center justify-center space-x-1.5 transition ${
                    res.isCourse 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Téléchargement</span>
                </a>
              </div>
            ))}
          </div>

          {/* Note de bas de carte */}
          <p className="text-xs font-semibold text-blue-600 pt-2 border-t border-slate-100">
            {mod.note}
          </p>
        </div>
      ))}
    </div>
  );
}