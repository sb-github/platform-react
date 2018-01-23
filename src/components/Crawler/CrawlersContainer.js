import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runCrawler } from "./crawlerActions";
import Crawler from "./index";

const mapStateToProps = state => {
  const { crawlers } = state;

  return {
    crawlers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crawler);