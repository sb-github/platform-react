import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminPanel from './AdminPanel/AdminPanel';
import 'antd/dist/antd.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'normalize.css/normalize.css';

class Root extends Component {
  render() {
    const devTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : <span />;

    return(
      <Router>
        <div>

          {devTools}
          <AdminPanel/>
        </div>
      </Router>
    );
  };
}

export default Root;
