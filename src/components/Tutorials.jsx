import React, { useState } from 'react';
import { Video, ExternalLink, PlayCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../data/translations';

export default function Tutorials({ lang = 'fr' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const t = translations[lang]?.tutorials || {
    title: "Tutoriels Vidéo & Simulateurs",
    subtitle: "Vidéos MATLAB / Simulink / STM32 / IoT / Arduino"
  };

  // Liste complète des 60 tutoriels YouTube issus du document
  const videoIds = [
    "EqfB7If08PU", "aYklbzAojj0", "UrmviIL0eiw", "2nQHzGTWQm4", "4SoCXj_k290", 
    "HFV5E47DK9I", "2nByrpeIkrE", "8LNKlNEz9uc", "2nnrY7gHbGM", "hYLu7o8irSg", 
    "9M1U1FtC4-c", "vwNiqCCLGjA", "2igknZYUUtM", "WeRAintONJs", "Rh174Sn58nQ", 
    "D3ZzhvRiE5w", "iPHax3Q2t2w", "DnR081K7Fgc", "IHQ4nJI2wjM", "D7K3ddEnSBI", 
    "uiYXCSk0-V8", "IUOVVkKjIIE", "vdEnFgpv8w0", "R__nIJuI_XQ", "c8MujRSEu6M", 
    "nAMNpruTCYY", "C9KDPDgufAQ", "nFOYKXhTRiw", "9jHGOvxhbSw", "takLFceqOaA", 
    "AuIz5tYjcJo", "Mo24ivAKS7s", "Dyj6MRQrUt8", "yHRUF8FqfaE", "4VxX3dV9b14", 
    "aeRv7RA72eo", "6vUx42_qJTE", "ZNZE_YyRYKA", "dWkqys7P09k", "8C7jlZORBk4", 
    "FTXAGG7eLZQ", "mm1aQ2PCiyw", "MweNPh_BINs", "CsMkZdJ5A-I", "ImSbqw9f4K4", 
    "oZm8wGew8jE", "Q8qbG-Z-h4o", "G6z3ptvgCew", "rln3W1MumYA", "1VjtaBLM51I", 
    "aSO43xxQ9UE", "SJt8L_m9P-0", "0yJNDhPUW94", "Skc-F4SRtrg", "B9MZCVdV5go", 
    "DGrn0b9oRYU", "IC5mBiCp2E0", "EEOaYDDVw48", "5vCeRTxpjZw", "gljmFqwQ0fA"
  ];

  const videoTutorials = videoIds.map((id, index) => ({
    id: id,
    title: `Tutoriel Vidéo N° ${index + 1} — Automatique, IA & Systèmes Embarqués`,
    titleEn: `Video Tutorial No. ${index + 1} — Automation, AI & Embedded Systems`,
    category: "MATLAB / Simulink / IoT",
    description: `Démonstration pratique N° ${index + 1} pour le contrôle-commande, la modélisation et l'expérimentation.`
  }));

  // Filtrage par recherche
  const filteredVideos = videoTutorials.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-7 h-7 text-blue-600" />
            <span>{t.title}</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle} — Collection de {videoIds.length} tutoriels enregistrés.
          </p>
        </div>

        {/* Barre de recherche rapide */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={lang === 'fr' ? "Rechercher un tutoriel..." : "Search tutorial..."}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Grille des vidéos */}
      {currentVideos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Lecteur Vidéo YouTube */}
              <div className="relative aspect-video w-full bg-slate-900">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Contenu et Détails */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                    {video.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                    {lang === 'fr' ? video.title : video.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">ID: {video.id}</span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-red-600 hover:text-red-700 transition"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <PlayCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium text-sm">
            {lang === 'fr' ? "Aucun tutoriel ne correspond à votre recherche." : "No tutorials match your search."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            {lang === 'fr' 
              ? `Affichage de ${indexOfFirstVideo + 1} à ${Math.min(indexOfLastVideo, filteredVideos.length)} sur ${filteredVideos.length} tutoriels`
              : `Showing ${indexOfFirstVideo + 1} to ${Math.min(indexOfLastVideo, filteredVideos.length)} of ${filteredVideos.length} tutorials`
            }
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-700 px-2">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}