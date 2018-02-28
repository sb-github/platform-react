import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGraph, searchGraph } from "./actions";
import Graph from './Graph';

const mapStateToProps = state => {
  const { graphSkill } = state;

  return {
    graphData: {
      skills: graphSkill.skills,
      relations: graphSkill.relations
    },
    isSearch: graphSkill.isSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraph: bindActionCreators(fetchGraph, dispatch),
    searchGraph: bindActionCreators(searchGraph, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph);