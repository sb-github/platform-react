import {RECEIVE_ALL_SKILL, DELETE_SKILL} from "./actionTypes";

const skillReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_SKILL:
      return action.skills;

    default:
      return state;
  }
};

export default skillReducer;