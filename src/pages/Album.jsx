import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumData: [],
      showAlbumData: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumData = await musicsAPI(id);
    const tracks = albumData
      .filter((object) => Object.keys(object).includes('trackName'));
    this.setState({
      albumData,
      albumSongs: tracks,
    }, () => {
      this.setState({ showAlbumData: true });
    });
  }

  render() {
    const { albumData, showAlbumData, albumSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          showAlbumData && (
            <main>
              <h3 data-testid="artist-name">{albumData[0].artistName}</h3>
              <h4 data-testid="album-name">{albumData[0].collectionName}</h4>
              <MusicCard albumSongs={ albumSongs } />
            </main>
          )
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
