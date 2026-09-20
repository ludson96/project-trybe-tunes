import itunesApi from './api';
import { ITunesSongRaw } from '../types';

interface GetMusicsResponse {
  resultCount: number;
  results: ITunesSongRaw[];
}

const getMusics = async (id: string | number): Promise<ITunesSongRaw[]> => {
  const { data } = await itunesApi.get<GetMusicsResponse>(`/lookup?id=${id}&entity=song`);
  return data.results;
};

export default getMusics;
