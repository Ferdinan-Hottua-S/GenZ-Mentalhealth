/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Heart, Landmark, HelpCircle, Shield, AlertCircle, X } from 'lucide-react';

interface TipCard {
  title: string;
  category: string;
  emoji: string;
  color: string;
  summary: string;
  definition: string;
  exercises: string[];
}

const PSY_TIPS: TipCard[] = [
  {
    title: 'Sikap Tegas & Asertivitas Sehat',
    category: 'BOUNDARIES',
    emoji: '🛑',
    color: 'from-blue-500 to-indigo-600',
    summary: 'Cara menolak penindasan halus atau tugas lempar tanpa rasa bersalah.',
    definition: 'Asertivitas adalah keterampilan komunikasi di mana kita mengekspresikan kebutuhan, sudut pandang, dan batasan kita secara jujur, sopan, dan langsung, tanpa menyerang orang lain (agresi) atau mengorbankan diri kita sendiri (pasif).',
    exercises: [
      'Gunakan formula kalimat "SAYA": "Saya memahami niatmu, tetapi saya tidak memiliki kapasitas waktu malam ini."',
      'Jangan buru-buru menjawab. Katakan: "Saya cek jadwal saya dulu dan kabari 10 menit lagi."',
      'Ingatlah bahwa menolak tugas di luar jobdesk bukanlah keegoisan, melainkan bentuk pertahanan diri yang profesional.',
    ],
  },
  {
    title: 'Menguak Gaslighting & Guilt-Tripping',
    category: 'MANIPULASI',
    emoji: '🤡',
    color: 'from-amber-400 to-orange-500',
    summary: 'Mengenali taktik membalikkan opini untuk membuatmu merasa bersalah.',
    definition: 'Gaslighting adalah manipulasi psikologis agar korban meragukan ingatan atau kelayakannya. Guilt-tripping adalah taktik membuat orang lain merasa bersalah secara moral sehingga mereka menyerahkan batasan diri mereka demi menyenangkan pelaku.',
    exercises: [
      'Simpan bukti tertulis berupa screenshot chat, risalah rapat harian, atau email penting sebagai benteng pelindung faktual.',
      'Saring kata-kata penyerang: Ambil fakta konkret instruksi tugas, buang komentar bumbu negatif subjektifnya.',
      'Katakan: "Kita di sini mendiskusikan solusi perbaikan materi panitia, bukan menyerang integritas pribadi saya."',
    ],
  },
  {
    title: 'Mendeteksi Alarm Burnout Akademik',
    category: 'ALERT SIGNS',
    emoji: '🔥',
    color: 'from-rose-500 to-red-600',
    summary: 'Bedakan rasa lelah biasa yang bisa hilang dengan tidur, dengan lelah kronis jiwa.',
    definition: 'Burnout adalah kondisi kelelahan fisik, emosional, dan mental akut yang disebabkan oleh keterlibatan berlebihan dalam situasi yang menuntut energi tanpa istirahat memadai. Burnout akademik dapat merusak sistem imun, meningkatkan kecemasan, and merosotkan fungsi pembelajaran kognitif.',
    exercises: [
      'Deteksi tanda fisik: Jantung berdebar saat notifikasi chat bergetar, migrain kronis, and otot bahu yang kaku.',
      'Lakukan katarsis emosi teratur: journaling, melukis, melatih pernapasan diafragma.',
      'Jika burnout berlangsung lebih dari 2 minggu berturut-turut, konsultasikan segera dengan Tenaga Ahli (Konselor/Psikolog).',
    ],
  },
  {
    title: 'Digital boundary & Detoks Sosial',
    category: 'SELF-CARE',
    emoji: '📱',
    color: 'from-teal-400 to-emerald-600',
    summary: 'Mematikan dering smartphone demi menjaga kedamaian jam malam.',
    definition: 'Detoksifikasi digital dalam koping stres adalah upaya menolak paparan interaksi digital tanpa akhir demi menyambung kembali fokus batin pada realitas fisik yang menenangkan.',
    exercises: [
      'Buat batasan jam mati obrolan OSIS: Aktifkan mode senyap otomatis (Do Not Disturb) di atas pukul 21:00 WIB.',
      'Katakan dengan asertif di sore hari: "Demi efisiensi, seluruh chat di atas jam 9 malam akan saya respon esok subuh."',
      'Batasi waktu sirkulasi di platform visual sosmed yang menambah beban perbandingan kecemasan pencapaian orang lain.',
    ],
  },
];

