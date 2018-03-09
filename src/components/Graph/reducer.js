import {RECEIVE_GRAPH, SEARCH_GRAPH_SKILL} from "./actions";

const graphReducer = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_GRAPH:
      return {
        ...state,
        skills: action.skills,
        relations: action.relations
      };

    case SEARCH_GRAPH_SKILL:
      return {
        ...state,
        isSearch: action.isSearch
      };

    default:
      return state;
  }
};

export default graphReducer;