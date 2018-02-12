import {RECEIVE_ALL_SKILLMATERIAL} from "./actionTypes";

const materialReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case RECEIVE_ALL_SKILLMATERIAL:
            return action.skill_materials;

        default:
            return state;
    }
};

export default materialReducer;