import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      artist: '',
    };
  }

  inputChangeLogin = ({ target }) => {
    this.setState({
      login: target.value,
    });
    console.log(this.state);
  }

  render() {
    const { login, artist } = this.state;
    return (
      <>
        <p>TrybeTunes</p>

        <Switch>
          <Route
            exact
            path="/search"
            component={ (props) => (<Search
              { ...props }
              artist={ artist }
              inputChange={ this.inputChange }
            />) }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              login={ login }
              inputChangeLogin={ this.inputChangeLogin }
            />) }
          />
          <Route component={ NotFound } />
        </Switch>
      </>

    );
  }
}

export default App;
