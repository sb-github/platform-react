import {FETCH_ALL_DIR} from "./actionTypes";
import {PLATFORM_API, DIRECTIONS_API} from "../../config/api.config";

export const receiveAllDirs = dirs => {
  return {
    type: FETCH_ALL_DIR,
    dirs
  };
};

export const fetchDirs = () => {
  return dispatch => {
    const rote = PLATFORM_API + DIRECTIONS_API;
    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch( receiveAllDirs(data) ));
  };
};

export const sendDirs = direction => {
  return dispatch => {
    const  rote = PLATFORM_API + DIRECTIONS_API;
    console.log(direction);
    return fetch(rote, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({title: direction})
    })
        .then(res => res.json())
        .then(data => dispatch( fetchDirs() ));
  };
};

export const editDirs = direction => {
    return dispatch => {
        const  rote = PLATFORM_API + DIRECTIONS_API + direction.id;
        return fetch(rote, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({title: direction.title})
        })
            .then(res => res.json())
            .then(data => dispatch( fetchDirs() ));
    };
};

export const delDirs = direction => {
    return dispatch => {
        const  rote = PLATFORM_API + DIRECTIONS_API + direction;
        console.log(direction);
        return fetch(rote, {
            method: 'delete',
        })
            .then(res => res.json())
            .then(data => dispatch( fetchDirs() ));
    };
};


