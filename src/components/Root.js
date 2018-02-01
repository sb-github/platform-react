import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import { BrowserRouter as Router } from 'react-router-dom'
import AdminPanel from './AdminPanel/AdminPanel';

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