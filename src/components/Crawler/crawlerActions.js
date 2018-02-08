import {
  RECEIVE_ALL_CRAWLERS, RECEIVE_NEW_CRAWLER, START_RUN_CRAWLER,
  END_RUN_CRAWLER, SET_CRAWLER
} from "./actionTypes";
import {receiveAllNodes} from "../WordTree/treeActions";

export const startRunCrawler = () => {
  return {
    type: START_RUN_CRAWLER
  };
};

export const endRunCrawler = result => {
  return {
    type: END_RUN_CRAWLER,
    ...result,

  };
};


export const receiveAllCrawlers = (page, crawlers) => {
  return {
    type: RECEIVE_ALL_CRAWLERS,
    crawlers,
    page
  }
};

export const receiveNewCrawler = crawler => {
  return {
    type: RECEIVE_NEW_CRAWLER,
    crawler
  };
};

export const fetchCrawlers = page => {
  return dispatch => {
    const route = process.env.REACT_APP_CRAWLER_INFO_API
      + '?page=' + page +'&size=' + 5;

    return fetch(route)
      .then(res => res.json())
      .then(data => dispatch( receiveAllCrawlers(page, data) ));
  };
};

export const setCrawler = crawler_id => {
  return {
    type: SET_CRAWLER,
    crawler_id
  };
};

export const runCrawler = word => {
  return dispatch => {
    const route = process.env.REACT_APP_RUN_CRAWLER_API
      + '?searchcondition=' + word;

    dispatch(startRunCrawler());

    return fetch(route)
      .then(res => {
        if(res.ok)
          return res;
        throw Error(res.statusText);
      })
      .then(data => {
        dispatch(endRunCrawler({
          status: 'success',
          message: word
        }));
        dispatch(fetchCrawlers(1));
      })
      .catch(err => dispatch(endRunCrawler({
        status: 'fail',
        message: err.message
      })));
  };
};

export const fetchResultCrawler = (crawler_id, page) => {
  return dispatch => {
    const rote = process.env.REACT_APP_CRAWLER_GRAPH_API
      + '?crawler_id=' + crawler_id + '&page=' + page;

    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch(receiveAllNodes(data, page)));
  };
};



