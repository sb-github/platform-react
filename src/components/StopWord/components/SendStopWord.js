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
            selected: {
                title: '',
                crawler_id: null,
            },
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
        const words = this.state.selected.title;
        const crawler_id = this.state.selected.crawler_id;
        sendWords(words, crawler_id);
        this.setState({
            selected: {
                title: '',
                crawler_id: null
            },
            visible: false
        });
    };

    handleSelectChange = (value) => {
        this.setState({
            selected: {
                ...this.state.selected,
                crawler_id: value
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
        const wordsSelect = stopwords.map(word =>
            <Option key={word.id} value={word.crawler_id}>{word.crawler_id}</Option>
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
                    <Input placeholder=""
                           style={{ width: '100%' }}
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
                        <Option value="0">Without crawler</Option>
                        {wordsSelect}
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default WordSender;