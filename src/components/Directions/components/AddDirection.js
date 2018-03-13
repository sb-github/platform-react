import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Select, Input, Icon} from 'antd';

class AddDirection extends Component {
    static propTypes = {
        dirs: PropTypes.array,
        sendAddedDirection: PropTypes.func.isRequired
    };

  constructor(props) {
      super(props);
      this.state = {
          visible: false,
          selected: {},
          directions: []
      };
  }

  handleCancel = () => {
      this.setState({ visible: false });
  };

  showModal = () => {
      this.setState({ visible: true });
  };

  handleOk = () => {
      const { sendAddedDirection } = this.props;
      sendAddedDirection(this.state.selected);
      this.setState({
          selected: {
              title: null,
              image: null,
              parent: null
          },
          visible: false
      });
  };

  handleSelectChange = (value) => {
      this.setState({
          selected: {
              ...this.state.selected,
              parent: value
          }
      })
  };

  handleInputChange = (e) => {
      this.setState({
          selected: {
              ...this.state.selected,
              title: e.target.value
          }
      })
  };

  render() {
      const directions = this.props.dirs || [];
      const Option = Select.Option;
      const {selected} = this.state || {};
      const dirsSelect = directions.map(dir =>
          <Option key={dir.id} value={dir.id}>{dir.title}</Option>
      );

      return (
          <div>
              <Button type="dashed" onClick={this.showModal}><Icon type="plus" /> New direction</Button>
              <Modal
                  title="Add direction"
                  visible={this.state.visible}
                  onOk={() => this.handleOk()}
                  onCancel={this.handleCancel}
                  width={'30%'}
                  okText='Create'
              >
                  <label>Title:</label><br />
                  <Input placeholder="" style={{ width: '100%' }}
                         onChange={this.handleInputChange}
                         value={selected.title}
                         defaultValue=''
                  />
                  <br />
                  <label>Choose parent:</label><br />
                  <Select
                      defaultValue=""
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a parent"
                      optionFilterProp="children"
                      onChange={this.handleSelectChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                      <Option value="">Without parent</Option>
                      {dirsSelect}
                      </Select>
              </Modal>
          </div>
      );
  }
}

export default AddDirection;

