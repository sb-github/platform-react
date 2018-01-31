import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Row, Col, InputGroup, FormGroup, FormControl, Button, Modal, ControlLabel } from 'react-bootstrap';

class DirsSender extends Component {
  static propTypes = {
    sendDirs: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
        text: '',
        show: false,
        dir: {
            title: null,
            image: null,
            parent: null
        }
    };
  };

    handleClose = () => {
        this.setState({ show: false, dir: {
            title: null,
            image: null,
            parent: null
        }});
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClick = () => {
        const {sendDirs} = this.props;

        this.state.dir = {
            title: this.state.text,
        };

        sendDirs(this.state.dir);
        this.setState({ text: '',
            dir: {
                title: null,
                image: null,
                parent: null
            }
        });
    };

    handleDir = (dir) => {
        const {sendDirs} = this.props;
        sendDirs(dir);
        this.setState({
            dir: {
                title: null,
                image: null,
                parent: null
            }
        });

        this.setState({ show: false });
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
                type='text' placeholder='Quick add [type name of new dir]'
              />
              <InputGroup.Addon>
                <a href='#' onClick={this.handleClick}>
                  <Glyphicon glyph="glyphicon glyphicon-play"/>
                </a>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <Button bsStyle="success" onClick={this.handleShow}>Advanced Add</Button>
        </Col>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adding</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Title:</ControlLabel>
            <FormControl
                type="text"
                name="title"
                onChange={e => this.setState({dir: {
                    ...this.state.dir,
                    title: e.target.value
                    //parent: this.state.dir.parent
                }})}/>
              <ControlLabel>Parent:</ControlLabel>
              <FormControl
                  type="number"
                  name="parent"
                  onChange={e => this.setState({dir: {
                      ...this.state.dir,
                      parent: e.target.value
                  }})}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="success" onClick={() => this.handleDir(this.state.dir)}>Add</Button>
          </Modal.Footer>
        </Modal>
      </Row>
    );
  }
}

export default DirsSender;

