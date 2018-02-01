import {FETCH_ALL_WORDS} from "./actionTypes";
import {EXTRACTOR_API, STOP_WORDS_API} from "../../config/api.config";

export const receiveAllWords = words => {
  return {
    type: FETCH_ALL_WORDS,
    words
  };
};

export const fetchWords = () => {
  return dispatch => {
    const route = process.env.REACT_APP_STOP_WORDS_API;
    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(data) ));
  };
};

export const sendWords = listwords => {
    return dispatch => {

        const route = process.env.REACT_APP_STOP_WORDS_API;
        listwords = listwords.split(/[ ,.!?@";'*+#$%^&:№]+/);
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ words: listwords })
        })
            .then(res => dispatch(fetchWords()));
    }
};

export const deleteWords = word_id => {
    return dispatch => {

        const route = process.env.REACT_APP_STOP_WORDS_API + '/' + word_id;
        return fetch(route,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({accept: [word_id] })
        });
    }
    fetchWords();
};
