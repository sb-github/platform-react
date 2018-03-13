import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import SendStopWords from './SendStopWord'
import { Table, Input, Popconfirm, Divider, Icon, Row, Col, Select } from 'antd';

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

class ListWords extends Component {
    static propTypes = {
        words: PropTypes.array,
        fetchWords: PropTypes.func.isRequired,
        sendWords: PropTypes.func.isRequired,
        deleteWords: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text,record) => this.renderColumns(text, record, 'id'),
        }, {
            title: 'Word',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text,record) => this.renderColumns(text, record, 'title'),
        }, {
            title: 'Crawler',
            dataIndex: 'crawler_id',
            key: 'crawler_id',
            sorter: (a, b) => a.crawler_id - b.crawler_id,
            render: (text,record) => this.renderColumns(text, record, 'crawler_id'),
        }, {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => a.created_at>b.created_at ? -1 : a.created_at<b.created_at ? 1 : 0,
            render: (text,record) => this.renderColumns(dateFormat(text,'dd-mm-yyyy'), record, 'created_at'),
        }, {
            title: 'Updated at',
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: (a, b) => a.updated_at>b.updated_at ? -1 : a.updated_at<b.updated_at ? 1 : 0,
            render: (text,record) => this.renderColumns(dateFormat(text,'dd-mm-yyyy'), record, 'updated_at'),
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            width: '15%',
            render: (text,record) => {
                const { editable } =record;
                return (
                  <div className={'editable-row-operations'}>
                      {
                          editable ?
                              <span>
                                  <a onClick={() => this.save(record.id)}>Save</a>
                                  <Divider type="vertical"/>
                                  <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.id)}>
                                    <a>Delete</a>
                                  </Popconfirm>
                                  <Divider type="vertical"/>
                                  <a onClick={() => this.cancel(record.id)}>Cancel</a>
                              </span>
                              : <a onClick={() => this.edit(record.id)}>Edit</a>
                      }
                  </div>
                );
            },
        }];

        this.state = {
          stopwords: this.props.words,
          cacheData: this.props.words
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.words !== this.props.words) {
            this.setState({
                stopwords: this.props.words,
                cacheData: this.props.words
            });
        }
    }

    renderColumns(text, record, column) {
        return (column !== 'id' && column !=='created_at' && column !=='updated_at' ?
                <EditableCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.id, column)}
                /> : <span>{text}</span>
        );
    }
    handleChange(value, id, column) {
        const newData = [...this.state.stopwords];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({ stopwords: newData });
        }
    }
    edit(id) {
        const newData = [...this.state.stopwords];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({ stopwords: newData });
        }
    }
    save(id) {
        const newData = [...this.state.stopwords];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ stopwords: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.sendWords(target);
        }
    }
    cancel(id) {
        const newData = [...this.state.stopwords];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({ stopwords: newData });
        }
    }
    delete(id) {
        const newData = [...this.state.stopwords];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ stopwords: newData.filter(item => id !== item.id)});
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.deleteWords(id);
        }
    }

    render() {
        const tableHeader =
            <Row>
                <Col span={5}>
                    <SendStopWords words={this.props.words} sendWords={this.props.sendWords}/>
                </Col>
                <Col>
                    <Icon type="file-word" style={{ margin: '3px', fontSize: 28, color: '#08c', float: 'right' }} />
                </Col>
            </Row>;

        return <Table title={() => tableHeader} bordered dataSource={this.state.stopwords} columns={this.columns} />;
    }
}

export default ListWords;
