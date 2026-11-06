import React, { useState } from 'react';
import { Cpu, Sliders, Activity, Thermometer, Sun, Gauge, Eye, Waves } from 'lucide-react';

export default function Simulation({ lang = 'fr' }) {
  const [selectedModule, setSelectedModule] = useState('sensors'); // 'sae', 'cls' ou 'sensors'
  const [activeSim, setActiveSim] = useState('sen1');

  // =========================================================================
  // MODULE 3 : SENSORS AND METROLOGY
  // =========================================================================
  // 1. Temperature Sensors (PT100 / Thermocouple)
  const [tempC, setTempC] = useState(25);
  const rPt100 = 100 * (1 + 0.00385 * tempC); // R(T) = R0(1 + alpha*T)
  const vThermocouple = (tempC - 25) * 0.041; // mV (Type K aprox 41 uV/°C)

  // 2. Photo Sensors (LDR & Photodiode)
  const [lux, setLux] = useState(500); // Éclairement en Lux
  const rLdr = Math.max(100, Math.round(500000 / (lux + 1))); // Résistance LDR inversée
  const iPhotodiode = (lux * 0.5).toFixed(1); // Courant en µA

  // 3. Strain Sensors (Jauge de contrainte / Strain Gauge)
  const [forceN, setForceN] = useState(50); // Force appliquée en N
  const gaugeFactor = 2.0;
  const strainMicro = forceN * 12; // micro-déformation µε
  const deltaR = (120 * gaugeFactor * (strainMicro / 1000000)).toFixed(4);

  // 4. Pressure Sensors (Capteur Piezorésistif / Membrane)
  const [pressureBar, setPressureBar] = useState(2.5);
  const vOutPressure = (0.5 + (pressureBar / 10) * 4.0).toFixed(2); // Signal 0.5V - 4.5V

  // 5. Level Sensors (Capteur de Niveau à Ultrasons / Hydrostatique)
  const [levelPercent, setLevelPercent] = useState(60);
  const distanceCm = 200 - (levelPercent / 100) * 180; // Distance mesurée par ultrason
  const iLoopLevel = (4 + (levelPercent / 100) * 16).toFixed(2); // Signal industriel 4-20 mA

  // =========================================================================
  // MODULE 1 : SYSTÈMES ASSERVIS ÉCHANTILLONNÉS (SAE) & CLS (Data de secours)
  // =========================================================================
  const [fSignal, setFSignal] = useState(1);
  const [fSamp, setFSamp] = useState(6);
  const dataCh1 = [];
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 2;
    const continuous = Math.sin(2 * Math.PI * fSignal * t);
    const Te = 1 / fSamp;
    const sampleIdx = Math.floor(t / Te);
    const sampled = Math.sin(2 * Math.PI * fSignal * (sampleIdx * Te));
    dataCh1.push({ t, continuous, sampled });
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* En-tête General */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-7 h-7 text-blue-600" />
            <span>Laboratoire Virtuel de Simulation & Capteurs</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Simulations interactives et animations dynamiques des procédés industriels.
          </p>
        </div>

        {/* Choix du Module Global */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex-wrap gap-1">
          <button
            onClick={() => { setSelectedModule('sensors'); setActiveSim('sen1'); }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
              selectedModule === 'sensors' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sensors & Metrology
          </button>
          <button
            onClick={() => { setSelectedModule('cls'); setActiveSim('cls1'); }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
              selectedModule === 'cls' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Control of Linear Systems
          </button>
          <button
            onClick={() => { setSelectedModule('sae'); setActiveSim('ch1'); }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
              selectedModule === 'sae' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Systèmes Échantillonnés
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE : SENSORS AND METROLOGY                                            */}
      {/* ========================================================================= */}
      {selectedModule === 'sensors' && (
        <>
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {[
              { id: 'sen1', label: '1. Temperature Sensors' },
              { id: 'sen2', label: '2. Photo Sensors' },
              { id: 'sen3', label: '3. Strain Sensors' },
              { id: 'sen4', label: '4. Pressure Sensors' },
              { id: 'sen5', label: '5. Level Sensors' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSim(tab.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex-1 text-center min-w-[130px] ${
                  activeSim === tab.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SIM 1 : TEMPERATURE SENSORS */}
          {activeSim === 'sen1' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 bg-blue-50 rounded-md">Chapter 1</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Temperature Sensors Simulation (PT100 & Thermocouple K)</h3>
                <p className="text-xs text-slate-500 mt-1">Caractéristique R(T) du thermomètre à résistance et force électromotrice de Seebeck.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Température mesurée (T) : {tempC} °C</label>
                    <input type="range" min="-50" max="250" step="1" value={tempC} onChange={(e) => setTempC(parseInt(e.target.value, 10))} className="w-full mt-1 accent-blue-600" />
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-600 space-y-2">
                    <div className="text-blue-600 font-bold">Capteur PT100 :</div>
                    <div>R_PT100 = {rPt100.toFixed(2)} Ω</div>
                    <div className="text-amber-600 font-bold pt-1 border-t border-slate-100">Thermocouple Type K :</div>
                    <div>V_Seebeck = {vThermocouple.toFixed(2)} mV</div>
                  </div>
                </div>

                {/* Animation Thermomètre */}
                <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 flex items-center justify-around text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-44 bg-slate-800 rounded-full border-2 border-slate-700 relative overflow-hidden flex flex-col justify-end p-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 via-amber-500 to-red-500 rounded-full transition-all duration-300" 
                        style={{ height: `${Math.min(100, Math.max(5, ((tempC + 50) / 300) * 100))}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-300">{tempC} °C</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                      <span className="text-slate-400">Équation PT100 (IEC 60751):</span>
                      <p className="text-emerald-400 mt-1">R(T) = 100 × (1 + 3.85×10⁻³ × T)</p>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                      <span className="text-slate-400">Sensibilité Thermocouple K:</span>
                      <p className="text-amber-400 mt-1">S ≈ 41 µV / °C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIM 2 : PHOTO SENSORS */}
          {activeSim === 'sen2' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 bg-blue-50 rounded-md">Chapter 2</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Photo Sensors Simulation (LDR & Photodiode)</h3>
                <p className="text-xs text-slate-500 mt-1">Variation de la résistance photométrique et du courant en fonction du flux lumineux.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Éclairement (Lux) : {lux} lx</label>
                    <input type="range" min="10" max="2000" step="10" value={lux} onChange={(e) => setLux(parseInt(e.target.value, 10))} className="w-full mt-1 accent-blue-600" />
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-600 space-y-2">
                    <div className="text-amber-600 font-bold">Résistance LDR :</div>
                    <div>R_LDR = {rLdr.toLocaleString()} Ω</div>
                    <div className="text-blue-600 font-bold pt-1 border-t border-slate-100">Courant Photodiode :</div>
                    <div>I_ph = {iPhotodiode} µA</div>
                  </div>
                </div>

                {/* Animation Lumineuse */}
                <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-amber-400/20 transition-opacity duration-300"
                    style={{ opacity: Math.min(1, lux / 1500) }}
                  ></div>
                  <Sun className="w-16 h-16 text-amber-400 animate-pulse mb-3 z-10" />
                  <div className="z-10 font-mono text-xs text-white text-center space-y-1">
                    <p className="text-amber-300 font-bold">Lumière incidente : {lux} Lux</p>
                    <p className="text-slate-300">R_LDR diminue exponentiellement avec la lumière</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIM 3 : STRAIN SENSORS */}
          {activeSim === 'sen3' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 bg-blue-50 rounded-md">Chapter 3</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Strain Sensors (Jauge de Déformation & PONT de Wheatstone)</h3>
                <p className="text-xs text-slate-500 mt-1">Mesure de micro-déformation sous contrainte mécanique (Poutre en flexon).</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Force appliquée (F) : {forceN} N</label>
                    <input type="range" min="0" max="200" step="5" value={forceN} onChange={(e) => setForceN(parseInt(e.target.value, 10))} className="w-full mt-1 accent-blue-600" />
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-600 space-y-1">
                    <div>Déformation ε = {strainMicro} µm/m</div>
                    <div>ΔR = {deltaR} Ω (R0 = 120 Ω)</div>
                    <div>Facteur de jauge K = 2.0</div>
                  </div>
                </div>

                {/* Animation Poutre en flexion */}
                <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center relative">
                  <div className="w-full h-8 bg-slate-700 rounded-r-xl border-l-8 border-slate-500 relative flex items-center justify-center">
                    {/* Jauge collée sur la poutre */}
                    <div 
                      className="h-3 bg-emerald-500/80 border border-emerald-300 rounded transition-all duration-300 flex items-center justify-center"
                      style={{ transform: `scaleX(${1 + forceN / 1000}) translateY(${forceN / 10}px)` }}
                    >
                      <span className="text-[8px] font-mono font-bold text-slate-950 px-1">JAUGE (120Ω)</span>
                    </div>
                  </div>
                  <div className="mt-6 font-mono text-xs text-emerald-400">
                    F = {forceN} N ↓ (Flexion mécanique)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIM 4 : PRESSURE SENSORS */}
          {activeSim === 'sen4' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 bg-blue-50 rounded-md">Chapter 4</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Pressure Sensors (Capteur Piézorésistif à Membrane)</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Pression fluide : {pressureBar} Bar</label>
                    <input type="range" min="0" max="10" step="0.5" value={pressureBar} onChange={(e) => setPressureBar(parseFloat(e.target.value))} className="w-full mt-1 accent-blue-600" />
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-600 space-y-1">
                    <div>Signal de sortie : {vOutPressure} V</div>
                    <div>Plage : 0.5V - 4.5V (0 - 10 Bar)</div>
                  </div>
                </div>

                {/* Animation Manomètre / Membrane */}
                <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 flex items-center justify-around text-white">
                  <div className="flex flex-col items-center">
                    <Gauge className="w-20 h-20 text-blue-500 mb-2" />
                    <span className="font-mono text-sm font-bold">{pressureBar} BAR</span>
                  </div>
                  <div className="font-mono text-xs space-y-2">
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-slate-300">
                      Tension V_out = 0.5 + (P / 10) × 4.0 [V]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIM 5 : LEVEL SENSORS */}
          {activeSim === 'sen5' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 bg-blue-50 rounded-md">Chapter 5</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Level Sensors (Capteur de Niveau Ultrasonique)</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Niveau de cuve : {levelPercent} %</label>
                    <input type="range" min="0" max="100" step="5" value={levelPercent} onChange={(e) => setLevelPercent(parseInt(e.target.value, 10))} className="w-full mt-1 accent-blue-600" />
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-slate-600 space-y-1">
                    <div>Distance mesurée : {distanceCm.toFixed(1)} cm</div>
                    <div>Boucle de courant : {iLoopLevel} mA (4-20mA)</div>
                  </div>
                </div>

                {/* Animation Cuve et Niveau d'eau */}
                <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 flex items-center justify-around">
                  <div className="w-32 h-44 border-2 border-slate-600 rounded-b-2xl relative overflow-hidden bg-slate-950 flex flex-col justify-end">
                    {/* Émetteur ultrason en haut */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-blue-500 rounded-b text-[6px] font-mono font-bold text-white flex items-center justify-center">
                      SONAR
                    </div>
                    {/* Eau dans la cuve */}
                    <div 
                      className="w-full bg-blue-500/80 transition-all duration-300 relative flex items-center justify-center"
                      style={{ height: `${levelPercent}%` }}
                    >
                      <Waves className="w-full h-4 text-blue-300 absolute -top-2 animate-pulse" />
                    </div>
                  </div>

                  <div className="font-mono text-xs text-slate-300 space-y-2">
                    <p className="text-blue-400 font-bold">Signal standard : {iLoopLevel} mA</p>
                    <p>Temps d'écho t = 2d / c (c = 340 m/s)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* AUTRES MODULES DISPONIBLES (SAE & CLS)                                    */}
      {/* ========================================================================= */}
      {selectedModule === 'sae' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-800">Module : Systèmes Asservis Échantillonnés</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Fréquence signal (f) : {fSignal} Hz</label>
                <input type="range" min="0.5" max="4" step="0.5" value={fSignal} onChange={(e) => setFSignal(parseFloat(e.target.value))} className="w-full mt-1 accent-blue-600" />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Fréquence d'échantillonnage (Fe) : {fSamp} Hz</label>
                <input type="range" min="1" max="16" step="1" value={fSamp} onChange={(e) => setFSamp(parseInt(e.target.value, 10))} className="w-full mt-1 accent-blue-600" />
              </div>
            </div>
            <div className="md:col-span-2 h-60 bg-slate-900 rounded-xl p-4 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
                <path d={dataCh1.map((d, i) => `${i === 0 ? 'M' : 'L'} ${d.t * 50} ${50 - d.continuous * 40}`).join(' ')} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                <path d={dataCh1.map((d, i) => `${i === 0 ? 'M' : 'L'} ${d.t * 50} ${50 - d.sampled * 40}`).join(' ')} fill="none" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {selectedModule === 'cls' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center py-12">
          <p className="text-slate-500 font-medium text-sm">
            Module Control of Linear Systems sélectionné. Cliquez sur l'onglet ci-dessus pour basculer les simulateurs d'état.
          </p>
        </div>
      )}
    </div>
  );
}