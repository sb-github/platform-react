import {FETCH_ALL_WORDS} from "./actionTypes";

const stopwordsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
      case FETCH_ALL_WORDS:
      return {
          ...state,
          page: action.page,
          words: action.words
      };
      
    default:
      return state;
  }
};

export default stopwordsReducer;