import {RECEIVE_ALL_SKILL} from "./actionTypes";

export const receiveAllSkill = skills => {
  return {
      type: RECEIVE_ALL_SKILL,
      skills
    };
  };

export const addSkill = skill => {
    return dispatch => {
        const route =  process.env.REACT_APP_SKILL_API;

        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({title: skill.title,
                                  description: skill.description})
        }).then(res => res.json())
            .then(data => dispatch(fetchSkills()));
    };
};

export const deleteSkill = skill_id => {
    return dispatch => {
        const route = process.env.REACT_APP_SKILLS_API
          + '/' + skill_id;

        return fetch(route,{
            method: 'delete'
        }).then(res => res.json())
            .then(data => dispatch(fetchSkills()));
    }
};

export const fetchSkills = () => {
  return dispatch => {
    const route = process.env.REACT_APP_SKILLS_API;

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllSkill(data) ));
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
            body: JSON.stringify({title: skill.title,
                                  description: skill.description  
                                })
        }).then(res => res.json())
            .then(data => dispatch(fetchSkills()));
    };
};



