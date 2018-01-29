import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrawlerRunner from "./components/CrawlerRunner";
import ListCrawlers from "./components/ListCrawlers";
import WordTree from "../WordTree/WordTree";
import {  notification } from 'antd';

class Crawler extends Component {
  static propTypes = {
    crawlersInfo: PropTypes.object.isRequired,
    tree: PropTypes.array.isRequired,
    runCrawler: PropTypes.func.isRequired,
    fetchNewSkill: PropTypes.func.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired
  };

  componentWillUpdate(nextProps) {
    if (nextProps.crawlersInfo.load !== this.props.crawlersInfo.load) {
      const {load} = nextProps.crawlersInfo;

      if (load.loading)
        if (load.status || false)
          notification[load.status || 'error']({
            message: "Run crawler by '" + load.message + "'",
            description: "Successfully run crawler by search word '" + load.message + "'",
          })
    }
  }

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

