import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, Divider, Icon, Row, Col, Button } from 'antd';
import dateFormat from 'dateformat';
import AddDirection from './AddDirection';


const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
           ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} /> : value
        }
    </div>
);

class EditableTable extends Component {
    static propTypes = {
        dirs: PropTypes.array,
        fetchDirs: PropTypes.func.isRequired,
        deleteDirs: PropTypes.func.isRequired,
        editDirs: PropTypes.func.isRequired,
        sendDirs: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            width: '6%',
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: 'Name',
            dataIndex: 'title',
            width: '25%',
            render: (text, record) => this.renderColumns(text, record, 'title'),
        }, {
            title: 'Image',
            dataIndex: 'image',
            width: '10%',

        }, {
            title: 'Parent',
            dataIndex: 'parent',
            width: '7%',
            render: (text, record) => this.renderColumns(text, record, 'parent'),
        },{
            title: 'Created at',
            dataIndex: 'created_at',
            width: '15%',
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd.mm.yyyy'), record, 'created_at'),
        }, {
            title: 'Updated at',
            dataIndex: 'updated_at',
            width: '15%',
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd.mm.yyyy'), record, 'updated_at'),
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
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
            directions: [],
            cacheData: []

        };
    }
    componentDidMount() {
        this.props.fetchDirs();
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
        return (column !== 'id' ?
                <EditableCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.id, column)}
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
            this.props.editDirs(target);
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
            this.props.deleteDirs(id);
        }
    }

    render() {
        const tableHeader =
        <Row>
            <Col span={5}>
                <AddDirection dirs={this.props.dirs} sendDirs={this.props.sendDirs}/>
            </Col>
            <Col>
                <Icon type="rocket" style={{ fontSize: 28, color: '#08c', float: 'right' }} />
            </Col>
        </Row>;

        return <Table title={() => tableHeader} bordered dataSource={this.state.directions} columns={this.columns} />;
    }
}

export default EditableTable;

