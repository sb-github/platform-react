import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWords } from "./actions";
import { sendWords } from './actions';
import Words from "./Words";

const mapStateToProps=(state)=>{
    return {
        words: state.words
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWords: bindActionCreators(fetchWords, dispatch),
        sendWords: bindActionCreators(sendWords, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Words);
