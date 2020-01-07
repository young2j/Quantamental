import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
    Button,
    Icon, 
    Card,
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

import './index.less'
import { handleDataSource } from '../../../../utils'

@connect(state=>state)
class Finance extends Component {
    constructor(props){
        super(props)    
        this.state = {
            tabMode:'top',
            tabIndex:0,
            switchTableChart:true,
            activeTabKey:"1",
        }
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
    
    render() {
        console.log('this.props:',this.props);

        const {switchTableChart,activeTabKey} = this.state
        const dataSource = handleDataSource(this.props.financeInfo.data)
        
        return (
            <Card 
                className="finance-page"
                title={<SearchBar />} //交换了位置
                extra={<PageTitle/>} //
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
                       { this.props.horizontal? (
                            switchTableChart && activeTabKey==="1"?
                            <ProfitTabTable dataSource={dataSource.profitabilityDataSource}/>
                            :
                            <ProfitTabChart dataSource={dataSource.profitabilityDataSource}/>
                        ) : null
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

export default Finance