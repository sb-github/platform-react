import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Icon} from 'antd';

class AddSkill extends Component {
    static propTypes = {
        skills: PropTypes.array,
        sendAddedSkill: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            selected: {},
            skills: []
          };
    };

    handleCancel = () => {
      this.setState({ visible: false })
    };

    showModal = () => {
        this.setState({ visible: true })
    };

    handleOk = () => {
        const { sendAddedSkill } = this.props;
        sendAddedSkill(this.state.selected);
        this.setState({
            selected: {
                title: null,
                description: null
            },
            visible: false
        });
    };

    handleInputTitleChange = (e) => {
        this.setState({
            selected: {
                ...this.state.selected,
                title: e.target.value
            }
        })
    };

    handleInputDescriptionChange = (e) => {
        this.setState({
            selected: {
                ...this.state.selected,
                description: e.target.value
            }
        })
    };

  render() {
      const {selected} = this.state || {};
      return (
          <div>
              <Button type="dashed" onClick={this.showModal}><Icon type="plus" /> New skill</Button>
              <Modal
                  title="Add skill"
                  visible={this.state.visible}
                  onOk={() => this.handleOk()}
                  onCancel={this.handleCancel}
                  width={'30%'}
                  okText='Create'
              >
                  <label>Title:</label><br />
                  <Input placeholder="" style={{ width: '100%' }}
                         onChange={this.handleInputTitleChange}
                         value={selected.title}
                         defaultValue=''
                  />
                  <br />
                  <label>Description:</label><br />
                  <Input placeholder="" style={{ width: '100%' }}
                         onChange={this.handleInputDescriptionChange}
                         value={selected.description}
                         defaultValue=''
                  />
              </Modal>
          </div>
      );
  }
}

export default AddSkill;

