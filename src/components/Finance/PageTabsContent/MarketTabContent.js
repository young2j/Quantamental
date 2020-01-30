import React, { Component, createRef } from 'react'
import { CloseCircleOutlined, PlusOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';

import {
    Button,
    Popconfirm,
    Rate,
    Table,
    message,
    Spin,
    Select,
    Divider,
    DatePicker,
} from 'antd';
import echarts from 'echarts'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import './tabContent.less'
import {
    deleteFirm,
    addFirm,
    addDate,
    deleteDate,
    selectDate,
    changeRange,
    addBlackSheet,
    deleteBlackSheet,
    followFirm,
    notfollowFirm
} from '../../../redux/actions'
import TableFooter from './TableFooter'

const { RangePicker } = DatePicker

//====================table component=========================
const columnsNames = {
    profit: {
        stkcd: "公司代码",
        roe: "净资产报酬率",
        roa: "总资产报酬率",
        gpm: "销售毛利率",
        opm: "主营业务利润率",
        npm: "净利润率",
        operate: "操作"
    },
    solvency: {
        stkcd: "公司代码",
        currentRatio: "流动比率",
        quickRatio: "速动比率",
        cashRatio: "现金比率",
        debtRatio: "资产负债率",
        equityRatio: "产权比率",
        interestCRatio: "利息保障倍数",
        operate: "操作"
    },
    operation: {
        stkcd: '公司代码',
        invTnover: "存货周转率",
        accRecTnover: "应收账款周转率",
        taTnover: "总资产周转率",
        faTnover: "固定资产周转率",
        operate: "操作",
    },
    growth: {
        stkcd: "公司代码",
        netProfitGrate: "净利润增长率",
        salesGrate: "收入增长率",
        taGrate: "总资产增长率",
        faTaRatio: "固定资产占比",
        operate: '操作'
    },
    cash: {
        stkcd: "公司代码",
        netCashPerSale: "单位销售收入净现金流入",
        debtProtecRatio: "债务保障率",
        foCashRatio: "自由现金流与经营活动净现金流比",
        operate: "操作"
    },
    market: {
        stkcd: "公司代码",
        eps: "每股收益",
        peRatio: "市盈率",
        pbRatio: "市净率",
        psRatio: "市销率",
        operate: "操作"
    }
}

@connect(state => {
    return {
        financeInfo: state.financeInfo,
        currentDate: state.financeInfo.currentDate,
        userInfo: state.userInfo
    }
}, {
    deleteFirm, addFirm, addDate, deleteDate, selectDate,
    addBlackSheet, deleteBlackSheet, followFirm, notfollowFirm
})
class MarketTabTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            maybeDeleteDate: '',
            pickDate: '',
        }
    }

    handleDeleteFirm = record => {
        const stkcd = /^\d{6}/.exec(record.stkcd)
        this.props.deleteFirm(stkcd[0])
        message.success('移除成功!')
    }

    handleSelectDate = (value, option) => {
        this.props.selectDate(value)
    }

    handlePickDate = (date, dateString) => {
        this.setState({
            pickDate: dateString
        })
    }

    handleAddDate = () => {
        this.props.addDate(
            this.props.financeInfo.currentFirmCode,
            this.state.pickDate
        )
    }

    handleDeleteDate = (e) => {
        e.stopPropagation()
        if (this.state.maybeDeleteDate === this.props.currentDate) {
            let options = this.props.dataSource.map(obj => obj.date)
            options = options.filter(item => item !== this.props.currentDate)
            this.props.selectDate(options[0])
        }

        this.props.deleteDate(
            this.props.currentFirmCode,
            this.state.maybeDeleteDate
        )
    }


    render() {
        const options = this.props.dataSource.map(obj => obj.date)
        let dataSource = this.props.dataSource.filter(obj => obj.date === this.props.currentDate)
        dataSource = dataSource[0] ? dataSource[0].market : null
        const { blacksheet, follows } = this.props.userInfo

        //columns
        const marketColumns = Object.keys(columnsNames.market).map((k, i) => {
            if (k === 'operate') {
                return {
                    title: (<span style={{ color: '#1890ff' }}>
                        {columnsNames.profit[k]}
                    </span>),
                    dataIndex: k,
                    render: (value, record) => {
                        const stkcd = /^\d{6}/.exec(record.stkcd)[0]
                        const isMyFollow = follows.indexOf(stkcd) !== -1
                        const isBlackSheet = blacksheet.indexOf(stkcd) !== -1
                        return (
                            <Button.Group >
                                <Button ghost
                                    style={{ border: 'none', padding: 0, color: '#000' }}
                                    icon={isBlackSheet ? <HeartFilled /> : <HeartOutlined />}
                                    onClick={() => isBlackSheet ? this.props.deleteBlackSheet(stkcd) : this.props.addBlackSheet(stkcd)}
                                >
                                    黑名单
                                </Button>
                                |<Button type='primary' ghost
                                    style={{ border: 'none', padding: "0px 3px" }}
                                    onClick={() => isMyFollow ? this.props.notfollowFirm(stkcd) : this.props.followFirm(stkcd)}
                                >
                                    {isMyFollow ? "已关注" : "关注"}
                                </Button>
                                <Popconfirm title="确定要移除该公司?" okText='确定' cancelText='取消'
                                    onConfirm={() => this.handleDeleteFirm(record)}
                                >
                                    |<Button type='danger' ghost style={{ border: 'none', padding: "0px 3px" }}>移除</Button>
                                </Popconfirm>
                            </Button.Group>
                        )
                    }
                }
            }
            if (k === 'stkcd') {
                return {
                    title: (
                        <div className="select-wrapper"
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            <Select
                                // autoFocus
                                defaultValue={this.props.currentDate}
                                value={this.props.currentDate}
                                open={this.state.open}
                                style={{ width: 180, textAlign: "center" }}
                                loading={this.props.financeInfo.isLoading}
                                onChange={this.handleSelectDate}
                                // onSelect={(value,option)=>console.log(value,option)} //不带搜索框时===onChange
                                dropdownRender={menu => (
                                    <div >
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '5px 3px' }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <DatePicker size='small' placeholder=' ' className='add-time-datepicker'
                                                onChange={this.handlePickDate} />
                                            <Button icon={<PlusOutlined />} size='small' ghost
                                                className='add-time-btn' type='primary'
                                                onClick={this.handleAddDate}
                                            >添加时间</Button>
                                        </div>
                                    </div>
                                )}
                            >
                                {options.map(item => (
                                    <Select.Option key={item} value={item}
                                        onMouseEnter={({ key }) => this.setState({ maybeDeleteDate: key })}
                                    >
                                        {item}
                                        <CloseCircleOutlined className='close-icon' onClick={this.handleDeleteDate} />
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    ),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <div style={{ color: '#1890ff' }}>{text}</div>
                        )
                    }
                };
            }
            return {
                title: (<span style={{ color: '#1890ff' }}>
                    {columnsNames.market[k]}(%)
                        </span>),
                dataIndex: k,
                sorter: (a, b) => Object.values(a)[i] - Object.values(b)[i],
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => {
                    return (<>{text}
                        <sup><Rate allowHalf
                            disabled
                            value={text / 100 * 5}
                            style={{ color: text > 50 ? 'red' : 'green' }}
                        /></sup>
                    </>)
                }
            }
        })

        return (
            <Spin spinning={this.props.financeInfo.isLoading}>
                <Table
                    size='middle'
                    bordered={false}
                    rowKey={(record) => record.stkcd}
                    pagination={{hideOnSinglePage:true}}
                    dataSource={dataSource}
                    columns={marketColumns}
                    footer={()=><TableFooter />}
                />
            </Spin>
        )
    }
}


