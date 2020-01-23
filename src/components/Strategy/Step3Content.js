import React, {Component,createRef} from 'react'
import { DatePicker,InputNumber,Button,Table,Select} from 'antd'
import echarts from 'echarts'
import Moment from 'moment'
import {extendMoment} from 'moment-range'

const moment = extendMoment(Moment)
const {RangePicker} = DatePicker
const {Option} = Select

const option = {
    title:{
        text:'组合净值',
        left:'6%'
    },
    legend: {
        data: [],
        inactiveColor: '#777',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
                color: '#376df4',
                width: 2,
                opacity: 1
            }
        }
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLine: { lineStyle: { color: '#8392A5' } }
    },
    yAxis: {
        type:'value',
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false }
    },
    grid: {
        bottom: 80
    },
    dataZoom: [{
        textStyle: {
            color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        dataBackground: {
            areaStyle: {
                color: '#8392A5'
            },
            lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
            }
        },
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }, {
        type: 'inside'
    }],
    animation: false,
    series: [
        {
            type: 'line',
            name: '',
            data: [],
            showSymbol: false,
            itemStyle: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
            }
        },
        {
            type: 'line',
            name: '组合1',
            data: [],
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
        {
            type: 'line',
            name: '组合2',
            data:[],
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
        {
            type: 'line',
            name: '组合3',
            data: [],
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
    ]
}

const dataSource = [
    {
        key: 1,
        item: '累计收益%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 2,
        item: '年化复合收益%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 3,
        item: '年化超额收益%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 4,
        item: '信息比率',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 5,
        item: '月最大超额收益%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 6,
        item: '月最小超额收益%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 7,
        item: '跑赢基准月份占比',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 8,
        item: '上升市场跑赢基准占比%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 9,
        item: '下跌市场跑赢基准占比%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
    {
        key: 10,
        item: '正收益月份占比%',
        pf1: (Math.random() * 200).toFixed(2),
        pf2: (Math.random() * 200).toFixed(2),
        pf3: (Math.random() * 200).toFixed(2),
        base: (Math.random() * 200).toFixed(2),
    },
]
class Step3Content extends Component {
  constructor(props){
    super(props)  
    this.state={
        dateRange: [moment('2016-01-01'), moment('2019-12-31')],
        percent:20,
        base:'沪深300',
      }
    this.chartRef = createRef()
  }

  drawChart = ()=>{
    const chart = echarts.init(this.chartRef.current)
    chart.setOption(option)
    //模拟生成数据data，实际需从后端获取
    const {dateRange,base} = this.state
    const xAxis = Array.from(
            moment.range(dateRange[0],dateRange[1]).by('month')
        ).map(d=>d.format('YYYY-MM-DD'))
    let datas=[]
    let i=0
    while(i<4){
        let data = []
        xAxis.forEach(x=>data.push((Math.random()*5).toFixed(4)))
        datas.push(data)
        i++
    }

    chart.setOption({
        legend:{
            data: [base, '组合1', '组合2', '组合3']
        },
        xAxis:{
            data:xAxis
        },
        series:[
            {
                name:this.state.base,
                data:datas[0]
            },{
                data:datas[1]
            },{
                data:datas[2]
            },{
                data:datas[3]
            }
        ]
    })
  }
  componentDidMount(){
    this.drawChart()
  }

  render(){
    const {percent,dateRange,base} = this.state
    const columns = [
        {
            title: '指标',
            dataIndex: 'item'
        },
        {
            title: '组合1',
            dataIndex: 'pf1'
        },
        {
            title: '组合2',
            dataIndex: 'pf2'
        },
        {
            title: '组合3',
            dataIndex: 'pf3'
        },
        {
            title: base,
            dataIndex: 'base'
        },
    ]

    return (
        <div>
            <div className="backtest-condition" 
                style={{ display: 'flex',marginTop:30 }}>
                <div style={{flex:0.2}}>
                    <span style={{fontWeight:'bold'}}>选择分组因子：</span> 前&nbsp;
                    <InputNumber
                        style={{width:70}}
                        defaultValue={percent}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={value=>this.setState({percent:value})}
                        size='small'
                    />
                </div>
                <div style={{ flex: 0.35}}>
                    <span style={{ fontWeight: 'bold' }}>选择回测时间范围：</span>
                    <RangePicker
                    style={{width:230}}
                    defaultValue={dateRange}
                    value={dateRange}
                    size='small'
                    onChange={(dates,datesString)=>this.setState({dateRange:dates})}
                    getPopupContainer={triggerNode=>triggerNode}
                    />
                </div>
                <div style={{flex:0.25}}>
                    <span style={{fontWeight:'bold'}}>选择基准：</span>
                     <Select defaultValue={base}
                        style={{ width: 120 }} 
                        size='small'
                        getPopupContainer={triggerNode=>triggerNode}
                        onChange={value=>this.setState({base:value})}>
                        <Option value="沪深300">沪深300</Option>
                        <Option value="中证500">中证500</Option>
                        <Option value="上证50">上证50</Option>
                        <Option value="上证综指">上证综指</Option>
                        <Option value="深圳成指">深圳成指</Option>
                        <Option value="创业板指">创业板指</Option>
                    </Select>
                </div>
                <Button type='primary' ghost
                    shape='round' size='small'
                    onClick={()=>this.drawChart()} //实际根据state的值向后端请求数据
                >点击回测</Button>
            </div>
            <div className='backtest-content'
                style={{display:'flex',justifyContent:'space-between',marginTop:50}}
            >
                <div className='backtest-chart' 
                    ref={this.chartRef}
                    style={{ height: 460, width: "60%", left: -40}}
                >
                </div>
                <div className='backtest-card'>
                    <Table
                        title={()=> (
                            <p style={{
                                fontWeight:'bold',
                                fontSize:16,
                                textAlign:'center',
                                marginBottom:0}}
                            >组合收益率</p>)}
                        columns={columns}
                        dataSource={dataSource}
                        size='small'
                        pagination={false}
                    />                       
                </div>
            </div>
        </div>
    )
  }
}

export default Step3Content
