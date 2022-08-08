import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      mFavoritas: '',
      loading: false,
      filtroFavorito: true,
    };
  }

  componentDidMount() {
    this.favoritMusics();
  }

   favoritMusics = async () => {
     this.setState({ loading: true });
     const data = await getFavoriteSongs();
     this.setState({
       mFavoritas: data,
       loading: false,
     });
   }

   render() {
     const { mFavoritas, loading, filtroFavorito } = this.state;
     return (
       <div data-testid="page-favorites">
         <Header />
         {loading
           ? <span>Carregando...</span>
           : <MusicCard content={ mFavoritas } filtro={ filtroFavorito } />}
       </div>
     );
   }
}

export default Favorites;
