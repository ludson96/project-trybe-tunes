import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checado: [],
    };
  }

  async componentDidMount() {
    const data = await getFavoriteSongs();
    const getIds = data.map((e) => e.trackId);
    this.setState({
      checado: getIds,
    });
  }

  favoriteFunction = async (song) => {
    this.setState((prevState) => ({
      checado: [...prevState.checado, song.trackID],
      loading: true,
    }));
    await addSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { content } = this.props;
    const { loading, checado } = this.state;
    return (
      <div>
        {loading
          ? <span>Carregando...</span> : (
            content.map((e) => (
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
};
