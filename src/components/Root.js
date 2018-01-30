import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import WordTreeContainer from "./WordTree/";

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
          <WordTreeContainer />
        </div>
    );
  };
}

export default Root;