//====================chart component========================
const chartOption = {
    baseOption: {
        timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 2000,
            // controlStyle: {
            //     position: 'left'
            // },
            left: '25%',
            data: [],//this.props.dataSource.map(obj=>obj.date),
            label: {
                formatter: function (s) {
                    return (new Date(s)).getFullYear();
                }
            }
        },
        title: {
            subtext: '可比公司市场表现分析',
            // top:'10%',
        },
        legend: {        
        
            right: '0%',
            data: ["每股收益","市盈率","市净率","市销率"],
            orient: 'vertical',
            align: 'left',
            top: '30%',
            itemGap: 20,
            // selected: {}
        },
        tooltip: {
            show: true,
            trigger: "item",
        },
        grid: {
            top: 80,
            bottom: 100,
            // right:100,
            // left:'18%',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return '公司代码:' + params.value
                        }
                    }
                }
            }
        },
        yAxis:
        {
            type: 'category',
            name: '公司',
            nameLocation: 'start',
            axisLabel: {
                interval: 0,
                // fontWeight:'bold'
            },
            data: [],
            // splitLine: { show: false }
        }
        ,
        xAxis: [
            {
                position: 'top',
                type: 'value',
                name: '比率',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: "每股收益", type: 'bar',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '\n{c}%', position: 'start' },
                }
            },
            {
                name: "市盈率", type: 'bar',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'start' },
                }
            },
            {
                name: "市净率", type: 'bar',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '\n{c}%', position: 'start' },
                }
            },
            {
                name: "市销率", type: 'bar',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'start' },
                }
            },
        ]
    },
    options: []
    // data like:
    //     {
    //     roe: [
    //         { name: '111111', value: 63.38 },
    //         { name: '222222', value: 65.84 },
    //         { name: '333333', value: 100.78 },
    //         { name: '444444', value: 0.26 },
    //         { name: '555555', value: 6.69 }
    //     ],
    //     roa: [
    //         { name: '111111', value: 7.01 },
    //         { name: '222222', value: 34.14 },
    //         { name: '333333', value: 45.63 },
    //         { name: '444444', value: 65.52 },
    //         { name: '555555', value: 17.23 }
    //     ],
    //     ...
    //     }
}

