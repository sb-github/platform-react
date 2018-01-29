import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
        </div>
    );
  };
}

export default Root;