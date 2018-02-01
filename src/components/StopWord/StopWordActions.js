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
    const route = EXTRACTOR_API + STOP_WORDS_API;
    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(data) ));
  };
};

export const sendWords = listwords => {
    return dispatch => {

        const route = EXTRACTOR_API + STOP_WORDS_API;
        listwords = listwords.split(/[ ,.!?@";'*+#$%^&:№]+/);
        console.log(JSON.stringify({ words: listwords }));
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ words: listwords })
        });
    };
};

export const deleteWords = word_id => {
    return dispatch => {

        console.log(JSON.stringify({accept: [word_id] }));
        const route = EXTRACTOR_API + STOP_WORDS_API + '/' + word_id + '';
        console.log('delete');
        return fetch(route,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({accept: [word_id] })
        })
    }
};