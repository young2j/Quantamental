import React, { Component, useRef, useState, useEffect} from 'react'
import { Table, Button, Popconfirm, Card, Cascader, Input } from 'antd'
import { SearchOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

import './index.less'
import { getFactors } from '../../api'
import { addColumns,deleteColumns,mergeFactors } from '../../redux/actions'

const EditableTh = ({
    column,
    title,
    headerEditable,
    children,
    handleSaveColumn,
    ...restProps
}) => {

    const [editing, setEditing] = useState(false)
    const inputRef = useRef()
    //鼠标点击外面或者enter时，更新表格的记录record，期间同时关闭可编辑状态
    const save = async () => {
        try {
            const values = {
                title: inputRef.current.state.value
            }
            setEditing(!editing)
            handleSaveColumn({ ...column, ...values })
        } catch (err) {
            console.log('输入有误:', err)
        }
    }


    let childNode = children //td的子元素，即td里要显示的组件

    if (headerEditable) {
        childNode = editing ? (
            <Input ref={inputRef} onBlur={save} onPressEnter={save} autoFocus />
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24, height: 24 }}
                    onClick={() => setEditing(!editing)}
                >
                    {children[1] ? children : <span style={{ paddingLeft: 25 }}>...</span>}
                </div>
            )
    }

    return <th {...restProps}>{childNode}</th>;
};


const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    factors,
    ...restProps
}) => {

    const [editing, setEditing] = useState(false)

    //鼠标点击外面或者enter时，更新表格的记录record，期间同时关闭可编辑状态
    const save = async (value) => {
        try {
            const values = {
                [dataIndex]: value
            }
            setEditing(!editing)
            handleSave({ ...record, ...values })
        } catch (err) {
            console.log('输入有误:', err)
        }
    }


    let childNode = children //td的子元素，即td里要显示的组件

    if (editable) {
        childNode = editing ? (
            <div id='cascader-wrapper'>
                <Cascader
                    autoFocus
                    options={factors}
                    placeholder="查找因子"
                    getPopupContainer={() => document.getElementById('cascader-wrapper')}
                    showSearch={{ filter: (inputValue, path) => path.some(opt => opt.label.indexOf(inputValue) !== -1) }}
                    displayRender={(label, selectedOpt) => label[1]}
                    onChange={(label, selectedOpt) => save(label[1])}
                />
            </div>

        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24, height: 24 }}
                    onClick={() => setEditing(!editing)}
                >
                    {children[1] ? children : (
                        <span><SearchOutlined style={{ paddingRight: 10 }} />...</span>
                    )}
                </div>
            )
    }

    return <td {...restProps}>{childNode}</td>;
};



@connect(state => state, { mergeFactors,deleteColumns})
class InnerTable extends Component {
    constructor(props) {
        super(props);
        const { columns, dataSource, factors, index } = props
        this.factors = factors
        this.state = {
            index,
            columns,
            dataSource,
            count: dataSource.length,
        };
    }
  

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        }, () => this.props.mergeFactors(
            this.state.columns,
            this.state.dataSource,
            this.state.index
        ));
    };

    handleAdd = () => {
        const { count, dataSource, columns } = this.state;
        const dataIndex = columns[0].dataIndex
        const newData = {
            key: count + 1,
            [dataIndex]: ''
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        }, () => this.props.mergeFactors(
            this.state.columns,
            this.state.dataSource,
            this.state.index
        ));
    };

    handleSaveColumn = col => {
        const newColumns = [...this.state.columns];
        const index = newColumns.findIndex(item => item.dataIndex === col.dataIndex);
        const item = newColumns[index];
        newColumns.splice(index, 1, { ...item, ...col });
        this.setState({
            columns: newColumns,
        }, () => this.props.mergeFactors(
            this.state.columns,
            this.state.dataSource,
            this.state.index
        ));
    };


    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                cell: EditableCell,
            },
            header: {
                cell: EditableTh,
            }
        };
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return {
                    ...col,
                    title: (
                        <Popconfirm
                            title='要移除该类因子吗？'
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => this.props.deleteColumns(this.state.index)}
                            okText="确定" cancelText='取消'
                        >删除</Popconfirm>
                    ),
                    render: (value, record, index) => (
                        <Popconfirm
                            title='要移除该因子吗？'
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => this.handleDelete(record.key)}
                            okText="确定" cancelText='取消'
                        >删除</Popconfirm>
                    )
                }
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    factors: this.factors
                }),
                onHeaderCell: column => ({
                    column,
                    headerEditable: col.headerEditable,
                    title: col.title,
                    handleSaveColumn: this.handleSaveColumn
                })
            }
        })

        return (
            <Card.Grid hoverable={false} className='inner-table-grid'>
                <Table
                    className='inner-table'
                    components={components}
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={{ hideOnSinglePage: true }}
                    footer={() => (
                        <Button
                            onClick={this.handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            添加因子
                        </Button>)}
                />
            </Card.Grid>
        )
    }
}


const Step21Content = (props) => {
    
    //获得cascader的选择项
    let factors = []
    useEffect(() => {
        getFactors().then(resp => {
            return Object.keys(resp.data).map(k => {
                factors.push(
                    {
                        value: k,
                        label: k,
                        children: resp.data[k].map(v => ({ value: v.toString(), label: v.toString() }))
                    })
                return null
            })
        })
    }, [factors])
    
    
    return (
        <div>
            {
                props.columns.map((cols, index) => {
                    return (
                        <InnerTable 
                            key={index}
                            index={index}
                            columns={cols}
                            dataSource={props.dataSource[index]}
                            factors={factors}
                        />
                    )
                })
            }

            <Card.Grid hoverable={false}>
                <Button
                    icon={< PlusOutlined />}
                    onClick={() => props.addColumns()}
                    style={{ height: 200, width: "100%", minWidth: 150 }}
                > 添加大类因子</Button >
            </Card.Grid>
        </div>
    )
}



export default connect(state=>state.strategyInfo,{addColumns})(Step21Content)



