import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Modal, Glyphicon, InputGroup, FormGroup, FormControl  } from 'react-bootstrap';
import store from "../../../store/index";


class ListMaterials extends Component {
    static propTypes = {
        materials: PropTypes.array.isRequired,
        addMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired,
        editMaterial: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.materialShowClose = this.materialShowClose.bind(this);

        this.state = {
            show: false,
            material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }
        };
    }

    render() {
        const { materials } = this.props;
        const materialsList = materials.map(material => <tr>
            <td>{material.id}</td>
            <td>{material.title}</td>
            <td>{material.skill_id}</td>
            <td>{material.created_at}</td>
            <td><Button onClick={() => this.materialShow(material)}>
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
                <Modal show={this.state.show} onHide={this.materialShowClose}
                    {...this.props}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.state.material.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{__html: this.state.material.text}}></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.materialEditShow}>Edit</Button>
                        <Button onClick={this.materialShowClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

    materialShowClose() {
        this.setState({show: false, material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }})
    };

    materialShow = material => {
        this.setState({show:true, material: material});
    };

    materialEdit = material => {
        const {editMaterial} = this.props;
        editMaterial(material);
    };

    delete = material_id => {
        const {deleteMaterial} = this.props;
        deleteMaterial(material_id);
    };
}


export default ListMaterials;