/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, CheckSquare, Sparkles, AlertTriangle } from 'lucide-react';

interface StatsPanelProps {
  mentalHealth: number;
  taskProgress: number;
  currentDay: number;
  dayTitle: string;
  targetProgress: number;
}

export default function StatsPanel({
  mentalHealth,
  taskProgress,
  currentDay,
  dayTitle,
  targetProgress,
}: StatsPanelProps) {
  // Determine color theme for Mental Health
  const getMHColorClass = (mh: number) => {
    if (mh > 70) return 'from-[#FF2D55] to-[#FF8A00]';
    if (mh >= 35) return 'from-amber-500 to-[#FF2D55]';
    return 'from-rose-600 to-[#FF2D55] animate-pulse';
  };

  const getMHEmoji = (mh: number) => {
    if (mh > 70) return '✨ 💅';
    if (mh >= 35) return '🥺 ☕';
    return '💀 😭 Critical';
  };

  const currentProgressPercent = Math.min(100, taskProgress);

  return (
    <div id="stats-panel" className="bg-[#0A0A0B] border-2 border-white/20 p-5 rounded-none shadow-[4px_4px_0px_#00F0FF] w-full z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Day Tracker & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FF2D55] text-white rounded-none px-3.5 py-1.5 text-xs font-mono font-black tracking-widest uppercase border border-white/15 flex items-center gap-1.5 shrink-0 shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
            DAY {currentDay}/4
          </div>
          <div>
            <h3 className="text-white font-sans font-black text-sm sm:text-base tracking-normal uppercase italic">
              {dayTitle}
            </h3>
            <p className="text-gray-400 text-[10px] sm:text-xxs font-mono tracking-wider">
              TARGET HARI INI: <span className="text-[#00F0FF] font-bold">{targetProgress}%</span> • STATUS: <span className="text-[#FF2D55] font-bold">{mentalHealth <= 15 ? 'CRITICAL BURN OUT' : 'SURVIVOR'}</span>
            </p>
          </div>
        </div>

        {/* Real-time Indicator alerts */}
        {mentalHealth <= 25 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-[#FF2D55] bg-[#FF2D55]/10 text-[#FF2D55] px-3.5 py-1 text-xxs flex items-center gap-1.5 font-black uppercase tracking-widest sm:ml-auto rounded-none"
          >
            <AlertTriangle className="w-4 h-4 text-[#FF2D55] shrink-0" />
            <span>CRITICAL: BURN OUT RISK! CARING DI MEJA BELAJAR</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pt-4 border-t border-white/10">
        {/* -- MENTAL HEALTH BAR -- */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-widest text-[#FF2D55] uppercase flex items-center gap-1">
              <Heart className={`w-3.5 h-3.5 text-[#FF2D55] ${mentalHealth <= 25 ? 'animate-bounce' : ''} fill-[#FF2D55]`} />
              Mental Health (MHP)
            </span>
            <span className="text-white font-black text-sm">
              {mentalHealth}% <span className="text-xs ml-1 font-normal opacity-80">{getMHEmoji(mentalHealth)}</span>
            </span>
          </div>
          <div className="w-full bg-gray-900 h-3.5 border border-white/15 rounded-none overflow-hidden p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mentalHealth}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${getMHColorClass(mentalHealth)}`}
            />
          </div>
        </div>

        {/* -- TASK PROGRESS BAR -- */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-[#00F0FF] uppercase flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-[#00F0FF] fill-[#000]" />
              ASSIGNMENT TASKS
            </span>
            <span className="text-white font-black text-sm">
              {currentProgressPercent}% / {targetProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-900 h-3.5 border border-white/15 rounded-none overflow-hidden p-[2px] relative">
            {/* Target line indicator */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-[#FF2D55] z-10" 
              style={{ left: `${targetProgress}%` }}
              title="Requirements for today"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentProgressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full ${
                currentProgressPercent >= targetProgress 
                  ? 'bg-gradient-to-r from-[#00F0FF] to-emerald-500' 
                  : 'bg-gradient-to-r from-[#00F0FF] to-[#0075FF]'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
