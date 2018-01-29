import {RECEIVE_ALL_CRAWLERS, RECEIVE_NEW_CRAWLER, END_RUN_CRAWLER, START_RUN_CRAWLER} from "./actionTypes";

const crawlersReducer = (state = {load:{loading:false}}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_CRAWLERS:
      return {
        ...state,
        page: action.page,
        crawlers: action.crawlers
      };

    case RECEIVE_NEW_CRAWLER:
      return Object.assign({ }, state, action.crawler);

    case START_RUN_CRAWLER:
      return {
        ...state,
        load: {
          ...state.load,
          loading: true
        }
      };

    case END_RUN_CRAWLER:
      return {
        ...state,
        load: {
          loading: false,
          status: action.status,
          message: action.message
        }
      };

    default:
      return state;
  }
};

export default crawlersReducer;