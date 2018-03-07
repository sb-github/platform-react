import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDirs, sendDirs, deleteDirs, editDirs } from "./actions";
import Directions from "./Directions";

const mapStateToProps=(state)=>{
    return {
        dirs: state.dirs
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirs: bindActionCreators(fetchDirs, dispatch),
        deleteDirs: bindActionCreators(deleteDirs, dispatch),
        sendDirs: bindActionCreators(sendDirs, dispatch),
        editDirs: bindActionCreators(editDirs, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Directions);
