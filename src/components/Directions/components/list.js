import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Panel, Button, PanelGroup, Modal, FormControl, ControlLabel } from 'react-bootstrap';


class ListDirs extends Component {
  static propTypes = {
    dirs: PropTypes.array,
    fetchDirs: PropTypes.func.isRequired,
    delDirs: PropTypes.func.isRequired,
    editDirs: PropTypes.func.isRequired
  };

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeKey: '1',
            show: false,
            dir: {
                id: null,
                title: null,
                image: null,
                parent: null
            }
        };
    }

    handleSelect = (activeKey) => {
        this.setState({ activeKey });
    };

    handleClose = () => {
        this.setState({ show: false, dir: {
            id: null,
            title: null,
            image: null,
            parent: null
        }});
    };

    handleShow = (dir) => {
        this.setState({ show: true, dir: dir });
    };

    handleEdit = (dir) => {
        const {editDirs} = this.props;
        editDirs(dir);
        this.setState({ show: false });
    };

    handleDelete = (id) => {
        const {delDirs} = this.props;
        delDirs(id);
    };


  render() {
    //let options = [];
    const dirs = this.props.dirs || [];

    const options = dirs.map(df =>
        (df.id == this.state.dir.parent)
            ? <option key={df.id} value={df.id} selected>{df.title}</option>
            : <option key={df.id} value={df.id}>{df.title}</option>
    );

    const dirsList = dirs.map(dir =>
        <Panel eventKey={dir.id} key={dir.id}>
            <Panel.Heading>
                <div>
                    <Panel.Title toggle className="pull-left">
                        {dir.title}
                    </Panel.Title>

                    <Button bsStyle="danger" className="pull-right" onClick={() => this.handleDelete(dir.id)}>DELETE</Button>
                    <Button bsStyle="warning" className="pull-right" onClick={() => this.handleShow(dir)}>EDIT</Button>
                    <div className="clearfix" />
                </div>
            </Panel.Heading>
            <Panel.Body collapsible>
                {dir.subdirections.map(sub =>
                    <Panel key={sub.id}>
                        <Panel.Body>
                            <div className="pull-left">{sub.title}</div>
                            <Button bsStyle="danger" className="pull-right" onClick={() => this.handleDelete(sub.id)}>DELETE</Button>
                            <Button bsStyle="warning" className="pull-right" onClick={() => this.handleShow(sub)}>EDIT</Button>
                            <div className="clearfix" />
                        </Panel.Body>
                    </Panel>
                )}
            </Panel.Body>
        </Panel>);
    return (
        <Row>
          <Col xs={12}>
              <PanelGroup accordion
                          id="edit"
                          activeKey={this.state.activeKey}
                          onSelect={this.handleSelect}>
                {dirsList}
              </PanelGroup>

              <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Editing</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <ControlLabel>Title:</ControlLabel>
                      <FormControl
                          type="text"
                          name="title"
                          onChange={e => this.setState({dir: {
                              ...this.state.dir,
                              title: e.target.value
                          }})}
                          value={this.state.dir.title}/>
                      <ControlLabel>Parent:</ControlLabel>
                      <FormControl
                          componentClass="select"
                          placeholder="select"
                          onChange={e => this.setState({dir: {
                              ...this.state.dir,
                              parent: e.target.value
                          }})}>
                          <option value=''>Without Parent</option>
                          {options}
                      </FormControl>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button onClick={this.handleClose}>Close</Button>
                      <Button bsStyle="primary" onClick={() => this.handleEdit(this.state.dir)}>Save changes</Button>
                  </Modal.Footer>
              </Modal>
          </Col>
        </Row>
    );
  }
}

export default ListDirs;

