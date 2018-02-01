import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, Modal, Button, Well} from 'react-bootstrap';


class SkillAdd extends Component {
  static propTypes = {
      addSkill: PropTypes.PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
        skill:{
            id: null,
            title: null,
            image: null,
            description: null
        }
      };
    };

    handleClose = () => {
        this.setState({ show: false, skill:{
            id: null,
            title: null,
            image: null,
            description: null
        } });
    };

    handleShow = () => {
        this.setState({show: true});
    };

    handleClick = skill => {
      const {addSkill} = this.props;
      addSkill(skill);
        this.setState({ show: false, skill:{
            id: null,
            title: null,
            image: null,
            description: null
        } });
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
                    onChange={e => this.setState({skill:{
                          ...this.state.skill,
                          title: e.target.value
                    }})}
                    value={this.state.skill.title}
                    type='text' placeholder='Title'
              />
            </FormGroup>
            <FormGroup>
              <p>Description</p>
              <FormControl
                  onChange={e => this.setState({skill:{
                      ...this.state.skill,
                      description: e.target.value
                  }})}
                  value={this.state.skill.description}
                  type='text' placeholder='Description'
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleClick(this.state.skill)} bsStyle="success">Add</Button>
            <Button onClick={this.handleClose} bsStyle="info">Close</Button>
          </Modal.Footer>
        </Modal>
      </Well>

    );
  }
}

export default SkillAdd;

