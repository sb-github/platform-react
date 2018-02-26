import {FETCH_ALL_WORDS} from "./actionTypes";

const stopwordsReducer = (state = {words:[],page:0}, action) => {
  const { type } = action;

  switch (type) {
      case FETCH_ALL_WORDS:
      return {
          page: action.page,
          words: action.words
      };
      
    default:
      return state;
  }
};

export default stopwordsReducer;