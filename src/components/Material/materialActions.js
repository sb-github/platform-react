import {ADD_MATERIAL, RECEIVE_ALL_MATERIAL} from "./actionTypes";
import {MATERIAL_API, PLATFORM_API} from "../../config/api.config";


export const receiveAllMaterial = materials => {
    return {
        type: RECEIVE_ALL_MATERIAL,
        materials
    };
};
export const addMaterial = (title, skill_id, text) => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API;
        console.log(JSON.stringify({title: title, skill_id: skill_id, text: text}));
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({title: title, skill_id: skill_id, text: text})
        }).then(res => res.json())
            .then(data => dispatch(fetchMaterials()));
    };
};

export const deleteMaterial = material_id => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API + "/" + material_id;
        return fetch(route, {
            method: 'delete'
        }).then(res => res.json())
            .then(data => dispatch(fetchMaterials()));
    }
};

export const editMaterial = (material) => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API + "/" + material.id;
        console.log(JSON.stringify({title: material.title, skill_id: material.skill_id, text: material.text}));
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({title: material.title, skill_id: material.skill_id, text: material.text})
        }).then(res => res.json())
            .then(data => dispatch(fetchMaterials()));
    };
};

export const fetchMaterials = () => {
    return dispatch => {
        const rote = process.env.REACT_APP_MATERIAL_API;

        return fetch(rote)
            .then(res => res.json())
            .then(data => dispatch( receiveAllMaterial(data) ));
    };
};
