import React, { Component, createRef } from 'react'
import echarts from 'echarts'
import _ from 'lodash'

    
const option = {

    title: {
        subtext: 
        `持续性:ROA_8years
            ROC_8years
成长性:MG
稳定性:MS`,
        subtextStyle:{
            color:"#f50"
        }
        // top:'10%',
    },
    legend: {
        // right: '0%',
        data: ["ROA_8years", "ROC_8years", "MG", "MS"],
        // orient: 'vertical',
        // align: 'left',
        // top: '30%',
        itemGap: 20,
        selected: {
            "MG":false,
            "MS":false
        }
    },
    tooltip: {
        show: true,
        trigger: "axis",
        axisPointer:{
            type:'shadow'
        }
    },
    grid:{
        left:"15%",
    },
    xAxis:
    {
        type: 'category',
        name: '时间',
        nameLocation: 'end',
        axisLabel: {
            interval: 0,
            // fontWeight:'bold'
        },
        data: [],
    }
    ,
    yAxis: [
        {
            type: 'value',
            // name: '比率',
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
            name: "ROA_8years", 
            type: 'line',
            symbol: 'diamond',//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 12,
            lineStyle: {
                width: 2,
                type: 'dashed'
            },
            data:[]
        },
        {
            name: "ROC_8years", 
            type: 'line',
            symbol: 'diamond',
            symbolSize: 12,
            lineStyle: {
                width: 2,
                type: 'dashed'
            },            
            data:[]
        },
        {
            name: "MG", 
            type: 'line',
            symbol: 'triangle',
            symbolSize: 12,
            data:[]
        },
        {
            name: "MS", 
            type: 'line',
            symbol: 'circle',
            symbolSize: 12,
            data:[]
        },
    ]
}
 

class ProfitQuality extends Component {
    constructor(props){
        super(props)
        this.chartRef = createRef()
    }

    drawChart=()=>{
        const chart = echarts.init(this.chartRef.current)
        chart.setOption(option)
        let data = _.cloneDeep(this.props.profitQualityInfo)
        
        data =  _.mapValues(data,v=>{
                       return v.reduce((o1, o2) => {
                            return _.mergeWith(o1, o2, (o1v, o2v) => {
                                if (_.isArray(o1v)) {
                                    return o1v.concat(o2v)
                                }
                                return [o1v, o2v]
                            })
                        })
                    })

        chart.setOption({
            xAxis:{
                data: data.MG.date
            },
            series: Object.keys(data).map(k=>{
                 return {
                     data: data[k].value
                 }
            })
        })
    }

    componentDidMount(){
        this.drawChart()
    }

    render() {
        // console.log(this.props);

        return (
            <div ref={this.chartRef} 
                style={{ height: 350, width: 1000, marginLeft: 50,marginTop:15}}
            >
            </div>
        )
    }
}

export default  ProfitQuality