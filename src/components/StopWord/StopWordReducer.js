import {FETCH_ALL_WORDS, FETCH_BY_CRAWLER} from "./actionTypes";

const stopwordsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
      case FETCH_ALL_WORDS:
          return action.words;
      case FETCH_BY_CRAWLER:
          return action.words;
    default:
      return state;
  }
};

export default stopwordsReducer;