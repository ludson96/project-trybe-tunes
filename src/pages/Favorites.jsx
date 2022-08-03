import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      musicasFavoritas: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.favoritMusics();
  }

   favoritMusics = async () => {
     this.setState({ loading: true });
     const data = await getFavoriteSongs();
     this.setState({
       musicasFavoritas: data,
       loading: false,
     });
   }

   render() {
     const { musicasFavoritas, loading } = this.state;
     return (
       <div data-testid="page-favorites">
         <Header />
         {loading
           ? <span>Carregando...</span> : (
             <div>
               <MusicCard content={ musicasFavoritas } />
               {/* {this.teste()} */}
             </div>
           )}
       </div>
     );
   }
}

export default Favorites;
