import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Icon} from 'antd';
import CKEditor from "react-ckeditor-component";

class AddMaterial extends Component {
    static propTypes = {
        materials: PropTypes.array,
        sendAddedMaterial: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            visible: false,
            materials: [],
            selected: {}
        };
    }

    handleCancel = () =>{
        this.setState({ visible: false })
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleOk = () => {
        const { sendAddedMaterial } = this.props;
        sendAddedMaterial(this.state.selected);
        this.setState({
            selected: {
                title: null,
                image: null,
                parent: null
            },
            visible: false
        });
    };

    handleTitleInputChange = (e) => {
        this.setState({
            selected: {
                ...this.state.selected,
                title: e.target.value
            }
        })
    };

    handleSkillInputChange = (e) => {
        this.setState({
            selected: {
                ...this.state.selected,
                skill_id: e.target.value
            }
        })
    };

    updateContent=(newContent)=> {
        this.setState({
            selected: {
                ...this.state.selected,
                text: newContent
            }
        })
    };

    onChange=(evt)=>{
        const newContent = evt.editor.getData();
        this.setState({
            selected: {
                ...this.state.selected,
                text: newContent
            }
        })
    };

    render() {
        const {selected} = this.state || {};

        return (
            <div>
                <Button type="dashed" onClick={this.showModal}><Icon type="plus" /> New material</Button>
                <Modal
                    title="Add material"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={this.handleCancel}
                    width={'60%'}
                    okText='Create'
                >
                    <label>Title:</label>
                    <Input placeholder="" style={{ width: '100%' }}
                           onChange={this.handleTitleInputChange}
                           value={selected.title}
                           defaultValue=''
                    />
                    <br />
                    <label>Skill id:</label>
                    <Input placeholder="" style={{ width: '100%' }}
                           onChange={this.handleSkillInputChange}
                           value={selected.skill_id}
                           defaultValue=''
                    />
                    <label>Text:</label><br />
                    <CKEditor
                        activeClass="p10"
                        content={selected.text}
                        events={{
                            "blur": this.onBlur,
                            "afterPaste": this.afterPaste,
                            "change": this.onChange
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

export default AddMaterial;