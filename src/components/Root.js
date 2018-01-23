import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlersContainer from './Crawler/CrawlersContainer';


class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlersContainer />
        </div>
    );
  };
}

export default Root;