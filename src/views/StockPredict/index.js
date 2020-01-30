import React, { Component } from 'react'
import echarts from 'echarts'
import { Table,Card,Statistic,Tag,Spin} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined,FieldNumberOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'


import './index.less'
import { getStockPredict } from '../../api'
import SearchBar from '../../components/StockPredict'

const upColor = '#ec0000';
const downColor = '#00da3c';


// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
const rawData = [
    ['2019/1/24', 232.26, 232.26, 228.3, 236.94, Math.random() * 100000],
    ['2019/1/25', 230, 229, 228.2, 230.3, Math.random() * 100000],
    ['2019/1/28', 229.35, 234.5, 229.35, 234.92, Math.random() * 100000],
    ['2019/1/29', 234.22, 235.98, 233.35, 236.8, Math.random() * 100000],
    ['2019/1/30', 236.75, 238.48, 234.89, 238.76, Math.random() * 100000],
    ['2019/1/31', 238.43, 238.42, 237.23, 239.82, Math.random() * 100000],
    ['2019/2/1', 237.41, 241.02, 236.57, 242.15, Math.random() * 100000],
    ['2019/2/4', 242.92, 242.15, 241.58, 244.38, Math.random() * 100000],
    ['2019/2/5', 241, 243.1, 240, 243.4, Math.random() * 100000],
    ['2019/2/6', 243.68, 243.48, 242.7, 244.73, Math.random() * 100000],
    ['2019/2/7', 243.69, 241.53, 239.22, 243.89, Math.random() * 100000],
    ['2019/2/8', 241.62, 243.4, 241.4, 244.03, Math.random() * 100000],
    ['2019/2/18', 244.91, 242.56, 241.43, 244.8, Math.random() * 100000],
    ['2019/2/19', 242.26, 238.91, 237.53, 242.07, Math.random() * 100000],
    ['2019/2/20', 238.49, 239.18, 237.61, 239.94, Math.random() * 100000],
    ['2019/2/21', 237.82, 232.95, 230.17, 237.82, Math.random() * 100000],
    ['2019/2/22', 232.94, 231.16, 230.76, 233.88, Math.random() * 100000],
    ['2019/2/25', 232.62, 232.82, 231.01, 233.78, Math.random() * 100000],
    ['2019/2/26', 231.74, 229.34, 228.89, 234.71, Math.random() * 100000],
    ['2019/2/27', 229.77, 231.22, 229.03, 232.63, Math.random() * 100000],
    ['2019/2/28', 232.32, 236.59, 230.92, 236.16, Math.random() * 100000],
    ['2019/3/1', 236.54, 235.51, 233.86, 236.65, Math.random() * 100000],
    ['2019/3/4', 233.08, 227.4, 225.25, 233.54, Math.random() * 100000],
    ['2019/3/5', 227.81, 232.31, 227.1, 232.14, Math.random() * 100000],
    ['2019/3/6', 233.61, 234.18, 232.6, 235.44, Math.random() * 100000],
    ['2019/3/7', 234.44, 232.29, 230.27, 235.02, Math.random() * 100000],
    ['2019/3/8', 232.42, 231.61, 231.59, 233.67, Math.random() * 100000],
    ['2019/3/11', 231.68, 231.59, 229.58, 232.96, Math.random() * 100000],
    ['2019/3/12', 230.16, 228.6, 226.83, 233.29, Math.random() * 100000],
    ['2019/3/13', 228.17, 226.97, 225.25, 228.33, Math.random() * 100000],
    ['2019/3/14', 225.77, 227.28, 225.31, 227.22, Math.random() * 100000],
    ['2019/3/15', 226.31, 227.4, 225, 231.0, Math.random() * 100000],
    ['2019/3/18', 226.29, 224.02, 223.21, 227.05, Math.random() * 100000],
    ['2019/3/19', 224.26, 225.43, 223.02, 226.31, Math.random() * 100000],
    ['2019/3/20', 225.74, 231.37, 225.42, 231.86, Math.random() * 100000],
    ['2019/3/21', 231.21, 232.24, 231.6, 233.81, Math.random() * 100000],
    ['2019/3/22', 232.4, 232.28, 231.97, 233, Math.random() * 100000],
    ['2019/3/25', 233.74, 232.72, 231.91, 234.89, Math.random() * 100000],
    ['2019/3/26', 231.58, 229.67, 228.12, 231.99, Math.random() * 100000],
    ['2019/3/27', 229.38, 230.26, 228, 232.4, Math.random() * 100000],
    ['2019/3/28', 227.55, 223.3, 223.91, 227.55, Math.random() * 100000],
    ['2019/3/29', 223.49, 223.62, 222.81, 224.87, Math.random() * 100000],
    ['2019/4/1', 222.46, 223.4, 222.31, 224.95, Math.random() * 100000],
    ['2019/4/2', 223.9, 222.74, 222.44, 225.42, Math.random() * 100000],
    ['2019/4/3', 223.69, 222.29, 221.25, 224.34, Math.random() * 100000],
    ['2019/4/8', 219.24, 221.59, 218.67, 221.59, Math.random() * 100000],
    ['2019/4/9', 221.47, 222.77, 221.47, 223.73, Math.random() * 100000],
    ['2019/4/10', 222.93, 222.13, 221.56, 223.04, Math.random() * 100000],
    ['2019/4/11', 223.98, 221.55, 221.26, 224.48, Math.random() * 100000],
    ['2019/4/12', 221.09, 220.78, 220.44, 222.26, Math.random() * 100000],
    ['2019/4/15', 219.91, 218.94, 217.39, 220.99, Math.random() * 100000],
    ['2019/4/16', 216.63, 219.85, 216.78, 219.43, Math.random() * 100000],
    ['2019/4/17', 219.03, 219.8, 217.47, 219.51, Math.random() * 100000],
    ['2019/4/18', 218.82, 219.6, 217.44, 220.03, Math.random() * 100000],
    ['2019/4/19', 220.12, 224.64, 220.58, 225.11, Math.random() * 100000],
    ['2019/4/22', 223.4, 224.17, 223.26, 224.12, Math.random() * 100000],
    ['2019/4/23', 224.62, 218.54, 218.81, 224.62, Math.random() * 100000],
    ['2019/4/24', 218.35, 221.32, 218.11, 222.12, Math.random() * 100000],
    ['2019/4/25', 221.19, 219.31, 219.85, 222.63, Math.random() * 100000],
    ['2019/4/26', 220.89, 217.91, 217.86, 221.58, Math.random() * 100000],
    ['2019/5/2', 217.78, 217.12, 216.14, 217.65, Math.random() * 100000],
    ['2019/5/3', 217.05, 220.5, 217.05, 222.81, Math.random() * 100000],
    ['2019/5/6', 221.5, 223.17, 221.5, 223.07, Math.random() * 100000],
    ['2019/5/7', 222.86, 223.57, 221.44, 224.26, Math.random() * 100000],
    ['2019/5/8', 224.39, 224.3, 223.42, 225.21, Math.random() * 100000],
    ['2019/5/9', 224.96, 223.97, 222.38, 224.86, Math.random() * 100000],
    ['2019/5/10', 222.82, 224.83, 222.81, 224.67, Math.random() * 100000],
    ['2019/5/13', 224.68, 224.92, 223.36, 225.85, Math.random() * 100000],
    ['2019/5/14', 223.9, 221.01, 220.87, 223.93, Math.random() * 100000],
    ['2019/5/15', 221.09, 222.8, 221.58, 222.19, Math.random() * 100000],
    ['2019/5/16', 222.34, 225.81, 221.77, 225.87, Math.random() * 100000],
    ['2019/5/17', 224.81, 228.87, 224.41, 228.09, Math.random() * 100000],
    ['2019/5/20', 228.33, 229.99, 228.9, 230.39, Math.random() * 100000],
    ['2019/5/21', 229.11, 230.11, 229.12, 230.3, Math.random() * 100000],
    ['2019/5/22', 230.75, 230.4, 229.43, 231.18, Math.random() * 100000],
    ['2019/5/23', 229.81, 227.67, 227.1, 230.95, Math.random() * 100000],
    ['2019/5/24', 228.45, 228.53, 227.25, 229.59, Math.random() * 100000],
    ['2019/5/27', 228.66, 229.08, 228.94, 230.7, Math.random() * 100000],
    ['2019/5/28', 229.4, 232.32, 228.47, 232.1, Math.random() * 100000],
    ['2019/5/29', 232.54, 232.02, 232.17, 233.33, Math.random() * 100000],
    ['2019/5/30', 231.25, 231.75, 231.49, 232.72, Math.random() * 100000],
    ['2019/5/31', 232.74, 230.59, 229.37, 232.53, Math.random() * 100000],
    ['2019/6/3', 230.21, 229.25, 229.11, 231.43, Math.random() * 100000],
    ['2019/6/4', 229.1, 227.42, 226.76, 229.1, Math.random() * 100000],
    ['2019/6/5', 227.71, 227.93, 226.87, 227.86, Math.random() * 100000],
    ['2019/6/6', 226.43, 224.11, 224.07, 226.69, Math.random() * 100000],
    ['2019/6/7', 224.26, 221.9, 220.07, 225.63, Math.random() * 100000],
    ['2019/6/13', 219.1, 214.35, 212.22, 219.1, Math.random() * 100000],
]
let data0 = splitData(rawData);

