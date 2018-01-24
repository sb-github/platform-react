import {RECEIVE_ALL_WORDS, DELETE_WORD} from "../Words/actionTypes";
import {EXTRACTOR_API, GRAPH_SKILL_API, PLATFORM_API, SKILLS_API, STOP_WORDS_API} from "../../api.config";

export const receiveAllWords = words => {
  return {
    type: RECEIVE_ALL_WORDS,
    words
  };
};

export const deleteWord = word => {
  return {
    type: DELETE_WORD,
    word
  };
};

export const fetchWords = crawler_id => {
  console.log(crawler_id);
  return dispatch => {
    const rote = EXTRACTOR_API + GRAPH_SKILL_API + '?crawler_id=' + crawler_id;

    return fetch(rote)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const nodes = data.map(item => Object.assign({},{
          label: item.skill,
          childNodes: item.connects.map(i => Object.assign({},{label: i.subSkill}))
        }));
        dispatch(receiveAllWords(nodes) );
      });
  };
};

export const fetchNewSkill = skill => {
  return dispatch => {
    const route = PLATFORM_API + SKILLS_API;

    return fetch(route, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({title: skill})
    }).then(res => res.json())
      .then(data => dispatch(deleteWord(skill)));
  };
};



