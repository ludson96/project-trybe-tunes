import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loading: false,
  }

  handleCreateUser = async (valor) => {
    this.setState({ loading: true });
    await createUser({ name: valor });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { inputChangeLogin, login } = this.props;
    const { loading } = this.state;

    // Condição para veririficar se o botão tem 3 ou mais caracteres
    let idDisabled = '';
    const n = 3;
    if (login.length >= n) {
      idDisabled = false;
    } else {
      idDisabled = true;
    }

    return (
      <div data-testid="page-login">
        {
          loading ? <span>Carregando...</span>
            : (
              <div>
                <label htmlFor="login">
                  Login:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    name="login"
                    onChange={ inputChangeLogin }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ idDisabled }
                  onClick={ () => this.handleCreateUser(login) }
                >
                  Entrar
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  inputChangeLogin: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
