import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, Divider, Icon, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import AddDirection from './AddDirection';
import styles from '../styles.css';

const EditableCell = ({editable, link, value, onChange, onClick, column}) => (
    <React.Fragment>
        {editable
            ? <Input
                style={{ margin: '-5px 0' }}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            : column==='title'
                ? <span onClick={onClick}>
                    <Link
                      onclick={onClick}
                      to={'/graph'}>{value}
                    </Link>
                </span>
                : value
        }
    </React.Fragment>
);

class ListDirections extends Component {
    static propTypes = {
        dirs: PropTypes.array,
        fetchDirections: PropTypes.func.isRequired,
        sendAddedDirection: PropTypes.func.isRequired,
        deleteDirection: PropTypes.func.isRequired,
        editDirection: PropTypes.func.isRequired,
        fetchGraph: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            directions: this.props.dirs,
            cacheData: this.props.dirs,
            searchText: '',
            filtered: false
        };

        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            width: '6%',
            sorter: (a, b) => a.id - b.id,
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: 'Name',
            dataIndex: 'title',
            width: '20%',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, record) => this.renderColumns(text, record, 'title'),
        }, {
            title: 'Image',
            dataIndex: 'image',
            width: '11%',

        }, {
            title: 'Main skill',
            dataIndex: 'main_skill_id',
            width: '9%',
            render: (text, record) => this.renderColumns(text, record, 'main_skill_id'),
        },{
            title: 'Parent',
            dataIndex: 'parent',
            width: '9%',
            filters: [{text: 'No parent', value: 'null'},{text: 'With parent', value: 'withParent'}],
            onFilter: (value, record) => (record.parent ? 'withParent' : 'null') === value,
            filterMultiple: false,
            sorter: (a, b) => a.parent - b.parent,
            render: (text, record) => this.renderColumns(text, record, 'parent'),
        },{
            title: 'Created at',
            dataIndex: 'created_at',
            width: '11%',
            sorter: (a, b) => a.created_at>b.created_at ? -1 : a.created_at<b.created_at ? 1 : 0,
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd-mm-yyyy'), record, 'created_at'),
        }, {
            title: 'Updated at',
            dataIndex: 'updated_at',
            width: '11%',
            sorter: (a, b) => a.updated_at>b.updated_at ? -1 : a.updated_at<b.updated_at ? 1 : 0,
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd-mm-yyyy'), record, 'updated_at'),
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record) => {
                const { editable } = record;
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
    }

    sendSkillToGraph(id) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];

    }


    componentDidUpdate(prevProps) {
        if(prevProps.dirs !== this.props.dirs) {
            this.setState({
                directions: this.props.dirs,
                cacheData: this.props.dirs
            });
        }
    }
    renderColumns(text, record, column) {
        return (column !== 'id' && column !=='created_at' && column !=='updated_at' ?
                <EditableCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.id, column)}
                    onClick={() => this.props.fetchGraph({
                      id: record.main_skill_id
                    })}
                    column={column}
                /> : <span>{text}</span>
        );
    }
    handleChange(value, id, column) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({ directions: newData });
        }
    }
    edit(id) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({ directions: newData });
        }
    }
    save(id) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ directions: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.editDirection(target);
        }
    }
    cancel(id) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({ directions: newData });
        }
    }
    delete(id) {
        const newData = [...this.state.directions];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ directions: newData.filter(item => id !== item.id)});
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.deleteDirection(id);
        }
    }

    render() {
        const tableHeader =
            <Row>
                <Col span={5}>
                    <AddDirection dirs={this.props.dirs} sendAddedDirection={this.props.sendAddedDirection}/>
                </Col>
                <Col>
                    <Icon type="appstore-o" style={{ margin: '3px', fontSize: 28, color: '#08c', float: 'right' }} />
                </Col>
            </Row>;
                    return <Table title={() => tableHeader} bordered dataSource={this.state.directions} columns={this.columns} />;
    }
}

export default ListDirections;

