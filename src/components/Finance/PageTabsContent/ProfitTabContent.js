import React,{Component,createRef} from 'react'
import { Button, Popconfirm, Tag, Rate,Table, message, Spin, Badge } from 'antd'
import echarts from 'echarts'
import { connect } from 'react-redux'


import { deleteFirm,addFirm} from '../../../redux/actions'

//===========table component=========================
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
        isLoading: state.financeInfo.isLoading,
        firmCount: state.financeInfo.firmCount
    }
},{deleteFirm,addFirm})
class ProfitTabTable extends Component {
    constructor(props){
        super(props)
        this.state={
            dataSource:[]
        }
    }
    //table
    handleDelete = record => {
        const stkcd = /^\d{6}/.exec(record.stkcd)
        this.props.deleteFirm(stkcd[0])
        message.success('移除成功!')
    }

    handleDefaultAdd = () => {
        this.props.addFirm()
        message.success('添加成功!')
    };


  
    render() {
        // console.log(this.props.firmCount);
        
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
                                <Popconfirm title="确定要移除该公司?" onConfirm={() => this.handleDelete(record)}>
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
                        <Badge count={this.props.firmCount} showZero overflowCount={10}>
                            <Button 
                                // ghost
                                size='small'
                                onClick={this.handleDefaultAdd}
                                type="primary"
                                shape='round'
                                icon='plus'>
                                  可比公司
                              </Button>
                        </Badge>),
                    dataIndex: k,
                    render: (text, record) => {
                        const { stkcd } = record
                        return (
                            <Tag style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                border: 0,
                                backgroundColor: 'transparent',
                                color: '#1890ff'
                            }}>
                                {stkcd}
                            </Tag>
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
          <Spin spinning={this.props.isLoading}>
            <Table
                size='middle'
                bordered={false}
                rowKey={(record)=>record.stkcd}
                dataSource={this.props.dataSource}
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
//===============chart component=====================
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


export {
    ProfitTabTable,
    ProfitTabChart
}