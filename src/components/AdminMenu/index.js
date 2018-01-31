import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from "./components/Menu";

const mapStateToProps = state => {
  const { menu } = state;

  return {
    menu
  };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);