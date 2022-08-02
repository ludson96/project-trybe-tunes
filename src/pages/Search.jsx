import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isDisabled: true,
  }

  inputChangeArtist = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <br />
        <div>
          <input
            type="text"
            name="artist"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.inputChangeArtist }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
