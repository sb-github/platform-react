import {RECEIVE_ALL_MATERIAL, DELETE_MATERIAL} from "./actionTypes";

const materialReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case RECEIVE_ALL_MATERIAL:
            return action.materials;

        case  DELETE_MATERIAL:
            return action.materials;

        default:
            return state;
    }
};

export default materialReducer;