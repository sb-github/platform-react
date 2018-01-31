import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';


class MaterialAdd extends Component {
    static propTypes = {
        addMaterial: PropTypes.PropTypes.func.isRequired
    };


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            skill_id: ''
        };
    };

    render() {

        return (
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
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Editor
                    initialValue=""
                    init={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={e => this.setState({text: e.target.getContent()})}
                    value={this.state.text}
                />
                <Row>
                    <Col xs={6} md={3}>
                        <Button onClick={this.handleClick}>
                            Success
                        </Button>
                    </Col>
                </Row>
            </form>


        );
    }

    handleClick = () => {
        const {addMaterial} = this.props;
        addMaterial(this.state.title, this.state.skill_id, this.state.text);
    };
}

export default MaterialAdd;