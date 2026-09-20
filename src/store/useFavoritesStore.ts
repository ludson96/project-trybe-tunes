import { create } from 'zustand';
import { Song } from '../types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

interface FavoritesState {
  favorites: Song[];
  loading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (song: Song) => Promise<void>;
  isFavorite: (trackId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,

  fetchFavorites: async () => {
    set({ loading: true });
    try {
      const data = await getFavoriteSongs();
      set({ favorites: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  toggleFavorite: async (song: Song) => {
    const isFav = get().favorites.some((f) => f.trackId === song.trackId);
    // Optimistic update
    if (isFav) {
      set({ favorites: get().favorites.filter((f) => f.trackId !== song.trackId) });
      await removeSong(song);
    } else {
      set({ favorites: [...get().favorites, song] });
      await addSong(song);
    }
    // Sync with persistence
    const updated = await getFavoriteSongs();
    set({ favorites: updated });
  },

  isFavorite: (trackId: number) => {
    return get().favorites.some((f) => f.trackId === trackId);
  },
}));
