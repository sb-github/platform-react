import React, { Component } from 'react';
import Root from "./Root";
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';
import DevTools from '../components/DevTools/DevTools';
import AdminPanel from './AdminPanel/AdminPanel';
import store from "../store";

// const history = syncHistoryWithStore(BrowserRouter, store);

class App extends Component {
    render() {
        const devTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : <span />;

        return(
            <Provider store = { store }>
                <div>
                    {devTools}
                    <Root />
                </div>
            </Provider>
        );
    };
}

export default App;