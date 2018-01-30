import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, FormGroup, FormControl } from 'react-bootstrap';

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

            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                onChange={e => this.setState({text: e.target.value})}
                                value={this.state.text}
                                type='text' placeholder='Skill'
                            />
                            <InputGroup.Addon>
                                <a href='#' onClick={this.handleClick}>
                                    <Glyphicon glyph="glyphicon glyphicon-plus"/>
                                </a>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    handleClick = () => {
        const {addMaterial} = this.props;
        addMaterial(this.state.text);
    };
}

export default MaterialAdd;