import React, { Component } from 'react';
import WordTree from './WordTree';
import {fetchNewSkills} from './treeActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => {
  const { words } = state;

  return {
    nodes: words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSkills: bindActionCreators(fetchNewSkills, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordTree);

