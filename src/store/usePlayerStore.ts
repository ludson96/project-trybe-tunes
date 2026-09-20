import { create } from 'zustand';
import { Song } from '../types';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pauseSong: () => void;
  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,

  playSong: (song: Song) => {
    set({ currentSong: song, isPlaying: true });
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  pauseSong: () => {
    set({ isPlaying: false });
  },

  resetPlayer: () => {
    set({ currentSong: null, isPlaying: false });
  },
}));
