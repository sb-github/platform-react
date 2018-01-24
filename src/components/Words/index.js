import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Crawler extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired
  };

  render() {
    const { words } = this.props;

    const listWords = words.map(word => <li>
      {word}
    </li>);

    return (
      <div>
        <ul>
         {listWords}
        </ul>
      </div>
    );
  }
}

export default Crawler;

