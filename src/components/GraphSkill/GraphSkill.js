import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillSearch from './components/Search/SkillSearch';
import Graph from './components/Graph/GraphSkill';
import { Dimmer, Button } from 'semantic-ui-react';

class GraphSkill extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    relations: PropTypes.array.isRequired,
    receiveGraph: PropTypes.func.isRequired,
    isBalanced: PropTypes.bool,
    fetchGraph: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      search: false
    };
  };

  showSearch = () => this.setState({ search: true });
  hideSearch = () => this.setState({ search: false });

  componentDidMount() {

  };

  componentDidUpdate(prevProps) {

  };

  render() {
    const { skills, relations, fetchGraph } = this.props;

    return (
      <div>
      <Button.Group>
        <Button icon='plus' onClick={this.showSearch} />
        <Button icon='minus' onClick={this.hideSearch} />
      </Button.Group>
      <Dimmer.Dimmable dimmed={this.state.search}>
        <Dimmer active={this.state.search} onClickOutside={this.hideSearch}>
          <SkillSearch />
        </Dimmer>
        <Graph
          skills={skills}
          relations={relations}
          fetchGraph={fetchGraph}
        />
      </Dimmer.Dimmable>
      </div>
    );
  }
}

export default GraphSkill;

