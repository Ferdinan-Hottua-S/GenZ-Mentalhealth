/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCheck, Landmark, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { DialogNode, DialogueChoice, CharacterId } from '../types';
import { CHARACTERS } from '../data/story';
import CharacterAvatar from './CharacterAvatar';

interface ChatSimulatorProps {
  currentNode: DialogNode;
  onSelectChoice: (choice: DialogueChoice) => void;
  onNextNode: (nextId: string) => void;
  dayNumber: number;
}

interface ChatMessage {
  id: string;
  speakerId: CharacterId;
  text: string;
  isCheryl: boolean;
  timestamp: string;
  isEducational?: boolean;
  tipTitle?: string;
}

export default function ChatSimulator({
  currentNode,
  onSelectChoice,
  onNextNode,
  dayNumber,
}: ChatSimulatorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeChoiceFeedback, setActiveChoiceFeedback] = useState<{
    text: string;
    tip?: string;
  } | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Restart message stream when day changes or on intro node
  useEffect(() => {
    // If it is the intro node, reset chat history
    if (currentNode.id.includes('intro')) {
      setMessages([
        {
          id: 'sys-intro-' + Date.now(),
          speakerId: 'narator',
          text: currentNode.text,
          isCheryl: false,
          timestamp: 'Hari Ini',
        },
      ]);
      setActiveChoiceFeedback(null);
    } else {
      // Append current speaker node safely if not already presented
      const alreadyHaveMessage = messages.some((m) => m.text === currentNode.text);
      if (!alreadyHaveMessage && currentNode.speakerId !== 'cheryl') {
        setIsTyping(true);
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: currentNode.id + '-' + Date.now(),
              speakerId: currentNode.speakerId,
              text: currentNode.text,
              isCheryl: currentNode.speakerId === 'cheryl',
              timestamp: getCurrentTimeStr(),
            },
          ]);
        }, 800);
        return () => clearTimeout(typingTimer);
      }
    }
  }, [currentNode.id]);

  useEffect(() => {
    // Scroll to bottom on updates
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeChoiceFeedback]);

  const getCurrentTimeStr = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const handleChoiceClick = (choice: DialogueChoice) => {
    // Clear feedback block
    setActiveChoiceFeedback(null);

    // 1. Add player select bubble to thread
    const cherylMsgId = 'choice-' + Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: cherylMsgId,
        speakerId: 'cheryl',
        text: choice.text,
        isCheryl: true,
        timestamp: getCurrentTimeStr(),
      },
    ]);

    // 2. Add educational tip directly with custom styling in chat stream if exists
    if (choice.educationalTip) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'edu-' + Date.now(),
            speakerId: 'narator',
            text: choice.educationalTip || '',
            isCheryl: false,
            timestamp: getCurrentTimeStr(),
            isEducational: true,
            tipTitle: choice.feedbackText || 'Pelajaran Edukasi Penting',
          },
        ]);
        
        // Save current selection feedback
        setActiveChoiceFeedback({
          text: choice.feedbackText || '',
          tip: choice.educationalTip,
        });
      }, 500);
    }

    // Trigger parent action
    onSelectChoice(choice);
  };

  const handleNextClick = () => {
    if (currentNode.nextId) {
      // If next is going to be desks or endings, execute parent flow
      onNextNode(currentNode.nextId);
    }
  };

  const getBubbleStyle = (speakerId: CharacterId, isEducational?: boolean) => {
    if (isEducational) {
      return 'bg-emerald-950/40 border-l-[4px] border-emerald-400 text-emerald-200 rounded-none p-4 self-center max-w-[90%] text-xs font-mono shadow-[2px_2px_0px_rgba(0,0,0,0.5)]';
    }
    if (speakerId === 'narator') {
      return 'bg-gray-900/80 text-gray-300 italic border border-white/10 text-center rounded-none py-2.5 px-4.5 self-center max-w-[85%] text-xs uppercase tracking-wide shadow-xs';
    }
    if (speakerId === 'cheryl') {
      return 'bg-[#00F0FF] text-black font-extrabold rounded-none px-4 py-2.5 max-w-[78%] self-end shadow-[3px_3px_0px_#FF2D55]';
    }
    // Other toxic SMA members
    switch (speakerId) {
      case 'roy':
        return 'bg-[#FF2D55]/15 text-white border-l-[3px] border-[#FF2D55] rounded-none px-4 py-2.5 max-w-[78%] self-start';
      case 'sarah':
        return 'bg-amber-500/15 text-white border-l-[3px] border-amber-400 rounded-none px-4 py-2.5 max-w-[78%] self-start';
      case 'bimo':
        return 'bg-emerald-500/15 text-white border-l-[3px] border-emerald-400 rounded-none px-4 py-2.5 max-w-[78%] self-start';
      case 'alika':
        return 'bg-sky-500/15 text-white border-l-[3px] border-sky-400 rounded-none px-4 py-2.5 max-w-[78%] self-start';
      default:
        return 'bg-gray-800 text-white border border-white/15 rounded-none px-4 py-2.5 max-w-[78%] self-start';
    }
  };

  return (
    <div id="chat-simulator" className="flex flex-col h-[65vh] min-h-[420px] bg-[#0A0A0B] rounded-none border-2 border-[#00F0FF] shadow-[6px_6px_0px_#FF2D55] overflow-hidden relative">
      {/* 1. Group Header */}
      <div className="bg-[#0A0A0B] border-b-2 border-[#00F0FF]/30 px-4 py-3.5 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          {/* Avatar Stack for OSIS group chat */}
          <div className="relative w-10 h-10 flex shrink-0 items-center justify-center">
            <div className="absolute top-0 left-0 w-7 h-7 rounded-full overflow-hidden border border-white z-20">
              <CharacterAvatar characterId="roy" size="sm" />
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full overflow-hidden border border-white z-10">
              <CharacterAvatar characterId="sarah" size="sm" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-sans font-black uppercase text-sm tracking-tight flex items-center gap-1.5 leading-tight">
              PANITIA PENSI 🚀🦅
              <span className="bg-[#FF2D55] w-2 h-2 rounded-full inline-block animate-ping" />
            </h4>
            <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider block mt-0.5">
              Roy, Sarah, Bimo, Alika, Cheryl, +14 Lainnya
            </span>
          </div>
        </div>
        <div className="bg-black text-[#00F0FF] border border-[#00F0FF]/40 rounded-none px-3 py-1 text-[10px] font-mono font-black uppercase tracking-wider">
          {dayNumber === 2 ? 'Rapat Sekolah Offline 🏫' : 'Grup Chat WhatsApp 📱'}
        </div>
      </div>

      {/* 2. Scrollable Chat Wallpaper Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0F0F12]"
        style={{
          backgroundImage: 'radial-gradient(circle, #2a2a35 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const speaker = CHARACTERS[msg.speakerId];
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col ${msg.isCheryl ? 'items-end' : 'items-start'} w-full`}
              >
                {/* Speaker indicator (exclude for Cheryl, System warnings, or when same as previous) */}
                {!msg.isCheryl && msg.speakerId !== 'narator' && !msg.isEducational && (
                  <span className="text-[10px] font-mono font-bold mb-1 ml-1 cursor-default uppercase tracking-wider" style={{ color: msg.speakerId === 'roy' ? '#FF2D55' : msg.speakerId === 'sarah' ? '#fbbf24' : msg.speakerId === 'bimo' ? '#34d399' : '#38bdf8' }}>
                    {speaker?.name} • <span className="text-[9px] font-normal text-slate-400 normal-case">{speaker?.role}</span>
                  </span>
                )}

                <div className="flex gap-2 items-end max-w-full">
                  {/* Left Avatar for external members */}
                  {!msg.isCheryl && msg.speakerId !== 'narator' && !msg.isEducational && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-700 shrink-0 mb-1">
                      <CharacterAvatar characterId={msg.speakerId} size="sm" />
                    </div>
                  )}

                  {/* Main Bubble */}
                  <div className={getBubbleStyle(msg.speakerId, msg.isEducational)}>
                    {msg.isEducational ? (
                      <div>
                        <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold uppercase tracking-wider mb-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{msg.tipTitle}</span>
                        </div>
                        <p className="leading-relaxed text-xs font-medium">{msg.text}</p>
                      </div>
                    ) : (
                      <p className="text-xs font-sans leading-relaxed break-words whitespace-pre-line">{msg.text}</p>
                    )}

                    <span className={`block text-[8px] text-right mt-1.5 ${msg.isCheryl ? 'text-black/60' : 'text-gray-400'} font-mono font-bold tracking-wider`}>
                      {msg.timestamp} {msg.isCheryl && <CheckCheck className="inline-block w-3 h-3 ml-0.5 text-black/70 fill-black/30" />}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Simulator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 self-start ml-8 bg-gray-900 py-2 px-3.5 rounded-none border border-white/10"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Anggota sedang mengetik...</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#FF2D55] rounded-full animate-bounce delay-0" />
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3. Action Panel: Offers Choices or Navigation */}
      <div className={`p-4 shrink-0 transition-all duration-300 ${currentNode.choices && currentNode.choices.length > 0 ? 'bg-white text-black border-t-4 border-black' : 'bg-[#0D0D10] border-t border-white/10'}`}>
        {isTyping ? (
          <div className="text-center p-2 text-gray-400 text-xs font-mono uppercase tracking-widest">
            Sedang mendengarkan kemarahan kelompok... 🤐
          </div>
        ) : currentNode.choices && currentNode.choices.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1">CHERYL'S CHOICE</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase italic">Monolog Batin: "Aku lelah sekali, tapi tugas terus menumpuk..."</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentNode.choices.map((choice, index) => {
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleChoiceClick(choice)}
                    className={`group flex flex-col justify-between text-left font-sans text-xs transition-colors duration-200 gap-2 cursor-pointer border-[3px] border-black p-3.5 rounded-none text-black ${
                      index === 0 
                        ? 'bg-white hover:bg-black hover:text-white' 
                        : 'bg-[#00F0FF] hover:bg-black hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="text-sm sm:text-base font-black leading-tight uppercase tracking-tight">
                        {choice.text}
                      </span>
                      <div className="text-right shrink-0">
                        <div className="text-[9px] font-black text-red-600 group-hover:text-red-400">
                          {choice.mhpChange < 0 ? `${choice.mhpChange} MHP` : `+${choice.mhpChange} MHP`}
                        </div>
                        <div className="text-[9px] font-black text-blue-600 group-hover:text-blue-400">
                          {choice.taskChange < 0 ? `${choice.taskChange} PROGRESS` : `+${choice.taskChange} PROGRESS`}
                        </div>
                      </div>
                    </div>
                    {choice.educationalTip && (
                      <p className="text-[9px] uppercase font-bold text-gray-500 group-hover:text-gray-300 mt-1 font-mono tracking-wide leading-tight border-t border-slate-200 group-hover:border-slate-800 pt-1">
                        💡 TIPS ASERTIF: {choice.educationalTip.length > 55 ? choice.educationalTip.substring(0, 52) + '...' : choice.educationalTip}
                      </p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex justify-end p-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNextClick}
              className="bg-[#00F0FF] hover:bg-white text-black font-sans text-xs font-black uppercase px-5 py-2.5 rounded-none border-2 border-black tracking-wider transition-all flex items-center gap-2 cursor-pointer focus:outline-hidden shadow-[2px_2px_0px_#FF2D55]"
            >
              <span>{currentNode.nextId === 'GOTO_DESK' ? 'Kerjakan Tugas di Meja Mandiri' : currentNode.nextId === 'GOTO_ENDING_GOOD' ? 'Tampilkan Keputusan Akhir' : 'Lanjutkan Diskusi'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
