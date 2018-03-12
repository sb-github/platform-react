import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col,
    InputGroup, FormGroup, FormControl} from 'react-bootstrap';


class WordSender extends Component {
    static propTypes = {
        sendWords: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    };

    render() {
        return (

            <Row>
                <Col xs={5}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                onChange={e => this.setState({text: e.target.value})}
                                value={this.state.text}
                                type='text' placeholder='Type your words'
                            />
                            <InputGroup.Addon>
                                <a onClick={() => this.handleClick()}>
                                    <Glyphicon glyph="glyphicon glyphicon-play"/>
                                </a>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    handleClick = () => {
        const {sendWords} = this.props;

        sendWords(this.state.text);
    };
}

export default WordSender;