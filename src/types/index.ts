export interface User {
  name: string;
  email?: string;
  image?: string;
  description?: string;
}

export interface Album {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice?: number;
  artworkUrl100: string;
  releaseDate?: string;
  trackCount?: number;
}

export interface Song {
  trackId: number;
  trackName: string;
  previewUrl: string;
  artistName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  collectionViewUrl?: string;
  kind?: string;
  wrapperType?: string;
}

export interface ITunesSongRaw {
  wrapperType: string;
  kind?: string;
  artistId?: number;
  collectionId?: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  previewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionViewUrl?: string;
  releaseDate?: string;
  trackCount?: number;
}
