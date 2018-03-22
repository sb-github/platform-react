import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, Grid, Header ,Icon } from 'semantic-ui-react';

class GraphSearch extends Component {
  static propTypes = {
    searchGraph: PropTypes.func.isRequired,
    fetchGraph: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.props.searchGraph(false);
    this.props.fetchGraph({
      name: result.title
    });
    this.resetComponent();
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(this.state.value, 'i');

      this.setState({
        isLoading: false,
        results: this.props.skills.filter(skill => re.test(skill.title))
      })
    }, 100)
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid columns='equal'>
        <Grid.Row stretched>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column width={4}>
            <div style={{
              height:'700px'
            }} >
              <Header as='h3' icon inverted>
                <Icon name='search' />Search skill
              </Header>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                {...this.props}
                fluid
              />
            </div>
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default GraphSearch;