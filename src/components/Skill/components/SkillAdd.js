import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, FormGroup, FormControl, Modal, Button, Well} from 'react-bootstrap';


class SkillAdd extends Component {
  static propTypes = {
      addSkill: PropTypes.PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      text: ''
    };
  };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClick = () => {
      const {addSkill} = this.props;
      addSkill(this.state.text);
      this.setState({ show: false, text: '' });
  };

  render() {

    return (
        <Well bsSize="small">
        <Button onClick={() => this.handleShow()} bsStyle="success">Add</Button>
        <Modal  show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add skill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormGroup>
            <p>Title</p>
                <FormControl
                      onChange={e => this.setState({text: e.target.value})}
                      value={this.state.text}
                      type='text' placeholder='Skill'                    
                />
                </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClick} bsStyle="success">Add</Button>
            <Button onClick={this.handleClose} bsStyle="info">Close</Button>
          </Modal.Footer>
          
        </Modal>
        </Well>
    );
  }
}

export default SkillAdd;

