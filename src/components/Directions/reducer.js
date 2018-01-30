import {FETCH_ALL_DIR} from "./actionTypes";

const dirsReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ALL_DIR:
      return action.dirs;
      
    default:
      return state;
  }
};

export default dirsReducer;