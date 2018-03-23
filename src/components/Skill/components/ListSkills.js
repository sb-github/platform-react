import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, Divider, Icon, Row, Col } from 'antd';
import dateFormat from 'dateformat';
import AddSkill from './AddSkill';

const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable ?
            <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} /> : value
        }
    </div>
);

class ListSkills extends Component {
    static propTypes = {
        skills: PropTypes.array.isRequired,
        fetchSkills: PropTypes.func.isRequired,
        editSkill: PropTypes.func.isRequired,
        deleteSkill: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

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
            title: 'Description',
            dataIndex: 'description',
            width: '10%',
            filters: [{text: 'No description', value: 'null'},{text: 'With description', value: 'withDescription'}],
            onFilter: (value, record) => (record.description ? 'withDescription' : 'null') === value,
            filterMultiple: false,
            render: (text, record) => this.renderColumns(text, record, 'description'),
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

        this.state = {
            skills: this.props.skills,
            cacheData: this.props.skills
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.skills !== this.props.skills) {
            this.setState({
                skills: this.props.skills,
                cacheData: this.props.skills
            })
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
        const newData = [...this.state.skills];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({ skills: newData });
        }
    }
    edit(id) {
        const newData = [...this.state.skills];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({ skills: newData });
        }
    }
    save(id) {
        const newData = [...this.state.skills];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ skills: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.editSkill(target);
        }
    }
    cancel(id) {
        const newData = [...this.state.skills];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({ skills: newData });
        }
    }
    delete(id) {
        const newData = [...this.state.skills];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({skills: newData.filter(item => id !== item.id)});
            this.cacheData = newData.map(item => ({...item}));
            this.props.deleteSkill(id);
        }
    }

    render() {
        const tableHeader =
            <Row>
                <Col span={5}>
                    <AddSkill skills={this.props.skills} sendAddedSkill={this.props.sendAddedSkill}/>
                </Col>
                <Col>
                    <Icon type="book" style={{margin: '3px', fontSize: 28, color: '#08c', float: 'right'}}/>
                </Col>
            </Row>;

                    return <Table title={() => tableHeader} bordered dataSource={this.state.skills} columns={this.columns}/>;
    }
}

export default ListSkills;

