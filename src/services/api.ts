import axios from 'axios';

export const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com',
  timeout: 10000,
});

export default itunesApi;
