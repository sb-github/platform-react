import React, { Component } from 'react';
import { Search, Grid, Header, Segment,Icon } from 'semantic-ui-react';

const source = [
  {
    "title": "Christiansen, Auer and Toy",
    "description": "Advanced modular support",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg",
    "price": "$85.24"
  },
  {
    "title": "Carroll - Johnson",
    "description": "Configurable uniform matrix",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/sterlingrules/128.jpg",
    "price": "$71.22"
  },
  {
    "title": "Welch - Hamill",
    "description": "Switchable clear-thinking intranet",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg",
    "price": "$48.01"
  },
  {
    "title": "Schiller Inc",
    "description": "Innovative attitude-oriented info-mediaries",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/robbschiller/128.jpg",
    "price": "$51.20"
  },
  {
    "title": "McLaughlin and Sons",
    "description": "Realigned stable array",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/terrorpixel/128.jpg",
    "price": "$94.51"
  }
];


export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      //const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      //const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: [ {
          "title": "Christiansen, Auer and Toy",
          "description": "Advanced modular support",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ninjad3m0/128.jpg",
          "price": "$85.24"
        },
          {
            "title": "Carroll - Johnson",
            "description": "Configurable uniform matrix",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/sterlingrules/128.jpg",
            "price": "$71.22"
          }]
      })
    }, 500)
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