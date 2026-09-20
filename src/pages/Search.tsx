import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Disc, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Album } from '../types';

export const Search: React.FC = () => {
  const [artistInput, setArtistInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [artistSearch, setArtistSearch] = useState<Album[] | null>(null);
  const [artistView, setArtistView] = useState('');

  const isButtonDisabled = artistInput.trim().length < 2;

  const handleSearch = async () => {
    if (isButtonDisabled) return;
    const term = artistInput.trim();
    setLoading(true);
    setArtistView(term);
    setArtistInput('');

    try {
      const response = await searchAlbumsAPI(term);
      setArtistSearch(response);
    } catch {
      setArtistSearch([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="page-search" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pt-8">
        {/* Search Header Banner */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/40 via-zinc-900/60 to-zinc-900/20 p-8 border border-zinc-800/80 shadow-2xl backdrop-blur-sm">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Descubra Novos Sons
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Procure por qualquer artista ou banda para visualizar sua discografia completa através do iTunes.
            </p>

            {/* Search Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  name="artistInput"
                  value={artistInput}
                  placeholder="Qual artista você quer ouvir hoje?"
                  data-testid="search-artist-input"
                  onChange={({ target }) => setArtistInput(target.value)}
                  className="w-full rounded-2xl border border-zinc-750 bg-zinc-950/90 py-3.5 pl-12 pr-4 text-sm text-white placeholder-zinc-500 shadow-inner transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={isButtonDisabled}
                className={`flex items-center justify-center rounded-2xl px-7 py-3.5 text-sm font-bold transition-all shadow-md ${
                  isButtonDisabled
                    ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
                    : 'bg-brand-green text-black hover:bg-brand-hover hover:scale-105 active:scale-95 shadow-brand-green/20'
                }`}
              >
                Pesquisar
              </button>
            </form>
          </div>
        </div>

        {/* Content Section */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-green border-t-transparent" />
            <p className="mt-4 text-sm font-medium text-zinc-400">Carregando álbuns...</p>
          </div>
        )}

        {!loading && artistSearch !== null && (
          <div className="space-y-6">
            {artistSearch.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 p-12 text-center">
                <AlertCircle className="h-12 w-12 text-zinc-500" />
                <p className="mt-4 text-base font-semibold text-zinc-300">
                  Nenhum álbum foi encontrado
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Tente pesquisar por outro nome ou verifique a ortografia do artista.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {`Resultado de álbuns de: ${artistView}`}
                  </h2>
                  <span className="text-xs text-zinc-400">
                    {artistSearch.length} álbuns encontrados
                  </span>
                </div>

                {/* Responsive Album Cards Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {artistSearch.map((album) => {
                    // High-res cover trick for iTunes
                    const artworkHighRes = album.artworkUrl100
                      ? album.artworkUrl100.replace('100x100bb', '400x400bb')
                      : album.artworkUrl100;

                    return (
                      <Link
                        key={album.collectionId}
                        to={`/album/${album.collectionId}`}
                        data-testid={`link-to-album-${album.collectionId}`}
                        className="group relative flex flex-col rounded-2xl bg-zinc-900/60 p-3.5 border border-zinc-850/60 transition-all duration-300 hover:-translate-y-1.5 hover:bg-zinc-850 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60"
                      >
                        {/* Artwork */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-800 shadow-md">
                          <img
                            src={artworkHighRes}
                            alt={album.collectionName}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-2.5">
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-brand-green">
                              <Disc className="h-3.5 w-3.5" /> Ver Álbum
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="mt-3 flex flex-col">
                          <h3
                            title={album.collectionName}
                            className="truncate text-sm font-semibold text-zinc-100 group-hover:text-brand-green transition-colors"
                          >
                            {album.collectionName}
                          </h3>
                          <p title={album.artistName} className="truncate text-xs text-zinc-400 mt-0.5">
                            {album.artistName}
                          </p>
                          {album.trackCount && (
                            <span className="mt-2 text-[11px] text-zinc-500">
                              {album.trackCount} faixas
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
