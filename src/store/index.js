import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools/DevTools';
import crawlersInfo from '../components/Crawler/crawlerReducer';
import treeInfo from '../components/WordTree/treeReducer';
import words from '../components/StopWord/StopWordReducer';
import {fetchCrawlers} from "../components/Crawler/crawlerActions";
import skills from '../components/Skill/skillReducer';
import materials from '../components/Material/materialReducer';
import dirs from '../components/Directions/reducer';
import {fetchMaterials} from "../components/Material/materialActions";
import {fetchSkills} from "../components/Skill/skillActions";
import {fetchDirs} from "../components/Directions/actions";

export const reducer = combineReducers({
  crawlersInfo,
  treeInfo,
  words,
  skills,
  materials,
  dirs
});

const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(
    thunkMiddleware
  )
);


store.dispatch(fetchCrawlers(0));
store.dispatch(fetchSkills());
//store.dispatch(fetchDirs());

export default store;