import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    loading: true,
    nome: '',
  }

  componentDidMount() {
    this.handleCreateUser();
  }

  handleCreateUser = async () => {
    const data = await getUser();
    this.setState({
      loading: false,
      nome: data.name,
    });
  }

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <span>Carregando...</span>
            : (
              <div data-testid="header-user-name">
                { nome }
              </div>
            )
        }
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
