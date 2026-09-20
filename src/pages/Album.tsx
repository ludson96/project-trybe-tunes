import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Disc, Clock, Calendar, User } from 'lucide-react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { ITunesSongRaw, Song } from '../types';

export const Album: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ITunesSongRaw[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!id) return;
      setLoading(false);
      try {
        const data = await getMusics(id);
        setContent(data);
      } catch (err) {
        console.error('Erro ao buscar músicas do álbum', err);
      } finally {
        setLoading(true);
      }
    };

    fetchAlbumData();
  }, [id]);

  const albumInfo = content.length > 0 ? content[0] : null;
  const songs: Song[] = content.slice(1).map((item) => ({
    trackId: item.trackId,
    trackName: item.trackName,
    previewUrl: item.previewUrl,
    artistName: item.artistName,
    collectionName: item.collectionName,
    artworkUrl100: item.artworkUrl100,
    kind: item.kind,
  }));

  const coverUrl = albumInfo?.artworkUrl100
    ? albumInfo.artworkUrl100.replace('100x100bb', '600x600bb')
    : '';

  return (
    <div data-testid="page-album" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pt-8">
        {!loading || !albumInfo ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-green border-t-transparent" />
            <span className="mt-4 text-sm font-medium text-zinc-400">Carregando álbum...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Album Hero Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 p-6 md:p-8 border border-zinc-800 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                {/* Large Artwork */}
                <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-zinc-800 shadow-2xl ring-1 ring-white/10 md:h-56 md:w-56">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={albumInfo.collectionName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Disc className="h-16 w-16 text-zinc-600" />
                    </div>
                  )}
                </div>

                {/* Album Metadata */}
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Álbum
                  </span>

                  <h1
                    data-testid="album-name"
                    className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
                  >
                    {albumInfo.collectionName}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-zinc-300">
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <User className="h-4 w-4 text-brand-green" />
                      <span data-testid="artist-name">{albumInfo.artistName}</span>
                    </div>

                    {albumInfo.releaseDate && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(albumInfo.releaseDate).getFullYear()}</span>
                        </div>
                      </>
                    )}

                    <span className="text-zinc-600">•</span>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Clock className="h-4 w-4" />
                      <span>{songs.length} faixas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Songs Tracklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span>Faixas do Álbum</span>
                <span>Áudio & Favoritar</span>
              </div>

              <MusicCard content={songs} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Album;
