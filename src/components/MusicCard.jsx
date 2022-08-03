import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        {content.map((e) => (
          <p key={ e.collectionViewUrl }>{e.trackName}</p>
          
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  content: PropTypes.objectOf(objectOf()).isRequired,
};
