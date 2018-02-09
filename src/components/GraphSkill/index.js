import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGraph } from "./actions";
import GraphSkill from './GraphSkill';

const mapStateToProps = state => {
  const { graphSkill } = state;

  return {
    skills: graphSkill.skills,
    relations: graphSkill.relations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraph: bindActionCreators(fetchGraph, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphSkill);