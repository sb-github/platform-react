import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools/DevTools';
import crawlersInfo from '../components/Crawler/crawlerReducer';
import treeInfo from '../components/WordTree/treeReducer';
import graphSkill from '../components/Graph/reducer';
import words from '../components/StopWord/StopWordReducer';
import {fetchCrawlers} from "../components/Crawler/crawlerActions";
import skills from '../components/Skill/skillReducer';
import materials from '../components/Material/materialReducer';
import dirs from '../components/Directions/reducer';
import {fetchMaterials} from "../components/Material/materialActions";
import {fetchSkills} from "../components/Skill/skillActions";
import {fetchGraph, receiveGraph} from "../components/Graph/actions";

export const reducer = combineReducers({
  crawlersInfo,
  graphSkill,
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

store.dispatch(fetchGraph({
  name:'PHP'
}));
store.dispatch(fetchCrawlers(0));
store.dispatch(fetchSkills());
store.dispatch(fetchMaterials());

export default store;