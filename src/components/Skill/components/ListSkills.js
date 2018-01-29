import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button,  Glyphicon, InputGroup, FormGroup, FormControl  } from 'react-bootstrap';
import store from "../../../store/index";


class ListSkills extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    addSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
  };


  render() {
    const { skills } = this.props;
    const skillsList = skills.map(skill => <tr>
      <td>{skill.id}</td>
      <td>{skill.title}</td>
      <td>{skill.created_at}</td>
      <td>{skill.updated_at}</td>
      <td><Button onClick={() => this.skillEdit(skill.id)}>
        View
      </Button></td>
      <td><Button onClick={() => this.delete(skill.id)}>
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
        </div>
    );
  }

    skillEdit = skill_id => {

    };

    delete = skill_id => {
        const {deleteSkill} = this.props;
        deleteSkill(skill_id);
    };
}


export default ListSkills;

