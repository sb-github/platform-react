import {ADD_SKILL, RECEIVE_ALL_SKILL} from "./actionTypes";
import {SKILLS_API, PLATFORM_API, ADD_SKILL_API, DELETE_SKILL} from "../../config/api.config";


export const receiveAllSkill = skills => {
  return {
    type: RECEIVE_ALL_SKILL,
    skills
  };
};

export const addSkill = skill => {
    return dispatch => {
        const route = PLATFORM_API + ADD_SKILL_API;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({title: skill})
        }).then(res => res.json())
            .then(data => dispatch(fetchSkills()));
    };
};

export const deleteSkill = skill_id => {
    return dispatch =>  {
        const route = PLATFORM_API + DELETE_SKILL + '/' + skill_id;
        return fetch(route)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSkills(data));
            });
    }
};

export const fetchSkills = () => {
  return dispatch => {
    const rote = PLATFORM_API + SKILLS_API;

    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch(receiveAllSkill(data)));
  };
};




