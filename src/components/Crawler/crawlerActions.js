import {RUN_CRAWLER, RECEIVE_ALL_CRAWLERS, RECEIVE_NEW_CRAWLER} from "./actionTypes";
import {CRAWLER_INFO_API, EXTRACTOR_API, GRAPH_SKILL_API, RUN_CRAWLER_API} from "../../config/api.config";
import {receiveAllNodes} from "../WordTree/treeActions";

/*export const mergeCrawler = idCrawler => {
  return {

  };
};

export const searchCrawler = word => {
  return {

  };
};*/

export const receiveAllCrawlers = crawlers => {
  return {
    type: RECEIVE_ALL_CRAWLERS,
    crawlers
  };
};

export const receiveNewCrawler = crawler => {
  return {
    type: RECEIVE_NEW_CRAWLER,
    crawler
  };
};

export const fetchCrawlers = () => {
  return dispatch => {
    const rote = EXTRACTOR_API + CRAWLER_INFO_API;

    return fetch(rote)
      .then(res => res.json())
      .then(data => dispatch( receiveAllCrawlers(data) ));
  };
};

export const runCrawler = word => {
  return dispatch => {
    const route = EXTRACTOR_API + RUN_CRAWLER_API + '?searchcondition=' + word;

    return fetch(route)
      .then(res => res.json())
      .then(data => console.log(data));
  };
};

export const fetchResultCrawler = crawler_id => {
  return dispatch => {
    const rote = EXTRACTOR_API + GRAPH_SKILL_API + '?crawler_id=' + crawler_id;

    return fetch(rote)
      .then(res => res.json())
      .then(data => {

        dispatch(receiveAllNodes(data));
      });
  };
};



