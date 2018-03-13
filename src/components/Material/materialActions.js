import { RECEIVE_ALL_MATERIAL, ADD_MATERIAL, EDIT_MATERIAL, DELETE_MATERIAL} from "./actionTypes";

export const receiveAllMaterials = materials => {
    return {
        type: RECEIVE_ALL_MATERIAL,
        materials
    }
};

export const addMaterial = material => {
    return {
        type: ADD_MATERIAL,
        material
    }
};

export const editedMaterial = material => {
    return {
        type: EDIT_MATERIAL,
        material
    }
};

export const deletedMaterial = id => {
    return {
        type: DELETE_MATERIAL,
        id
    }
};

export const fetchMaterials = () => {
    return dispatch => {
        const rote = process.env.REACT_APP_MATERIAL_API;

        return fetch(rote)
            .then(res => res.json())
            .then(data => dispatch( receiveAllMaterials(data) ));
    };
};

export const sendAddedMaterial = material => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API;
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                title: material.title,
                skill_id: material.skill_id,
                text: material.text
            })
        })
            .then(res => res.json())
            .then(data => dispatch( addMaterial(data.item) ));
    };
};

export const editMaterial = material => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API + "/" + material.id;
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                title: material.title,
                skill_id: material.skill_id,
                text: material.text
            })
        })
            .then(res => res.json())
            .then(data => dispatch( editedMaterial(data.item) ));
    };
};

export const deleteMaterial = material => {
    return dispatch => {
        const route = process.env.REACT_APP_MATERIAL_API + "/" + material;
        return fetch(route, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => dispatch( deletedMaterial(material) ));
    }
};




