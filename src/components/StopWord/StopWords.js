import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListWords from "./components/ListStopWord";
import WordsSender from './components/SendStopWord';

class Words extends Component {
  static propTypes = {
    sendWords: PropTypes.func.isRequired,
    stopwords: PropTypes.object.isRequired,
    fetchWords: PropTypes.func.isRequired,
    deleteWords: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchWords } = this.props;
     fetchWords(0);
  }

  render() {
    const {stopwords, fetchWords, sendWords, deleteWords} = this.props;
    return (
      <div>
        <h2>Stop words</h2>
        <WordsSender
            page = {stopwords.page}
            sendWords={sendWords}
        />
        <ListWords
          words={stopwords.words}
          page={stopwords.page}
          fetchWords={fetchWords}
          deleteWords={deleteWords}
        />
      </div>
    );
  }
}

export default Words;