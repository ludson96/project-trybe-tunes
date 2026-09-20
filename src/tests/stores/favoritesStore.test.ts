import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { Song } from '../../types';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [], loading: false });
  });

  const mockSong: Song = {
    trackId: 101,
    trackName: 'Test Song',
    previewUrl: 'https://example.com/audio.mp3',
    artistName: 'Test Artist',
  };

  it('should toggle favorite addition and removal correctly', async () => {
    const store = useFavoritesStore.getState();

    // Toggle add
    await store.toggleFavorite(mockSong);
    expect(useFavoritesStore.getState().isFavorite(101)).toBe(true);
    expect(useFavoritesStore.getState().favorites.length).toBe(1);

    // Toggle remove
    await store.toggleFavorite(mockSong);
    expect(useFavoritesStore.getState().isFavorite(101)).toBe(false);
    expect(useFavoritesStore.getState().favorites.length).toBe(0);
  });
});
