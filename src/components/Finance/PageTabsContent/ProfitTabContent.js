import React,{Component,createRef} from 'react'
import { 
    Button,
    Icon,
    Popconfirm, 
    Tag, 
    Rate,
    Table, 
    message, 
    Spin, 
    Select,
    Divider,
    DatePicker} from 'antd'
import echarts from 'echarts'
import { connect } from 'react-redux'
import moment from 'moment'

import './tabContent.less'
import { deleteFirm,addFirm,addDate,deleteDate,selectDate,changeRange} from '../../../redux/actions'

const { RangePicker } = DatePicker

//====================table component=========================
const columnsNames = {
        profitability: {
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
        }
    }

@connect(state => {
    return {
        financeInfo:state.financeInfo,
        currentDate:state.financeInfo.currentDate
    }
},{deleteFirm,addFirm,addDate,deleteDate,selectDate})
class ProfitTabTable extends Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            maybeDeleteDate:'',
            pickDate:'',
        }
    }

    handleDeleteFirm = record => {
        const stkcd = /^\d{6}/.exec(record.stkcd)
        this.props.deleteFirm(stkcd[0])
        message.success('移除成功!')
    }

    handleSelectDate = (value,option) => {
        this.props.selectDate(value)
    }
    
    handlePickDate = (date,dateString) => {
        this.setState({
            pickDate:dateString
        })        
    }
    
    handleAddDate = () => {
        this.props.addDate(
            this.props.financeInfo.currentFirmCode,
            this.state.pickDate
            )
    }
    
    handleDeleteDate=(e)=>{
        e.stopPropagation()
        if (this.state.maybeDeleteDate===this.props.currentDate){
            let options = this.props.dataSource.map(obj => obj.date)
            options = options.filter(item=>item!==this.props.currentDate)
            this.props.selectDate(options[0])
        }

        this.props.deleteDate(
            this.props.currentFirmCode,
            this.state.maybeDeleteDate
            ) 
    }


    render() {
        const options=this.props.dataSource.map(obj=>obj.date)
        let dataSource = this.props.dataSource.filter(obj=>obj.date===this.props.currentDate)
        dataSource = dataSource[0]? dataSource[0].profitability:null
        
        //columns
        const profitabilityColumns = Object.keys(columnsNames.profitability).map((k, i) => {
            if (k === 'operate') {
                return {
                    title: (<span style={{ color: '#1890ff' }}>
                        {columnsNames.profitability[k]}
                    </span>),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <Button.Group >
                                <Button type='primary' ghost style={{ border: 'none', padding: "0px 3px" }}>关注</Button>
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
                    title:(
                        <div className="select-wrapper" 
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            <Select 
                                // autoFocus
                                defaultValue={this.props.currentDate}
                                value={this.props.currentDate}
                                open={this.state.open}
                                style={{ width: 180 ,textAlign:"center"}}
                                loading={this.props.financeInfo.isLoading}
                                onChange={this.handleSelectDate}
                                // onSelect={(value,option)=>console.log(value,option)} //不带搜索框时===onChange
                                dropdownRender={menu => (
                                    <div >
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding:'5px 3px' }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <DatePicker size='small' placeholder=' ' className='add-time-datepicker'
                                                onChange={this.handlePickDate} />
                                            <Button icon='plus' size='small' ghost
                                                className='add-time-btn' type='primary'
                                                onClick={this.handleAddDate}
                                            >添加时间</Button>
                                        </div>
                                    </div>
                                )}
                            >
                                {options.map(item => (
                                    <Select.Option key={item} value={item}
                                     onMouseEnter={({key})=>this.setState({maybeDeleteDate:key})}                                    
                                    >
                                        {item}
                                        <Icon type='close-circle' className='close-icon'
                                            onClick={this.handleDeleteDate}
                                            />
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>                        
                    ),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <div style={{color:'#1890ff'}}>{text}</div>
                        )
                    }
                }
            }
            return {
                title: (<span style={{ color: '#1890ff' }}>
                    {columnsNames.profitability[k]}(%)
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

        const columns = {
            profitabilityColumns,
            // solvencyColumns: data[0].solvencyColumns,
        }

        return (
          <Spin spinning={this.props.financeInfo.isLoading}>
            <Table
                size='middle'
                bordered={false}
                rowKey={(record)=>record.stkcd}
                dataSource={dataSource}
                columns={columns.profitabilityColumns}
                footer={() => {
                    return <p type='warning'>注:...</p>
                }}
            />
          </Spin>
        )
    }
}

//====================chart options==========================
const chartOption = {
    // title: {
    //     text: '',
    //     subtext: ''
    // },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        selectedMode: 'multiple',
        data: ["净资产报酬率",
            "总资产报酬率",
            "销售毛利率",
            "主营业务利润率",
            "净利润率"],
        selected: {
            "净资产报酬率": true,
            "总资产报酬率": false,
            "销售毛利率": false,
            "主营业务利润率": false,
            "净利润率": false,
        },
    },
    dataZoom:{
        type:'slider',
        start:10,
        end:90,
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    xAxis: {
        type: 'category',
        name: "公司代码",
        // nameLocation:'center',
        nameTextStyle: {
            padding: [30, 0, 0, 0],
            fontWeight: 'bold',
            fontSize: 14,
        },
        boundaryGap: true,
        data: []
    },
    yAxis: {
        name: "比率",
        // nameLocation: 'center',
        nameTextStyle: {
            padding: [0, 0, 20, 0],
            fontWeight: 'bold',
            fontSize: 14,
        },
        type: 'value',
        axisLabel: {
            formatter: '{value}%'
        }
    },
    series: [
        //bar
        {
            name: '净资产报酬率',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            // markLine: {
            //     data: [
            //         { name: '行业平均值', yAxis: 50 }
            //     ],
            //     label: { formatter: '{c}%行业均值', position: 'middle' },
            //     lineStyle: {
            //         color: '#2db7f5'
            //     }
            // },
            barMaxWidth: '30%'
        },
        {
            name: '总资产报酬率',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            // markLine: {
            //     data: [
            //         { name: '行业平均值', yAxis: 50 }
            //     ],
            //     label: { formatter: '{c}%行业均值', position: 'middle' },
            //     lineStyle: {
            //         color: '#2db7f5'
            //     }
            // },
            barMaxWidth: '30%'
        },
        {
            name: '销售毛利率',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            // markLine: {
            //     data: [
            //         { name: '行业平均值', yAxis: 50 }
            //     ],
            //     label: { formatter: '{c}%行业均值', position: 'middle' },
            //     lineStyle: {
            //         color: '#2db7f5'
            //     }
            // },
            barMaxWidth: '30%'
        },
        {
            name: '主营业务利润率',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            // markLine: {
            //     data: [
            //         { name: '行业平均值', yAxis: 50 }
            //     ],
            //     label: { formatter: '{c}%行业均值', position: 'middle' },
            //     lineStyle: {
            //         color: '#2db7f5'
            //     }
            // },
            barMaxWidth: '30%'
        },
        {
            name: '净利润率',
            type: 'bar',
            data: [],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            // markLine: {
            //     data: [
            //         { name: '行业平均值', yAxis: 50 }
            //     ],
            //     label: { formatter: '{c}%行业均值', position: 'middle' },
            //     lineStyle: {
            //         color: '#2db7f5'
            //     }
            // },
            barMaxWidth: '30%'
        },
        //line
        {
            name: '净资产报酬率',
            type: 'line',
            smooth: true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type: 'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        },
        {
            name: '总资产报酬率',
            type: 'line',
            smooth: true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type: 'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        },
        {
            name: '销售毛利率',
            type: 'line',
            smooth: true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type: 'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        },
        {
            name: '主营业务利润率',
            type: 'line',
            smooth: true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type: 'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        },
        {
            name: '净利润率',
            type: 'line',
            smooth: true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type: 'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        }
    ]
};
//====================chart component========================
class ProfitTabChart extends Component {
    constructor(props){
        super(props)
        this.lineBarChartRef = createRef()
    }
    drawChart = ()=>{
        const lineBarChart = echarts.init(this.lineBarChartRef.current)
        lineBarChart.setOption(chartOption)
        const dataKeys = Object.keys(this.props.dataSource[0]).filter(k=>k!=='stkcd')
        const seriesData = dataKeys.map(k => {
                const arr = this.props.dataSource.map(obj => {
                    return obj[k]
                })
                return {
                    data: arr
                }
            })
        
        lineBarChart.setOption({
            xAxis: {
                data: this.props.dataSource.map(obj => obj.stkcd.slice(0,6))
            },
            series: seriesData.concat(seriesData)
        })
    }
    componentDidMount(){
        this.drawChart()
    }
    render() {
        // console.log(" this.props.dataSource:", this.props.dataSource);
        
        return (
            <div ref={this.lineBarChartRef} style={{ height: '450px',marginBottom:'40px',width:'90%'}}></div>
        )
    }
}




//====================TimeTable component=====================
const timeColumnsNames = {
    profitability: {
        date:'时间',
        roe: "净资产报酬率",
        roa: "总资产报酬率",
        gpm: "销售毛利率",
        opm: "主营业务利润率",
        npm: "净利润率",
        operate: "操作"
    },
    solvency: {
        date:'时间',
        currentRatio: "流动比率",
        quickRatio: "速动比率",
        cashRatio: "现金比率",
        debtRatio: "资产负债率",
        equityRatio: "产权比率",
        interestCRatio: "利息保障倍数",
        operate: "操作"
    }
}

@connect(state => {
    return {
        financeInfo: state.financeInfo,
        selectFirmCode: state.financeInfo.selectFirmCode
    }
}, {deleteDate,changeRange})
class ProfitTabTimeTable extends Component {

    handleDeleteDate = record => {
        this.props.deleteDate(this.props.selectFirmCode,record.date)
        message.success('移除成功!')
    }

    handlePickDate = (dates, datesString) => {
        const [startDate,endDate] = datesString
        this.props.changeRange(this.props.selectFirmCode,startDate,endDate)
    }


    render() {
        let dataSource = this.props.dataSource.filter(obj => obj.stkcd === this.props.selectFirmCode)
        dataSource = dataSource[0] ? dataSource[0].profitability : null
        console.log(this.props);
        
        //columns
        const profitabilityColumns = Object.keys(timeColumnsNames.profitability).map((k, i) => {
            if (k === 'operate') {
                return {
                    title: (<span style={{ color: '#1890ff' }}>
                        {timeColumnsNames.profitability[k]}
                    </span>),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <Button.Group >
                                <Button type='primary' ghost style={{ border: 'none', padding: "0px 3px" }}>标记</Button>
                                <Popconfirm title="确定要移除该年份?" okText='确定' cancelText='取消'
                                    onConfirm={() => this.handleDeleteDate(record)}
                                >
                                    |<Button type='danger' ghost style={{ border: 'none', padding: "0px 3px" }}>移除</Button>
                                </Popconfirm>
                            </Button.Group>
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
                                '本年':[moment().startOf('year'),moment()],
                                '过去五年':[moment().subtract(5,'y'),moment()],
                            }}
                            placeholder={['开始时间','结束时间']}
                            onChange={this.handlePickDate}
                        />
                    ),
                    dataIndex: k,
                    render: (text, record) => {
                        return (
                            <div style={{ color: '#1890ff' }}>{text}</div>
                        )
                    }
                }
            }
            return {
                title: (<span style={{ color: '#1890ff' }}>
                    {timeColumnsNames.profitability[k]}(%)
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

        const columns = {
            profitabilityColumns,
            // solvencyColumns: data[0].solvencyColumns,
        }

        return (
            <Spin spinning={this.props.financeInfo.isLoading}>
                <Table
                    size='middle'
                    bordered={false}
                    rowKey={(record) => record.date}
                    dataSource={dataSource}
                    columns={columns.profitabilityColumns}
                    footer={() => {
                        return <p type='warning'>注:...</p>
                    }}
                />
            </Spin>
        )
    }
}



//========================TimeChart component====================
class ProfitTabTimeChart extends Component {
    render() {
       
        return (
            <div>
                ProfitTabTimeChart
            </div>
        )
    }
}


export {
    ProfitTabTable,
    ProfitTabChart,
    ProfitTabTimeTable,
    ProfitTabTimeChart
}
