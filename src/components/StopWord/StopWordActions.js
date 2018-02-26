import {FETCH_ALL_WORDS} from "./actionTypes";

export const receiveAllWords = (page, words) => {
  return {
    type: FETCH_ALL_WORDS,
    page,
    words
  };
};

export const fetchWords = page => {
  return dispatch => {
    const route = process.env.REACT_APP_STOP_WORDS_API
        + '?page=' + page +'&size=' + 60;
    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllWords(page, data) ));
  };
};

export const sendWords = (page, listwords) => {
    return dispatch => {
        const route = process.env.REACT_APP_STOP_WORDS_API;
        listwords = listwords.split(/[ ,.!?@";'*+#$%^&:№()<>{}]+/);
        console.log(JSON.stringify({ words: listwords }));
        return fetch(route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ words: listwords })
        })
            .then(res => dispatch(fetchWords(page)));
    }
};

export const deleteWords = (page, word_id) => {
    return dispatch => {

        const route = process.env.REACT_APP_STOP_WORDS_API + '/' + word_id;
        return fetch(route,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            /*body: JSON.stringify({accept: [word_id] })*/
        })
            .then(res => dispatch(fetchWords(page)));
    }
};
