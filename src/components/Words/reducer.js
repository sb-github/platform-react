import {RECEIVE_ALL_WORDS, FETCH_ALL_WORDS, DELETE_WORD} from "./actionTypes";

const wordsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_WORDS:
      return action.words;

    case DELETE_WORD:
      return state.filter(word => word !== action.word);
    default:
      return state;
  }
};

export default wordsReducer;