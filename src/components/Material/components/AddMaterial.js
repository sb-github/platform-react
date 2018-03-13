import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";


class MaterialAdd extends Component {
    static propTypes = {
        addMaterial: PropTypes.PropTypes.func.isRequired
    };


    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            title: '',
            text: '',
            skill_id: '',
            show_add: false
        };

    };

    render() {

        return (
            <div>
            <Button onClick={() => this.materialAddShow()}>
                Create
            </Button>
            <Modal show={this.state.show_add} onHide={this.materialAddClose}
                   {...this.props}
                   bsSize="large"
                   aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Material creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            onChange={e => this.setState({title: e.target.value})}
                                            value={this.state.title}
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
                                            onChange={e => this.setState({skill_id: e.target.value})}
                                            value={this.state.skill_id}
                                            type='text' placeholder='Skill'
                                            modules={'image'}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <CKEditor
                            activeClass="p10"
                            content={this.state.text}
                            events={{
                                "blur": this.onBlur,
                                "afterPaste": this.afterPaste,
                                "change": this.onChange
                            }}
                        />
                        <Row>
                            <Col xs={6} md={3}>
                                <Button onClick={this.handleClick}>
                                    Success
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.materialAddClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }

    materialAddClose = () =>{
        this.setState({show_add: false})
    };

    materialAddShow = () => {
        this.setState({show_add:true});
    };

    updateContent=(newContent)=> {
        this.setState({
            text: newContent
        })
    };

    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        this.setState({
            text: newContent
        })
    };

    handleClick = () => {
        const {addMaterial} = this.props;
        this.materialAddClose();
        addMaterial(this.state.title, this.state.skill_id, this.state.text);

    };
}

export default MaterialAdd;