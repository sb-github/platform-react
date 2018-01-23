import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrawlerRunner from "./components/CrawlerRunner";
import ListCrawlers from "./components/ListCrawlers";

class Crawler extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired,
    runCrawler: PropTypes.PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <br />
        <CrawlerRunner runCrawler={this.props.runCrawler}/>
        <ListCrawlers crawlers={this.props.crawlers}/>
      </div>
    );
  }
}

export default Crawler;

