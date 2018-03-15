import { RECEIVE_ALL_SKILL, ADD_SKILL, EDIT_SKILL, DELETE_SKILL } from "./actionTypes";

export const receiveAllSkill = skills => {
    return {
        type: RECEIVE_ALL_SKILL,
        skills
    };
};

export const addSkill = skill => {
    return {
        type: ADD_SKILL,
        skill
    };
};

export const editedSkill = skill => {
    return {
        type: EDIT_SKILL,
        skill
    };
};

export const deletedSkill = id => {
    return {
        type: DELETE_SKILL,
        id
    };
};

export const fetchSkills = () => {
    return dispatch => {
        const route = process.env.REACT_APP_SKILLS_API;

        return fetch(route)
            .then(res => res.json())
            .then(data => dispatch( receiveAllSkill(data) ));
    };
};

export const sendAddedSkill = skill => {
    return dispatch => {
        const route =  process.env.REACT_APP_SKILL_API;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                title: skill.title,
                description: skill.description
            })
        })
            .then(res => res.json())
            .then(data => dispatch( addSkill(data.item) ));
    };
};

export const editSkill = skill => {
    return dispatch => {
        const route = process.env.REACT_APP_SKILLS_API + '/' + skill.id;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                title: skill.title,
                description: skill.description
            })
        })
            .then(res => res.json())
            .then(data => dispatch( editedSkill(data.item) ));
    };
};

export const deleteSkill = skill => {
    return dispatch => {
        const route = process.env.REACT_APP_SKILLS_API + '/' + skill;

        return fetch(route, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => dispatch( deletedSkill(skill) ));
    }
};




