/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, ShieldAlert, Award, ChevronRight } from 'lucide-react';
import CharacterAvatar from './CharacterAvatar';

interface GameIntroProps {
  onStartGame: () => void;
}

export default function GameIntro({ onStartGame }: GameIntroProps) {
  return (
    <div id="game-intro" className="max-w-3xl mx-auto bg-[#0A0A0B] border-2 border-[#00F0FF] rounded-none p-6 sm:p-8 shadow-[8px_8px_0px_#FF2D55] flex flex-col md:flex-row items-center gap-6 sm:gap-8 overflow-hidden relative text-white">
      {/* Sparkly corner designs */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2D55]/5 rounded-bl-full pointer-events-none" />

      {/* Hero Avatar section */}
      <div className="flex flex-col items-center shrink-0 z-10">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <CharacterAvatar characterId="cheryl" size="xl" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
          <span className="absolute bottom-1 right-3 bg-[#FF2D55] border-2 border-black text-white rounded-none px-2 py-0.5 text-[8px] font-black tracking-widest uppercase shadow-[1px_1px_0px_#000]">
            👚 SMA
          </span>
        </motion.div>
        
        <div className="text-center mt-3">
          <h4 className="font-sans font-black text-white text-lg uppercase tracking-tight">Cheryl</h4>
          <span className="text-[9px] font-mono text-[#00F0FF] bg-black border border-[#00F0FF]/30 px-2 py-0.5 uppercase tracking-wider block mt-1 font-bold">
            Desainer OSIS Junior
          </span>
        </div>
      </div>

      {/* Text Context and Premise */}
      <div className="flex-1 flex flex-col gap-4 text-center md:text-left z-10">
        <div>
          <span className="bg-[#FF2D55] text-white text-[9px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-none inline-block">
            🎮 2D EDUCATIONAL SURVIVAL GAME
          </span>
          <h1 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tighter leading-none mt-2 uppercase italic">
            CHERYL: PENYINTAS <span className="text-[#00F0FF]">ORGANISASI TOXIC</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-3.5 leading-relaxed font-sans">
            Selamat datang di SMA Garuda! Kamu akan memerankan <b>Cheryl</b>, murid kelas XI desainer grafis OSIS yang terjebak di dalam panitia Pensi bentukan kakak kelas. 
            Mereka menuntut kerja kerasmu secara berlebihan, melakukan manipulasi psikologis, dan gaslighting di dalam grup chat.
          </p>
        </div>

        {/* Metrik gameplay guides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/60 p-4 rounded-none border-2 border-white/10 text-left">
          <div className="flex gap-2.5 items-start">
            <Brain className="w-5 h-5 text-[#FF2D55] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[10px] uppercase font-black text-white tracking-wider leading-tight">MHP METER</h5>
              <p className="text-gray-400 text-[10px] mt-1 leading-snug">Kesehatan mentalmu. Jika menyentuh 0, Cheryl depresi dan dikeluarkan.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <Award className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[10px] uppercase font-black text-white tracking-wider leading-tight">PROGRES TUGAS</h5>
              <p className="text-gray-400 text-[10px] mt-1 leading-snug">Kerjakan tugas OSIS di Meja Belajar demi kelayakan keluar panitia.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[10px] uppercase font-black text-white tracking-wider leading-tight">EDUKASI ASERTIF</h5>
              <p className="text-gray-400 text-[10px] mt-1 leading-snug">Pelajari cara menghadapi pembullyan halus dan asah ketegasanmu!</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-2.5 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="w-full sm:w-auto bg-[#00F0FF] hover:bg-white text-black font-sans font-black uppercase text-xs sm:text-sm px-6 py-3.5 rounded-none border-2 border-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FF2D55]"
          >
            <span>Mulai Petualangan Cheryl</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </motion.button>
          
          <span className="text-[9px] text-[#00F0FF] font-mono uppercase tracking-widest font-black">
            DIKEMAS DENGAN TIPS PSIKOLOGI SEHAT 🧠
          </span>
        </div>
      </div>
    </div>
  );
}
