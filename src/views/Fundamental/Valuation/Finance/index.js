import React, { Component } from 'react'
// import _ from 'lodash'

import { 
    Button,
    Icon, 
    Card,
    Popconfirm,
    Tag,
    Rate,
    Tabs,
} from 'antd';

import { 
    PageTitle,
    SearchBar,
    ProfitTabTable,
    ProfitTabChart,
    SolvencyTabTable,
    SolvencyTabChart,
    OperationTabTable,
    OperationTabChart,
    GrowthTabTable,
    GrowthTabChart,
    CashTabTable,
    CashTabChart,
    MarketTabTable,
    MarketTabChart,
} from '../../../../components/Finance'


import { getFinancialData,getFinancialsData} from '../../../../api'

import './index.less'


const columnsNames = {
    profitability:{
        stkcd:"公司代码",
        roe: "净资产报酬率",
        roa: "总资产报酬率",
        gpm: "销售毛利率",
        opm: "主营业务利润率",
        npm: "净利润率",
        operate:"操作"
    },
    solvency:{
        stkcd:"公司代码",
        currentRatio: "流动比率",
        quickRatio: "速动比率",
        cashRatio: "现金比率",
        debtRatio: "资产负债率",
        equityRatio: "产权比率",
        interestCRatio: "利息保障倍数",
        operate:"操作"
    }        
}


export default class Finance extends Component {
    constructor(props){
        super(props)    
        this.state = {
            dataSource: [],
            tabMode:'top',
            tabIndex:0,
            switchTableChart:true,
            activeTabKey:"1",
        }
    }

    //table
    handleDelete = record => {        
        const dataSource = this.state.dataSource
        Object.keys(dataSource).map(
            key => {
               return dataSource[key]=dataSource[key].filter(item=>item.stkcd!==record.stkcd)
            }
        )
        this.setState({ 
            dataSource
        })
    };

    handleAdd = () => {
        const dataSourceNow  = this.state.dataSource
        getFinancialData()
        .then(resp=>{
            const dataSource = this.handleDataSource(resp)
            Object.keys(dataSourceNow).map(
                k=>{
                 return dataSource[k] = dataSourceNow[k].concat(dataSource[k])
                }
            )
            
            this.setState({
                dataSource
            })
        })        
    };

    //获取数据处理dataSource和columns
    handleDataSource = (resp) => {
            //dataSource
            const data = resp.data.map( //data:Array 
                firm => { //Object
                    const profitability = Object.assign(
                        {}, firm.profitability, {
                        stkcd: firm.stkcd+' '+firm.name
                    }
                    )
                    const solvency = Object.assign(
                        {}, firm.solvency, {
                        stkcd: firm.stkcd+' '+firm.name
                    }
                    )
                    return { profitability, solvency }
                })


            const profitabilityDataSource = data.map(item => {
                return item.profitability
            })
            const solvencyDataSource = data.map(item => {
                return item.solvency
            })

            const dataSource = {
                profitabilityDataSource,
                solvencyDataSource
            }
            
            return dataSource
            
    }
    
    //切换tabMode
    switchTabMode = () => {
        const { tabIndex } = this.state
        const newTabIndex = tabIndex + 1 < 4 ? tabIndex + 1 : 0
        const newTabMode = ['top', 'right', 'bottom', 'left'][newTabIndex]
        this.setState({
            tabIndex: newTabIndex,
            tabMode: newTabMode
        })
    }
    
    componentDidMount() {
        getFinancialsData()
            .then(resp => {
                const dataSource = this.handleDataSource(resp)
                this.setState({
                    dataSource
                })
            }
        )        
    }

