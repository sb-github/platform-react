import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TreeSelect, Modal, Select,Button, Row, Col, AutoComplete} from 'antd';

const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class ConfirmMerge extends Component {
  static propTypes = {
    mergeGraph: PropTypes.func.isRequired,
    skills: PropTypes.array.isRequired,
    crawler: PropTypes.string.isRequired,
    fetchSkills: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      visible: false,
      loading: false
    };
  }

  componentDidMount() {
    if(!this.props.skills.length)
      this.props.fetchSkills();
  }

  handleChange = (value) => this.setState({value});

  handleOk = (e) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.mergeGraph(this.props.crawler, this.state.value);
      this.setState({ loading: false, visible: false, subs: null, main: null});
    }, 3000);
  };

  handleCancel = (e) => this.setState({visible: false});
  handleFilter = (inputValue, option) =>
    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  render() {
    const selectProps = {
      style: { width: '100%' },
      dataSource: ['all', ...this.props.skills.map(item => item.title)],
      placeholder: "Select skill to merge",
      onChange: this.handleChange,
      filterOption: this.handleFilter
    };
    const modalProps = {
      title: "Merge skills",
      visible: this.state.visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      width: 300,
      footer: [
        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
          Merge
        </Button>
      ]
    };

    return(
      <React.Fragment>
        <a onClick={() => this.setState({visible: true})} >Merge</a>
        <Modal {...modalProps}>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={24}>
              <AutoComplete {...selectProps} />
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmMerge;