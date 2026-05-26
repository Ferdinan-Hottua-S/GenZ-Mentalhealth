/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterId = 'cheryl' | 'roy' | 'sarah' | 'bimo' | 'alika' | 'narator';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  avatarColor: string;
  borderColor: string;
  avatarStyle: 'cheryl' | 'roy' | 'sarah' | 'bimo' | 'alika' | 'system';
}

export type Expression = 'normal' | 'senang' | 'sedih' | 'marah' | 'lelah' | 'sombong' | 'khawatir';

export interface DialogNode {
  id: string;
  speakerId: CharacterId;
  text: string;
  expression?: Expression;
  choices?: DialogueChoice[];
  nextId?: string | null;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  mhpChange: number; // Mental Health Points change
  taskChange: number; // Task Progress change
  feedbackText?: string; // Guidance hint shown after selection
  educationalTip?: string; // Mental health coping explanation
}

export interface DayData {
  dayNumber: number;
  title: string;
  description: string;
  initialDialogueId: string;
  targetTaskProgress: number; // Task progress needed to finish the day
  taskName: string;
  taskType: 'poster' | 'proposal' | 'anggaran';
}

export interface GameState {
  currentDay: number;
  gameState: 'intro' | 'dialogue' | 'desk' | 'ending_good' | 'ending_bad' | 'tips_index';
  mentalHealth: number; // 0 to 100
  taskProgress: number; // 0 to 100
  breathingActive: boolean;
  journalEntries: string[];
  activeDialogueId: string;
}
