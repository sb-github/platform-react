import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from './components/DevTools/DevTools';
import crawlers from './components/Crawler/crawlersReducer';

export const reducer = combineReducers({
  crawlers
});

const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;