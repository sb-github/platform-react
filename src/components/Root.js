import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
/*import CrawlerContainer from './Crawler/';
import WordTreeContainer from "./WordTree/";
import SKillContainer from './Skill/';
import MaterialContainer from './Material/';
import { BrowserRouter as Router, Route } from 'react-router-dom';*/
import MenuContainer from './AdminMenu/';

class Root extends Component {
  render() {
    return(
    	<div>
    	  <MenuContainer />
          <DevTools />
          /*<Router>
            <Route path="/crawlers" component = { CrawlerContainer } />
          </Router>
          <Router>
            <Route path="/skills" component = { SKillContainer } />
          </Router>
          <Router>
            <Route path="/materials" component = { MaterialContainer } />
          </Router>*/
        </div>
    );
  };
}

export default Root;