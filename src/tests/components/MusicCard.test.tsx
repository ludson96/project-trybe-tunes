import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import MusicCard from '../../components/MusicCard';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { Song } from '../../types';

describe('MusicCard Component', () => {
  const songs: Song[] = [
    {
      trackId: 1,
      trackName: 'Bohemian Rhapsody',
      previewUrl: 'https://audio.preview/1.mp3',
      artistName: 'Queen',
      kind: 'song',
    },
    {
      trackId: 2,
      trackName: 'Radio Ga Ga',
      previewUrl: 'https://audio.preview/2.mp3',
      artistName: 'Queen',
      kind: 'song',
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [], loading: false });
  });

  it('renders track names and audio components correctly', () => {
    render(<MusicCard content={songs} />);

    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Radio Ga Ga')).toBeInTheDocument();
    expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
  });

  it('toggles favorite status when checkbox is clicked', async () => {
    render(<MusicCard content={songs} />);

    const checkbox = screen.getByTestId('checkbox-music-1');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
  });
});
