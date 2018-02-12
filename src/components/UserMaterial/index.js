import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {skillMaterials} from "./materialActions";


import Material from "./Material";

const mapStateToProps = state => {
    const { skill_materials } = state;
    return {
        skill_materials
    };
};

const mapDispatchToProps = dispatch => {

    return {
        skillMaterials:bindActionCreators(skillMaterials,dispatch)
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Material);