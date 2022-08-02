import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    // isDisabled: true,
    artistInput: '',
    loading: true,
    artistSeach: '',
    artistView: '',
    retorno: '',
  }

  disabledButtonAndInputValue = ({ target }) => {
    const { value } = target;
    // if (value.length >= 2) {
    //   this.setState({ isDisabled: false });
    // } else {
    //   this.setState({ isDisabled: true });
    // }
    this.setState({ artistInput: value });
  }

  buttonSearch = async () => {
    this.setState({
      retorno: 'Carregando...',
    },
    async () => {
      const { artistInput } = this.state;
      const response = await searchAlbumsAPI(artistInput);
      this.setState({
        artistView: artistInput,
        artistInput: '',
        artistSeach: response,
        loading: false,
      });
    });
  }

  render() {
    const { loading, artistSeach, artistView, retorno, artistInput } = this.state;
    const teste = artistInput.length < 2;
    return (
      <div data-testid="page-search">
        <Header />
        <br />
        <div>
          <input
            type="text"
            name="artistInput"
            value={ artistInput }
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.disabledButtonAndInputValue }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ teste }
            onClick={ this.buttonSearch }
          >
            Pesquisar
          </button>
        </div>

        {
          loading
            ? retorno
            : (
              <div>
                {
                  artistSeach.length === 0 && <p>Nenhum álbum foi encontrado</p>
                }
                {artistSeach.length > 0 && (
                  <p>
                    {`Resultado de álbuns de: ${artistView}`}
                  </p>
                )}
                {artistSeach.length > 0
                && artistSeach.map((a) => (
                  <div key={ a.collectionId }>
                    <p>
                      {` Nome do Album: ${a.collectionName}`}
                    </p>
                    <Link
                      to={ `/album/${a.collectionId}` }
                      data-testid={ `link-to-album-${a.collectionId}` }
                    >
                      Álbum
                    </Link>
                    <img src={ a.artworkUrl100 } alt={ a.collectionName } />
                  </div>
                ))}
              </div>
            )
        }

      </div>
    );
  }
}

export default Search;