class MarketTabChart extends Component {
    constructor(props) {
        super(props)
        this.barChartRef = createRef()
    }
    drawChart = () => {
        const barChart = echarts.init(this.barChartRef.current)
        barChart.setOption(chartOption)

        barChart.setOption({
            baseOption: {
                timeline: {
                    data: this.props.dataSource.map(obj => obj.date)
                },
                yAxis: {
                    data: this.props.dataSource[0].market.map(obj => obj.stkcd.match(/^\d{6}/)[0])
                },
            },
            options: this.props.dataSource.map(obj => {
                const mergeValues = obj.market.reduce((o1, o2) => {
                    return _.mergeWith(o1, o2, (o1v, o2v) => {
                        if (_.isArray(o1v)) {
                            return o1v.concat(o2v)
                        }
                        return [o1v, o2v]
                    })
                })

                const data = _.mapValues(_.omit(mergeValues, 'stkcd'), (values) => {
                    return values.map((v, i) => {
                        return {
                            name: mergeValues.stkcd[i],
                            value: v
                        }
                    })
                })

                return {
                    title: { text: `${obj.date}` },
                    series: _.values(
                        _.mapValues(data, v => {
                            return { data: v }
                        })
                    )
                }
            })
        })
    }
    componentDidMount() {
        this.drawChart()
    }

    render() {
        return (
            <div ref={this.barChartRef} style={{ height: '420px', marginBottom: '40px', width: '90%' }}></div>
        )
    }
}




//====================TimeTable component=====================
const timeColumnsNames = {
    profit: {
        date: '时间',
        roe: "净资产报酬率",
        roa: "总资产报酬率",
        gpm: "销售毛利率",
        opm: "主营业务利润率",
        npm: "净利润率",
        operate: "操作"
    },
    solvency: {
        date: '时间',
        currentRatio: "流动比率",
        quickRatio: "速动比率",
        cashRatio: "现金比率",
        debtRatio: "资产负债率",
        equityRatio: "产权比率",
        interestCRatio: "利息保障倍数",
        operate: "操作"
    },
    operation: {
        date: '时间',
        invTnover: "存货周转率",
        accRecTnover: "应收账款周转率",
        taTnover: "总资产周转率",
        faTnover: "固定资产周转率",
        operate: "操作",
    },
    growth: {
        date: '时间',
        netProfitGrate: "净利润增长率",
        salesGrate: "收入增长率",
        taGrate: "总资产增长率",
        faTaRatio: "固定资产占比",
        operate: '操作'
    },
    cash: {
        date: '时间',
        netCashPerSale: "单位销售收入净现金流入",
        debtProtecRatio: "债务保障率",
        foCashRatio: "自由现金流与经营活动净现金流比",
        operate: "操作"
    },
    market: {
        date: '时间',
        eps: "每股收益",
        peRatio: "市盈率",
        pbRatio: "市净率",
        psRatio: "市销率",
        operate: "操作"
    }
}


@connect(state => {
    return {
        financeInfo: state.financeInfo,
        selectFirmCode: state.financeInfo.selectFirmCode
    }
}, { deleteDate, changeRange })
class MarketTabTimeTable extends Component {

    handleDeleteDate = record => {
        this.props.deleteDate(this.props.selectFirmCode, record.date)
        message.success('移除成功!')
    }

    handlePickDate = (dates, datesString) => {
        const [startDate, endDate] = datesString
        this.props.changeRange(this.props.selectFirmCode, startDate, endDate)
    }


