import React,{Component,createRef} from 'react'
import { Table } from 'antd'
import echarts from 'echarts'


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
            "总资产报酬率":false,
            "销售毛利率":false,
            "主营业务利润率":false,
            "净利润率":false,
        },
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    xAxis: {
        type: 'category',
        name:"公司代码",
        // nameLocation:'center',
        nameTextStyle:{
            padding:[30,0,0,0],
            fontWeight:'bold',
            fontSize:14,
        },
        boundaryGap: true,
        data: [] 
    },
    yAxis: {
        name:"比率",
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
            barMaxWidth:'40%'
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
            barMaxWidth:'40%'
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
            barMaxWidth:'40%'
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
            barMaxWidth:'40%'
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
            barMaxWidth:'30%'
        },
        //line
        {
            name: '净资产报酬率',
            type: 'line',
            smooth:true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type:'average' } //yAxis: 50
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
            smooth:true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type:'average' } //yAxis: 50
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
            smooth:true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type:'average' } //yAxis: 50
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
            smooth:true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type:'average' } //yAxis: 50
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
            smooth:true,
            data: [],
            // markPoint: {
            //     data: [
            //         { type: 'max', name: '最大值' },
            //         { type: 'min', name: '最小值' }
            //     ]
            // },
            markLine: {
                data: [
                    { name: '行业平均值', type:'average' } //yAxis: 50
                ],
                label: { formatter: '{c}%行业均值', position: 'end' },
                // lineStyle: {
                //     color: '#2db7f5'
                // }
            }
        }
    ]
};



//===========table component=========================
export const ProfitTabTable = props => {
    return (
        <Table
        size='middle'
        bordered={false}
        rowKey = {props.rowKey}
        dataSource={props.dataSource}
        columns={props.columns}
        footer={()=>{
            return <p type='warning'>注:...</p>
        }}
        />
    )
}

//===============chart component=====================
export class ProfitTabChart extends Component {
    constructor(props){
        super(props)
        this.lineBarChartRef = createRef()
    }
    drawChart = ()=>{
        const lineBarChart = echarts.init(this.lineBarChartRef.current)
        lineBarChart.setOption(chartOption)
        const seriesData = this.props.dataSource.map(obj => {
                return {
                    data: Object.values(obj).slice(0, 5)
                }
        })
        lineBarChart.setOption({
            xAxis: {
                data: this.props.dataSource.map(obj => obj.stkcd)
            },
            series: seriesData.concat(seriesData)
        })
    }
    componentDidMount(){
        this.drawChart()
    }
    render() {
        return (
            <div ref={this.lineBarChartRef} style={{ height: '450px' }}></div>
        )
    }
}
