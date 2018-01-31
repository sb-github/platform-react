import React, { Component } from 'react';
import DevTools from '../components/DevTools/DevTools';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminPanel from './AdminPanel/AdminPanel';

class Root extends Component {
  render() {
    return(
      <Router>
        <div>
          <DevTools />
          <AdminPanel/>
        </div>
      </Router>
    );
  };
}

export default Root;