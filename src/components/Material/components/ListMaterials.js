import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button,  Glyphicon, InputGroup, FormGroup, FormControl  } from 'react-bootstrap';
import store from "../../../store/index";


class ListMaterials extends Component {
    static propTypes = {
        materials: PropTypes.array.isRequired,
        addMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired,
    };


    render() {
        const { materials } = this.props;
        const materialsList = materials.map(material => <tr>
            <td>{material.id}</td>
            <td>{material.title}</td>
            <td>{material.skill_id}</td>
            <td>{material.created_at}</td>
            <td><Button onClick={() => this.materialEdit(material.id)}>
                View
            </Button></td>
            <td><Button onClick={() => this.delete(material.id)}>
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
                                <th>ID material</th>
                                <th>Title</th>
                                <th>ID skill</th>
                                <th>Created_at</th>
                            </tr>
                            </thead>
                            <tbody>
                            { materialsList }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

    materialEdit = material_id => {

    };

    delete = material_id => {
        const {deleteMaterial} = this.props;
            deleteMaterial(material_id);
    };
}


export default ListMaterials;