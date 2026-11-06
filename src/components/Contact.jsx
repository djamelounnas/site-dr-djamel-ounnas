import React, { useState } from 'react';
import { Mail, MapPin, Building2, ExternalLink, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import { translations } from '../data/translations';

export default function Contact({ lang = 'fr' }) {
  const t = translations[lang]?.contact || {
    title: "Contact & Localisation",
    dept: "Département Génie Électrique, Laboratoire LABGET",
    univ: "Université de Tébessa, Algérie"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Génère l'ouverture du client de messagerie par défaut avec les données pré-remplies
    const mailtoLink = `mailto:djamel.ounnas@univ-tebessa.dz?subject=${encodeURIComponent(formData.subject || 'Contact via site web')}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-7 h-7 text-blue-600" />
            <span>{t.title}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'fr' 
              ? "N'hésitez pas à me contacter pour toute collaboration, projet de recherche ou question pédagogique." 
              : "Feel free to reach out for collaborations, research projects, or academic inquiries."}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Colonne Gauche : Coordonnées & Liens Académiques */}
        <div className="md:col-span-2 space-y-6">
          {/* Adresse académique */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              {lang === 'fr' ? "Coordonnées" : "Contact Information"}
            </h3>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3 text-slate-700">
                <Building2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span>{t.dept}</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-700">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span>{t.univ}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700 pt-1">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="mailto:djamel.ounnas@univ-tebessa.dz" className="text-blue-600 hover:underline font-medium break-all">
                  djamel.ounnas@univ-tebessa.dz
                </a>
              </div>
            </div>
          </div>

          {/* Profils académiques & Réseaux */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              {lang === 'fr' ? "Profils Scientifiques" : "Scientific Profiles"}
            </h3>

            <div className="space-y-3">
              {/* ResearchGate */}
              <a
                href="https://www.researchgate.net/profile/Djamel-Ounnas-2/research"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-xl transition text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                    RG
                  </span>
                  <span>ResearchGate</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </a>

              {/* ORCID */}
              <a
                href="https://orcid.org/0000-0003-3018-0009"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-xl transition text-xs font-semibold text-slate-700 group"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-md bg-lime-600 text-white font-bold flex items-center justify-center text-[10px]">
                    iD
                  </span>
                  <span>ORCID Profile</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Formulaire de contact direct */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            {lang === 'fr' ? "Envoyer un message" : "Send a Message"}
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-800">
                {lang === 'fr' ? "Message prêt à être envoyé !" : "Message ready to send!"}
              </h4>
              <p className="text-xs text-emerald-700">
                {lang === 'fr' 
                  ? "Votre application d'email va s'ouvrir pour confirmer l'envoi." 
                  : "Your email application will open to confirm sending."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-emerald-800 underline pt-2"
              >
                {lang === 'fr' ? "Envoyer un autre message" : "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'fr' ? "Nom complet" : "Full Name"} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'fr' ? "Votre nom" : "Your name"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {lang === 'fr' ? "Adresse e-mail" : "Email Address"} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'fr' ? "Sujet du message" : "Subject"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'fr' ? "Ex: Demande de renseignement Master" : "Ex: Research Inquiry"}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'fr' ? "Message" : "Message"} *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows="4"
                    placeholder={lang === 'fr' ? "Rédigez votre message ici..." : "Type your message here..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'fr' ? "Envoyer le message" : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}