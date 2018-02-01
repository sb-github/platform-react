import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import Words from './StopWord/';

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
		  <Words sendWords="" words="" fetchWords="" deleteWords=""/>
        </div>
    );
  };
}

export default Root;