export default function MentalHealthTips({ onClose }: { onClose: () => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div id="psy-tips-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0A0A0B] border-2 border-[#00F0FF] rounded-none w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-[8px_8px_0px_#FF2D55] relative text-white"
      >
        {/* Top Header info */}
        <div className="bg-[#0A0A0B] border-b-2 border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 rounded-none">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-black text-white text-sm sm:text-base tracking-tight uppercase italic text-left">KATALOG EDUKASI KESEHATAN MENTAL</h3>
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider text-left">Bimbingan Koping Mandiri untuk Remaja & Siswa SMA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white hover:bg-[#FF2D55] hover:text-black border-2 border-white/10 hover:border-black rounded-none transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable grid tips */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          <p className="text-gray-400 text-xs leading-relaxed text-center sm:text-left uppercase tracking-wide">
            Menyelami teknik psikologis sederhana dapat membantumu menjaga kewarasan emosi saat berada di lingkungan yang kompetitif atau eksploitatif. Pilih kartu pemahaman di bawah ini:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PSY_TIPS.map((tip, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIdx(isActive ? null : idx)}
                  className={`group border-2 rounded-none p-4 transition-all pointer-events-auto cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 shadow-sm text-white' 
                      : 'border-white/10 bg-black hover:bg-white hover:text-black hover:border-black text-white'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-xs font-black font-mono tracking-wider ${isActive ? 'text-[#00F0FF]' : 'text-gray-400 group-hover:text-black/60'}`}>{tip.category}</span>
                      <span className="text-lg">{tip.emoji}</span>
                    </div>
                    <h4 className={`font-sans font-black text-xs sm:text-sm leading-tight uppercase ${isActive ? 'text-[#00F0FF]' : 'text-white group-hover:text-black'}`}>{tip.title}</h4>
                    <p className={`text-xxs sm:text-xs mt-1 leading-normal ${isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-black/80'}`}>{tip.summary}</p>
                  </div>

                  <span className={`text-[10px] font-black mt-3.5 flex items-center gap-1 font-mono uppercase ${isActive ? 'text-white' : 'text-[#00F0FF] group-hover:text-black'}`}>
                    {isActive ? 'Tutup Detail ▲' : 'Buka Detail Psikologi ▼'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed expanded content view */}
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black border-2 border-[#00F0FF] rounded-none p-5 mt-4 text-left shadow-[4px_4px_0px_#00F0FF]"
            >
              <div className="flex items-center gap-2 mb-2 border-b border-[#00F0FF]/25 pb-2">
                <span className="text-xl">{PSY_TIPS[selectedIdx].emoji}</span>
                <h4 className="font-sans font-black text-[#00F0FF] text-xs sm:text-sm uppercase italic">{PSY_TIPS[selectedIdx].title}</h4>
              </div>
              
              <div className="mb-4">
                <span className="text-[10px] font-mono text-[#FF2D55] font-black block uppercase tracking-widest mb-1">Definisi Psikologis</span>
                <p className="text-gray-300 text-xs leading-relaxed uppercase font-mono tracking-wider">{PSY_TIPS[selectedIdx].definition}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#FF2D55] font-black block uppercase tracking-widest mb-1">Praktik Koping Berdasarkan CBT</span>
                <ul className="list-none text-gray-300 text-xs flex flex-col gap-1.5">
                  {PSY_TIPS[selectedIdx].exercises.map((ex, i) => (
                    <li key={i} className="leading-relaxed flex gap-2 items-start font-mono text-[10px]">
                      <span className="text-[#00F0FF] font-black shrink-0">◇</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-black border-t-2 border-white/10 px-6 py-3 flex items-center justify-between shrink-0 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          <span>Target: Remaja & Siswa SMA</span>
          <span>KESEHATAN MENTAL LEBIH UTAMA 💖</span>
        </div>
      </motion.div>
    </div>
  );
}
