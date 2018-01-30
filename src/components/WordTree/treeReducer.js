import { DELETE_NODES, RECEIVE_ALL_NODES} from "./actionTypes";
import {SET_CRAWLER} from "../Crawler/actionTypes";

const initialState = {
  page:1,
  crawler_id: null,
  loading: false,
  nodes: []
};

const treeReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_NODES:
      return {
        ...state,
        nodes: [
          ...state.nodes,
          ...action.nodes
        ],
        page: action.page
      };

    case SET_CRAWLER:
      return {
        ...state,
        crawler_id: action.crawler_id,
        nodes: []
      };

    case DELETE_NODES:
      return {
        ...state,
        nodes: state.nodes.map(skill => {
          return {
            ...skill,
            connects: skill.connects.filter(item => !action.nodes.includes(item.subSkill))
          }
         })
      };

    default:
      return state;
  }
};

export default treeReducer;