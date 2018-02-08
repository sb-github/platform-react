import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from '../components/DevTools/DevTools';
import AdminPanel from './AdminPanel/AdminPanel';
import store from '../store/index';
import 'antd/dist/antd.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'normalize.css/normalize.css';

class App extends Component {
  render() {
    const devTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : <span />;

    return(
      <Router>
        <Provider store = { store }>
          <div>
            {devTools}
            <AdminPanel/>
          </div>
        </Provider>
      </Router>
    );
  };
}

export default App;