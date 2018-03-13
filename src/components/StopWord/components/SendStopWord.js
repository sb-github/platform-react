import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Select, Input, Icon} from 'antd';


class WordSender extends Component {
    static propTypes = {
        words: PropTypes.array,
        sendWords: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            stopwords: [],
            visible: false,
        };
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleOk = () => {
        const { sendWords } = this.props;
        sendWords(this.state.selected);
        this.setState({
            selected: {
                title: null,
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
        const stopwords = this.props.words || [];
        const Option = Select.Option;
        const {selected} = this.state || {};
        const wordsSelect = stopwords.map(dir =>
            <Option key={dir.id} value={dir.id}>{dir.crawler_id}</Option>
        );
        return (
            <div>
                <Button type="dashed" onClick={this.showModal}><Icon type="plus" />New stop words</Button>
                <Modal
                    title="Add stop word"
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
                    <label>Choose crawler:</label><br />
                    <Select
                        defaultValue=""
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select a crawler"
                        optionFilterProp="children"
                        onChange={this.handleSelectChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="">Without crawler</Option>
                        {wordsSelect}
                    </Select>
                </Modal>
            </div>
        );
    }

    handleClick = () => {
        const {sendWords} = this.props;

        sendWords(this.state.text);
    };
}

export default WordSender;