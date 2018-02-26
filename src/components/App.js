import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Root from "./Root";
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return(
      <Provider store = { store }>
        <Root/>
      </Provider>
    );
  };
}

export default App;