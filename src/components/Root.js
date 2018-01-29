import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import SKillContainer from './Skill/';

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
          <SKillContainer />
        </div>
    );
  };
}

export default Root;