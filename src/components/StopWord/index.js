import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWords } from "./StopWordActions";
import { sendWords } from './StopWordActions';
import { deleteWords } from './StopWordActions';
import Words from "./StopWords";

const mapStateToProps= state =>{
    return {
        words: state.words
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWords: bindActionCreators(fetchWords, dispatch),
        sendWords: bindActionCreators(sendWords, dispatch),
        deleteWords: bindActionCreators(deleteWords, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Words);
