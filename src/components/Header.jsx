import React, { Component } from 'react';
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
    const response = await getUser();
    console.log(response);
    this.setState({
      loading: false,
      nome: response.name,
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
      </header>
    );
  }
}