function splitData(rawData) {
    let categoryData = [];
    let values = []
    let volumes = []
    for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes:volumes
    };
}

function calculateMA(dayCount) {
    let result = [];
    for (let i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }
        result.push((sum / dayCount).toFixed(3));
    }
    return result;
}

const option = {
    legend: {
        // bottom: 5,
        top:10,
        left: 'center',
        data: ['oclh', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
            let obj = { top: 10 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },
        // extraCssText: 'width: 170px'
    },
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
            backgroundColor: '#777'
        }
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: false
            },
            brush: {
                type: ['lineX', 'clear']
            }
        },
        top:30,
        right:50
    },
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
            colorAlpha: 0.1
        }
    },
    visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [{
            value: 1,
            color: downColor
        }, {
            value: -1,
            color: upColor
        }]
    },
    grid: [
        {
            left: '6%',
            right: '7%',
            height: '48%',
            top:'15%'
        },
        {
            left: '6%',
            right: '7%',
            top: '81%',
            height: '20%'
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            // splitNumber: 20,
            // min: 'dataMin',
            // max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: data0.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            // splitNumber: 20,
            // min: 'dataMin',
            // max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }
    ],
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 40,
            end: 100
        },
        {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '70%',
            start: 40,
            end: 100
        }
    ],
    series: [
        {
            name: 'oclh',
            type: 'candlestick',
            data: [],
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: null,
                borderColor0: null
            },
            markPoint: {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                data: [
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                ],
            },
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            symbolSize:3,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            symbolSize:2,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            symbolSize: 2,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            symbolSize:2,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'Volume',
            type: 'bar',
            id:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
        }
    ]
}

