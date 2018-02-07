import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools/DevTools';
import crawlersInfo from '../components/Crawler/crawlerReducer';
import treeInfo from '../components/WordTree/treeReducer';
import graphSkill from '../components/GraphSkill/reducer';
import words from '../components/StopWord/StopWordReducer';
import {fetchCrawlers} from "../components/Crawler/crawlerActions";
import skills from '../components/Skill/skillReducer';
import materials from '../components/Material/materialReducer';
import dirs from '../components/Directions/reducer';
import {fetchMaterials} from "../components/Material/materialActions";
import {fetchSkills} from "../components/Skill/skillActions";
import {receiveGraph} from "../components/GraphSkill/actions";

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

const dir = 'images/';

const skillsG = [
  {id: 1, value:16, image: dir + 'php.png', label: "PHP"},
  {id: 2, value:25, image: dir + 'js.png', label: "JS"},
  {id: 3, value:12, image: dir + 'html.png', label: "HTML"},
  {id: 4, value:10, label: "CSS"},
  {id: 5, value:15, image: dir + 'mysql.png', label: "MySQL"},
  {id: 6, value:5,  image: dir + 'apache.png', label: "Apache"}
  // {id: 8, value:23, image: dir + 'java.png', label:"Java"}
];

const relationsG = [
  {from: 1, to: 2, value: 30},
  {from: 1, to: 3, value: 5},
  {from: 1, to: 4, value: 12},
  {from: 1, to: 5, value: 20},
  {from: 1, to: 6, value: 3}
];

store.dispatch(receiveGraph({
  skills: skillsG,
  relations: relationsG
}));
store.dispatch(fetchCrawlers(0));
store.dispatch(fetchSkills());
store.dispatch(fetchMaterials());

export default store;