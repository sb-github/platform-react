import { RECEIVE_ALL_DIRECTIONS, ADD_DIRECTION, EDIT_DIRECTION, DELETE_DIRECTION } from "./actionTypes";

const dirsReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case RECEIVE_ALL_DIRECTIONS:
            return action.dirs;

        case ADD_DIRECTION:
            return ([
                ...state,
                action.dir
            ]);

        case EDIT_DIRECTION:
            return state.map(dir => dir.id === action.dir.id ? {
                ...action.dir
            } : dir);

        case DELETE_DIRECTION:
            return state.filter(dir => dir.id !== action.id);

        default:
            return state;
  }
};

export default dirsReducer;