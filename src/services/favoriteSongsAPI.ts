import { Song } from '../types';

const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 200;
const SUCCESS_STATUS = 'OK';

if (typeof window !== 'undefined' && !localStorage.getItem(FAVORITE_SONGS_KEY)) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}

const readFavoriteSongs = (): Song[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITE_SONGS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavoriteSongs = (favoriteSongs: Song[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));
  }
};

const simulateRequest = <T>(response: T) => (callback: (data: T) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = (): Promise<Song[]> =>
  new Promise((resolve) => {
    const favoriteSongs = readFavoriteSongs();
    simulateRequest(favoriteSongs)(resolve);
  });

export const addSong = (song: Song): Promise<string> =>
  new Promise((resolve) => {
    if (song) {
      const favoriteSongs = readFavoriteSongs();
      if (!favoriteSongs.some((s) => s.trackId === song.trackId)) {
        saveFavoriteSongs([...favoriteSongs, song]);
      }
    }
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

export const removeSong = (song: Song): Promise<string> =>
  new Promise((resolve) => {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
    simulateRequest(SUCCESS_STATUS)(resolve);
  });
