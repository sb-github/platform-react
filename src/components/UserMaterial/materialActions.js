import {RECEIVE_ALL_SKILLMATERIAL} from "./actionTypes";


export const receiveAllSkillMaterial = skill_materials => {
    return {
        type: RECEIVE_ALL_SKILLMATERIAL,
        skill_materials
    };
};


export const skillMaterials = (id) => {

    return dispatch => {
        const rote = process.env.REACT_APP_SKILL_API + "/" + id + "/materials";

        return fetch(rote)
            .then(res => res.json())
            .then(data => dispatch( receiveAllSkillMaterial(data) ));
    };
};
