import {RECEIVE_ALL_WORDS} from "./actionTypes";
import {EXTRACTOR_API} from "../../api.config";

export const receiveAllWords = words => {
  return {
    type: RECEIVE_ALL_WORDS,
    words
  };
};

export const fetchWords = crawler_id => {
  return dispatch => {
    const rote = EXTRACTOR_API + 'crawler/';

    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(data) ));
  };
};



