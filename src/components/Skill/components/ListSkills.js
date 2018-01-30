import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button,  Glyphicon, InputGroup, FormGroup, FormControl, Modal  } from 'react-bootstrap';
import store from "../../../store/index";


class ListSkills extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    addSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
    editSkill: PropTypes.func.isRequired,
  };
    constructor(props, context) {
        super(props, context);

        //this.handleSelect = this.handleSelect.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            id: '',
            title: ''
        };
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow = (skill_id,skill_title) => {
        this.setState({show: true});
        this.setState({id: skill_id});
        this.setState({title: skill_title});
    }

    render() {
    const { skills } = this.props;
    const skillsList = skills.map(skill => <tr>
      <td>{skill.id}</td>
      <td>{skill.title}</td>
      <td>{skill.created_at}</td>
      <td>{skill.updated_at}</td>
      <td><Button onClick={() => this.handleShow(skill.id, skill.title)} bsStyle="warning">
        Edit
      </Button></td>
      <td><Button onClick={() => this.deleteSkill(skill.id)} bsStyle="danger">
        Delete
      </Button></td>
    </tr>);

    return (
        <div>
      <Row>
        <Col xs={8}>
       <Table responsive>
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
              <Modal.Title>Skill #{this.state.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Title</p>
              <input
                  type="text" value={this.state.title}
                  onChange={e => this.setState({title:e.target.value})}
                  className="form-control"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.skillEdit(this.state.id,this.state.title)} bsStyle="success">Save</Button>
              <Button onClick={this.handleClose} bsStyle="info">Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }

    skillEdit = (skill_id,skill_title) => {
        const {editSkill} = this.props;
        editSkill(skill_id,skill_title);
        this.setState({ show: false });
    };

    deleteSkill = skill_id => {
      //console.log(skill_id);
        const {deleteSkill} = this.props;
        deleteSkill(skill_id);
    };
}


export default ListSkills;

