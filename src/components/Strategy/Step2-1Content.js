import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table, Tag, Button } from 'antd'

import { getFactorValidateInfo } from '../../api'
import { DislikeOutlined, TrophyOutlined } from '@ant-design/icons'
import { toComputeCorr } from '../../redux/actions'

import './index.less'


@connect(state => state.strategyInfo,{toComputeCorr})
class Step21Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableDataSource: []
        }
    }

    handleDelete = (key)=>{
        const tableDataSource = this.state.tableDataSource.filter(item => item.key !== key)
        this.setState({
            tableDataSource
        })
    }

    handleData = async () => {
        const { dataSource,samplePeriod } = this.props
        const {startDate,endDate} = samplePeriod
        const factors = _.flatMapDeep(dataSource, ds => ds.map(o => Object.values(o)[1]))

        let data = []
        for (let key in factors) {
            if (factors.hasOwnProperty(key)) {
                const item = factors[key];
                const respData = await getFactorValidateInfo(item,startDate,endDate)
                data.push({
                    key,
                    ...respData.data,   
                    factor: item
                })
            }
        }

        this.setState({
            tableDataSource: data
        })
    }

    componentDidMount() {
        this.handleData()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.dataSource!==this.props.dataSource){
            this.handleData()
        }
        if(prevState.tableDataSource!==this.state.tableDataSource1){
            this.props.toComputeCorr(this.state.tableDataSource)
        }
    }

    render() {
        const columns = [
            {
                title: '候选因子',
                dataIndex: 'factor',
            },
            {
                title: '年化平均收益(%)',
                dataIndex: 'AMRet',
                render: value => value > 0 ? (<Tag color='red'>{value}</Tag>) : (<Tag color='green'>{value}</Tag>)
            },
            {
                title: '超额收益(%)',
                dataIndex: 'ExRet',
                render: value => value > 0 ? (<Tag color='red'>{value}</Tag>) : (<Tag color='green'>{value}</Tag>)
            },
            {
                title: '收益与分值相关性',
                dataIndex: 'Corr',
                render: value => {
                    if (value > 0.6 && value < 0.7) {
                        return (<div style={{ color: '#CC6699' }}>{value}<sup> not bad!</sup></div>)
                    }
                    else if (value >= 0.7 && value < 0.8) {
                        return (<div style={{ color: '#FF3366' }}>{value}<sup> nice!</sup></div>)
                    }
                    else if (value >= 0.8 && value < 0.9) {
                        return (<div style={{ color: '#FF3366' }}>{value}<sup> nice!</sup></div>)
                    }
                    else if (value >= 0.9) {
                        return (<div style={{ color: '#CC0033' }}>{value}<sup> great!</sup></div>)
                    }
                    return (<div>{value}</div>)
                }
            },
            {
                title: '跑赢市场概率',
                dataIndex: 'WinRateBoth',
                render: value => value > 0.5 ?
                    (<div style={{ color: 'red' }}>{value} <sup><TrophyOutlined /></sup></div>)
                    : (<div style={{ color: 'green' }}>{value} <sup><DislikeOutlined /></sup></div>)
            },
            {
                title: '跑赢市场概率(牛市)',
                dataIndex: 'WinRateBull',
                render: value => value > 0.5 ?
                    (<div style={{ color: 'red' }}>{value} <sup><TrophyOutlined /></sup></div>)
                    : (<div style={{ color: 'green' }}>{value} <sup><DislikeOutlined /></sup></div>)
            },
            {
                title: '跑赢市场概率(熊市)',
                dataIndex: 'WinRateBear',
                render: value => value > 0.5 ?
                    (<div style={{ color: 'red' }}>{value} <sup><TrophyOutlined /></sup></div>)
                    : (<div style={{ color: 'green' }}>{value} <sup><DislikeOutlined /></sup></div>)
            },
            {
                title: <div style={{ color: '#1890ff', paddingLeft: 16 }}>操作</div>,
                render: (value, record) => (
                    <Button ghost style={{ color: '#1890ff' }}
                        onClick={()=>this.handleDelete(record.key)}
                    >删除</Button>
                )
            },
        ]

        return (
            <Table
                className='factor-validate-table'
                columns={columns}
                dataSource={this.state.tableDataSource}
                pagination={{hideOnSinglePage:true}}
                size="small"
            />
        )
    }
}

export default Step21Content
