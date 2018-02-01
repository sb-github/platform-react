import {FETCH_ALL_WORDS} from "./actionTypes";

const wordsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ALL_WORDS:
      return action.words;
      
    default:
      return state;
  }
};

export default wordsReducer;