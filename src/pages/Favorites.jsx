import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
      isFavoritePage: true,
    };
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { loading, favoriteSongs, isFavoritePage } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : <MusicCard albumSongs={ favoriteSongs } isFavoritePage={ isFavoritePage } />}
      </div>
    );
  }
}

export default Favorites;
