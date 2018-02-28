export const RECEIVE_GRAPH = 'RECEIVE_GRAPH';
export const SEARCH_GRAPH_SKILL = 'SEARCH_GRAPH_SKILL';

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    skills: graph.nodes,
    relations: graph.edges
  };
};

export const searchGraph = isSearch => {
  return {
    type: SEARCH_GRAPH_SKILL,
    isSearch
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