import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col,
    InputGroup, FormGroup, FormControl} from 'react-bootstrap';


class WordSender extends Component {
  static propTypes = {
    page: PropTypes.number,
    sendWords: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  };

  render() {

    const { page } = this.props;
    return (

      <Row>
        <Col xs={5}>
          <FormGroup>
            <InputGroup>
              <FormControl
                onChange={e => this.setState({text: e.target.value})}
                value={this.state.text}
                type='text' placeholder='Type your words'
              />
              <InputGroup.Addon>
                <a onClick={() => this.handleClick(page)}>
                  <Glyphicon glyph="glyphicon glyphicon-play"/>
                </a>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  handleClick = page => {
    const {sendWords} = this.props;

    sendWords(page, this.state.text);
  };
}

export default WordSender;