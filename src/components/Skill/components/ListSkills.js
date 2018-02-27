import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, FormGroup, FormControl, Modal, Well } from 'react-bootstrap';


class ListSkills extends Component {
  static propTypes = {
    skills: PropTypes.array,
    deleteSkill: PropTypes.func.isRequired,
    editSkill: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired
  };
    constructor(props, context) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            show_delete: false,
            skill:{
              id: null,
              title: null,
              image: null,
              description: null  
            } 
        };
    }
    handleClose = () => {
        this.setState({ show: false, skill:{
              id: null,
              title: null,
              image: null,
              description: null  
            } });
    };

    handleShow = skill => {
        this.setState({show: true, skill: skill});
    };

    handleCloseDelete = () => {
        this.setState({ show_delete: false});
    };

    handleShowDelete = skill => {
        this.setState({show_delete: true, skill: skill});
    };

    skillEdit = skill => {
        const {editSkill} = this.props;
        editSkill(skill);
        this.setState({ show: false });
    };

    deleteSkill = skill_id => {
        const {deleteSkill} = this.props;
        deleteSkill(skill_id);
        this.setState({show_delete: false });
    };

    render(){
    const { skills } = this.props;
    const skillsList = skills.map(skill => <tr>
      <td>{skill.id}</td>
      <td>{skill.title}</td>
      <td>{skill.created_at}</td>
      <td>{skill.updated_at}</td>
      <td><Button onClick={() => this.handleShow(skill)} bsStyle="warning">Edit</Button></td>
      <td><Button onClick={() => this.handleShowDelete(skill)} bsStyle="danger">Delete</Button></td>
    </tr>);

    return (
       <Well bsSize="large">
        <Row>
        <Col xs={8}>
        <Table condensed hover>
          <thead>
            <tr>
             <th>ID skill</th>
             <th>Name</th>
             <th>Created_at</th>
             <th>Updated_at</th>
            </tr>
          </thead>
          <tbody>
          { skillsList }
          </tbody>
        </Table>
        </Col>
       </Row>
            <Modal  show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Skill #{this.state.skill.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                  <p>Title</p>
                  <FormControl
                      type="text"
                      onChange={e => this.setState({skill:{
                            id: this.state.skill.id,
                            title: e.target.value
                      }})}
                      value={this.state.skill.title}
                  />
                  <p>Description</p>
                  <FormControl
                      type="text"
                      onChange={e => this.setState({skill:{
                          ...this.state.skill,
                          description: e.target.value
                      }})}
                      value={this.state.skill.description}
                  />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.skillEdit(this.state.skill)} bsStyle="success">Save</Button>
              <Button onClick={this.handleClose} bsStyle="info">Close</Button>
            </Modal.Footer>



            </Modal>
            <Modal  show={this.state.show_delete} onHide={this.handleCloseDelete}>
            <Modal.Header closeButton>
            <Modal.Title>Skill #{this.state.skill.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Are you sure to delete {this.state.skill.title}</h3>  
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.deleteSkill(this.state.skill.id)} bsStyle="danger">Yes</Button>
              <Button onClick={this.handleCloseDelete} bsStyle="info">No</Button>
            </Modal.Footer>
            </Modal>
        </Well>
    );
  }   
}

export default ListSkills;

