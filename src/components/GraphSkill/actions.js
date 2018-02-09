import {RECEIVE_GRAPH} from "./actionTypes";

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    skills: graph.nodes,
    relations: graph.edges
  };
};

export const fetchGraph = skill => {
  return dispatch => {
    const route = process.env.REACT_APP_GRAPH_SKILL_API
      + '?skill=' + skill.name + '&skill_id=' + skill.id;

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch(receiveGraph(data)));
  };
};