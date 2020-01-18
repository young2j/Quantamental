import React from 'react'
import { Table,Collapse } from 'antd'
import _ from 'lodash'

import './index.less'

const {Panel} = Collapse

const upArrow = <svg t="1578779997089" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22495" width="16" height="16"><path d="M559.795332 978.804414h-95.390684l2.499756 45.195586h90.391173z" fill="#d81e06" p-id="22496"></path><path d="M567.2946 843.217655H456.90538l4.999512 90.391172h100.390196z" fill="#d81e06" p-id="22497"></path><path d="M512.09999 0.09999L240.926472 255.775022h183.282101l30.197051 542.247046h115.488722L599.991407 255.775022h183.282101z" fill="#d81e06" p-id="22498"></path></svg>
const downArrow = <svg t="1578779865230" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21787" width="16" height="16"><path d="M464.404648 45.295577h95.390684L557.295577 0.09999h-90.391173z" fill="#19fa28" p-id="21788"></path><path d="M456.90538 180.882336h110.38922l-4.999512-90.391173H461.904892z" fill="#19fa28" p-id="21789"></path><path d="M512.09999 1024l271.173518-255.575041H599.991407l-30.097061-542.347037H454.405624l-30.197051 542.347037H240.926472z" fill="#19fa28" p-id="21790"></path></svg>


