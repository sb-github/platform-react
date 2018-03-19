import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListCrawlers from "./components/ListCrawlers";
import WordTreeContainer from "../WordTree/";
import {  notification } from 'antd';

class Crawler extends Component {
  static propTypes = {
    crawlersInfo: PropTypes.object.isRequired,
    mergeGraph: PropTypes.func.isRequired,
    treeInfo: PropTypes.object.isRequired,
    skills: PropTypes.array,
    runCrawler: PropTypes.func.isRequired,
    fetchNewSkills: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired,
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
      fetchResultCrawler, fetchCrawlers, setCrawler,
      skills, mergeGraph, fetchSkills} = this.props;
    const crawlersProps = {
      crawlers: crawlersInfo.crawlers,
      skills: skills,
      mergeGraph: mergeGraph,
      fetchSkills: fetchSkills,
      page: crawlersInfo.page,
      fetchResultCrawler: fetchResultCrawler,
      fetchCrawlers: fetchCrawlers,
      setCrawler: setCrawler,
      runCrawler: runCrawler
    };

    return (
      <React.Fragment>
        <ListCrawlers {...crawlersProps} />
        <WordTreeContainer />
      </React.Fragment>
    );
  }
}

export default Crawler;

