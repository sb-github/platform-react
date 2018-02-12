import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Modal  } from 'react-bootstrap';
import { Button, Card, Classes, Elevation, Slider, Switch } from "@blueprintjs/core";

class ListMaterials extends Component {
    static propTypes = {
        skill_materials: PropTypes.array.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.materialShowClose = this.materialShowClose.bind(this);

        this.state = {
            show: false,
            show_edit: false,
            material:{
                id: null,
                title: null,
                skill_id: null,
                text: null
            }
        };
    }

    render() {
        const { skill_materials } = this.props;
        const padding = {
            padding: '1em',
        };
        const materialsList = skill_materials.map(material =>
            <Col md={4}>
                <div style={padding}>
            <Card  interactive={true} elevation={Card.ELEVATION_TWO}>
                <h5>{material.title}</h5>
                <p>{material.created_at.substr(0, 10)}</p>
                <Button onClick={() => this.materialShow(material)}>
                    View
                </Button>
            </Card>
                </div>
            </Col>


        );

        return (
            <div>
                <h1>Skill name</h1>
                {materialsList}

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
                        <Button onClick={this.materialShowClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {/*VIEW*/}
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

}


export default ListMaterials;
