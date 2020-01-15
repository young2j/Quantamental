import React, { Component,createRef } from 'react'
import echarts from 'echarts'

const option = {
    title:[
        {
            text:'RNOA = PM x ATO',
            left:'75%',
            top:'15%',
        },
        {
            text: 'PM十分位数时间序列表现',
            textStyle:{
                fontSize:11,
                color:"#1d3658"
            },
            top:'2%'
        },
        {
            text: 'ATO十分位数时间序列表现',
            textStyle:{
                fontSize:11,
                color:"#ed6b5a"
            },
            top:'50%'
        }
    ],
    legend: [
        {data:['indPM','PM'],itemGap:25,left:'30%',top:'5%'},
        { data: ['indATO', 'ATO'], left: '30%',top:"52%"}
    ],
    tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer:{
            type:'cross'
        }
    },
    dataset: [
        {source:[]},
        {source:[]},
        {source:[]}
        ],
    xAxis: [
            { type: 'category',name:'时间',gridIndex:0,axisLabel:{interval:0,rotate:20}},
            { type: 'category', name: '时间', gridIndex: 1,axisLabel: { interval: 0, rotate: 20 }},
        ],
    yAxis: [
            { gridIndex: 0, type: 'value'},
            { gridIndex: 1, type:'value' },
        ],
        
    grid: [
            { bottom: '60%',right:'35%'},
            { top: '57%',right:"35%" },
        ],
    series: [
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:1},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:2},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:3},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:4},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:5},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:6},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:7},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:8},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'indPM', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:9},datasetIndex:0,xAxisIndex:0,yAxisIndex:0},
        { type: 'line',name:'PM', smooth: true, symbol:'triangle', symbolSize:12, encode:{x:0,y:1},datasetIndex:2,xAxisIndex:0,yAxisIndex:0},
        
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:1},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:2},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:3},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:4},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:5},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:6},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:7},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:8},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line',name:'indATO', smooth: true, symbol:"none",lineStyle:{type:'dashed',width:1},encode:{x:0,y:9},datasetIndex:1,xAxisIndex:1,yAxisIndex:1},
        { type: 'line', name: 'ATO', smooth: true, symbol: 'triangle', symbolSize: 12, encode: { x: 0, y: 2 },datasetIndex:2,xAxisIndex:1,yAxisIndex:1},


        {
            type: 'pie',
            id: 'pie',
            datasetIndex:2,
            seriesLayoutBy:'row',
            radius: '30%',
            center: ['85%', '55%'],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }},             
            label: {
                formatter: '{b}: {@2019-12-31} ({d}%)',
            },
            encode: {
                itemName: 'item',
                value: '2019-12-31',
                },
            tooltip: {
                trigger: 'item',
                showContent: true,
                formatter: '{b}({d}%)'
            },
        }
    ]
};



export default class OperationQuality extends Component {
    constructor(props){
        super(props)
        this.chartRef = createRef()    
    }

    drawChart = () => {
        const chart = echarts.init(this.chartRef.current)
        chart.setOption(option)

        const {operationQualityInfo} = this.props
        const indPMDataSource = operationQualityInfo.map(obj => {
            let indPM = obj.PM.indPercentiles
            indPM.unshift(obj.date)
            return indPM
        })
        const indATODataSource = operationQualityInfo.map(obj => {
            let indATO = obj.ATO.indPercentiles
            indATO.unshift(obj.date)
            return indATO
        })


        const firmDataSource = operationQualityInfo.map(obj => {
            let pmATO = [obj.PM.firmOwn,obj.ATO.firmOwn]
            pmATO.unshift(obj.date)
            return  pmATO
        })
        firmDataSource.unshift(['item','PM','ATO'])

        
        chart.setOption({

            dataset:[
                { source:indPMDataSource},
                { source:indATODataSource},
                { source:firmDataSource}
            ],
        })

        chart.on('updateAxisPointer', event => {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value+1
            chart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    // labelLine:{
                    //     length:15,
                    //     length2:10,
                    // },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            })
            }
        })

    }
    
    componentDidMount(){
        this.drawChart()
    }

    render() {
        return (
            <div ref={this.chartRef} style={{ height: 520, width: 1000,marginLeft:50}}>OperationQuality</div>
        )
        
    }
}




