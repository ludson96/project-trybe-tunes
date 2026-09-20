import React, { useEffect } from 'react';
import { Heart, Music } from 'lucide-react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { useFavoritesStore } from '../store/useFavoritesStore';

export const Favorites: React.FC = () => {
  const { favorites, loading, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div data-testid="page-favorites" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pt-8">
        {/* Header Hero */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-rose-950/40 via-zinc-900/60 to-zinc-900/30 p-8 border border-zinc-850 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-500/20">
              <Heart className="h-8 w-8 fill-current" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Playlist Pessoal
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Músicas Favoritas
              </h1>
              <p className="mt-1 text-xs text-zinc-400">
                Todas as faixas que você marcou com um coração ficam salvas aqui para você ouvir.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 px-4 py-2 border border-zinc-800 text-xs font-semibold text-zinc-300 w-fit">
            {favorites.length} {favorites.length === 1 ? 'música' : 'músicas'}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-rose-500 border-t-transparent" />
            <span className="mt-4 text-sm font-medium text-zinc-400">Carregando favoritas...</span>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800/80 p-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
              <Music className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-200">
              Nenhuma música favoritada ainda
            </h3>
            <p className="mt-1 max-w-sm text-xs text-zinc-500">
              Explore os álbuns dos seus artistas favoritos e clique no ícone de coração para montar sua coleção.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span>Faixas Favoritadas</span>
              <span>Remover / Áudio</span>
            </div>

            <MusicCard content={favorites} filtro={true} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
