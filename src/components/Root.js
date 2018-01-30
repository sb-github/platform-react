import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import WordTreeContainer from "./WordTree/";
import SKillContainer from './Skill/';
import MaterialContainer from './Material/';

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
          <WordTreeContainer />
          <SKillContainer />
          <MaterialContainer />
        </div>
    );
  };
}

export default Root;