const columns = [
    {
        title:'公司代码',
        dataIndex:'stkcd',
        render:(value)=>value? value:null
    },
    {
        title:'公司简称',
        dataIndex:'name',
        width:110,
    },
    {
        title: <span>上一交易<br />日收盘价</span>,
        dataIndex:'stockPriceLastDay',
        render: (value) => value? value:null,
    },
    {
        title: <span>预计下一交<br/>易日收盘价</span>,
        dataIndex:'stockPriceNextDay',
        render: (value, record) => {
            const { stockPriceLastDay } = record
            if(value==='我的关注'){
                return <Tag color='red'>{value}</Tag >
            }
            if (stockPriceLastDay < value) {
                return (
                    <span style={{ color: 'red', display: 'flex' }}>
                        {value}<ArrowUpOutlined />
                    </span>
                )
            }
            else if (stockPriceLastDay > value) {
                return (
                    <span style={{ color: 'green', display: 'flex' }}>
                        {value}<ArrowDownOutlined/>
                    </span>
                )
            } else {
                return (
                    <span>
                        {value}
                    </span>
                )
            }
        }
    },
    {
        title: <span>预计<br/>涨(跌)幅</span>,
        dataIndex:'InDecreasePredict',
        render:(value,record)=>{
            const { stockPriceLastDay, stockPriceNextDay} = record
            const spread = ((stockPriceNextDay-stockPriceLastDay)/stockPriceLastDay).toFixed(2)

            if(!value){
                return
            }

            if(stockPriceLastDay<stockPriceNextDay){
                return (
                    <span style={{ color: 'red', display: 'flex'}}>
                        {spread}%<ArrowUpOutlined/>
                    </span>
                )
            }
            else if(stockPriceLastDay>stockPriceNextDay){
                return (
                    <span style={{color:'green',display:'flex'}}>
                        {spread}%<ArrowDownOutlined/>
                    </span>
                )
            }else{
                return (
                    <span>
                        {spread}%
                    </span>
                )
            }
        }
    },
    {
        title: <span>预计<br/>可能性</span>,
        dataIndex:'predictProb',
        render:value=> value? (<span>{value}%</span>):null
    },
    {
        title: <span>上一交易日<br/>预计误差</span>,
        dataIndex:'predictStdErr',
        render:(value)=> 
            value?
                (<span>
                    {(Math.random()*0.1-0.05).toFixed(2)}
                </span>)
                :null
    },
]


