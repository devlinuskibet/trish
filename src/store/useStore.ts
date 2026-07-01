import { create } from 'zustand';

interface AppState {
  currentChapter: number;
  isAudioPlaying: boolean;
  isIntroComplete: boolean;
  activeEasterEggs: string[];
  setChapter: (chapter: number) => void;
  toggleAudio: () => void;
  setAudio: (isPlaying: boolean) => void;
  setIntroComplete: (isComplete: boolean) => void;
  triggerEasterEgg: (egg: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentChapter: 0,
  isAudioPlaying: false,
  isIntroComplete: false,
  activeEasterEggs: [],
  setChapter: (chapter) => set({ currentChapter: chapter }),
  toggleAudio: () => set((state) => ({ isAudioPlaying: !state.isAudioPlaying })),
  setAudio: (isPlaying) => set({ isAudioPlaying: isPlaying }),
  setIntroComplete: (isComplete) => set({ isIntroComplete: isComplete }),
  triggerEasterEgg: (egg) => set((state) => ({
    activeEasterEggs: state.activeEasterEggs.includes(egg) 
      ? state.activeEasterEggs 
      : [...state.activeEasterEggs, egg]
  }))
}));