    render() {
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
                                <Button type='primary' ghost style={{border:'none',padding:"0px 3px"}}>关注</Button>
                                <Popconfirm title="确定要移除该公司?" onConfirm={() => this.handleDelete(record)}>
                                    |<Button type='danger' ghost style={{ border:'none',padding:"0px 3px"}}>移除</Button>
                                </Popconfirm>
                            </Button.Group>
                        )
                    }
                }
            }
            if (k==='stkcd'){
                return {
                    title: (<Button ghost
                                size='small'
                                onClick={this.handleAdd} 
                                type="primary"
                                shape='round' 
                                icon='plus'>
                                可比公司
                            </Button>),
                    dataIndex: k,
                    render: (text, record) => {
                        const {stkcd} = record
                        return (
                            <Tag style={{
                                fontSize:12,
                                fontWeight:'bold',
                                border:0,
                                backgroundColor:'transparent',
                                color:'#1890ff'
                                }}>
                                {stkcd}
                            </Tag>
                        )
                    }
                }
            }
            return {
                title: (<span style={{ color:'#1890ff'}}>
                            {columnsNames.profitability[k]}(%)
                        </span>),
                dataIndex: k,
                sorter: (a, b) => Object.values(a)[i] - Object.values(b)[i],
                sortDirections: ['descend', 'ascend'],
                render:(text,record)=>{
                    return (<>{text}
                            <sup><Rate allowHalf 
                                     disabled 
                                     value={text/100*5}
                                     style={{color:text>50? 'red':'green'}}
                                 /></sup>
                            </>)
                }
            }
        })

        const columns = {
            profitabilityColumns,
            // solvencyColumns: data[0].solvencyColumns,
        }


        const {dataSource,switchTableChart,activeTabKey} = this.state
        
        
        return (
            <Card 
                className="finance-page"
                title={<SearchBar />} //交换了位置
                extra={<PageTitle />} //
                // bordered={false}
                hoverable
                type='inner'
            >
                
                <Tabs defaultActiveKey="1" 
                    tabBarGutter={30}
                    tabBarExtraContent={
                        <Button style={{display:"flex"}}
                            onClick={this.switchTabMode}
                        >切换导航</Button>
                    }
                    tabPosition={this.state.tabMode}
                    tabBarStyle={{fontWeight:'bold',fontSize:30}}
                    onChange={(activeKey)=>{this.setState({
                        activeTabKey:activeKey,
                        switchTableChart:true,
                    })}}
                >
                    <Tabs.TabPane key='1'
                        tab={
                            <span>
                                <Icon type='dollar' />
                                 盈利能力  
                            </span>
                        }
                    >
                        {
                            switchTableChart && activeTabKey==="1"?
                            <ProfitTabTable 
                                rowKey={(record) => record.stkcd}
                                dataSource={dataSource.profitabilityDataSource}
                                columns={columns.profitabilityColumns}
                            />
                            :
                            <ProfitTabChart dataSource={dataSource.profitabilityDataSource}/>
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2"
                     tab={
                       <span>
                         <Icon type="safety-certificate" />
                         偿债能力
                       </span>
                     }
                   >
                    {
                        switchTableChart && activeTabKey==="2"?
                        <SolvencyTabTable/>:<SolvencyTabChart/>
                    }
                   </Tabs.TabPane>
                    <Tabs.TabPane key='3'
                      tab = {
                        <span>
                            <Icon type='android'/>
                            营运能力
                        </span>
                      }
                    >{
                            switchTableChart && activeTabKey === "3"?
                        <OperationTabTable/>:<OperationTabChart/>
                    }
                    </Tabs.TabPane>
                    <Tabs.TabPane key='4'
                      tab = {
                        <span>
                            <Icon type='rise'/>
                            成长能力
                        </span>
                      }
                    >
                        {
                            switchTableChart && activeTabKey === "4"?
                          <GrowthTabTable/>:<GrowthTabChart/>
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key='5'
                      tab = {
                        <span>
                            <Icon type='transaction'/>
                            现金流量
                        </span>
                      }
                    >
                        {
                            switchTableChart && activeTabKey === "5"?
                          <CashTabTable/>:<CashTabChart/>
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane key='6'
                      tab = {
                        <span>
                            <Icon type='sliders'/>
                            市场表现
                        </span>
                      }
                    >
                        {
                          switchTableChart && activeTabKey === "6"?
                          <MarketTabTable/>:<MarketTabChart/>
                        }
                    </Tabs.TabPane>
                </Tabs>


                <div className='footer-btn-group'>
                    <Button className='footer-btn-left'
                        onClick={() => this.setState({
                            switchTableChart:true
                        })}
                    >看表</Button>
                    <Icon type='retweet' />
                    <Button className='footer-btn-right'
                        onClick={() => this.setState({
                            switchTableChart: false
                        })}
                    >看图</Button>
                </div>
            </Card>
        );
    }
}
