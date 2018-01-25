import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runCrawler, fetchResultCrawler, fetchCrawlers } from "./crawlerActions";
import { fetchNewSkill } from "../WordTree/treeActions";
import Crawler from "./Crawler";

const mapStateToProps = state => {
  const { crawlersInfo, tree } = state;

  return {
    crawlersInfo,
    tree
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch),
    fetchNewSkill: bindActionCreators(fetchNewSkill, dispatch),
    fetchResultCrawler: bindActionCreators(fetchResultCrawler, dispatch),
    fetchCrawlers: bindActionCreators(fetchCrawlers, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crawler);