import {RECEIVE_GRAPH} from "./actionTypes";

const graphReducer = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_GRAPH:
      return {
        ...state,
        skills: action.skills,
        relations: action.relations
      };

    default:
      return state;
  }
};

export default graphReducer;