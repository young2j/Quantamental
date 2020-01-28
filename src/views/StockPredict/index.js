import React, { Component } from 'react'
import echarts from 'echarts'

var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';


// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
var data0 = splitData([
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
]);

function splitData(rawData) {
    var categoryData = [];
    var values = []
    var volumes = []
    for (var i = 0; i < rawData.length; i++) {
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
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }
        result.push((sum / dayCount).toFixed(3));
    }
    return result;
}



const option1 = {
    title: {
        text: '上证指数',
        left: 0
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        data: data0.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },
    yAxis: {
        scale: true,
        splitArea: {
            show: true
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
        }
    ],
    series: [
        {
            name: '日K',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
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
                        name: 'XX标点',
                        coord: ['2019/5/31', 230],
                        value: 230,
                        itemStyle: {
                            color: 'rgb(41,60,85)'
                        }
                    },
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
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ],
                tooltip: {
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        }
                    ],
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
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },

    ]
};

const option2 = {
    backgroundColor: '#fff',
    animation: false,
    legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
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
            var obj = { top: 10 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        }
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
        }
    },
    brush: {
        xAxisIndex: 'all',
        // brushLink: 'all',
        outOfBrush: {
            // colorAlpha: 0.1
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
            left: '10%',
            right: '8%',
            height: '50%'
        },
        {
            left: '10%',
            right: '8%',
            top: '63%',
            height: '16%'
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
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
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
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
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
            start: 20,
            end: 80
        },
        {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            start: 20,
            end: 80
        }
    ],
    series: [
        {
            name: 'Dow-Jones index',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: null,
                borderColor0: null
            },
            tooltip: {
                formatter: function (param) {
                    param = param[0];
                    return [
                        'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        'Open: ' + param.data[0] + '<br/>',
                        'Close: ' + param.data[1] + '<br/>',
                        'Lowest: ' + param.data[2] + '<br/>',
                        'Highest: ' + param.data[3] + '<br/>'
                    ].join('');
                }
            }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data0.volumes
        }
    ]
}

class StockPredict extends Component {

    drawChart = () => {
        const chart = echarts.init(this.refs.chartRef)
        // chart.setOption(option1)
        chart.setOption(option2)
    }

    componentDidMount() {
        this.drawChart()
    }

    render() {
        return (
            <div ref='chartRef' style={{ width: "80%", height: 400 }}></div>
        )
    }
}


export default StockPredict