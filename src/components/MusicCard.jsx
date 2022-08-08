import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: [],
      loading: true,
      songsTorender: [],
    };
  }

  async componentDidMount() {
    const { albumSongs, isFavoritePage } = this.props;
    if (isFavoritePage) {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        songsTorender: favoriteSongs,
      });
    } else {
      this.setState({
        songsTorender: albumSongs,
      });
    }
    const idsFromAPI = await this.getTrackIds();
    this.setState({
      isChecked: idsFromAPI,
      loading: false,
    });
  }

  getTrackIds = async () => {
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsIds = favoriteSongs.map((song) => song.trackId);
    return favoriteSongsIds;
  }

  handleCheckbox = async (track) => {
    const { isFavoritePage } = this.props;
    const { isChecked } = this.state;
    this.setState({ loading: true });
    if (isFavoritePage) {
      await removeSong(track);
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        songsTorender: favoriteSongs,
        loading: false,
      });
    } else {
      const alreadyFav = isChecked.find((fav) => track.trackId === fav);
      if (alreadyFav) {
        await removeSong(track);
      } else {
        await addSong(track);
      }
      const ids = await this.getTrackIds();
      const { albumSongs } = this.props;
      this.setState({
        isChecked: ids,
        loading: false,
        songsTorender: albumSongs,
      });
    }
  }

  render() {
    const { loading, isChecked, songsTorender } = this.state;
    return (
      <div>
        {loading
          ? <Loading /> : (
            songsTorender.map((track) => (
              <section key={ track.trackName }>
                <h5>{track.trackName}</h5>
                <audio data-testid="audio-component" src={ track.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ `checkbox-music-${track.trackId}` }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${track.trackId}` }
                    id={ `checkbox-music-${track.trackId}` }
                    checked={ isChecked.some((id) => track.trackId === id) }
                    onChange={ () => this.handleCheckbox(track) }
                  />
                </label>
              </section>
            )))}
      </div>

    );
  }
}

MusicCard.propTypes = {
  albumSongs: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  })).isRequired,
  isFavoritePage: PropTypes.bool,
};

MusicCard.defaultProps = {
  isFavoritePage: false,
};

export default MusicCard;
