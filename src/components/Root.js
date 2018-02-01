import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import CrawlerContainer from './Crawler/';
import StopWordContainer from './StopWord/';
import WordTreeContainer from "./WordTree/";
import SkillContainer from './Skill/';
import MaterialContainer from './Material/';
import DirectionsContainer from './Directions/';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Root extends Component {
  render() {
    return(
        <div>
          <DevTools />
          <CrawlerContainer />
          <Router>
            <Route path="/stopwords" component = { StopWordContainer } />
          </Router>
          <Router>
            <Route path="/crawlers" component = { CrawlerContainer } />
          </Router>
          <Router>
            <Route path="/skills" component = { SkillContainer } />
          </Router>
          <Router>
            <Route path="/materials" component = { MaterialContainer } />
          </Router>
		  <Router>
            <Route path="/directions" component = { DirectionsContainer } />
          </Router>
        </div>
    );
  };
}

export default Root;