import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../types';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { usePlayerStore } from '../store/usePlayerStore';

interface MusicCardProps {
  content: Song[];
  filtro?: boolean;
}

export const MusicCard: React.FC<MusicCardProps> = ({ content, filtro = false }) => {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesStore();
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayerStore();

  const musicasExibidas = filtro ? favorites : content;

  return (
    <div className="flex flex-col divide-y divide-zinc-850/60 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl backdrop-blur-md overflow-hidden">
      {musicasExibidas.length === 0 ? (
        <div className="py-12 text-center text-zinc-400">
          <p className="text-sm">Nenhuma música para exibir no momento.</p>
        </div>
      ) : (
        musicasExibidas.map((song, index) => {
          if (song.kind && song.kind !== 'song') return null;

          const isCurrentlyPlaying = currentSong?.trackId === song.trackId && isPlaying;
          const isFav = isFavorite(song.trackId);

          return (
            <section
              key={song.trackId || song.collectionViewUrl || index}
              className={`group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors ${
                isCurrentlyPlaying ? 'bg-zinc-800/50' : 'hover:bg-zinc-850/40'
              }`}
            >
              {/* Left Column: Number / Play button + Title */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <span className="w-6 text-center text-xs font-semibold text-zinc-500 group-hover:hidden">
                  {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (currentSong?.trackId === song.trackId) {
                      togglePlay();
                    } else {
                      playSong(song);
                    }
                  }}
                  className="hidden h-7 w-7 items-center justify-center rounded-full bg-brand-green text-black transition-transform hover:scale-110 active:scale-95 group-hover:flex"
                  title={isCurrentlyPlaying ? 'Pausar' : 'Tocar'}
                >
                  {isCurrentlyPlaying ? (
                    <Pause className="h-3.5 w-3.5 fill-current" />
                  ) : (
                    <Play className="h-3.5 w-3.5 fill-current translate-x-0.5" />
                  )}
                </button>

                <div className="min-w-0">
                  <h5
                    className={`truncate text-sm font-medium ${
                      isCurrentlyPlaying ? 'text-brand-green font-semibold' : 'text-zinc-100'
                    }`}
                  >
                    {song.trackName}
                  </h5>
                  {song.artistName && (
                    <p className="truncate text-xs text-zinc-400">{song.artistName}</p>
                  )}
                </div>
              </div>

              {/* Middle Column: Native Audio Component (Required by test-ids & compatibility) */}
              <div className="hidden sm:block">
                <audio
                  data-testid="audio-component"
                  src={song.previewUrl}
                  controls
                  className="h-8 w-60 opacity-80 transition-opacity hover:opacity-100"
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento <code>audio</code>.
                </audio>
              </div>

              {/* Right Column: Favorite Button */}
              <div className="flex items-center">
                <label
                  htmlFor={`checkbox-music-${song.trackId}`}
                  className="group/btn relative flex cursor-pointer items-center gap-1.5 rounded-full p-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-music-${song.trackId}`}
                    data-testid={`checkbox-music-${song.trackId}`}
                    checked={isFav}
                    onChange={() => toggleFavorite(song)}
                    className="sr-only"
                  />
                  <Heart
                    className={`h-5 w-5 transition-transform group-hover/btn:scale-110 ${
                      isFav
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  />
                  <span className="hidden md:inline text-xs font-normal">
                    {isFav ? 'Favorita' : 'Favoritar'}
                  </span>
                </label>
              </div>
            </section>
          );
        })
      )}
    </div>
  );
};

export default MusicCard;
