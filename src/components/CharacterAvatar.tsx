/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterId, Expression } from '../types';

interface CharacterAvatarProps {
  characterId: CharacterId;
  expression?: Expression;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function CharacterAvatar({
  characterId,
  expression = 'normal',
  className = '',
  size = 'md',
}: CharacterAvatarProps) {
  // Dimensions map
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  const getExpressionProps = () => {
    switch (expression) {
      case 'senang':
        return {
          eyeLeftY: 42,
          eyeRightY: 42,
          eyeHeight: 4,
          mouthPath: 'M 44 60 Q 50 68 56 60',
          eyebrows: 'M 36 32 Q 41 30 46 32 M 54 32 Q 59 30 64 32',
          blush: true,
          sweat: false,
        };
      case 'sedih':
        return {
          eyeLeftY: 44,
          eyeRightY: 44,
          eyeHeight: 6,
          mouthPath: 'M 44 64 Q 50 56 56 64',
          eyebrows: 'M 36 34 Q 41 38 46 38 M 54 38 Q 59 38 64 34',
          blush: false,
          sweat: true,
          tear: true,
        };
      case 'marah':
        return {
          eyeLeftY: 42,
          eyeRightY: 42,
          eyeHeight: 5,
          mouthPath: 'M 44 62 Q 50 58 56 62',
          eyebrows: 'M 36 34 Q 41 38 45 41 M 55 41 Q 59 38 64 34',
          blush: true,
          sweat: false,
        };
      case 'lelah':
        return {
          eyeLeftY: 45,
          eyeRightY: 45,
          eyeHeight: 2,
          mouthPath: 'M 45 60 L 55 60',
          eyebrows: 'M 36 35 L 46 37 M 54 37 L 64 35',
          blush: false,
          sweat: true,
        };
      case 'sombong':
        return {
          eyeLeftY: 42,
          eyeRightY: 42,
          eyeHeight: 4,
          mouthPath: 'M 43 59 Q 53 62 57 56',
          eyebrows: 'M 36 30 Q 42 32 46 30 M 54 32 Q 58 30 64 28',
          blush: false,
          sweat: false,
        };
      case 'khawatir':
        return {
          eyeLeftY: 43,
          eyeRightY: 43,
          eyeHeight: 5,
          mouthPath: 'M 45 61 Q 50 58 55 61',
          eyebrows: 'M 36 35 Q 41 33 46 36 M 54 36 Q 59 33 64 35',
          blush: false,
          sweat: true,
        };
      case 'normal':
      default:
        return {
          eyeLeftY: 43,
          eyeRightY: 43,
          eyeHeight: 6,
          mouthPath: 'M 44 58 Q 50 63 56 58',
          eyebrows: 'M 36 33 L 46 33 M 54 33 L 64 33',
          blush: false,
          sweat: false,
        };
    }
  };

  const exp = getExpressionProps();

  // Draw Specific Characters
  const renderCharacterSVG = () => {
    switch (characterId) {
      case 'cheryl':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="48" fill="#ECEFF1" className="stroke-indigo-300 stroke-[1.5]" />
            <circle cx="50" cy="50" r="41" fill="#E0E7FF" />
            
            {/* Hair Back */}
            <path d="M 22 45 Q 15 70 20 85 M 78 45 Q 85 70 80 85" stroke="#2D3748" strokeWidth="8" strokeLinecap="round" />
            
            {/* Neck */}
            <rect x="44" y="65" width="12" height="15" fill="#FDDED7" />
            <path d="M 44 72 Q 50 78 56 72" fill="#F0C1B6" />

            {/* SMA Uniform Collar & Grey Tie */}
            {/* White Shirt */}
            <path d="M 28 80 L 72 80 L 68 100 L 32 100 Z" fill="#FFFFFF" />
            <path d="M 32 80 L 46 95 L 42 100 L 28 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" />
            <path d="M 68 80 L 54 95 L 58 100 L 72 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" strokeLinejoin="miter" />
            
            {/* Grey SMA Tie */}
            <path d="M 46 82 L 54 82 L 53 100 L 47 100 Z" fill="#718096" />
            {/* OSIS Logo Pocket detail */}
            <rect x="58" y="87" width="5" height="6" fill="#F6AD55" rx="0.5" />

            {/* Face Shield */}
            <path d="M 28 40 Q 28 72 50 72 Q 72 72 72 40 Z" fill="#FEE3DC" />
            
            {/* Eyes */}
            <ellipse cx="38" cy={exp.eyeLeftY} rx="3" ry={exp.eyeHeight} fill="#1A202C" />
            <ellipse cx="62" cy={exp.eyeRightY} rx="3" ry={exp.eyeHeight} fill="#1A202C" />
            
            {/* Eye Pupil sparkles */}
            {exp.eyeHeight > 3 && (
              <>
                <circle cx="39" cy={exp.eyeLeftY - 1} r="1" fill="#FFFFFF" />
                <circle cx="63" cy={exp.eyeRightY - 1} r="1" fill="#FFFFFF" />
              </>
            )}

            {/* Eyebrows */}
            <path d={exp.eyebrows} stroke="#4A5568" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M 49 50 Q 51 52 49 54" stroke="#D5A196" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Blush */}
            {exp.blush && (
              <>
                <circle cx="34" cy="50" r="3.5" fill="#FEB2B2" opacity="0.6" />
                <circle cx="66" cy="50" r="3.5" fill="#FEB2B2" opacity="0.6" />
              </>
            )}

            {/* Tears */}
            {exp.tear && (
              <path d="M 62 48 Q 63 56 61 58 Q 59 56 62 48" fill="#63B3ED" />
            )}

            {/* Tiny sweat bead */}
            {exp.sweat && (
              <path d="M 28 35 Q 26 38 27 41 Q 29 39 28 35" fill="#63B3ED" />
            )}

            {/* Mouth */}
            <path d={exp.mouthPath} stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Hair Front (Bangs / Rambut Depan) */}
            <path d="M 25 38 C 30 22, 45 20, 50 28 C 55 20, 70 22, 75 38 C 78 45, 80 43, 76 34 C 70 14, 30 14, 24 34 C 20 43, 22 45, 25 38 Z" fill="#2D3748" />
            {/* Hair Bun / Hair ties */}
            <circle cx="50" cy="14" r="7" fill="#2D3748" />
            <circle cx="50" cy="14" r="4" fill="#667EEA" />
          </svg>
        );

      case 'roy':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="48" fill="#FCE8E6" className="stroke-rose-300 stroke-[1.5]" />
            <circle cx="50" cy="50" r="41" fill="#FFE4E6" />
            
            {/* Neck */}
            <rect x="44" y="65" width="12" height="15" fill="#F7D3C6" />
            <path d="M 44 72 Q 50 78 56 72" fill="#E8B5A5" />

            {/* OSIS SMA Uniform Collar */}
            <path d="M 28 80 L 72 80 L 68 100 L 32 100 Z" fill="#FFFFFF" />
            {/* Grey Tie */}
            <path d="M 46 82 L 54 82 L 53 100 L 47 100 Z" fill="#718096" stroke="#4A5568" strokeWidth="0.5" />
            {/* Senior badges / Golden OSIS strip on collar */}
            <path d="M 32 80 L 46 95 L 42 100 L 28 80 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.75" />
            <path d="M 68 80 L 54 95 L 58 100 L 72 80 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.75" />
            {/* Red badge */}
            <rect x="60" y="86" width="6" height="5" fill="#E53E3E" rx="0.5" />

            {/* Jaw / Face */}
            <path d="M 30 40 L 30 60 Q 30 73 50 73 Q 70 73 70 60 L 70 40 Z" fill="#FAD1C5" />
            
            {/* Smart modern undercut hair */}
            <path d="M 26 38 C 24 20, 76 20, 74 38 L 74 44 L 68 44 C 67 28, 33 28, 32 44 L 26 44 Z" fill="#1A202C" />
            {/* Top high-volume lock */}
            <path d="M 35 25 Q 50 10 68 20 Q 55 24 35 25" fill="#2D3748" />

            {/* Angry veins for bossy expressions */}
            {expression === 'marah' && (
              <path d="M 75 35 Q 78 33 76 30 M 78 35 L 75 32" stroke="#E53E3E" strokeWidth="1.5" />
            )}

            {/* Eyes */}
            <ellipse cx="40" cy={exp.eyeLeftY} rx="3" ry={exp.eyeHeight} fill="#2D3748" />
            <ellipse cx="60" cy={exp.eyeRightY} rx="3" ry={exp.eyeHeight} fill="#2D3748" />

            {/* Snobbish glint */}
            {expression === 'sombong' && (
              <path d="M 57 40 L 63 43" stroke="#2D3748" strokeWidth="1.5" />
            )}

            {/* Eyebrows */}
            <path d={exp.eyebrows} stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M 49 48 L 52 51 L 49 54" stroke="#CE9B8F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Mouth */}
            <path d={exp.mouthPath} stroke="#742A2A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'sarah':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="48" fill="#FEF3C7" className="stroke-amber-300 stroke-[1.5]" />
            <circle cx="50" cy="50" r="41" fill="#FFFBEB" />
            
            {/* Ponytail extension */}
            <path d="M 68 30 Q 84 45 80 60 Q 75 55 68 40" fill="#4A3728" />

            {/* Neck */}
            <rect x="44" y="65" width="12" height="15" fill="#FCE1D6" />
            <path d="M 44 72 Q 50 78 56 72" fill="#E8B9A7" />

            {/* White SMA Shirt */}
            <path d="M 28 80 L 72 80 L 68 100 L 32 100 Z" fill="#FFFFFF" />
            <path d="M 32 80 L 46 95 L 42 100 L 28 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" />
            <path d="M 68 80 L 54 95 L 58 100 L 72 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" />
            {/* Grey Tie */}
            <path d="M 46 82 L 54 82 L 53 100 L 47 100 Z" fill="#718096" />
            {/* OSIS badge detail */}
            <rect x="36" y="86" width="4" height="6" fill="#4299E1" rx="0.5" />

            {/* Face Shield */}
            <path d="M 29 39 Q 29 71 50 71 Q 71 71 71 39 Z" fill="#FFEAE3" />
            
            {/* Eyes */}
            <ellipse cx="39" cy={exp.eyeLeftY} rx="3" ry={exp.eyeHeight} fill="#231F20" />
            <ellipse cx="61" cy={exp.eyeRightY} rx="3" ry={exp.eyeHeight} fill="#231F20" />
            
            {/* Sharp eyelashes for judgmental look */}
            <path d="M 36 38 Q 39 35 42 39 M 58 39 Q 61 35 64 38" stroke="#1A202C" strokeWidth="1.5" fill="none" />

            {/* Eyebrows */}
            <path d={exp.eyebrows} stroke="#5C4033" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M 50 49 Q 52 51 50 53" stroke="#DCA291" strokeWidth="1.25" strokeLinecap="round" fill="none" />

            {/* Blush */}
            {exp.blush && <circle cx="34" cy="52" r="2.5" fill="#FEB2B2" opacity="0.5" />}

            {/* Mouth */}
            <path d={exp.mouthPath} stroke="#C53030" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Sleek structured hair */}
            <path d="M 25 35 C 32 18, 68 18, 75 35 C 78 40, 75 35, 71 35 C 68 25, 32 25, 29 35 C 25 35, 23 40, 25 35 Z" fill="#5C4230" />
            <circle cx="69" cy="31" r="5" fill="#ECC94B" /> {/* Yellow hair elastic */}
          </svg>
        );

      case 'bimo':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="48" fill="#ECFDF5" className="stroke-emerald-300 stroke-[1.5]" />
            <circle cx="50" cy="50" r="41" fill="#D1FAE5" />
            
            {/* Neck */}
            <rect x="44" y="66" width="12" height="15" fill="#FADACF" />

            {/* SMA Uniform with Messy Collar & loose tie */}
            <path d="M 28 80 L 72 80 L 68 100 L 32 100 Z" fill="#FFFFFF" />
            <path d="M 30 80 L 48 97 L 40 100 L 26 80 Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.75" />
            <path d="M 70 80 L 52 93 L 56 100 L 74 80 Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.75" />
            {/* Unbuttoned askew tie */}
            <path d="M 48 88 L 56 86 L 55 100 L 46 100 Z" fill="#718096" />

            {/* Face/Jaw */}
            <path d="M 30 41 Q 30 73 50 73 Q 70 73 70 41 Z" fill="#FEDCD0" />
            
            {/* Sleepy Eyes (almost straight lines) */}
            <path d="M 35 44 L 43 44 M 57 44 L 65 44" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyebrows (lazy/slanted) */}
            <path d={exp.eyebrows} stroke="#4A5568" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Headphones details around neck */}
            <path d="M 30 65 Q 50 82 70 65" stroke="#4B5563" strokeWidth="3" fill="none" />
            <rect x="25" y="60" width="8" height="11" fill="#4B5563" rx="2" />
            <rect x="67" y="60" width="8" height="11" fill="#4B5563" rx="2" />

            {/* Small bandage on cheek */}
            <rect x="30" y="52" width="6" height="4" fill="#FBD38D" rx="0.5" transform="rotate(15 33 54)" opacity="0.8" />

            {/* Nose */}
            <path d="M 49 50 Q 51 52 49 54" stroke="#D39F90" strokeWidth="1.25" strokeLinecap="round" fill="none" />

            {/* Lazy mouth / slight smirk */}
            <path d={exp.mouthPath} stroke="#2D3748" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Messy unstructured hair */}
            <path d="M 24 38 Q 28 22 45 18 Q 50 25 55 18 Q 72 22 76 38 H 71 Q 65 25 50 29 Q 35 25 29 38 Z" fill="#4A5568" />
            <path d="M 23 35 L 21 39 M 77 35 L 79 39" stroke="#4A5568" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'alika':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="48" fill="#F0F9FF" className="stroke-sky-300 stroke-[1.5]" />
            <circle cx="50" cy="50" r="41" fill="#E0F2FE" />
            
            {/* Neck */}
            <rect x="44" y="65" width="12" height="15" fill="#FCE1D8" />
            <path d="M 44 72 Q 50 78 56 72" fill="#ECA996" />

            {/* Neat SMA Uniform Collar */}
            <path d="M 28 80 L 72 80 L 68 100 L 32 100 Z" fill="#FFFFFF" />
            <path d="M 32 80 L 46 95 L 42 100 L 28 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" />
            <path d="M 68 80 L 54 95 L 58 100 L 72 80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.75" />
            {/* Grey Tie */}
            <path d="M 46 82 L 54 82 L 53 100 L 47 100 Z" fill="#718096" />
            {/* School circular pins */}
            <circle cx="36" cy="88" r="1.5" fill="#ECC94B" />

            {/* Face Shield */}
            <path d="M 29 40 Q 29 72 50 72 Q 71 72 71 40 Z" fill="#FFE2DA" />

            {/* Cute friendly glasses */}
            <rect x="31" y="40" width="14" height="10" rx="4" fill="none" stroke="#2D3748" strokeWidth="2.5" />
            <rect x="55" y="40" width="14" height="10" rx="4" fill="none" stroke="#2D3748" strokeWidth="2.5" />
            <line x1="45" y1="44" x2="55" y2="44" stroke="#2D3748" strokeWidth="2.5" />

            {/* Eyes behind glasses */}
            <circle cx="38" cy="45" r="2" fill="#1A202C" />
            <circle cx="62" cy="45" r="2" fill="#1A202C" />

            {/* Eyebrows */}
            <path d={exp.eyebrows} stroke="#2D3748" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M 50 51 L 52 53" stroke="#D39889" strokeWidth="1.2" strokeLinecap="round" />

            {/* Soft blushing cheeks */}
            <circle cx="34" cy="53" r="3" fill="#F87171" opacity="0.4" />
            <circle cx="66" cy="53" r="3" fill="#F87171" opacity="0.4" />

            {/* Mouth */}
            <path d={exp.mouthPath} stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Soft neat short hair with clips */}
            <path d="M 24 38 C 24 16, 76 16, 76 38 C 76 45, 75 42, 73 38 C 70 20, 30 20, 27 38 Q 24 43 24 38" fill="#1A202C" />
            {/* Yellow hairclip */}
            <line x1="27" y1="32" x2="31" y2="30" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'narator':
      default:
        return (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-slate-800 text-teal-400 font-bold border-2 border-teal-500">
            💡
          </div>
        );
    }
  };

  return (
    <div id={`avatar-${characterId}`} className={`relative inline-block ${sizeMap[size]} ${className}`}>
      {renderCharacterSVG()}
    </div>
  );
}
