import {RECEIVE_ALL_NODES, SET_TAG_NODES} from "./actionTypes";

export const receiveAllNodes = (nodes, page) => {
  return {
    type: RECEIVE_ALL_NODES,
    nodes,
    page
  };
};

export const setTagNodes = (nodes, tag) => {
  return {
    type: SET_TAG_NODES,
    nodes,
    tag
  };
};

export const fetchNewSkills = skills => {
  return dispatch => {
    const route = process.env.REACT_APP_SKILLS_API;

    return fetch(route, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({title: skills})
    }).then(res => res.json())
      .then(data => dispatch(setTagNodes(skills, 'skill')));
  };
};



