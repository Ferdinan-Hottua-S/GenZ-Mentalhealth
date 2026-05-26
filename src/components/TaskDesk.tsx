/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Music, PenTool, Coffee, Wind, BookOpen, Clock, Play, Pause, ChevronRight, CheckCircle, Flame, Sparkles
} from 'lucide-react';
import { DayData } from '../types';

interface TaskDeskProps {
  dayData: DayData;
  mentalHealth: number;
  taskProgress: number;
  onUpdateStats: (mhpChange: number, taskChange: number) => void;
  onFinishDay: () => void;
  journalEntries: string[];
  onAddJournal: (entry: string) => void;
}

// Simulated Lofi Play List
const LOFI_SONGS = [
  { name: 'Sore di Sekolah (Relax Mix)', frequency: 220, type: 'triangle' as OscillatorType },
  { name: 'Hujan di Atap Jendela (Coziness)', frequency: 261.63, type: 'sine' as OscillatorType },
  { name: 'Revisi Terakhir OSIS (Chillhop)', frequency: 329.63, type: 'sawtooth' as OscillatorType },
];

export default function TaskDesk({
  dayData,
  mentalHealth,
  taskProgress,
  onUpdateStats,
  onFinishDay,
  journalEntries,
  onAddJournal,
}: TaskDeskProps) {
  // States
  const [activeTab, setActiveTab] = useState<'work' | 'breathing' | 'lofi' | 'journal'>('work');
  
  // Work states
  const [typedInput, setTypedInput] = useState<string>('');
  const [typedTargetWord, setTypedTargetWord] = useState<string>('semangat');
  const [workFeedbackMessage, setWorkFeedbackMessage] = useState<string>('');
  
  // Audio state
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeSongIdx, setActiveSongIdx] = useState<number>(0);
  const [oscillatorNode, setOscillatorNode] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  // Breathing state
  const [breathingPhase, setBreathingPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathingTimer, setBreathingTimer] = useState<number>(0);
  const [completedBreathingCount, setCompletedBreathingCount] = useState<number>(0);

  // Journal states
  const [journalText, setJournalText] = useState<string>('');
  const [journalFeedback, setJournalFeedback] = useState<string>('');

  const targetWords = ['semangat', 'gacor', 'healing', 'fokus', 'santai', 'asertif', 'boundaries', 'koping', 'sehat'];

  useEffect(() => {
    // Select randomized word for typing task
    setTypedTargetWord(targetWords[Math.floor(Math.random() * targetWords.length)]);
  }, [taskProgress]);

  // Handle Audio Synthesis for Retro Lo-Fi Chill
  const toggleAudio = () => {
    try {
      if (isPlayingAudio) {
        // Stop audio
        if (oscillatorNode) {
          oscillatorNode.stop();
          setOscillatorNode(null);
        }
        setIsPlayingAudio(false);
      } else {
        // Initialize dynamic simple synthesiser context
        const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
        if (!audioContext) setAudioContext(ctx);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Configure soothing lo-fi hum
        const activeSong = LOFI_SONGS[activeSongIdx];
        osc.type = activeSong.type;
        osc.frequency.setValueAtTime(activeSong.frequency / 2, ctx.currentTime); // Low soothing pitch
        
        // Lowpass filter to muffle typical retro synth waveforms
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        // Warm volume
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        setOscillatorNode(osc);
        setGainNode(gain);
        setIsPlayingAudio(true);
      }
    } catch (e) {
      console.error('Failed to boot Web Audio Engine browser security block. Open in outer tab if requested.', e);
    }
  };

  // Change song and play
  const changeSong = (idx: number) => {
    if (isPlayingAudio && oscillatorNode) {
      oscillatorNode.stop();
      setIsPlayingAudio(false);
    }
    setActiveSongIdx(idx);
    // Restart logic
    setTimeout(() => {
      // Small trigger
      setIsPlayingAudio(false);
    }, 50);
  };

  // Turn off synth on component unmount
  useEffect(() => {
    return () => {
      if (oscillatorNode) {
        oscillatorNode.stop();
      }
    };
  }, [oscillatorNode]);

  // Breathing simulation intervals
  useEffect(() => {
    let interval: any = null;
    if (breathingPhase !== 'idle') {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev <= 1) {
            // Transition phases
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 4; // hold for 4s
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 4; // exhale for 4s
            } else {
              setBreathingPhase('idle');
              // Completed! Earn rewards
              setCompletedBreathingCount((c) => c + 1);
              onUpdateStats(20, 0); // Earn 20 mental health
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingTimer(0);
    }
    return () => clearInterval(interval);
  }, [breathingPhase]);

  const startBreathingCheck = () => {
    setBreathingPhase('inhale');
    setBreathingTimer(4); // inhale for 4s
  };

  // Typing Game mechanics
  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim().toLowerCase() === typedTargetWord) {
      // Good progress! +12 task progress, drains -3 mental health
      onUpdateStats(-2, 12);
      setWorkFeedbackMessage(`🔥 Gacor! Progres tugas bertambah +12%!`);
      setTypedTargetWord(targetWords[Math.floor(Math.random() * targetWords.length)]);
    } else {
      // Typo, no reward
      setWorkFeedbackMessage(`❌ Salah ketik! Pastikan huruf sama persis.`);
    }
    setTypedInput('');
    setTimeout(() => setWorkFeedbackMessage(''), 2500);
  };

  const handleSimpleWorkClick = () => {
    // Simple design clicker
    // Drains -4 MHP, boosts +5% progress
    onUpdateStats(-3, 6);
    setWorkFeedbackMessage(`🎨 Klik Desain dikerjakan! Progres (+6%), Mental Health (-3)`);
    setTimeout(() => setWorkFeedbackMessage(''), 2000);
  };

  // Emotion Journal Submission
  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (journalText.length < 15) {
      setJournalFeedback('✍️ Tulis minimal 15 karakter ya untuk menyalurkan emosimu dengan lega.');
      return;
    }
    onAddJournal(journalText);
    onUpdateStats(15, 0); // Restore +15 MHP
    setJournalText('');
    setJournalFeedback('💖 Jurnal tersimpan! Menumpahkan ketegangan batin memberimu ketenangan (+15 MHP).');
    setTimeout(() => setJournalFeedback(''), 4000);
  };

  const isDayTaskCompleted = taskProgress >= dayData.targetTaskProgress;

  return (
    <div id="task-desk" className="bg-[#0A0A0B] border-2 border-white/20 text-white rounded-none p-5 sm:p-6 shadow-[5px_5px_0px_#00F0FF] relative overflow-hidden z-10 transition-all">
      {/* Visual Ambient Light Effect mimicking Table Desk Glow */}
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#FF2D55]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-24 h-24 bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Desk Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FF2D55]/10 border-2 border-[#FF2D55] text-[#FF2D55] rounded-none">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-sans font-black uppercase italic tracking-tight text-white flex items-center gap-2">
              Meja Belajar Mandiri Cheryl
              <span className="text-[9px] bg-[#FF2D55] text-white border border-[#FF2D55]/30 px-2 py-0.5 rounded-none font-mono font-black uppercase tracking-wider flex items-center gap-1 shadow-[1px_1px_0px_#000]">
                <Coffee className="w-3 h-3 text-white fill-white" /> COZINESS ON
              </span>
            </h4>
            <p className="text-gray-400 text-xxs font-mono uppercase tracking-wider mt-0.5">
              Satu-satunya ruang aman Cheryl untuk fokus dan memulihkan jiwanya dari toxic OSIS.
            </p>
          </div>
        </div>

        {/* Proceed to next dialog stage */}
        {isDayTaskCompleted ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onFinishDay}
            className="w-full sm:w-auto bg-[#00F0FF] hover:bg-white text-black font-sans font-black uppercase text-xs px-5 py-2.5 rounded-none flex items-center justify-center gap-1.5 cursor-pointer border-2 border-black tracking-wider shadow-[2px_2px_0px_#FF2D55] transition-all"
          >
            <CheckCircle className="w-4 h-4 text-black fill-none" />
            <span>Kirim Tugas & Lanjut Ke Rapat</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </motion.button>
        ) : (
          <div className="text-right text-xxs font-mono text-[#FF2D55] border-2 border-[#FF2D55]/30 bg-[#FF2D55]/10 px-3 py-1.5 rounded-none uppercase tracking-widest font-bold">
            Selesaikan minimal <span className="text-white font-black">{dayData.targetTaskProgress}%</span> progres untuk mengirim tugas.
          </div>
        )}
      </div>

      {/* 4 Tabs Menu for Healing and Working */}
      <div className="grid grid-cols-4 gap-2 my-5 bg-[#0D0D10] border-2 border-white/10 p-1.5 rounded-none">
        <button
          onClick={() => setActiveTab('work')}
          className={`py-3 px-1.5 rounded-none text-xxs sm:text-xs font-black uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'work' ? 'bg-[#00F0FF] text-black border border-black shadow-[2px_2px_0px_#FF2D55]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Kerja</span>
        </button>
        <button
          onClick={() => setActiveTab('breathing')}
          className={`py-3 px-1.5 rounded-none text-xxs sm:text-xs font-black uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'breathing' ? 'bg-[#00F0FF] text-black border border-black shadow-[2px_2px_0px_#FF2D55]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Meditasi</span>
        </button>
        <button
          onClick={() => setActiveTab('lofi')}
          className={`py-3 px-1.5 rounded-none text-xxs sm:text-xs font-black uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'lofi' ? 'bg-[#00F0FF] text-black border border-black shadow-[2px_2px_0px_#FF2D55]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>LoFi Tape</span>
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`py-3 px-1.5 rounded-none text-xxs sm:text-xs font-black uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'journal' ? 'bg-[#00F0FF] text-black border border-black shadow-[2px_2px_0px_#FF2D55]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Jurnal</span>
        </button>
      </div>

      {/* Main tab content */}
      <div className="bg-[#0D0D10] border-2 border-white/10 p-5 rounded-none min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeTab === 'work' && (
            <motion.div
              key="work-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-4 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start text-left gap-4">
                <div>
                  <h5 className="text-xs font-mono text-[#00F0FF] font-black uppercase tracking-widest border-b border-[#00F0FF]/25 pb-1">Aktif Tugas Mandiri</h5>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 mt-2 uppercase italic">
                    {dayData.taskName} 
                    {isDayTaskCompleted && (
                      <span className="text-xxs font-mono bg-[#FF2D55] text-white border border-[#FF2D55]/30 px-2.5 py-0.5 rounded-none font-black shadow-[1px_1px_0px_#000] uppercase tracking-wider">COMPLETED</span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Pengerjaan tugas butuh konsentrasi tinggi. Tuntutan OSIS terasa menekan, namun Cheryl bertanggung jawab menyelesaikannya dengan rapi.
                  </p>
                </div>
                <div className="bg-black p-3 rounded-none text-left border-2 border-white/10 shrink-0 min-w-[140px] shadow-[2px_2px_0px_#FF2D55]">
                  <span className="text-[9px] text-gray-500 font-mono uppercase block font-black">Day Target Progress</span>
                  <span className="font-mono text-base font-black text-[#00F0FF] block mt-0.5">{taskProgress}% / {dayData.targetTaskProgress}%</span>
                </div>
              </div>

              {/* Typing Simulator Game Area */}
              <div className="bg-[#0A0A0B] p-4 rounded-none border-2 border-[#00F0FF]/30 mt-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <p className="text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest mb-3.5 font-bold">
                  ⌨️ KETIK KALIMAT MOTIVASI UNTUK MEMPERCEPAT DESAIN (+12% PROGRES, -2 MHP)
                </p>
                
                <form onSubmit={handleTypingSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-2 py-2 px-3 bg-black border border-white/10 rounded-none text-xs">
                    <span className="text-gray-500 font-mono select-none uppercase font-bold">TULIS: </span>
                    <span className="text-yellow-400 font-mono font-black tracking-widest select-all bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-500/20 uppercase">{typedTargetWord}</span>
                  </div>

                  <div className="flex gap-2.5">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      placeholder="Ketik di sini..."
                      className="flex-1 bg-black outline-hidden border-2 border-white/10 focus:border-[#00F0FF] text-xs text-center font-mono placeholder:text-gray-600 transition rounded-none text-white font-black uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-[#FF2D55] hover:bg-white text-white hover:text-black text-xs px-4 py-1.5 rounded-none font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.4)] transition-colors duration-200 cursor-pointer outline-hidden"
                    >
                      Kirim
                    </button>
                  </div>
                </form>

                {workFeedbackMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xxs font-mono text-yellow-400 text-center mt-3 uppercase tracking-wider font-extrabold"
                  >
                    {workFeedbackMessage}
                  </motion.p>
                )}
              </div>

              {/* Or Click-to-Design button */}
              <div className="flex flex-col items-center gap-2 justify-center mt-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSimpleWorkClick}
                  className="bg-black hover:bg-[#00F0FF] hover:text-black border-2 border-white/20 hover:border-black px-5 py-3 rounded-none text-xs font-black text-white uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FF2D55]"
                >
                  <Laptop className="w-4 h-4 text-[#FF2D55] group-hover:text-black" />
                  <span>Desain Manual Perlahan (+6% Progres, -3 MHP)</span>
                </motion.button>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                  Suka mengetik? Gunakan game ketik di atas untuk menguras lebih sedikit Mental Health!
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'breathing' && (
            <motion.div
              key="breath-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <div>
                <h3 className="text-sm sm:text-base font-black tracking-widest text-[#00F0FF] flex items-center justify-center gap-2 uppercase italic">
                  <Wind className="w-4 h-4 text-[#00F0FF]" />
                  LATIHAN NAPAS KOTAK (COPING STRESS COGNITIVE)
                </h3>
                <p className="text-gray-400 text-xxs sm:text-xs mt-1 max-w-md mx-auto leading-relaxed uppercase tracking-wider">
                  Redakan hormon kecemasan (kortisol) di kepalamu. Ikuti panduan visual kembang-kempis lingkaran di bawah untuk memulihkan <span className="text-[#FF2D55] font-black">+20 poin Mental Health</span>.
                </p>
              </div>

              {/* Graphical breathing expanding ring */}
              <div className="relative w-40 h-40 flex items-center justify-center my-3 select-none">
                {/* Visual expansion ring controlled via breathing state */}
                <motion.div
                  animate={{
                    scale: breathingPhase === 'inhale' ? 1.45 : breathingPhase === 'hold' ? 1.45 : breathingPhase === 'exhale' ? 0.9 : 1.0,
                    opacity: breathingPhase !== 'idle' ? 0.9 : 0.25,
                  }}
                  transition={{ duration: breathingPhase === 'idle' ? 0.5 : 4, ease: 'easeInOut' }}
                  className={`absolute w-24 h-24 rounded-full border-[6px] transition-colors duration-200 ${
                    breathingPhase === 'inhale' ? 'border-[#00F0FF] bg-[#00F0FF]/15 shadow-[0_0_20px_rgba(0,240,255,0.4)]' :
                    breathingPhase === 'hold' ? 'border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.4)]' :
                    breathingPhase === 'exhale' ? 'border-[#FF2D55] bg-[#FF2D55]/15 shadow-[0_0_20px_rgba(255,45,85,0.4)]' :
                    'border-gray-800 bg-black/50'
                  }`}
                />
                
                {/* Centering text */}
                <div className="absolute z-10 flex flex-col items-center">
                  <span className="text-xs uppercase font-mono tracking-widest text-white font-black bg-black px-2 py-0.5 border border-white/15">
                    {breathingPhase === 'idle' && 'Breathe'}
                    {breathingPhase === 'inhale' && 'TARIK NAPAS'}
                    {breathingPhase === 'hold' && 'TAHAN LUAPAN'}
                    {breathingPhase === 'exhale' && 'HEMBUSKAN'}
                  </span>
                  {breathingTimer > 0 && (
                    <span className="font-mono text-xl font-black text-[#00F0FF] block mt-1.5">
                      {breathingTimer}S
                    </span>
                  )}
                </div>
              </div>

              {/* Start breath control */}
              {breathingPhase === 'idle' ? (
                <button
                  onClick={startBreathingCheck}
                  className="bg-[#00F0FF] hover:bg-white text-black font-sans font-black uppercase text-xs px-5 py-2.5 rounded-none border-2 border-black tracking-wider transition cursor-pointer outline-hidden shadow-[2px_2px_0px_#FF2D55]"
                >
                  Mulai Ambil Napas Rileks (+20 MHP)
                </button>
              ) : (
                <span className="text-xxs font-mono text-[#00F0FF] uppercase tracking-[0.2em] animate-pulse font-bold">
                  Ikuti aliran visual... rilekskan bahu...
                </span>
              )}

              {completedBreathingCount > 0 && (
                <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                  KOMUNITAS PEMULIHAN: {completedBreathingCount} PUTARAN RILEKS
                </span>
              )}
            </motion.div>
          )}

          {activeTab === 'lofi' && (
            <motion.div
              key="lofi-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-4"
            >
              <div className="text-center">
                <h3 className="text-sm sm:text-base font-black tracking-widest text-[#00F0FF] flex items-center justify-center gap-2 uppercase italic">
                  <Music className="w-4 h-4 text-emerald-400" />
                  DENGUNG FREKUENSI RELAKSASI (LOFI TAPE)
                </h3>
                <p className="text-gray-400 text-xxs sm:text-xs mt-1 max-w-md mx-auto leading-relaxed uppercase tracking-wider">
                  Suara dengungan menenangkan. Mengaktifkan tape lo-fi menstimulasi gelombang otak alfa untuk penyaluran koping kecemasan.
                </p>
              </div>

              {/* Tape Player Visual */}
              <div className="bg-black border-2 border-white/10 rounded-none p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-md mx-auto w-full shadow-[4px_4px_0px_#FF2D55]">
                <div className="flex items-center gap-3">
                  {/* Cassette cassette reels spinning */}
                  <div className="bg-[#101014] px-3 py-2 border-2 border-white/15 flex items-center gap-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full border-2 border-dashed border-[#00F0FF] flex items-center justify-center ${isPlayingAudio ? 'animate-spin' : ''}`}>
                      <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 border-dashed border-[#00F0FF] flex items-center justify-center ${isPlayingAudio ? 'animate-spin' : ''}`}>
                      <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-gray-500 uppercase font-mono block tracking-widest font-bold">Now Playing</span>
                    <span className="text-xs font-black text-white font-sans block mt-0.5 truncate max-w-[150px] sm:max-w-[200px] uppercase italic tracking-tight">
                      {LOFI_SONGS[activeSongIdx].name}
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleAudio}
                  className={`bg-[#FF2D55] hover:bg-white text-white hover:text-black border-2 border-black rounded-none px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0 ${
                    isPlayingAudio ? 'bg-[#FF2D55]/30' : ''
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4 text-white hover:text-black" /> Pause Audio
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-white hover:text-black" /> Play Tape
                    </>
                  )}
                </button>
              </div>

              {/* Songs choices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto w-full text-left mt-1">
                {LOFI_SONGS.map((song, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeSong(idx)}
                    className={`p-2.5 border-2 rounded-none text-xxs font-black transition uppercase font-mono ${
                      activeSongIdx === idx 
                        ? 'bg-[#00F0FF] border-black text-black font-extrabold shadow-[2px_2px_0px_rgba(0,0,0,0.5)]' 
                        : 'bg-black border-white/10 hover:border-[#00F0FF] text-gray-500 hover:text-white cursor-pointer'
                    }`}
                  >
                    {song.name.split(' ')[0]} {song.name.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div
              key="journal-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-4"
            >
              <div className="text-center">
                <h3 className="text-sm sm:text-base font-black tracking-widest text-[#00F0FF] flex items-center justify-center gap-2 uppercase italic">
                  <BookOpen className="w-4 h-4 text-[#00F0FF]" />
                  BUKU HARIAN KATARSIS CHERYL (OFFLOAD)
                </h3>
                <p className="text-gray-400 text-xxs sm:text-xs mt-1 max-w-md mx-auto leading-relaxed uppercase tracking-wider">
                  Metode katarsis (journaling) membantu menstruktur kembali kognitif emosimu. Curahkan kepenatan atau kelelahanmu hari ini untuk mendapat <span className="text-[#00F0FF] font-black">+15 poin Mental Health</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left side Form */}
                <form onSubmit={handleJournalSubmit} className="flex flex-col gap-2.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-black">Tulis Apa Yang Dirasakan Hari Ini</label>
                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder="Contoh: Aku capek banget dicemberutin Sarah pas rapat OSIS tadi, padahal aku udah ikhtiar semaksimal mungkin..."
                    rows={4}
                    className="w-full bg-black border-2 border-white/10 focus:border-[#00F0FF] focus:outline-hidden text-xs rounded-none p-3 text-white placeholder:text-gray-600 leading-relaxed font-sans transition resize-none uppercase"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider font-bold">Minimal 15 karakter ({journalText.length}/15)</span>
                    <button
                      type="submit"
                      className="bg-[#00F0FF] hover:bg-white text-black border-2 border-black font-sans text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-none shadow-[2px_2px_0px_#FF2D55] transition-all cursor-pointer outline-hidden"
                    >
                      Pindahkan ke Buku Harian
                    </button>
                  </div>
                </form>

                {/* Right side history visualizer */}
                <div className="flex flex-col gap-2.5 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-black">Catatan Penyintas OSIS ({journalEntries.length})</span>
                  <div className="border-2 border-white/10 bg-black/60 rounded-none p-3.5 max-h-[140px] overflow-y-auto flex flex-col gap-2.5">
                    {journalEntries.length === 0 ? (
                      <p className="text-gray-600 italic text-[11px] text-center py-4 uppercase font-mono font-bold tracking-wider">Belum ada catatan hari ini.</p>
                    ) : (
                      journalEntries.map((entry, idx) => (
                        <div key={idx} className="bg-[#0D0D10] border border-white/10 p-2.5 rounded-none text-xxs font-sans text-gray-300 leading-relaxed relative">
                          <span className="absolute top-1 right-2 text-[8px] font-mono text-[#00F0FF] font-black uppercase">Rec {idx + 1}</span>
                          <p className="italic pr-8 uppercase">"{entry}"</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {journalFeedback && (
                <p className="text-xxs font-mono text-yellow-400 text-center mt-1 uppercase tracking-wider font-extrabold">{journalFeedback}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
