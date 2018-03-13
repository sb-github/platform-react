import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, Divider, Icon, Row, Col, Modal } from 'antd';
import dateFormat from 'dateformat';
import AddMaterial from './AddMaterial';
import CKEditor from "react-ckeditor-component";


const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} /> : value
        }
    </div>
);

class ListMaterials extends Component {
    static propTypes = {
        materials: PropTypes.array,
        sendAddedMaterial: PropTypes.func.isRequired,
        editMaterial: PropTypes.func.isRequired,
        deleteMaterial: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            width: '6%',
            sorter: (a, b) => a.id - b.id,
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: 'Title',
            dataIndex: 'title',
            width: '25%',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, record) => this.renderColumns(text, record, 'title'),
        }, {
            title: 'Skill id',
            dataIndex: 'skill_id',
            width: '7%',
            sorter: (a, b) => a.skill_id - b.skill_id,
            render: (text, record) => this.renderColumns(text, record, 'skill_id'),
        }, {
            title: 'Text',
            dataIndex: 'text',
            width: '6%',
            render: (text, record) => {
                return (
                    <div className={'editable-row-operations'}>
                        {
                                <span>
                                    <a onClick={() => this.viewText(record.id)}>View</a>
                                </span>
                        }
                    </div>
                );
            }
<<<<<<< Updated upstream
        };
    }

    render() {
        const { materials, addMaterial } = this.props;
        const materialsList = materials.map(material => <tr>
            <td>{material.id}</td>
            <td>{material.title}</td>
            <td>{material.skill.title}</td>
            <td>{material.created_at}</td>
            <td><Button onClick={() => this.materialShow(material)}>
                View
            </Button></td>
            <td><Button onClick={() => this.delete(material.id)}>
                Delete
            </Button></td>
        </tr>);

        return (
            <div>
                <Row>
                    <Col xs={8}>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>ID material</th>
                                <th>Title</th>
                                <th>Skill</th>
                                <th>Created_at</th>
=======
        }, {
            title: 'Created at',
            dataIndex: 'created_at',
            width: '11%',
            sorter: (a, b) => a.created_at>b.created_at ? -1 : a.created_at<b.created_at ? 1 : 0,
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd.mm.yyyy'), record, 'created_at'),
        }, {
            title: 'Updated at',
            dataIndex: 'updated_at',
            width: '11%',
            sorter: (a, b) => a.updated_at>b.updated_at ? -1 : a.updated_at<b.updated_at ? 1 : 0,
            render: (text, record) => this.renderColumns(dateFormat(text, 'dd.mm.yyyy'), record, 'updated_at'),
        }, {
            title: 'Operation',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record) => {
                const {editable} = record;
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
>>>>>>> Stashed changes

        this.state = {
            materials: this.props.materials,
            cacheData: this.props.materials,
            selected: {},
            visible: false
        }
    };

    componentDidUpdate(prevProps) {
        if(prevProps.materials !== this.props.materials) {
            this.setState({
                materials: this.props.materials,
                cacheData: this.props.materials
            });
        }
    }
    renderColumns(text, record, column) {
        return (column !== 'id' && column !== 'created_at' && column !== 'updated_at' ?
                <EditableCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.id, column)}
                /> : <span>{text}</span>
        );
    }
    handleChange(value, id, column) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({ materials: newData });
        }
    }
    edit(id) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({ materials: newData });
        }
    }
    save(id) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ materials: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.editMaterial(target);
        }
    }
    cancel(id) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({ materials: newData });
        }
    }
    delete(id) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({ materials: newData.filter(item => id !== item.id)});
            this.cacheData = newData.map(item => ({ ...item }));
            this.props.deleteMaterial(id);
        }
    }
    handleCancel = () =>{
        this.setState({ visible: false })
    };
    handleOk = () => {
        console.log(this.state.selected);
        this.props.editMaterial(this.state.selected);
        this.setState({
            selected: {
               text: null
            },
            visible: false
        });
    };
    viewText(id) {
        const newData = [...this.state.materials];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            this.setState({ selected: target, visible: true });
        }
    }
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
        const tableHeader =
            <Row>
                <Col span={5}>
                    <AddMaterial dirs={this.props.materials} sendAddedMaterial={this.props.sendAddedMaterial}/>
                </Col>
                <Col>
                    <Icon type="file" style={{ margin: '3px', fontSize: 28, color: '#08c', float: 'right' }} />
                </Col>
            </Row>;
        const {selected} = this.state || {};
        return (
            <React.Fragment>
            <Table title={() => tableHeader} bordered dataSource={this.state.materials} columns={this.columns} />
                <Modal
                    title="Edit material text"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={this.handleCancel}
                    width={'60%'}
                    okText='Edit'
                >
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
            </React.Fragment>
        );
    }
}


export default ListMaterials;
