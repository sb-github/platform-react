import {RECEIVE_ALL_SKILL, ADD_SKILL, DELETE_SKILL, EDIT_SKILL} from "./actionTypes";

const skillReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case RECEIVE_ALL_SKILL:
            return action.skills;

        case ADD_SKILL:
            return ([
                ...state,
                action.skill
            ]);

        case EDIT_SKILL:
            return state.map(skill => skill.id === action.skill.id ? {
                ...action.skill
            } : skill);

        case DELETE_SKILL:
            return state.filter(skill => skill.id !== action.id);

        default:
            return state;
    }
};

export default skillReducer;