import {RECEIVE_GRAPH} from "./actionTypes";

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    skills: graph.skills,
    relations: graph.relations
  };
};