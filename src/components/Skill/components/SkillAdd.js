import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, FormGroup, FormControl } from 'react-bootstrap';

class SkillAdd extends Component {
  static propTypes = {
      addSkill: PropTypes.PropTypes.func.isRequired
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
        <Col xs={6}>
          <FormGroup>
            <InputGroup>
              <FormControl
                  onChange={e => this.setState({text: e.target.value})}
                  value={this.state.text}
                  type='text' placeholder='Skill'
              />
              <InputGroup.Addon>
                <a href='#' onClick={this.handleClick}>
                  <Glyphicon glyph="glyphicon glyphicon-plus"/>
                </a>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  handleClick = () => {
    const {addSkill} = this.props;
    addSkill(this.state.text);
    this.state.text ='';
  };
}

export default SkillAdd;

