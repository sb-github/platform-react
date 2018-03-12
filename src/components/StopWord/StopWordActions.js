import {FETCH_ALL_WORDS, FETCH_BY_CRAWLER} from "./actionTypes";

export const receiveAllWords = (page, words) => {
  return {
    type: FETCH_ALL_WORDS,
    page,
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

export const fetchWords = page => {
  return dispatch => {
    const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API
        /*+ '?page=' + page +'&size=' + 60*/;
    return fetch(route)
        .then(res => res.json())
        .then(data => dispatch(
            receiveAllWords(page, data) )
        );
  };
};

export const fetchByCrawler = crawler_id => {
    return dispatch => {
        const route = process.env.REACT_APP_CRAWLER_PLATFORM_API + '/' + crawler_id +'/stopword';
        return fetch(route)
            .then(res => res.json())
            .then(data => dispatch(
                receiveByCrawler(crawler_id, data) )
            );
    };
};

export const sendWords = (page, listwords, crawler_id) => {
    return dispatch => {
        const route = process.env.REACT_APP_STOP_WORDS_PLATFORM_API;
        listwords = listwords.split(/[ ,.!?@";'*+#$%^&:№()<>{}]+/);
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: listwords, crawler_id: crawler_id })
        })
            .then(res => dispatch(fetchWords(page)));
    }
};

export const deleteWords = (page, word_id) => {
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
            .then(res => dispatch(fetchWords(page)));
    }
};

export const deleteByCrawler = (page, crawler_id) => {
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
            .then(res => dispatch(fetchWords(page)));
    }
};
