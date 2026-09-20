import React, { useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Heart, Music2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { useFavoritesStore } from '../store/useFavoritesStore';

export const GlobalPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, pauseSong } = usePlayerStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        pauseSong();
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong, pauseSong]);

  if (!currentSong) return null;

  const isFav = isFavorite(currentSong.trackId);

  return (
    <aside
      aria-label="Tocador de Áudio Global"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/80 bg-zinc-950/95 px-6 py-3 backdrop-blur-xl shadow-2xl"
    >
      <audio
        ref={audioRef}
        src={currentSong.previewUrl}
        onEnded={() => pauseSong()}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Track Details */}
        <div className="flex items-center gap-3 min-w-0 w-1/4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-800 shadow-md">
            {currentSong.artworkUrl100 || currentSong.artworkUrl60 ? (
              <img
                src={currentSong.artworkUrl100 || currentSong.artworkUrl60}
                alt={currentSong.trackName}
                className="h-full w-full object-cover"
              />
            ) : (
              <Music2 className="h-6 w-6 text-zinc-500" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-white">{currentSong.trackName}</h4>
            <p className="truncate text-xs text-zinc-400">
              {currentSong.artistName || 'Artista desconhecido'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(currentSong)}
            className="ml-2 text-zinc-400 transition hover:scale-110 hover:text-white"
          >
            <Heart
              className={`h-4 w-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`}
            />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1 w-2/4 max-w-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-black shadow-lg shadow-brand-green/20 transition hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current translate-x-0.5" />
              )}
            </button>
          </div>
          <div className="flex w-full items-center gap-2 text-[11px] text-zinc-500">
            <span>Prévia de 30s</span>
            <div className="h-1 flex-1 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full bg-brand-green transition-all duration-300 ${
                  isPlaying ? 'w-full animate-pulse' : 'w-1/3'
                }`}
              />
            </div>
            <span>0:30</span>
          </div>
        </div>

        {/* Volume / Info */}
        <div className="hidden sm:flex items-center justify-end gap-2 w-1/4 text-zinc-400">
          <Volume2 className="h-4 w-4" />
          <div className="h-1 w-20 rounded-full bg-zinc-800">
            <div className="h-full w-3/4 rounded-full bg-zinc-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default GlobalPlayer;
