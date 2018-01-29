import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputGroup, FormGroup, FormControl } from 'react-bootstrap';

class CrawlerRunner extends Component {
  static propTypes = {
    runCrawler: PropTypes.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  };

  render() {

    return (

      <Row>
        <Col xs={2}>
          <FormGroup>
            <InputGroup>
              <FormControl
                onChange={e => this.setState({text: e.target.value})}
                value={this.state.text}
                type='text' placeholder='Search'
              />
              <InputGroup.Addon>
                <a onClick={this.handleClick} bsStyle="success">
                  Run
                </a>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  handleClick = () => {
    const {runCrawler} = this.props;

    runCrawler(this.state.text);
  };
}

export default CrawlerRunner;

