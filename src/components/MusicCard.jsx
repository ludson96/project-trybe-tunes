import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      checado: [],
      musicasExibidas: [],
    };
  }

  async componentDidMount() {
    const { filtro, content } = this.props;
    if (filtro) {
      const data = await getFavoriteSongs();
      this.setState({ musicasExibidas: data });
    } else {
      this.setState({ musicasExibidas: content });
    }
    const data2 = await getFavoriteSongs();
    const getIds = data2.map((e) => e.trackId);
    this.setState({
      checado: getIds,
      loading: false,
    });
  }

  favoriteFunction = async (song) => {
    const { checado } = this.state;
    const { filtro } = this.props;
    this.setState({ loading: true });
    if (filtro) {
      await removeSong(song);
      const data3 = await getFavoriteSongs();
      this.setState({
        musicasExibidas: data3,
        loading: false,
      });
    } else {
      const filterChecado = checado.find((e) => song.trackId === e);
      if (filterChecado) {
        await removeSong(song);
      } else {
        await addSong(song);
      }
      const data5 = await getFavoriteSongs();
      const getIds = data5.map((e) => e.trackId);
      const { content } = this.props;
      this.setState({
        loading: false,
        checado: getIds,
        musicasExibidas: content,
      });
    }
  }

  render() {
    const { loading, checado, musicasExibidas } = this.state;
    console.log(musicasExibidas);
    return (
      <div>
        {loading
          ? <span>Carregando...</span> : (
            musicasExibidas.map((e) => (
              e.kind === 'song' && (
                <section key={ e.collectionViewUrl }>
                  <h5>{e.trackName}</h5>

                  <audio data-testid="audio-component" src={ e.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ `checkbox-music-${e.trackId}` }>
                    Favorita
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${e.trackId}` }
                      id={ `checkbox-music-${e.trackId}` }
                      checked={ checado.some((elemento) => e.trackId === elemento) }
                      onChange={ () => this.favoriteFunction(e) }
                    />
                  </label>
                </section>
              )
            )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  content: PropTypes.objectOf(objectOf()).isRequired,
  filtro: PropTypes.bool.isRequired,
};
