import React, { Component } from 'react';
import WordTree from './WordTree';

const mapStateToProps = state => {
  const { words } = state;

  return {
    nodes: words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSkill: bindActionCreators(fetchNewSkill, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordTree);

