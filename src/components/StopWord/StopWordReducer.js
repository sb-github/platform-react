import {FETCH_ALL_WORDS, FETCH_BY_CRAWLER} from "./actionTypes";

const stopwordsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
      case FETCH_ALL_WORDS:
          return action.stopwords;
      case FETCH_BY_CRAWLER:
          return action.stopwords;

    default:
      return state;
  }
};

export default stopwordsReducer;