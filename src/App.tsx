/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, CheckSquare, Brain, Info, RefreshCw, Sparkles, BookOpen, Volume2, ShieldAlert, Award, Star
} from 'lucide-react';

import { DialogueChoice, GameState } from './types';
import { DAYS, DIALOGUE_TREE } from './data/story';

// Custom Components
import StatsPanel from './components/StatsPanel';
import ChatSimulator from './components/ChatSimulator';
import TaskDesk from './components/TaskDesk';
import GameIntro from './components/GameIntro';
import GameOutro from './components/GameOutro';
import MentalHealthTips from './components/MentalHealthTips';

export default function App() {
  // Game states
  const [gameState, setGameState] = useState<GameState['gameState']>('intro');
  const [mentalHealth, setMentalHealth] = useState<number>(85);
  const [taskProgress, setTaskProgress] = useState<number>(0);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [activeDialogueId, setActiveDialogueId] = useState<string>('day1_intro');
  const [journalEntries, setJournalEntries] = useState<string[]>([]);
  const [activeTipsModal, setActiveTipsModal] = useState<boolean>(false);

  // Auto-scrolling on major turn responses
  const updateStats = (mhpChange: number, taskChange: number) => {
    setMentalHealth((prev) => {
      const nextMhp = Math.max(0, Math.min(100, prev + mhpChange));
      if (nextMhp <= 0) {
        setGameState('ending_bad');
      }
      return nextMhp;
    });

    setTaskProgress((prev) => Math.max(0, Math.min(100, prev + taskChange)));
  };

  const handleSelectDialogueChoice = (choice: DialogueChoice) => {
    // 1. Update points based on selection
    updateStats(choice.mhpChange, choice.taskChange);

    // 2. Head to next node
    if (choice.nextId === 'GOTO_DESK') {
      setTimeout(() => setGameState('desk'), 2500);
    } else if (choice.nextId === 'GOTO_ENDING_GOOD') {
      setTimeout(() => setGameState('ending_good'), 2500);
    } else if (choice.nextId === 'CHECK_FINAL_MHP') {
      setTimeout(() => {
        // Evaluate boundary results
        if (mentalHealth > 35) {
          setGameState('ending_good');
        } else {
          setGameState('ending_bad');
        }
      }, 2500);
    } else {
      // Transition to next dialogue
      setTimeout(() => {
        setActiveDialogueId(choice.nextId);
      }, 2000);
    }
  };

  const handleNextDialogueNode = (nextId: string) => {
    if (nextId === 'GOTO_DESK') {
      setGameState('desk');
    } else if (nextId === 'GOTO_ENDING_GOOD') {
      setGameState('ending_good');
    } else if (nextId === 'CHECK_FINAL_MHP') {
      if (mentalHealth > 35) {
        setGameState('ending_good');
      } else {
        setGameState('ending_bad');
      }
    } else {
      setActiveDialogueId(nextId);
    }
  };

  const handleFinishDay = () => {
    if (currentDay < 4) {
      const nextD = currentDay + 1;
      const nextDayData = DAYS[nextD - 1];
      setCurrentDay(nextD);
      setActiveDialogueId(nextDayData.initialDialogueId);
      setGameState('dialogue');
    } else {
      // Final Day finished! Check endings
      if (mentalHealth > 35) {
        setGameState('ending_good');
      } else {
        setGameState('ending_bad');
      }
    }
  };

  const handleAddJournalEntry = (entry: string) => {
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleRestart = () => {
    setMentalHealth(85);
    setTaskProgress(0);
    setCurrentDay(1);
    setActiveDialogueId('day1_intro');
    setJournalEntries([]);
    setGameState('intro');
  };

  const activeDayData = DAYS[currentDay - 1];
  const currentNode = DIALOGUE_TREE[activeDialogueId];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col justify-between selection:bg-[#00F0FF] selection:text-black pb-8 relative overflow-hidden font-sans">
      {/* Background Graphic: Toxic Static */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 text-[100px] sm:text-[120px] font-black rotate-[-5deg] leading-none text-white">APAAN SIH</div>
        <div className="absolute bottom-20 right-10 text-[110px] sm:text-[145px] font-black rotate-[12deg] leading-none text-[#FF2D55]">LEMOT</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[180px] font-black opacity-30 text-white">T O X I C</div>
        <div className="absolute bottom-1/4 left-5 text-[70px] sm:text-[90px] font-black -rotate-12 leading-none text-white">GA BECUS</div>
      </div>

      {/* 1. Header Navigation Bar */}
      <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b-2 border-[#FF2D55] py-4 px-6 sticky top-0 z-30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl animate-pulse">🦅</span>
          <div>
            <span className="text-xxs font-mono font-bold text-[#FF2D55] uppercase tracking-[0.25em] block">SMA GARUDA OSIS SIM</span>
            <h1 className="text-sm sm:text-base font-sans font-black tracking-tighter text-white uppercase italic">
              Cheryl: Penyintas <span className="text-[#00F0FF]">Organisasi Toxic</span>
            </h1>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setActiveTipsModal(true)}
            className="bg-[#00F0FF] hover:bg-white text-black font-sans text-xs font-black uppercase px-3.5 py-1.5 border-2 border-black hover:border-white transition-all flex items-center gap-1.5 cursor-pointer focus:outline-hidden"
          >
            <Brain className="w-3.5 h-3.5 text-black fill-black" />
            <span className="hidden sm:inline">Klinis Edukasi Mental</span>
          </button>
          
          <button
            onClick={handleRestart}
            title="Mulai Ulang Permainan"
            className="p-2 text-[#FF2D55] hover:text-black hover:bg-[#FF2D55] border-2 border-[#FF2D55]/30 hover:border-black transition duration-200 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Main Content Playground Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-4.5 z-10 flex flex-col gap-5 items-center justify-center">
        {gameState === 'intro' && (
          <GameIntro onStartGame={() => setGameState('dialogue')} />
        )}

        {gameState === 'dialogue' && currentNode && (
          <div className="w-full flex flex-col gap-4">
            {/* Dynamic Stats for Cheryl */}
            <StatsPanel
              mentalHealth={mentalHealth}
              taskProgress={taskProgress}
              currentDay={currentDay}
              dayTitle={activeDayData.title}
              targetProgress={activeDayData.targetTaskProgress}
            />

            {/* Simulated Chat Window representing peer group interaction */}
            <ChatSimulator
              currentNode={currentNode}
              onSelectChoice={handleSelectDialogueChoice}
              onNextNode={handleNextDialogueNode}
              dayNumber={currentDay}
            />
          </div>
        )}

        {gameState === 'desk' && (
          <div className="w-full flex flex-col gap-4">
            {/* Stats Dashboard */}
            <StatsPanel
              mentalHealth={mentalHealth}
              taskProgress={taskProgress}
              currentDay={currentDay}
              dayTitle={activeDayData.title}
              targetProgress={activeDayData.targetTaskProgress}
            />

            {/* Interactive Workbench with Timed Breathing and typing simulators */}
            <TaskDesk
              dayData={activeDayData}
              mentalHealth={mentalHealth}
              taskProgress={taskProgress}
              onUpdateStats={updateStats}
              onFinishDay={handleFinishDay}
              journalEntries={journalEntries}
              onAddJournal={handleAddJournalEntry}
            />
          </div>
        )}

        {gameState === 'ending_good' && (
          <GameOutro
            endingType="good"
            mentalHealth={mentalHealth}
            taskProgress={taskProgress}
            journalEntries={journalEntries}
            onRestart={handleRestart}
          />
        )}

        {gameState === 'ending_bad' && (
          <GameOutro
            endingType="bad"
            mentalHealth={mentalHealth}
            taskProgress={taskProgress}
            journalEntries={journalEntries}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* 3. Global Footer info */}
      <footer className="text-center text-[10px] font-mono text-slate-500 py-4 mt-6 border-t border-[#FF2D55]/20 w-full shrink-0 z-10">
        <p>© 2026 Game Edukasi SMA Garuda • PEDULI KESEHATAN MENTAL & BATASAN SEHAT REMAJA OSIS</p>
        <p className="mt-1 text-[#00F0FF]/60 uppercase tracking-widest">Waspada manipulasi di lingkungan organisasi sekolah</p>
      </footer>

      {/* Interactive Modal Database */}
      <AnimatePresence>
        {activeTipsModal && (
          <MentalHealthTips onClose={() => setActiveTipsModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
