import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import CrawlerContainer from "./Crawler";
import DirectionContainer from "./Directions";
import SKillContainer from "./Skill";
import StopWordContainer from "./StopWord";
import MaterialContainer from "./Materials";
import GraphContainer from "./Graph";
import AdminPanel from "./AdminPanel/AdminPanel";

class Root extends Component {
    render() {

        return(
            <div>
                <Switch>
                    <Route exact path="/" />
                    <AdminPanel>
                        <Route exact path="admin/" component={AdminPanel} />
                        <Route path="/admin/crawlers" component={CrawlerContainer} />
                        <Route path="/admin/skills" component = { SKillContainer } />
                        <Route path="/admin/directions" component = { DirectionContainer } />
                        <Route path="/admin/materials" component = { MaterialContainer } />
                        <Route path="/admin/stopwords" component = { StopWordContainer } />
                        <Route path="/admin/graph" component = { GraphContainer } />
                    </AdminPanel>
                </Switch>
            </div>
        );
    };
}

export default Root;
