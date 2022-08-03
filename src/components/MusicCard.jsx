import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { content } = this.props;
    console.log(content);
    return (
      <div>
        {content.map((e) => (
          e.kind === 'song' && (

            <div key={ e.collectionViewUrl }>
              <p>{e.trackName}</p>

              <audio data-testid="audio-component" src={ e.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          )

        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  content: PropTypes.objectOf(objectOf()).isRequired,
};
