import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrawlerRunner from "./components/CrawlerRunner";
import ListCrawlers from "./components/ListCrawlers";
import WordTree from "../WordTree/WordTree";

class Crawler extends Component {
  static propTypes = {
    crawlersInfo: PropTypes.object.isRequired,
    tree: PropTypes.array.isRequired,
    runCrawler: PropTypes.func.isRequired,
    fetchNewSkill: PropTypes.func.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired
  };

  render() {
    const {tree, crawlersInfo, runCrawler,
      fetchNewSkill, fetchResultCrawler, fetchCrawlers} = this.props;

    return (
      <div>
        <br />
        <CrawlerRunner runCrawler={runCrawler}/>
        <ListCrawlers
          crawlers={crawlersInfo.crawlers}
          page={crawlersInfo.page}
          fetchResultCrawler={fetchResultCrawler}
          fetchCrawlers={fetchCrawlers}
        />
        <WordTree nodes={tree} addNewSkill={fetchNewSkill}/>
      </div>
    );
  }
}

export default Crawler;

