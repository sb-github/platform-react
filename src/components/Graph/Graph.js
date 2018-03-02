import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphSearch from './components/Search/GraphSearch';
import GraphSkill from './components/Graph/GraphSkill';
import { Dimmer, Button } from 'semantic-ui-react';

class Graph extends Component {
  static propTypes = {
    graphData: PropTypes.object.isRequired,
    isSearch: PropTypes.bool,
    fetchGraph: PropTypes.func.isRequired,
    searchGraph: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      search: false
    };
  };

  showSearch = () => this.props.searchGraph(true);
  hideSearch  = () => this.props.searchGraph(false);

  componentDidMount() {

  };

  componentDidUpdate(prevProps) {

  };

  render() {
    const {
      graphData, isSearch,
      fetchGraph, searchGraph,
      searchInGraph
    } = this.props;

    return (
      <div>
        <Button icon='search' onClick={this.showSearch} />
        <Dimmer.Dimmable dimmed={isSearch}>
          <Dimmer active={isSearch} onClickOutside={this.hideSearch}>
            <GraphSearch
              skills={this.props.skills}
              searchGraph={searchGraph}
              fetchGraph={fetchGraph}
            />
          </Dimmer>
          <GraphSkill
            graphData={graphData}
            fetchGraph={fetchGraph}
          />
        </Dimmer.Dimmable>
      </div>
    );
  }
}

export default Graph;

