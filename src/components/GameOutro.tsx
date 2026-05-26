/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, RotateCcw, HeartHandshake, LogOut, Milestone } from 'lucide-react';
import { CHARACTERS } from '../data/story';
import CharacterAvatar from './CharacterAvatar';

interface GameOutroProps {
  endingType: 'good' | 'bad';
  mentalHealth: number;
  taskProgress: number;
  journalEntries: string[];
  onRestart: () => void;
}

export default function GameOutro({
  endingType,
  mentalHealth,
  taskProgress,
  journalEntries,
  onRestart,
}: GameOutroProps) {
  const isGood = endingType === 'good';

  return (
    <div id="game-outro" className="max-w-3xl mx-auto bg-[#0A0A0B] border-2 border-white/20 rounded-none p-6 sm:p-8 shadow-[8px_8px_0px_#FF2D55] flex flex-col items-center text-center overflow-hidden relative text-white">
      <div className={`absolute top-0 left-0 right-0 h-2 ${isGood ? 'bg-[#00F0FF]' : 'bg-[#FF2D55]'}`} />

      {/* Hero Visualizer */}
      <motion.div 
        animate={isGood ? { y: [0, -5, 0] } : { rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mt-4 mb-4"
      >
        <CharacterAvatar 
          characterId="cheryl" 
          expression={isGood ? 'senang' : 'sedih'} 
          size="lg" 
          className="drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        />
      </motion.div>

      {/* Ending Badges & Titles */}
      <div>
        <span className={`px-3 py-1.5 rounded-none text-xxs font-mono font-black uppercase tracking-widest inline-block border-2 ${
          isGood 
            ? 'bg-black border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_#00F0FF]' 
            : 'bg-black border-[#FF2D55] text-[#FF2D55] shadow-[2px_2px_0px_#FF2D55]'
        }`}>
          {isGood ? '🎉 SUCCESS: GRADUATED PANITIA' : '⚠️ GAME OVER: HEAVY DEPRESSION'}
        </span>
        
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tighter leading-none mt-5 uppercase italic">
          {isGood 
            ? 'Penyintas Tangguh: Batasan Sehat Tegak Berdiri!' 
            : 'Depresi Berat: Terpuruk Di Bawah Guilt-Tripping OSIS'}
        </h1>
        
        <p className="text-gray-400 text-xs sm:text-sm mt-3.5 max-w-xl mx-auto leading-relaxed">
          {isGood 
            ? 'Hebat! Kamu telah mendampingi Cheryl menyadari bahwa kesejahteraan jiwa jauh lebih berharga daripada status kepatuhan semu. Cheryl berhasil menyelesaikan seluruh tugasnya secara profesional dan resmi berpamitan pergi dari lingkaran beracun tersebut dengan didampingi teman setianya, Alika.'
            : 'Tragis... Cheryl terus menyerap racun, gaslighting, dan manipulasi kognitif tanpa sanggup melawan karena rasa takut dicap sebagai "anggota tidak setia". Akibatnya Cheryl lumpuh secara akademis, mengalami depresi berat, menolak sekolah, dan terpaksa dipanggil guru BK untuk dibebas-tugaskan secara penuh dalam evaluasi medis panjang.'}
        </p>
      </div>

      {/* Final performance recap */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-black/50 p-4 rounded-none border-2 border-white/10 text-left my-5 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider font-bold block">Mental Health Akhir</span>
          <span className={`font-mono text-base font-black uppercase ${isGood ? 'text-[#00F0FF]' : 'text-[#FF2D55]'} block mt-0.5`}>
            {mentalHealth}/100 Point {isGood ? '✨ (Lega)' : '💀 (Hancur)'}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Progres Desain OSIS</span>
          <span className="font-mono text-base font-black text-white block mt-0.5 uppercase">
            {taskProgress}% SEUTUHNYA
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold block">Katarsis Jurnal</span>
          <span className="font-mono text-base font-black text-[#FF2D55] block mt-0.5 uppercase">
            {journalEntries.length} CURAHAN HATI
          </span>
        </div>
      </div>

      {/* Psycho-educative lessons */}
      <div className="w-full text-left bg-black border-2 border-white/10 p-5 rounded-none mb-6">
        <h4 className="font-sans font-black text-white text-xs flex items-center gap-1.5 uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
          <HeartHandshake className="w-4 h-4 text-[#00F0FF]" />
          Refleksi Kesehatan Mental Untukmu (Gen-Z Insights)
        </h4>
        <ul className="text-gray-300 text-xs flex flex-col gap-2 leading-relaxed uppercase">
          {isGood ? (
            <>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#00F0FF] font-black shrink-0">1.</span>
                <span><b>Tugasmu Berakhir, Batasanmu Tidak:</b> Menyelesaikan tugas dengan baik adalah bentuk profesionalisme, namun berani pamit dari lingkungan toxic menunjukkan harga diri yang kokoh.</span>
              </li>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#00F0FF] font-black shrink-0">2.</span>
                <span><b>Mengenali Gaslighting:</b> Ketika orang lain membuatmu meragukan kelayakan dirimu atas kesalahan kollektif, sadarilah itu manipulasi. Simpan bukti otentik seperti yang Cheryl lakukan!</span>
              </li>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#00F0FF] font-black shrink-0">3.</span>
                <span><b>Lingkaran Pendukung (Support Net):</b> Teman yang tulus seperti Alika nilainya jauh melampaui seribu teman populer di OSIS yang hanya melihatmu sebagai mesin kerja.</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#FF2D55] font-black shrink-0">1.</span>
                <span><b>Tanda Awal Burnout:</b> Jangan remehkan rasa lelah ekstrem, sakit dada saat notifikasi chat bergetar, dan hilangnya motivasi. Itu sinyal tubuh yang butuh istirahat, bukan malas!</span>
              </li>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#FF2D55] font-black shrink-0">2.</span>
                <span><b>Jangan Sungkan Menghubungi Guru BK/Psikolog:</b> Ruang BK bukanlah ruang hukuman! Guru BK dan psikolog sekolah dilatih untuk melindungimu dari intimidasi rekan sejawat.</span>
              </li>
              <li className="flex gap-2 items-start font-mono text-[10px]">
                <span className="text-[#FF2D55] font-black shrink-0">3.</span>
                <span><b>Kamu Bukan Penyelamat Semesta:</b> Acara sekolah tidak akan kiamat jika kamu beristirahat tidur. Menolak tugas yang diekploitasi di luar hakmu adalah perwakilan mencintai diri sendiri.</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Restart Command Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="bg-[#00F0FF] hover:bg-white text-black font-sans font-black uppercase text-xs sm:text-sm px-6 py-3.5 rounded-none border-2 border-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FF2D55]"
      >
        <RotateCcw className="w-4 h-4 text-black" />
        <span>Ulangi Cerita (Belajar Coping Baru)</span>
      </motion.button>
    </div>
  );
}
