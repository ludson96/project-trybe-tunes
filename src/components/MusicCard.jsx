import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checado: [],
      musicasExibidas: [],
    };
  }

  async componentDidMount() {
    const { filtroFavorito, content } = this.props;
    if (filtroFavorito) {
      const data = await getFavoriteSongs();
      this.setState({ musicasExibidas: data });
    } else {
      this.setState({ musicasExibidas: content });
    }
    const data2 = await getFavoriteSongs();
    const getIds = data2.map((e) => e.trackId);
    this.setState({
      checado: getIds,
    });
  }

  favoriteFunction = async (song) => {
    const { checado } = this.state;
    const { filtroFavorito } = this.props;
    this.setState({ loading: true });
    if (filtroFavorito) {
      await removeSong(song);
      const data1 = await getFavoriteSongs();
      this.setState({
        musicasExibidas: data1,
        loading: false,
      });
    } else {
      const filterChecado = checado.find((e) => song.trackId === e);
      if (filterChecado) {
        await removeSong(song);
        const data2 = await getFavoriteSongs();
        const getIds = data2.map((e) => e.trackId);
        this.setState({
          checado: getIds,
          musicasExibidas: data2,
        });
        this.setState({ loading: false });
      } else {
        await addSong(song);
        const data3 = await getFavoriteSongs();
        const getIds = data3.map((e) => e.trackId);
        this.setState({
          checado: getIds,
          musicasExibidas: data3,
        });
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { loading, checado, musicasExibidas } = this.state;
    return (
      <div>
        {loading
          ? <span>Carregando...</span> : (
            musicasExibidas.map((e) => (
              e.kind === 'song' && (
                <div key={ e.collectionViewUrl }>
                  <p>{e.trackName}</p>

                  <audio data-testid="audio-component" src={ e.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ `checkbox-music-${e.trackId}` }>
                    Favorita:
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${e.trackId}` }
                      name={ `checkbox-music-${e.trackId}` }
                      checked={ checado.some((elemento) => e.trackId === elemento) }
                      onClick={ () => this.favoriteFunction(e) }
                    />
                  </label>
                </div>
              )
            )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  content: PropTypes.objectOf(objectOf()).isRequired,
  filtroFavorito: PropTypes.bool.isRequired,
};
