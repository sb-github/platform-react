import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Page from "./AdminMenu/Page";


class App extends Component {
  render() {
    return(
      <Provider store = { store }>
        <Page/>
      </Provider>
    );
  };
}

export default App;