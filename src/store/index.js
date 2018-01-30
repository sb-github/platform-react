import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools/DevTools';
import crawlersInfo from '../components/Crawler/crawlerReducer';
import treeInfo from '../components/WordTree/treeReducer';
import {fetchCrawlers} from "../components/Crawler/crawlerActions";
import skills from '../components/Skill/skillReducer';
import {fetchSkills} from "../components/Skill/skillActions";

export const reducer = combineReducers({
  crawlersInfo,
  treeInfo,
  skills
});

const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(fetchCrawlers(1));
store.dispatch(fetchSkills());

export default store;