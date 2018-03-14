import {FETCH_ALL_WORDS, FETCH_BY_CRAWLER} from "./actionTypes";

export const receiveAllWords = words => {
  return {
      type: FETCH_ALL_WORDS,
      words
  };
};

export const receiveByCrawler = (crawler_id, words) => {
    return {
        type: FETCH_BY_CRAWLER,
        crawler_id,
        words
    };
};

export const fetchWords = () => {
  return dispatch => {
    const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API;

    return fetch(route)
        .then(res => res.json())
        .then(data => dispatch(
            receiveAllWords(data) )
        );
  };
};

export const fetchByCrawler = crawler_id => {
    return dispatch => {
        const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API + '/' + crawler_id +'/stopword';
        return fetch(route)
            .then(res => res.json())
            .then(data => dispatch(
                receiveByCrawler(crawler_id, data) )
            );
    };
};

export const sendWords = (words, crawler_id) => {
    return dispatch => {
        const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API;
        words = words.split(/[ ,.!?@";'*+#$%^&:№]+/);
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: words, crawler_id: crawler_id })
        })
            .then(res => dispatch(fetchWords()));
    }
};

export const deleteWords = (word_id) => {
    return dispatch => {

        const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API + '/' + word_id;
        return fetch(route,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({accept: [word_id] })
        })
            .then(data => dispatch(fetchWords()));
    }
};
export const deleteByCrawler = (crawler_id) => {
    return dispatch => {

        const route = process.env.REACT_APP_CRAWLER_PLATFORM_API + '/' + crawler_id +'/stopword';
        return fetch(route,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({accept: [crawler_id] })
        })
            .then(data => dispatch(fetchWords()));
    }
};
