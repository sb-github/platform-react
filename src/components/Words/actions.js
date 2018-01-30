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
    const rote = EXTRACTOR_API + STOP_WORDS_API;
    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(data) ));
  };
};

export const sendWords = listwords => {
  return dispatch => {
    const  rote = EXTRACTOR_API + STOP_WORDS_API;
    console.log(JSON.stringify({words: [listwords]}));
    return fetch(rote, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({words: [listwords]})
    })
        .then(res => res.json())
        .then(data => fetchWords());
  };
};


