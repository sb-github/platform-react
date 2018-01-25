import { DELETE_NODE, RECEIVE_ALL_NODES} from "./actionTypes";

const treeReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_NODES:
      return action.words;

    case DELETE_NODE:
      return state.map(skill => {
        return {
          ...skill,
          connects: skill.connects.filter(item => item.subSkill !== action.word)
        }
      });

    default:
      return state;
  }
};

export default treeReducer;