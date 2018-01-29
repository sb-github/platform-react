import {RECEIVE_ALL_NODES, DELETE_NODE} from "./actionTypes";
import { PLATFORM_API, SKILLS_API} from "../../config/api.config";

export const receiveAllNodes = words => {
  return {
    type: RECEIVE_ALL_NODES,
    words
  };
};

export const deleteNode = node => {
  return {
    type: DELETE_NODE,
    node
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
      .then(data => dispatch(deleteNode(skill)));
  };
};



