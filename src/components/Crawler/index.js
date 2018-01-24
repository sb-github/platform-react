import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runCrawler, fetchResultCrawler } from "./crawlerActions";
import { fetchNewSkill } from "../WordTree/treeActions";
import Crawler from "./Crawler";

const mapStateToProps = state => {
  const { crawlers, tree } = state;

  return {
    crawlers,
    tree
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch),
    fetchNewSkill: bindActionCreators(fetchNewSkill, dispatch),
    fetchResultCrawler: bindActionCreators(fetchResultCrawler, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crawler);