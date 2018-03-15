import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListWords from "./components/ListStopWord";

class Words extends Component {
    static propTypes = {
        words: PropTypes.array.isRequired,
        sendWords: PropTypes.func.isRequired,
        updateWord: PropTypes.func.isRequired,
        fetchWords: PropTypes.func.isRequired,
        fetchByCrawler: PropTypes.func.isRequired,
        deleteWords: PropTypes.func.isRequired,
        deleteByCrawler: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchWords, words } = this.props;
        if(!words.length)
            fetchWords();
    }

    render() {
        const { words, fetchWords, fetchByCrawler, sendWords, updateWord, deleteWords, deleteByCrawler} = this.props;
        return (
            <div>
                <h2>Stop words</h2>
                <ListWords
                    words={words}
                    fetchWords={fetchWords}
                    fetchByCrawler={fetchByCrawler}
                    sendWords={sendWords}
                    updateWord={updateWord}
                    deleteWords={deleteWords}
                    deleteByCrawler={deleteByCrawler}
                />
            </div>
        );
    }
}

export default Words;