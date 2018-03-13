import {RECEIVE_ALL_MATERIAL, DELETE_MATERIAL, ADD_MATERIAL, EDIT_MATERIAL} from "./actionTypes";

const materialReducer = (state = [], action) => {
    const { type } = action;

    switch (type) {
        case RECEIVE_ALL_MATERIAL:
            return action.materials;

        case ADD_MATERIAL:
            return ([
                ...state,
                action.material
            ]);

        case EDIT_MATERIAL:
            return state.map(material => material.id === action.material.id ? {
                ...action.material
            } : material);

        case DELETE_MATERIAL:
            return state.filter(material => material.id !== action.id);

        default:
            return state;
    }
};

export default materialReducer;