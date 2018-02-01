import { SET_TAG_NODES, RECEIVE_ALL_NODES} from "./actionTypes";
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
        nodes: action.nodes,
        page: action.page
      };

    case SET_CRAWLER:
      return {
        ...state,
        crawler_id: action.crawler_id,
        nodes: []
      };

    case SET_TAG_NODES:
      return {
        ...state,
        nodes: state.nodes.map(skill => {
          return {
            ...skill,
            tag: action.nodes.includes(skill.skill)
              ? action.tag
              : skill.tag,
            connects: skill.connects.map(item =>
              action.nodes.includes(item.subSkill)
                ? {...item, tag: action.tag}
                : item
            )
          };
        })
      };

    default:
      return state;
  }
};

export default treeReducer;