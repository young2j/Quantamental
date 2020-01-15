import React, { Component, createRef } from 'react'
import echarts from 'echarts'
import { Card,Statistic } from 'antd'

import './index.less'

const iconC = <svg t="1579075329970" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14506" width="32" height="32"><path d="M811.707317 1024h-599.414634C94.907317 1024 0 929.092683 0 811.707317v-599.414634C0 94.907317 94.907317 0 212.292683 0h599.414634C929.092683 0 1024 94.907317 1024 212.292683v599.414634c0 117.385366-94.907317 212.292683-212.292683 212.292683zM212.292683 24.97561C109.892683 24.97561 24.97561 109.892683 24.97561 212.292683v599.414634C24.97561 914.107317 109.892683 999.02439 212.292683 999.02439h599.414634c102.4 0 187.317073-84.917073 187.317073-187.317073v-599.414634C999.02439 109.892683 914.107317 24.97561 811.707317 24.97561h-599.414634z" p-id="14507"></path><path d="M736.780488 634.380488l272.234146 34.965853c-7.492683 29.970732-122.380488 74.926829-134.868293 99.902439-24.97561 52.44878-57.443902 94.907317-97.404878 127.37561-59.941463 44.956098-134.868293 67.434146-227.278048 67.434147-114.887805 0-207.297561-39.960976-279.72683-117.385366s-109.892683-184.819512-109.892683-319.687805c0-142.360976 37.463415-254.75122 109.892683-332.17561s169.834146-117.385366 289.717074-117.385366c104.897561 0 189.814634 29.970732 254.751219 92.409756 39.960976 37.463415 67.434146 89.912195 87.414634 157.346342l-172.331707 39.960975c-9.990244-44.956098-32.468293-79.921951-62.439025-104.897561S594.419512 224.780488 549.463415 224.780488c-62.439024 0-114.887805 22.478049-154.848781 67.434146s-59.941463 119.882927-59.941463 222.282927c0 107.395122 19.980488 184.819512 57.443902 232.273171s89.912195 69.931707 152.35122 69.931707c44.956098 0 84.917073-14.985366 119.882927-44.956098 32.468293-29.970732 57.443902-74.926829 72.429268-137.365853z" p-id="14508"></path></svg>
const iconA = <svg t="1579075491481" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15586" width="32" height="32"><path d="M811.707317 1024h-599.414634C94.907317 1024 0 929.092683 0 811.707317v-599.414634C0 94.907317 94.907317 0 212.292683 0h599.414634C929.092683 0 1024 94.907317 1024 212.292683v599.414634c0 117.385366-94.907317 212.292683-212.292683 212.292683zM212.292683 24.97561C109.892683 24.97561 24.97561 109.892683 24.97561 212.292683v599.414634C24.97561 914.107317 109.892683 999.02439 212.292683 999.02439h599.414634c102.4 0 187.317073-84.917073 187.317073-187.317073v-599.414634C999.02439 109.892683 914.107317 24.97561 811.707317 24.97561h-599.414634z" p-id="15587"></path><path d="M979.043902 934.087805H749.268293l-74.92683-194.809756H329.678049l-69.931708 194.809756H39.960976L409.6 74.926829h182.321951l387.121951 859.160976zM616.897561 594.419512L499.512195 274.731707l-114.887805 319.687805h232.273171z" p-id="15588"></path></svg>


const option = {
    legend:{
        data:['研发支出','研发费用化']
    },
    xAxis: {
        type: 'category',
        boundaryGap:false,
        axisLabel:{
            interval:0
        },
        data: []
    },
    yAxis: {
        type: 'value',
        splitLine:false
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    series: [{
        name:'研发支出',
        type: 'line',
        lineStyle:{
            width:1,
        },
        symbol:'none',
        areaStyle: {},
        data: [],
    },{
        name:'研发费用化',
        type:'line',
        areaStyle:{
            // origin:'end',
            // shadowOffsetY:20,
            color:'#fff',
            opacity:1
        },
        lineStyle: {
            width: 1,
        },
        symbol:'none',
        data:[]
    }]
};


export default class RDQuality extends Component {
    constructor(props){
        super(props)
        this.chartRef = createRef()
    }

    drawChart = ()=>{
        const chart = echarts.init(this.chartRef.current)
        chart.setOption(option)
        
        const {RDQualityInfo} = this.props
        
        chart.setOption({
            xAxis:{
                data: RDQualityInfo.RDPay.map(o=>o.date)
            },
            series:[
                {data:RDQualityInfo.RDPay.map(o=>o.value)},
                {data:RDQualityInfo.RDFee.map(o=>o.value)},
            ]
        })
   
    }

    componentDidMount(){
        this.drawChart()
    }
    render() {
        console.log(this.props);
        const {RDPatterns,RDCitations} = this.props.RDQualityInfo.RDEfficiency
        
        return (
            <div style={{display:'flex'}}>
                <div ref={this.chartRef} style={{width:800,height:300}}></div>
            <div className='RD-card'>
                <Card title="创新/研发效率" 
                        className='rd-card'
                        bordered={false}>
                    <Card.Grid  style={{width:"100%"}}>
                        <Statistic
                            title="单位研发支出专利申请数"
                            value={RDPatterns}
                            precision={2}
                            // valueStyle={{ color: ZscoreColor }}
                            prefix={iconA}
                            suffix="项"
                        />
                    </Card.Grid>
                    <Card.Grid style={{ width: "100%" }}>
                        <Statistic
                            title="单位研发支出专利引用数"
                            value={RDCitations}
                            precision={2}
                            // valueStyle={{ color: OscoreColor }}
                            prefix={iconC}
                            suffix="次"
                        />
                    </Card.Grid>
                </Card>
            </div>
            </div>
        )
    }
}
