import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListCrawlers from "./components/ListCrawlers";
import WordTreeContainer from "../WordTree/";
import {  notification } from 'antd';

class Crawler extends Component {
  static propTypes = {
    crawlersInfo: PropTypes.object.isRequired,
    treeInfo: PropTypes.object.isRequired,
    runCrawler: PropTypes.func.isRequired,
    fetchNewSkills: PropTypes.func.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired,
    setCrawler: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.crawlersInfo.crawlers)
      this.props.fetchCrawlers(0);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.crawlersInfo.load.loading !== this.props.crawlersInfo.load.loading) {
      const {load} = nextProps.crawlersInfo;

      const mess = load.status === 'success'
        ? "Run crawler by word '" + load.message + "'"
        : "Fail run crawler";

      const desc = load.status === 'success'
        ? "Successfully run new crawler by search word '" + load.message + "'"
        : "Oops! An error occurred: " + load.message;

      const type = load.status !== 'success' ? 'error' : 'success';

      if (!load.loading)
          notification[type]({
            message: mess,
            description: desc,
          })
    }
  }

  render() {
    const {crawlersInfo, runCrawler,
      fetchResultCrawler, fetchCrawlers, setCrawler} = this.props;

    return (
      <div>
        <ListCrawlers
          crawlers={crawlersInfo.crawlers}
          page={crawlersInfo.page}
          fetchResultCrawler={fetchResultCrawler}
          fetchCrawlers={fetchCrawlers}
          setCrawler={setCrawler}
          runCrawler={runCrawler}
        />
        <WordTreeContainer />
      </div>
    );
  }
}

export default Crawler;

