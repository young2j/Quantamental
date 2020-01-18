import React, { Component} from 'react'
import { Tree, Typography, Table, Button, Checkbox, Tag } from 'antd'
import _ from 'lodash'


import { getUniverseCode } from '../../api'



const treeData = [
    {
        title: <Typography.Text strong>全部股票</Typography.Text>,
        value: 'a',
        key: 'a'
    },
    {
        title: <Typography.Text strong>指数组合</Typography.Text>,
        value: 'b',
        key: 'b',
        children: [
            {
                title: '上证综指',
                value: 'b0',
                key: 'b0',
            },
            {
                title: '深圳成指',
                value: 'b1',
                key: 'b1',
            },
            {
                title: '创业板指',
                value: 'b2',
                key: 'b2',
            },
            {
                title: '上证50',
                value: 'b3',
                key: 'b3',
            },
            {
                title: '沪深300',
                value: 'b4',
                key: 'b4',
            },
            {
                title: '中证500',
                value: 'b5',
                key: 'b5',
            },
        ],
    },
    {
        title: <Typography.Text strong>我的组合</Typography.Text>,
        value: 'c',
        key: 'c',
        children: [
            {
                title: 'My Portfolio',
                value: 'c0',
                key: 'c0',
            },
        ],
    },
    {
        title: <Typography.Text strong>我的关注</Typography.Text>,
        value: 'd',
        key: 'd',
        children: [
            {
                title: 'My Portfolio',
                value: 'd0',
                key: 'd0',
            },
        ],
    },
];

const colorMapToKey = {
    b0: "magenta",
    b1: "red",
    b2: "lime",
    b3: "volcano",
    b4: "geekblue",
    b5: "purple",
}

class Step1Content extends Component {

    state = {
        checkedKeys: [],
        expandedKeys: ['b'],
        tableDataSource: [],
        deleteRows:[],
        isLoading: false
    }

    onTreeExpand = (expandedKeys) => {
        this.setState({
            expandedKeys
        })
    }

    onTreeCheck = (checkedKeys, { checked, node }) => {
        const { eventKey } = node.props
        
        if (checked) { //如果点击了则标记为check状态，并请求数据
            this.setState({ isLoading: true })
            getUniverseCode(eventKey)
                .then(resp => {
                    this.setState({
                        isLoading: false,
                        checkedKeys, //包含全部的checkedKeys,自动更新的，无须手动concat
                        tableDataSource: this.handleTableDataSource(resp.data, eventKey)
                    })
                })
        }
        else { //取消check状态，并移除数据
            const tableDataSource = node.isLeaf()?
                this.state.tableDataSource.filter(obj => obj.eventKey !== eventKey)
                :
                this.state.tableDataSource.filter(obj => !obj.eventKey.includes(eventKey))

            this.setState({
                checkedKeys,
                tableDataSource
            })
        }
    }

    onTreeSelect = (selectedKeys, { selected, node }) => {
        const { checked, eventKey } = node.props

        if (node.isLeaf()) { //如果是叶子节点(最末级节点)
            if (!checked && selected) { //如果选中了则标记为check状态，并请求数据 [这里的!checked不能省略]
                this.setState({ isLoading: true })
                getUniverseCode(eventKey)
                    .then(resp => {
                        this.setState({
                            isLoading: false,
                            checkedKeys: this.state.checkedKeys.concat(selectedKeys), //一开始是非checked状态，这里会变成checked状态
                            tableDataSource: this.handleTableDataSource(resp.data, eventKey)
                        })
                    })
            }
            else { //如果取消选中则取消check状态，并移除数据
                const { checkedKeys, tableDataSource } = this.state
                this.setState({
                    checkedKeys: checkedKeys.filter(key => key !== eventKey),
                    tableDataSource: tableDataSource.filter(obj => obj.eventKey !== eventKey)
                })
            }
        } else { //如果是父节点，选中则展开，取消选中则收起
            if (selected) {
                this.setState({
                    expandedKeys: this.state.expandedKeys.concat(selectedKeys)
                })
            } else {
                this.setState({
                    expandedKeys: this.state.expandedKeys.filter(key => key !== eventKey)
                })
            }
        }
    }

    handleTableDataSource = (respData, eventKey) => {
        const flatTreeData = _.flatMap(treeData, obj => {
            return obj.children ? obj.children : obj
        })

        const newData = respData.map(obj => {
            return {
                ...obj,
                portfolioName: _.find(flatTreeData, { key: obj.portfolio }).title,
                eventKey //添加一个key作为标识，以方便操作
            }
        })

        const { tableDataSource } = this.state
        const newDataSource = _.union(tableDataSource, newData)
        return newDataSource
    }


    onDeleteRows = () => {
        const {tableDataSource,deleteRows} = this.state
        const restTableDataSource = _.difference(tableDataSource, deleteRows)
        this.setState({ 
            tableDataSource:restTableDataSource,
            checkedKeys:restTableDataSource.map(obj=>obj.eventKey),
            deleteRows:[]
        })
    }
    
    componentDidMount(){
        this.onTreeCheck(['a'],{
            checked:true,
            node:{
                props:{
                    eventKey:'a'
                }
            }})
    }

    render() {
        
        const {checkedKeys,expandedKeys,tableDataSource,deleteRows,isLoading} = this.state
        const columns = [
            {
                title: '股票代码',
                dataIndex: 'stkcd'
            }, {
                title: '公司简称',
                dataIndex: 'name'
            }, {
                title: '所属组合',
                dataIndex: 'portfolioName',
                render: (value, record) => {
                    return (
                        <Tag color={colorMapToKey[record.portfolio]}>
                            {value}
                        </Tag>
                    )
                }
            }]
        const pagination = { 
                size: 'small', 
                total: tableDataSource.length, 
                showTotal: (total) => `共${total}条`, 
                showSizeChanger: true, 
                defaultPageSize: 20, 
                hideOnSinglePage: true }
        return (
            <div style={{ display: 'flex', border: '2px solid #fafafa', width: "90%", margin: "20px auto" }}>
                
                <div className='tree-content'
                    style={{ flex: 0.4, borderRight: '2px solid #fafafa', paddingLeft: 150, paddingTop: 10 }}>
                    <Tree
                        checkable
                        onExpand={this.onTreeExpand}
                        expandedKeys={expandedKeys}
                        onCheck={this.onTreeCheck}
                        checkedKeys={checkedKeys}
                        onSelect={this.onTreeSelect}
                        treeData={treeData}
                    />
                </div>

                <div className="edit-content" 
                    style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
                    <Button 
                        type={deleteRows[0]? 'danger':null}
                        onClick={this.onDeleteRows}
                    >删除</Button>
                    <Checkbox defaultChecked>过滤黑名单</Checkbox>
                </div>

                <div className='table-content' style={{ flex: 0.6 }}>
                    <Table
                        loading={isLoading}
                        size='small'
                        rowKey={record => record.stkcd}
                        scroll={{ y: 380 }}
                        pagination={pagination}
                        rowSelection={
                            { type: 'checkbox', 
                              onSelect: (record, selected,selectedRows) => this.setState({ deleteRows: selectedRows}),
                              onSelectAll: (selected, selectedRows) => this.setState({ deleteRows: selectedRows})
                            }
                        }
                        dataSource={tableDataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}

export default Step1Content