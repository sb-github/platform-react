import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import WordTreeContainer from "./WordTree/";

import SKillContainer from './Skill/';


class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
          <WordTreeContainer />
          <SKillContainer />
        </div>
    );
  };
}

export default Root;