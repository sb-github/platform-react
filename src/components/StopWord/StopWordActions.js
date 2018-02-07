import {FETCH_ALL_WORDS} from "./actionTypes";
import {EXTRACTOR_API, STOP_WORDS_API} from "../../config/api.config";

export const receiveAllWords = (page, words) => {
  return {
    type: FETCH_ALL_WORDS,
    page,
    words
  };
};

export const fetchWords = page => {
  return dispatch => {
    const route = process.env.REACT_APP_STOP_WORDS_API_TEST
        + '?page=' + page +'&size=' + 25;

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(page, data) ));
  };
};

export const sendWords = listwords => {
    return dispatch => {
        const route = process.env.REACT_APP_STOP_WORDS_API_TEST;
        listwords = listwords.split(/[ ,.!?@";'*+#$%^&:№]+/);
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: listwords })
        })
            .then(res => dispatch(fetchWords()));
    }
};

export const deleteWords = (page, word_id) => {
    return dispatch => {

        const route = process.env.REACT_APP_STOP_WORDS_API_TEST + '/' + word_id;
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
