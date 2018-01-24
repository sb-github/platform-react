import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlersContainer from './Crawler/CrawlersContainer';
import TreeExample from "./Words/components/WordTree";

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlersContainer />
          <TreeExample />
        </div>
    );
  };
}

export default Root;