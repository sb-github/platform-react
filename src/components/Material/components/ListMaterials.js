import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Modal, Glyphicon, InputGroup, FormGroup, FormControl  } from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";
import MaterialAdd from "./MaterialAdd";


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
        this.materialEditShowClose = this.materialEditShowClose.bind(this);

        this.state = {
            show: false,
            show_edit: false,
            show_add: false,
            material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }
        };
    }

    render() {
        const { materials, addMaterial } = this.props;
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
                                <th><Button onClick={() => this.materialAddShow()}>
                                    Create
                                </Button></th>
                            </tr>
                            </thead>
                            <tbody>
                            { materialsList }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {/*VIEW*/}
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
                        <Button onClick={() => this.materialEditShow(this.state.material)}>Edit</Button>
                        <Button onClick={this.materialShowClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {/*VIEW*/}
                {/*EDIT*/}
                <Modal show={this.state.show_edit} onHide={this.materialEditShowClose}
                       {...this.props}
                       bsSize="large"
                       aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.state.material.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Row>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                onChange={e => this.setState({material: {
                                                        ...this.state.material,
                                                        title: e.target.value
                                                    }})}
                                                value={this.state.material.title}
                                                type='text' placeholder='Title'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={3}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl
                                                onChange={e => this.setState({material: {
                                                        ...this.state.material,
                                                        skill_id: e.target.value
                                                    }})}
                                                value={this.state.material.skill_id}
                                                type='text' placeholder='Skill'
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <CKEditor
                                activeClass="p10"
                                content={this.state.material.text}
                                events={{
                                    "blur": this.onBlur,
                                    "afterPaste": this.afterPaste,
                                    "change": this.onChange
                                }}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.materialEdit}>Save</Button>
                        <Button onClick={this.materialEditShowClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {/*ADD*/}
                <Modal show={this.state.show_add} onHide={this.materialAddClose}
                       {...this.props}
                       bsSize="large"
                       aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Material creation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MaterialAdd addMaterial={addMaterial}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.materialAddClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {/*ADD*/}
            </div>

        );
    }

    updateContent=(newContent)=> {
        this.setState({material: {
                ...this.state.material,
                text: newContent
            }})
    };

    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        this.setState({material: {
                ...this.state.material,
                text: newContent
            }})
    };

    materialShowClose() {
        this.setState({show: false, material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }})
    };

    materialAddClose = () =>{
        this.setState({show_add: false})
    };

    materialAddShow = () => {
        this.setState({show_add:true});
    };

    materialShow = material => {
        this.setState({show:true, material: material});
    };

    materialEditShowClose() {
        this.setState({show_edit: false, material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }})
    };

    materialEditShow = material => {
        this.materialShowClose();
        this.setState({show_edit:true, material: material});
    };



    materialEdit = () => {
        const {editMaterial} = this.props;
        editMaterial(this.state.material);
        this.materialEditShowClose();
    };

    delete = material_id => {
        const {deleteMaterial} = this.props;
        deleteMaterial(material_id);
    };
}


export default ListMaterials;