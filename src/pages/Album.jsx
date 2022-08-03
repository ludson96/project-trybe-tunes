import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
state = {
  content: '',
  loading: false,
}

async componentDidMount() {
  const { match: { params: { id } } } = this.props;
  const data = await getMusics(id);
  this.setState({
    content: data,
    loading: true,
  });
}

render() {
  const { content, loading } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <div data-testid="artist-name">
        {loading && content[0].artistName}
      </div>
      <div data-testid="album-name">
        {loading && (`${content[0].collectionName} ${content[0].artistName}`)}
      </div>
      {loading && <MusicCard content={ content } />}
    </div>
  );
}
}

export default Album;

Album.propTypes = {
  match: PropTypes.number.isRequired,
};