    render() {
        let dataSource = this.props.dataSource.filter(obj => obj.stkcd === this.props.selectFirmCode)
        dataSource = dataSource[0] ? dataSource[0].market : null

        //columns
        const marketColumns = Object.keys(timeColumnsNames.market).map((k, i) => {
            if (k === 'operate') {
                return {
                    title: (<span style={{ color: '#1890ff' }}>
                        {timeColumnsNames.profit[k]}
                    </span>),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <Popconfirm title="确定要移除该年份?" okText='确定' cancelText='取消'
                                onConfirm={() => this.handleDeleteDate(record)}
                            >
                                <Button type='danger' ghost style={{ border: 'none', padding: "0px 3px" }}>移除</Button>
                            </Popconfirm>
                        )
                    }
                }
            }
            if (k === 'date') {
                return {
                    title: (
                        <RangePicker
                            ranges={{
                                '本月': [moment().startOf('month'), moment().endOf('month')],
                                '本年': [moment().startOf('year'), moment()],
                                '过去五年': [moment().subtract(5, 'y'), moment()],
                            }}
                            placeholder={['开始时间', '结束时间']}
                            onChange={this.handlePickDate}
                        />
                    ),
                    dataIndex: k,
                    align:'center',

                    render: (text, record) => {
                        return (
                            <div style={{ color: '#1890ff' }}>{text}</div>
                        )
                    }
                }
            }
            return {
                title: (<span style={{ color: '#1890ff' }}>
                    {timeColumnsNames.market[k]}(%)
                        </span>),
                dataIndex: k,
                sorter: (a, b) => Object.values(a)[i] - Object.values(b)[i],
                sortDirections: ['descend', 'ascend'],
                render: (text, record) => {
                    return (<>{text}
                        <sup><Rate allowHalf
                            disabled
                            value={text / 100 * 5}
                            style={{ color: text > 50 ? 'red' : 'green' }}
                        /></sup>
                    </>)
                }
            }
        })


        return (
            <Spin spinning={this.props.financeInfo.isLoading}>
                <Table
                    size='middle'
                    bordered={false}
                    rowKey={(record) => record.date}
                    pagination={{hideOnSinglePage:true}}
                    dataSource={dataSource}
                    columns={marketColumns}
                    footer={()=><TableFooter />}
                />
            </Spin>
        )
    }
}



//========================TimeChart component====================
const timeChartOption = {
    baseOption: {
        timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            // autoPlay: true,
            // currentIndex: 2,
            playInterval: 2000,
            // controlStyle: {
            //     position: 'left'
            // },
            left: '25%',
            data: [],//this.props.dataSource.map(obj=>obj.date),
            label: {
                formatter: function (s) {
                    // return (new Date(s)).getFullYear();
                    return s.match(/^\d{6}/)[0];
                }
            }
        },
        title: {
            subtext: '市场表现纵向分析',
            // top:'10%',
        },
        legend: {
            // right: '0%',
            data: ["每股收益","市盈率","市净率","市销率"],
            // orient: 'vertical',
            align: 'left',
            // top: '30%',
            itemGap: 20,
            // selected: {}
        },
        tooltip: {
            show: true,
            trigger: "axis",
        },
        grid: {
            top: 80,
            bottom: 100,
            // right:100,
            // left:'18%',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        // formatter: function (params) {
                        //     return params.value
                        // }
                    }
                }
            }
        },
        xAxis:
        {
            type: 'category',
            name: '年度',
            nameLocation: 'end',
            axisLabel: {
                interval: 0,
                // fontWeight:'bold'
            },
            data: [],
            // splitLine: { show: false }
        }
        ,
        yAxis: [
            {
                type: 'value',
                name: '比率',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: "每股收益", type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'end' },
                }
            },
            {
                name: "市盈率", type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'end' },
                }
            },
            {
                name: "市净率", type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'end' },
                }
            },
            {
                name: "市销率", type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { name: '行业平均值', type: 'average' } //yAxis: 50
                    ],
                    label: { formatter: '{c}%', position: 'end' },
                }
            }
        ]
    },
    options: []
}
class MarketTabTimeChart extends Component {
    constructor(props) {
        super(props)
        this.lineChartRef = createRef()
    }
    drawChart = () => {
        const lineBarChart = echarts.init(this.lineChartRef.current)
        lineBarChart.setOption(timeChartOption)

        lineBarChart.setOption({
            baseOption: {
                timeline: {
                    data: this.props.dataSource.map(obj => obj.stkcd)
                },
                xAxis: {
                    data: this.props.dataSource[0].market.map(obj => obj.date)
                },
            },
            options: this.props.dataSource.map(obj => {
                const mergeValues = obj.market.reduce((o1, o2) => {
                    return _.mergeWith(o1, o2, (o1v, o2v) => {
                        if (_.isArray(o1v)) {
                            return o1v.concat(o2v)
                        }
                        return [o1v, o2v]
                    })
                })

                const data = _.mapValues(_.omit(mergeValues, 'date'), (values) => {
                    return values.map((v, i) => {
                        return {
                            name: mergeValues.date[i],
                            value: v
                        }
                    })
                })

                return {
                    title: { text: `${obj.stkcd}` },
                    series: _.values(
                        _.mapValues(data, v => {
                            return { data: v }
                        })
                    )
                }
            })
        })
    }
    componentDidMount() {
        this.drawChart()
    }

    render() {

        return (
            <div ref={this.lineChartRef} style={{ height: '420px', marginBottom: '40px', width: '90%' }}></div>
        )
    }
}

export {
    MarketTabTable,
    MarketTabChart,
    MarketTabTimeTable,
    MarketTabTimeChart
}
