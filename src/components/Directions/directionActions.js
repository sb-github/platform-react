import { RECEIVE_ALL_DIRECTIONS, ADD_DIRECTION, EDIT_DIRECTION, DELETE_DIRECTION } from "./actionTypes";

export const receiveAllDirections = dirs => {
    return {
        type: RECEIVE_ALL_DIRECTIONS,
        dirs
    };
};

export const addDirection = dir => {
    return {
        type: ADD_DIRECTION,
        dir
    };
};

export const editedDirection = dir => {
    return {
        type: EDIT_DIRECTION,
        dir
    };
};

export const deletedDirection = id => {
    return {
        type: DELETE_DIRECTION,
        id
    };
};

export const fetchDirections = () => {
    return dispatch => {
        const route = process.env.REACT_APP_DIRECTION_API + '?relationships=true';

        return fetch(route)
            .then(res => res.json())
            .then(data => dispatch( receiveAllDirections(data) ));
    };
};

export const sendAddedDirection = direction => {
    return dispatch => {
        const  route = process.env.REACT_APP_DIRECTION_API;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                title: direction.title,
                parent: direction.parent || undefined
            })
        })
            .then(res => res.json())
            .then(data => dispatch( addDirection(data.item) ));
    };
};

export const editDirection = direction => {
    return dispatch => {
        const  route = process.env.REACT_APP_DIRECTION_API + '/' + direction.id;

        console.log(direction);
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                title: direction.title,
                parent: direction.parent || undefined,
                main_skill_id: direction.main_skill_id || undefined
            })
        })
            .then(res => res.json())
            .then(data => dispatch( editedDirection(data.item) ));
    };
};

export const deleteDirection = direction => {
    return dispatch => {
        const  route = process.env.REACT_APP_DIRECTION_API + '/' + direction;
        return fetch(route, {
            method: 'delete',
        })
            .then(res => res.json())
            .then(data => dispatch( deletedDirection(direction) ));
    };
};


