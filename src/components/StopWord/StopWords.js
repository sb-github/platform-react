import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListWords from "./components/ListStopWord";
import WordsSender from './components/SendStopWord';

class Words extends Component {
    static propTypes = {
        sendWords: PropTypes.func.isRequired,
        stopwords: PropTypes.object.isRequired,
        fetchWords: PropTypes.func.isRequired,
        fetchByCrawler: PropTypes.func.isRequired,
        deleteWords: PropTypes.func.isRequired,
        deleteByCrawler: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchWords } = this.props;
        fetchWords(0);
    }

    render() {
        const {stopwords, fetchWords, fetchByCrawler, sendWords, deleteWords, deleteByCrawler} = this.props;
        return (
            <div>
                <h2>Stop words</h2>
                <WordsSender
                    sendWords={sendWords}
                />
                <ListWords
                    words={stopwords.words}
                    fetchWords={fetchWords}
                    fetchByCrawler={fetchByCrawler}
                    deleteWords={deleteWords}
                    deleteByCrawler={deleteByCrawler}
                />
            </div>
        );
    }
}

export default Words;