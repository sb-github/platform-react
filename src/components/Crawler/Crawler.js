import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrawlerRunner from "./components/CrawlerRunner";
import ListCrawlers from "./components/ListCrawlers";
import WordTree from "../WordTree/WordTree";

class Crawler extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired,
    tree: PropTypes.array.isRequired,
    runCrawler: PropTypes.func.isRequired,
    fetchNewSkill: PropTypes.func.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired
  };

  render() {
    const {tree, crawlers, runCrawler,
      fetchNewSkill, fetchResultCrawler} = this.props;

    return (
      <div>
        <br />
        <CrawlerRunner runCrawler={runCrawler}/>
        <ListCrawlers
          crawlers={crawlers}
          fetchResultCrawler={fetchResultCrawler}
        />
        <WordTree nodes={tree} addNewSkill={fetchNewSkill}/>
      </div>
    );
  }
}

export default Crawler;

