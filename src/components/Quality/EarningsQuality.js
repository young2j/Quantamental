import React, { Component, createRef } from 'react'
import { WarningOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import echarts from 'echarts'

import './index.less'

const smileFace = <svg t="1579027403471" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4746" width="20" height="20"><path d="M224 272c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM800 272c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM512 864c-180.8 0-344-108.8-412.8-275.2-6.4-16 1.6-35.2 17.6-41.6 16-6.4 35.2 1.6 41.6 17.6C217.6 707.2 356.8 800 512 800c155.2 0 294.4-92.8 355.2-236.8 6.4-16 25.6-24 41.6-17.6 16 6.4 24 25.6 17.6 41.6C856 755.2 692.8 864 512 864z" p-id="4747" fill="#0e932e"></path></svg>
const dangerHead = <svg t="1579027059290" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11523" width="25" height="23"><path d="M458.24 499.2c-7.970133 8.533333-17.92 12.8-29.866667 12.8s-22.186667-4.266667-30.72-12.8c-7.953067-7.970133-11.946667-17.92-11.946666-29.866667s3.976533-22.186667 11.946666-30.72c8.533333-7.970133 18.773333-11.946667 30.72-11.946666s21.896533 3.976533 29.866667 11.946666c8.533333 8.533333 12.8 18.773333 12.8 30.72s-4.266667 21.896533-12.8 29.866667z m98.133333-29.866667c0-11.946667 3.976533-22.186667 11.946667-30.72 8.533333-7.970133 18.7904-11.946667 30.72-11.946666 11.946667 0 21.896533 3.976533 29.866667 11.946666 8.533333 8.533333 12.8 18.773333 12.8 30.72s-4.266667 21.896533-12.8 29.866667c-7.970133 8.533333-17.92 12.8-29.866667 12.8-11.9296 0-22.186667-4.266667-30.72-12.8-7.970133-7.970133-11.946667-17.92-11.946667-29.866667z" p-id="11524" fill="#d81e06"></path><path d="M938.666667 955.733333a17.015467 17.015467 0 0 1-12.066134-5.000533L699.733333 723.8656V768a17.066667 17.066667 0 0 1-17.066666 17.066667H341.333333a17.066667 17.066667 0 0 1-17.066666-17.066667v-44.1344L97.399467 950.7328a17.0496 17.0496 0 1 1-24.132267-24.132267L324.266667 675.601067l-0.136534-50.8416-5.102933-5.12C265.8816 566.493867 238.933333 501.572267 238.933333 426.666667c0-47.684267 11.127467-91.511467 33.1264-130.474667L73.2672 97.399467a17.0496 17.0496 0 1 1 24.132267-24.132267l193.4336 193.4336a272.366933 272.366933 0 0 1 28.194133-33.024C372.1728 180.548267 437.0944 153.6 512 153.6c74.922667 0 139.8272 26.948267 192.9728 80.093867a302.8992 302.8992 0 0 1 28.757333 33.245866l192.853334-193.655466a17.083733 17.083733 0 0 1 24.200533 24.081066L752.6912 296.260267C774.178133 335.223467 785.066667 379.016533 785.066667 426.666667c0 74.9056-26.948267 139.8272-80.093867 192.9728l-5.239467 5.239466v50.722134l250.999467 250.999466A17.0496 17.0496 0 0 1 938.666667 955.733333zM614.4 750.933333h51.2v-133.12c0-4.539733 1.792-8.874667 5.000533-12.066133l10.205867-10.222933C727.995733 548.352 750.933333 493.124267 750.933333 426.666667c0-46.011733-11.4688-87.739733-34.082133-124.0576-10.069333-15.889067-22.186667-30.958933-36.010667-44.8C633.668267 210.653867 578.4576 187.733333 512 187.733333s-121.668267 22.920533-168.840533 70.0928a231.202133 231.202133 0 0 0-35.037867 44.5952l-0.017067 0.017067a2.9696 2.9696 0 0 1-0.187733 0.3072C284.791467 339.029333 273.066667 380.706133 273.066667 426.666667c0 66.4576 22.920533 121.668267 70.0928 168.840533l10.24 10.257067A16.981333 16.981333 0 0 1 358.4 617.813333V750.933333h55.466667v-68.266666a17.066667 17.066667 0 1 1 34.133333 0v68.266666H494.933333v-68.266666a17.066667 17.066667 0 1 1 34.133334 0v68.266666h51.2v-68.266666a17.066667 17.066667 0 1 1 34.133333 0v68.266666z m-15.36-221.866666a58.606933 58.606933 0 0 1-42.786133-17.800534c-11.246933-11.246933-16.9472-25.344-16.9472-41.9328 0-16.349867 5.563733-30.600533 16.5376-42.359466C568.4224 415.163733 582.673067 409.6 599.04 409.6c16.5888 0 30.702933 5.700267 41.9328 16.964267A58.538667 58.538667 0 0 1 658.773333 469.333333c0 16.571733-6.2976 31.214933-18.210133 42.3424C630.254933 522.769067 615.594667 529.066667 599.04 529.066667z m0-85.333334c-7.6288 0-13.704533 2.338133-19.063467 7.355734-4.215467 4.5568-6.536533 10.615467-6.536533 18.244266 0 7.406933 2.218667 13.056 6.946133 17.800534 5.307733 5.3248 11.246933 7.799467 18.653867 7.799466 7.2704 0 12.629333-2.269867 17.390933-7.389866 5.922133-5.5808 8.209067-10.939733 8.209067-18.210134 0-7.406933-2.491733-13.329067-7.799467-18.653866-4.744533-4.744533-10.410667-6.946133-17.800533-6.946134z m-170.666667 85.333334a58.5728 58.5728 0 0 1-42.786133-17.800534c-11.246933-11.264-16.9472-25.378133-16.9472-41.9328 0-16.349867 5.563733-30.600533 16.5376-42.359466C397.755733 415.163733 412.0064 409.6 428.373333 409.6c16.5888 0 30.685867 5.700267 41.9328 16.9472A58.5728 58.5728 0 0 1 488.106667 469.333333a56.490667 56.490667 0 0 1-17.800534 41.949867A56.490667 56.490667 0 0 1 428.373333 529.066667z m0-85.333334c-7.645867 0-13.704533 2.338133-19.080533 7.355734-4.181333 4.539733-6.519467 10.5984-6.519467 18.244266 0 7.406933 2.2016 13.056 6.9632 17.800534 5.307733 5.3248 11.229867 7.799467 18.6368 7.799466 7.253333 0 12.629333-2.269867 17.408-7.389866a9.284267 9.284267 0 0 1 0.8192-0.8192c5.102933-4.7616 7.3728-10.120533 7.3728-17.390934a24.917333 24.917333 0 0 0-7.799466-18.653866c-4.744533-4.744533-10.3936-6.946133-17.800534-6.946134z" p-id="11525" fill="#d81e06"></path></svg>

const option = {
    title:{
        text:'盈余操纵空间',
        left:"3%",
        top:'66%',
        textStyle:{
            color:'#d72828'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['可操纵性应计', '非操纵性应计','应计利润'],
        right:'15%'
    },
    dataset:{
        source:[]
    },
    grid: [
        {
            left: '25%',
            right: '2%',
            bottom: '3%',
            containLabel: true,
        },{
          left:'1%',
          bottom:'4%',
        }
    ],
    xAxis: [
        {
            type: 'value'
        }
    ],
    yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['Perf. Match', 'Mod. Jones','Jones']
        }
    ],
    series: [
        {
            name: '可操纵性应计',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            data: []
        },
        {
            name: '非操纵性应计',
            type: 'bar',
            stack: true,
            label: {
                show: true,
                position: 'inside'
            },
            data: []
        },
        {
            name: '应计利润',
            type: 'bar',
            stack: true,
            label: {
                show: true
            },
            data: []
        },
        {
            type:'pie',
            id:'pie',
            // datasetIndex: 2,
            // seriesLayoutBy: 'row',
            roseType:'radius',
            gridIndex:1,
            radius: '50%',
            center: ['12%', '35%'],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                formatter: '{b}({d}%)',
                position:'inside'
            },
            encode: {
                itemName: 'item',
                value: 'Jones',
            },
            tooltip: {
                trigger: 'item',
                showContent: true,
                formatter: '{b}({d}%)'
            },   
        }
    ]
};


