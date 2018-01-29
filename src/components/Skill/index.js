import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchSkills, addSkill, deleteSkill} from "./skillActions";


import Skill from "./Skill";

const mapStateToProps = state => {
  const { skills } = state;

  return {
    skills
  };
};

const mapDispatchToProps = dispatch => {
    return {
        addSkill: bindActionCreators(addSkill, dispatch),
        deleteSkill: bindActionCreators(deleteSkill, dispatch),
    };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skill);