const tableWrapper = ({Table,isAI,dataSource,isLoading})=>{
    const modelName = {
        level0Name: isAI ? "现金流折现模型AI" : "现金流折现模型",
        level01Name: isAI ? "企业现金流AI" : "企业现金流",
        level02Name: isAI ? "股权现金流AI" : "股权现金流"
    }
    const columns = [
        {
            title: '项目',
            dataIndex: 'item',
        },
        {
            title: '第一年',
            dataIndex: 'firstYear',
        },
        {
            title: '第二年',
            dataIndex: 'secondYear',
        },
        {
            title: '第三年',
            dataIndex: 'thirdYear',
        },
        {
            title: '第四年',
            dataIndex: 'fourthYear',
        },
        {
            title: '第五年',
            dataIndex: 'fifthYear',
        },
        {
            title: '终值',
            dataIndex: 'FinalValue',
        },
    ]
    const firmModelData = isAI? dataSource.firmCashAIModel:dataSource.firmCashModel    
    const equityModelData = isAI? dataSource.equityCashAIModel:dataSource.equityCashModel
    // eslint-disable-next-line 
    const [item1,...firmCashNumbers] = _.values(firmModelData[firmModelData.length-1])
    // eslint-disable-next-line 
    const [item2,...equityCashNumbers] = _.values(equityModelData[equityModelData.length-1])
    
    return (
        <div className='table-wrapper'>
            <div className='table-left'>{modelName.level0Name}</div>
            <div className='table-right'>
                <div className='firm-cash-model-table'>
                    <div className='table-name'>{modelName.level01Name}</div>
                    <div className='table-data'>
                        <Table columns={columns} 
                            size="small" pagination={false}
                            loading={isLoading}
                            rowKey={record=>record.item}
                            dataSource={firmModelData} 
                            footer={() => {
                                return <span style={{color:"#f50"}}>
                                        企业价值 = {_.sum(firmCashNumbers).toFixed(2)}
                                       </span>
                                }}
                        />
                    </div>
                </div>
                <div className='equity-cash-model-table'>
                    <div className='table-name'>{modelName.level02Name}</div>
                    <div className='table-data'>
                        <Table columns={columns} 
                            size="small" pagination={false}
                            loading={isLoading}
                            rowKey={record=>record.item}
                            dataSource={equityModelData} 
                            footer={() => {
                                return <span style={{ color: "#f50" }}>
                                    股权价值 = {_.sum(equityCashNumbers).toFixed(2)}
                                </span>
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


const RIMTable = (props)=>{
    const columns=[
        {
            title:'项目',
            dataIndex:'item',
        },{
            title:'投入资本',
            dataIndex:'inputCapital',
        },{
            title:'第一年',
            dataIndex:'firstYear',
        },
        {
            title: '第二年',
            dataIndex: 'secondYear',
        },
        {
            title: '第三年',
            dataIndex: 'thirdYear',
        },
        {
            title: '第四年',
            dataIndex: 'fourthYear',
        },
        {
            title: '第五年',
            dataIndex: 'fifthYear',
        },
        {
            title:'后七年',
            dataIndex:'sevenYears'
        }
    ]
    const forSumData = _.cloneDeep(props.dataSource)
    // eslint-disable-next-line 
    const [item, ...numbers] = _.values(forSumData.pop())
    return (
        <Table columns={columns} 
            pagination={false} size='small'
            loading={props.isLoading}
            rowKey={record => record.item}
            dataSource={props.dataSource} 
            footer={() => {
                return <span style={{ color: '#f50' }}>
                        股权价值 = {_.sum(numbers).toFixed(2)}
                       </span>}
            }
        />
    )
}

const SummaryTable=(props)=>{
    const columns=[
        {
            title:'项目',
            dataIndex:'item',
        },{
            title:'企业现金流Model',
            dataIndex:'firmCashModel',
            render:(value,record,index)=>{
                if(index===4 && value>250){
                    return <div style={{ display: 'flex'}}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
            
        },{
            title:'企业现金流AIModel',
            dataIndex: 'firmCashAIModel',
            render: (value, record, index) => {
                if (index === 4 && value > 250) {
                    return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
        },{
            title:'股权现金流Model',
            dataIndex: 'equityCashModel',
            render: (value, record, index) => {
                if (index === 4 && value > 250) {
                    return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
        },{
            title:'股权现金流AIModel',
            dataIndex: 'equityCashAIModel',
            render: (value, record, index) => {
                if (index === 4 && value > 250) {
                    return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
        },{
            title:'剩余收益Model',
            dataIndex: 'RIMModel',
            render: (value, record, index) => {
                if (index === 4 && value > 250) {
                    return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
        },{
            title:'剩余收益AIModel',
            dataIndex: 'RIMAIModel',
            render: (value, record, index) => {
                if (index === 4 && value > 250) {
                    return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                }
                else if (index === 4 && value < 250) {
                    return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                }
                else {
                    return value
                }
            }
        }
    ]

    return (
        <Table columns={columns} 
        loading={props.isLoading}
        pagination={false} size='small'
        rowKey={record => record.item}
        dataSource={props.dataSource} 
        />
    )
}


const AbsoluteEva = (props)=>{
    // const [key, setKey] = useState(['1','2','3','4','5'])
    const { 
        isLoading,
        firmCashModel,
        equityCashModel,
        firmCashAIModel,
        equityCashAIModel,
        RIMModel,
        RIMAIModel,
        SummaryModel } = props.evaluationInfo.absoluteEvaInfo
    
        return (
            <Collapse 
                // bordered={false}
                // style={{background:'transparent'}} 
                className='absolute-eva-collapse' 
                // onChange={key=>setKey(key)}
                defaultActiveKey={['5']}
                expandIconPosition='right'
            >
                <Panel header="❀ 模型汇总-估值信息" key="5" className='summary-panel' 
                // style={{ borderBottom: key.indexOf('5') !== -1 ? 2:null }}
                >
                    <SummaryTable dataSource={SummaryModel} isLoading={isLoading} />
                </Panel>
                <Panel header="❶ 现金流量折现模型" key="1" 
                // style={{ borderBottom : key.indexOf('1')!==-1? 2:null}}
                >
                    {tableWrapper({Table,isAI:false,dataSource:{firmCashModel,equityCashModel}},isLoading)}
                </Panel>
                <Panel header="① 现金流量折现模型(AI)" key="2" 
                // style={{ borderBottom: key.indexOf('2') !== -1 ? 2:null }}
                >
                    {tableWrapper({Table,isAI:true,dataSource:{firmCashAIModel,equityCashAIModel},isLoading})}
                </Panel>
                <Panel header="❷ 剩余收益模型" key="3" 
                // style={{ borderBottom: key.indexOf('3') !== -1 ? 2:null }}
                >
                    <RIMTable dataSource={RIMModel} isLoading={isLoading}/>
                </Panel>
                <Panel header="② 剩余收益模型AI" key="4" 
                // style={{ borderBottom: key.indexOf('4') !== -1 ? 2:null }}
                >
                    <RIMTable dataSource={RIMAIModel} isLoading={isLoading} />
                </Panel>
            </Collapse>
        )
    }

export default AbsoluteEva