const MCscoreColorAndIcon = v => {
    if (v < 50) {
        return ['#3f8600',smileFace]
    }
    else if (v >= 50 && v < 70) {
        return ['#ff9f1a',<WarningOutlined />];
    }
    else {
        return ['#cf1322',dangerHead]
    }
}
const OZscoreColorAndIcon = v => {
    if (v <= 1.81) {
        return ['#cf1322',dangerHead]
    }
    else if (v > 1.81 && v < 2.99) {
        return ['#ff9f1a',<WarningOutlined />];
    }
    else {
        return ['#3f8600',smileFace]
    }
}


export default class EarningsQuality extends Component {
    constructor(props){
        super(props)
        this.chartRef = createRef()
    }

    drawChart = () => {
        const chart = echarts.init(this.chartRef.current)
        chart.setOption(option)

        const {earningsQualityInfo} = this.props
        const TA = Object.values(earningsQualityInfo.accruals).map(o => o.TA)
        const NA = Object.values(earningsQualityInfo.accruals).map(o => o.NA)
        const DA = TA.map((v, i) => (v - NA[i]).toFixed(2)) //// Object.values(earningsQualityInfo.accruals).map(o => o.DA)
        const NA_copy = NA.slice()
        const DA_copy = DA.slice()
        NA_copy.unshift('NA')
        DA_copy.unshift('DA')
        const dataset = [['item','Jones','Mod. Jones','Perf. Match'],NA_copy,DA_copy]
        chart.setOption({
            dataset:{
                source:dataset
            },
            series:[
                { data: DA},
                { data: NA},
                { data: TA},
            ]
        })

        chart.on('updateAxisPointer', event => {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1
                chart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}({d}%)'
                        },
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
        console.log(this.props);
        const { Mscore, Dilemma } = this.props.earningsQualityInfo
        const {Oscore,Zscore,Cscore} = Dilemma

        const [MscoreColor, MscoreIcon] = MCscoreColorAndIcon(Mscore)
        const [OscoreColor,OscoreIcon] = OZscoreColorAndIcon(Oscore)
        const [ZscoreColor,ZscoreIcon] = OZscoreColorAndIcon(Zscore)
        const [CscoreColor,CscoreIcon] = MCscoreColorAndIcon(Cscore)

        
        return (
            <div style={{display:'flex',marginTop:10}}>
                <div className='earnings-card'>
                    <Card title='盈余操纵可能性' bordered={false} className='manipulate-card' hoverable>                        
                        <Statistic
                        title="M-score"
                        value={Mscore}
                        precision={2}
                        valueStyle={{ color: MscoreColor}}
                        prefix={MscoreIcon}
                        suffix="%"
                    /></Card>
                    <Card title="财务困境值" bordered={false} className='dilemma-card'>
                        <Card.Grid >
                        <Statistic
                            title="Z-score"
                            value={Zscore}
                            precision={2}
                            valueStyle={{ color: ZscoreColor }}
                            prefix={ZscoreIcon}
                            // suffix="%"
                        />
                    </Card.Grid>
                    <Card.Grid>
                        <Statistic 
                            title="O-score"
                            value={Oscore}
                            precision={2}
                            valueStyle={{ color: OscoreColor }}
                            prefix={OscoreIcon}
                            // suffix="%"
                        />
                    </Card.Grid>
                    <Card.Grid>
                        <Statistic
                            title="C-score"
                            value={Cscore}
                            precision={2}
                            valueStyle={{ color: CscoreColor }}
                            prefix={CscoreIcon}
                            suffix="%"
                        />
                    </Card.Grid>
                    </Card>                
                </div>
                <div ref={this.chartRef} style={{width:700,height:300}}></div>
            </div>
        )
    }
}
