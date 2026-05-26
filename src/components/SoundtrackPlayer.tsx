import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music, Disc, Sparkles } from 'lucide-react';

interface SoundtrackPlayerProps {
  onStateChange?: (playing: boolean) => void;
}

// Retro-ambient peaceful synth note frequencies
// Beautiful chill progression: Fmaj7 -> G6 -> Am7 -> Em7
const CHORD_PROGRESSIONS = [
  // Fmaj7
  { bass: 87.31, chord: [174.61, 220.00, 261.63, 329.63], lead: [261.63, 329.63, 349.23, 392.00] },
  // G6
  { bass: 98.00, chord: [196.00, 246.94, 293.66, 392.00], lead: [293.66, 392.00, 440.00, 493.88] },
  // Am7
  { bass: 110.00, chord: [220.00, 261.63, 329.63, 392.00], lead: [329.63, 392.00, 440.00, 523.25] },
  // Em7
  { bass: 82.41, chord: [164.81, 196.00, 246.94, 329.63], lead: [246.94, 329.63, 392.00, 440.00] }
];

export default function SoundtrackPlayer({ onStateChange }: SoundtrackPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(30); // 0 to 100
  const [profile, setProfile] = useState<'mellow' | 'cyber' | 'deep'>('mellow');
  const [currentChordName, setCurrentChordName] = useState<string>('Fmaj7 (Warm)');

  // Refs for Web Audio API nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const chordIndexRef = useRef<number>(0);
  const stepIndexRef = useRef<number>(0);

  // Clean play nodes
  const cleanActiveNodes = () => {
    try {
      activeNodesRef.current.forEach((node) => {
        try {
          (node as any).stop?.();
        } catch (e) {}
      });
      activeNodesRef.current = [];
    } catch (err) {}
  };

  useEffect(() => {
    return () => {
      // Clean up sound schedule on unmount
      if (timerIdRef.current) {
        window.clearInterval(timerIdRef.current);
      }
      cleanActiveNodes();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Update master gain whenever volume state changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      // Smooth volume transition
      masterGainRef.current.gain.setValueAtTime(
        (volume / 100) * 0.15,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  // Procedural scheduler step
  const executeSynthStep = () => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain || ctx.state === 'suspended') return;

    const currentProg = CHORD_PROGRESSIONS[chordIndexRef.current];
    const step = stepIndexRef.current; // 0, 1, 2, 3, 4, 5, 6, 7

    // Visual helper updates
    const names = ['Fmaj7 (Warm)', 'G6 (Airy)', 'Am7 (Hopeful)', 'Em7 (Moody)'];
    setCurrentChordName(names[chordIndexRef.current]);

    // Profile settings
    let oscType: OscillatorType = 'sine';
    let filterFreq = 450;
    if (profile === 'mellow') {
      oscType = 'triangle';
      filterFreq = 380;
    } else if (profile === 'cyber') {
      oscType = 'sine';
      filterFreq = 900;
    } else if (profile === 'deep') {
      oscType = 'triangle';
      filterFreq = 250;
    }

    // 1. Play Soft Bass Note on Step 0 and Step 4
    if (step === 0 || step === 4) {
      const dbOsc = ctx.createOscillator();
      const dbGain = ctx.createGain();
      
      dbOsc.type = 'sine';
      dbOsc.frequency.setValueAtTime(currentProg.bass, ctx.currentTime);
      
      // smooth lowpass filter
      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(150, ctx.currentTime);

      dbGain.gain.setValueAtTime(0, ctx.currentTime);
      dbGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
      dbGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

      dbOsc.connect(bassFilter);
      bassFilter.connect(dbGain);
      dbGain.connect(masterGain);

      dbOsc.start();
      dbOsc.stop(ctx.currentTime + 3.6);
      activeNodesRef.current.push(dbOsc);
    }

    // 2. Play Warm Chord Keys on Step 0 or Step 4
    if (step === 0 || step === 4) {
      currentProg.chord.forEach((freq, idx) => {
        const keyOsc = ctx.createOscillator();
        const keyGain = ctx.createGain();
        const keyFilter = ctx.createBiquadFilter();

        keyOsc.type = oscType;
        // spread chord voice frequency slightly to make it wider/vintage
        keyOsc.frequency.setValueAtTime(freq + (idx * 0.5), ctx.currentTime);

        keyFilter.type = 'lowpass';
        keyFilter.frequency.setValueAtTime(filterFreq, ctx.currentTime);

        keyGain.gain.setValueAtTime(0, ctx.currentTime);
        keyGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        keyGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

        keyOsc.connect(keyFilter);
        keyFilter.connect(keyGain);
        keyGain.connect(masterGain);

        keyOsc.start();
        keyOsc.stop(ctx.currentTime + 3.1);
        activeNodesRef.current.push(keyOsc);
      });
    }

    // 3. Play Twinkling Arpeggio/Lead Stars on random steps (steps 1, 2, 3, 5, 6, 7)
    if (step !== 0 && step !== 4 && Math.random() > 0.3) {
      const melodyNotes = currentProg.lead;
      // pick random frequency
      const freq = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
      
      const starOsc = ctx.createOscillator();
      const starGain = ctx.createGain();
      const starFilter = ctx.createBiquadFilter();

      // Cyber mode uses triangle for pure lead, otherwise soft sine
      starOsc.type = profile === 'cyber' ? 'triangle' : 'sine';
      // Octave up for twinkling lofi effect
      starOsc.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      starFilter.type = 'lowpass';
      // sparkling sweep limit
      starFilter.frequency.setValueAtTime(1200, ctx.currentTime);

      starGain.gain.setValueAtTime(0, ctx.currentTime);
      starGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      starGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      starOsc.connect(starFilter);
      starFilter.connect(starGain);
      starGain.connect(masterGain);

      starOsc.start();
      starOsc.stop(ctx.currentTime + 1.3);
      activeNodesRef.current.push(starOsc);
    }

    // Increments
    stepIndexRef.current = (stepIndexRef.current + 1) % 8;
    if (stepIndexRef.current === 0) {
      chordIndexRef.current = (chordIndexRef.current + 1) % CHORD_PROGRESSIONS.length;
    }
  };

  const handleTogglePlay = async () => {
    try {
      if (isPlaying) {
        // Stop the scheduler
        if (timerIdRef.current) {
          window.clearInterval(timerIdRef.current);
          timerIdRef.current = null;
        }
        cleanActiveNodes();
        setIsPlaying(false);
        onStateChange?.(false);
      } else {
        // Start or resume Web Audio engine
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        // Create Master Gain Node if not exist
        if (!masterGainRef.current) {
          const mainGain = ctx.createGain();
          mainGain.gain.setValueAtTime((volume / 100) * 0.15, ctx.currentTime);
          
          // Connect directly to output
          mainGain.connect(ctx.destination);
          masterGainRef.current = mainGain;
        }

        // Initialize state indicators
        chordIndexRef.current = 0;
        stepIndexRef.current = 0;

        // Warm startup sweep
        executeSynthStep();

        // Interval scheduler: every 400ms is equivalent to ~150 BPM at 1/16/8th grid notes
        timerIdRef.current = window.setInterval(() => {
          executeSynthStep();
        }, 420);

        setIsPlaying(true);
        onStateChange?.(true);
      }
    } catch (e) {
      console.error('Failed to start ambient soundtrack synthesizer engine.', e);
    }
  };

  const changeProfile = (prof: 'mellow' | 'cyber' | 'deep') => {
    setProfile(prof);
  };

  return (
    <div id="ambient-soundtrack-player" className="bg-black/60 border border-white/10 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none text-white w-full max-w-lg shadow-[4px_4px_0px_#00F0FF] relative z-20">
      
      {/* 1. Track Name & Live Visualizer */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto text-left">
        <div className="relative">
          {isPlaying ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="p-1.5 bg-[#00F0FF]/15 border border-[#00F0FF] rounded-full flex items-center justify-center text-[#00F0FF]"
            >
              <Disc className="w-4 h-4" />
            </motion.div>
          ) : (
            <div className="p-1.5 bg-white/5 border border-white/15 rounded-full flex items-center justify-center text-gray-400">
              <Disc className="w-4 h-4 opacity-55" />
            </div>
          )}
          {isPlaying && (
            <div className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-mono text-[#00F0FF] font-black uppercase tracking-widest bg-[#00F0FF]/10 px-1 py-0.5 border border-[#00F0FF]/30">Procedural OSIS Lofi</span>
            {isPlaying && <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse shrink-0" />}
          </div>
          <span className="text-[11px] font-sans font-black text-white block truncate uppercase tracking-tight mt-0.5 italic">
            {isPlaying ? `Mendengarkan: ${currentChordName}` : 'SOUNDTRACK MATI (TAP KANAN)'}
          </span>
        </div>
      </div>

      {/* 2. Audio Spectrum & Profile Controls */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
        {/* Equalizer Wave animated solely using Tailwind */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 px-1 shrink-0">
            <span className="w-1 bg-[#00F0FF] h-full animate-[bounce_1.2s_infinite_100ms]" style={{ minHeight: '3px' }} />
            <span className="w-1 bg-[#FF2D55] h-full animate-[bounce_1s_infinite_200ms]" style={{ minHeight: '5px' }} />
            <span className="w-1 bg-[#00F0FF] h-full animate-[bounce_0.8s_infinite_300ms]" style={{ minHeight: '2px' }} />
            <span className="w-1 bg-[#FF2D55] h-full animate-[bounce_1.1s_infinite_400ms]" style={{ minHeight: '4px' }} />
          </div>
        )}

        {/* Profile switches */}
        <div className="flex items-center gap-1 shrink-0">
          {(['mellow', 'cyber', 'deep'] as const).map((prof) => (
            <button
              key={prof}
              onClick={() => changeProfile(prof)}
              title={`Profil suara: ${prof}`}
              className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 border ${
                profile === prof 
                  ? 'bg-[#FF2D55] text-white border-black shadow-[1px_1px_0px_#000]' 
                  : 'bg-black text-gray-400 border-white/10 hover:border-white'
              } transition-all cursor-pointer`}
            >
              {prof}
            </button>
          ))}
        </div>

        {/* Volume Input Slider */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            type="button" 
            onClick={() => setVolume(volume <= 0 ? 30 : 0)}
            className="text-gray-400 hover:text-white transition cursor-pointer"
          >
            {volume <= 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-12 h-1 accent-[#00F0FF] bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Main triggering Action Button */}
        <button
          onClick={handleTogglePlay}
          className={`px-3 py-1 text-[10px] sm:text-xxs font-mono font-black uppercase border-2 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
            isPlaying 
              ? 'bg-[#00F0FF] hover:bg-white text-black border-black' 
              : 'bg-[#FF2D55] hover:bg-white text-white hover:text-black border-black/50'
          }`}
        >
          {isPlaying ? 'SOUND: ON' : 'PLAY BG'}
        </button>
      </div>

    </div>
  );
}
