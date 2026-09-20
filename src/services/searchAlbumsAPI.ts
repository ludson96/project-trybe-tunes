import itunesApi from './api';
import { Album } from '../types';

interface SearchAlbumsResponse {
  resultCount: number;
  results: {
    artistId: number;
    artistName: string;
    collectionId: number;
    collectionName: string;
    collectionPrice?: number;
    artworkUrl100: string;
    releaseDate?: string;
    trackCount?: number;
  }[];
}

const searchAlbumsAPI = async (artist: string): Promise<Album[]> => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');
  const endpoint = `/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const { data } = await itunesApi.get<SearchAlbumsResponse>(endpoint);

  const response: Album[] = data.results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
