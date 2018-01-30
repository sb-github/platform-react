import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools/DevTools';
import crawlersInfo from '../components/Crawler/crawlerReducer';
import treeInfo from '../components/WordTree/treeReducer';
import {fetchCrawlers} from "../components/Crawler/crawlerActions";

export const reducer = combineReducers({
  crawlersInfo,
  treeInfo
});

const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(fetchCrawlers(1));

export default store;