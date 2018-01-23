import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Crawler extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired,
    //runCrawler: PropTypes.PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <h1>Crawlers here</h1>
      </div>
    );
  }
}

export default Crawler;

