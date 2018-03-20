export const RECEIVE_GRAPH = 'RECEIVE_GRAPH';
export const SEARCH_GRAPH_SKILL = 'SEARCH_GRAPH_SKILL';
export const RECEIVE_SEARCH_GRAPH = 'RECEIVE_SEARCH_GRAPH';

export const receiveGraph = graph => {
  return {
    type: RECEIVE_GRAPH,
    skills: graph.nodes,
    relations: graph.edges
  };
};

export const receiveSearch = skills => {
  return {
    type: RECEIVE_SEARCH_GRAPH,
    skills
  };
};

export const searchGraph = isSearch => {
  return {
    type: SEARCH_GRAPH_SKILL,
    isSearch
  };
};

export const searchInGraph = async skill => {
  return dispatch => {
    const route = `${process.env.REACT_APP_GRAPH_SKILL_API}/search?skill='${skill}`;

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch(receiveSearch(data)));
  }
};
  
export const fetchGraph = params => {
  return dispatch => {
    const route = process.env.REACT_APP_GRAPH_SKILL_API
      + '?skill=' + params.name + '&skill_id=' + params.id
      + '&count=' + (params.count || 10) + '&page=' + (params.page || 1);

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch(receiveGraph(data)));
  };
};