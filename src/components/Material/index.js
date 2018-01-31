import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchMaterials, addMaterial, deleteMaterial} from "./materialActions";


import Material from "./Material";

const mapStateToProps = state => {
    const { materials } = state;

    return {
        materials
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addMaterial: bindActionCreators(addMaterial, dispatch),
        deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Material);