@connect(state=>state.userInfo)
class StockPredict extends Component {
    state = {
        followsDataSource:[],
        searchDataSource:[{stkcd:''}],
        selectRecord:{stkcd:'',name:''},
        isLoading:true,
        tableIsLoading:true,
        chartIsLoading:true
    }

    drawChart = () => {
        const chart = echarts.init(this.refs.chartRef)
        chart.setOption(option)

        //为了体现重渲染的效果。实际数据没变，之后需删除
        this.setState({
            chartIsLoading: true
        })
        chart.setOption({
            series: [
                {
                    data: data0.values
                }, {
                    id: 'bar',
                    data: data0.volumes
                }
            ]
        })

        setTimeout(() => {
            this.setState({
                chartIsLoading: false
            })
        }, 500);
    }

    getFollowsData =  async ()=>{
        const {follows} = this.props
        let followsData = [
            {
                stkcd:'',
                stockPriceNextDay:'我的关注'
            }
        ]
        for (let stkcd of follows){
            const oneStockPredict = await getStockPredict(stkcd)
            followsData.push({
                ...oneStockPredict.data,
                stkcd
            }) //为了展示效果替换了stkcd
        }
        
        this.setState({
            followsDataSource:followsData,
            selectRecord:followsData[1],
            isLoading:false
        })
    }
    getSearchData =  async ()=>{
        this.setState({
            tableIsLoading:true
        })
        const {searches} = this.props

        let searchData = []
        for (let stkcd of searches){
            const oneSearchStockPredict = await getStockPredict(stkcd)
            searchData.push({
                ...oneSearchStockPredict.data,
                stkcd
            }) //为了展示效果替换了stkcd
        }
        this.setState({
            searchDataSource: searchData,
            tableIsLoading:false
        })
    }

    componentDidMount() {
        this.drawChart()
        this.getFollowsData()
        this.getSearchData()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.searches!==prevProps.searches){
            this.getSearchData()
        }
        if(this.state.selectRecord!==prevState.selectRecord){
            this.drawChart()
        }
    }

    render() {
        
        const {
            followsDataSource,
            searchDataSource,
            selectRecord,
            isLoading,
            tableIsLoading,
            chartIsLoading
        } = this.state
        const dataSource = searchDataSource.concat(followsDataSource)
        //eslint-disable-next-line
        const [lastSearchData,...otherSearchData] = searchDataSource.reverse()
        const {stkcd,stockPriceNextDay,predictProb} = lastSearchData
        
        return (
            <Spin spinning={isLoading}>
            <div className='stock-predict'>
                <Spin spinning={chartIsLoading}>
                <div className='chart'>
                    <h1 className='chart-title'>{selectRecord.stkcd + ' ' +selectRecord.name+' '}K线图</h1>
                    <div ref='chartRef' className='k-chart'></div>
                </div>
                </Spin>
                <div className='predict-content'>
                    <div className='predict-card'>
                        <Card title={<SearchBar/>} >
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Statistic
                                    className="statistic-stkcd"
                                    title='Stkcd'
                                    value={stkcd}
                                    valueStyle={{ color:'#2db7f5'}}
                                    groupSeparator=''
                                    prefix={<FieldNumberOutlined />}
                                    />
                                <Statistic
                                    title="Pred.Price"
                                    value={stockPriceNextDay}
                                    precision={2}
                                    valueStyle={{ color: '#2db7f5' }}
                                    prefix='¥'
                                    suffix=" 元" 
                                    />
                                <Statistic
                                    title="Pred.Prob"
                                    value={predictProb}
                                    precision={2}
                                    valueStyle={{ color: '#2db7f5' }}
                                    suffix="%" 
                                    />
                            </div>
                        </Card>
                    </div>
                    <div className='predict-table'>
                        <Table 
                            loading={tableIsLoading}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{hideOnSinglePage:true}}
                            rowKey={record=>record.stkcd}
                            size='small'
                            rowSelection={{
                                type:'radio',
                                columnWidth:20,
                                onSelect: (record) => (
                                    record.stkcd?
                                        this.setState({ 
                                            selectRecord: record,
                                         })
                                        : null
                                ),
                                selectedRowKeys:[selectRecord.stkcd]
                            }}
                            />
                    </div>
                </div>
            </div>
            </Spin>
        )
    }
}


export default StockPredict