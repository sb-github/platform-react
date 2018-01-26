import {RECEIVE_ALL_CRAWLERS, RECEIVE_NEW_CRAWLER, START_RUN_CRAWLER} from "./actionTypes";

const crawlersReducer = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ALL_CRAWLERS:
      return {
        page: action.page,
        crawlers: action.crawlers
      };

    case RECEIVE_NEW_CRAWLER:
      return Object.assign({ }, state, action.crawler);

    default:
      return state;
  }
};

export default crawlersReducer;