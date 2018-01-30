import {ADD_MATERIAL, RECEIVE_ALL_MATERIAL} from "./actionTypes";
import {MATERIALS_API, PLATFORM_API, ADD_MATERIAL_API, DELETE_MATERIAL} from "../../config/api.config";


export const receiveAllMaterial = materials => {
    return {
        type: RECEIVE_ALL_MATERIAL,
        materials
    };
};

export const addMaterial = material => {
    return dispatch => {
        const route = PLATFORM_API + ADD_MATERIAL_API;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({title: material})
        }).then(res => res.json())
            .then(data => dispatch(fetchSkills()));
    };
};

export const deleteMaterial = material_id => {
    return dispatch =>  {
        const route = PLATFORM_API + DELETE_MATERIAL + material_id;
        return fetch(route)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSkills(data));
            });
    };
};

export const fetchSkills = () => {
    return dispatch => {
        const rote = PLATFORM_API + MATERIALS_API;

        return fetch(rote)
            .then(res => res.json())
            .then(data => dispatch( receiveAllMaterial(data) ));
    };
};