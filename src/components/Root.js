import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import Words from './Words/';

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
		  <Words sendWords="" words="" fetchWords=""/>
        </div>
    );
  };
}

export default Root;