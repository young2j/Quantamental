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
    SelectBar,
    ProfitTabTable,
    ProfitTabChart,
    ProfitTabTimeTable, 
    ProfitTabTimeChart,
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
import { handleDataSource, handleTimeDataSource } from '../../../../utils'
import { searchFirm } from '../../../../redux/actions'

@connect(state=>state,{searchFirm})
class Finance extends Component {
    constructor(props){
        super(props)    
        this.state = {
            tabMode:'top',
            tabIndex:0,
            switchTableToChart:false,
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
    
    //组件加载完,自动获取上次搜索的公司信息
    componentDidMount() {
        this.props.searchFirm(
            this.props.financeInfo.currentFirmCode,
            this.props.financeInfo.currentFirmName
            ) 
    }    
    render() {
        console.log('this.props:',this.props);

        const {switchTableToChart} = this.state
        const dataSource = handleDataSource(this.props.financeInfo.data)
        const timeDataSource = handleTimeDataSource(this.props.financeInfo.data)
        return (
            <Card 
                className="finance-page"
                title={<PageTitle />} 
                // extra={<PageTitle/>} //
                // bordered={false}
                hoverable
                type='inner'
            >
                {
                    this.props.horizontal ? <SearchBar /> : <SelectBar />
                }
                <Tabs defaultActiveKey="1" 
                    tabBarGutter={30}
                    tabBarExtraContent={
                        <Button style={{display:"flex"}}
                            onClick={this.switchTabMode}
                        >切换导航</Button>
                    }
                    tabPosition={this.state.tabMode}
                    tabBarStyle={{fontWeight:'bold',fontSize:40}}
                >
                    <Tabs.TabPane key='1'
                        tab={
                            <span>
                                <Icon type='dollar' />盈利能力  
                            </span>
                        }
                    >
                       { this.props.horizontal ? (
                            switchTableToChart ?
                            <ProfitTabChart dataSource={dataSource.profitabilityDataSource}/>
                            :
                            <ProfitTabTable dataSource={dataSource.profitabilityDataSource}/>
                            ):(
                            switchTableToChart ?
                            <ProfitTabTimeChart dataSource={timeDataSource.profitabilityDataSource}/>
                            :
                            <ProfitTabTimeTable dataSource={timeDataSource.profitabilityDataSource}/>
                            )
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
                        switchTableToChart ?
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
                            switchTableToChart ?
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
                            switchTableToChart ?
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
                            switchTableToChart ?
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
                          switchTableToChart ?
                          <MarketTabTable/>:<MarketTabChart/>
                        }
                    </Tabs.TabPane>
                </Tabs>


                <div className='footer-btn-group'>
                    <Button className='footer-btn-left'
                        onClick={() => this.setState({
                            switchTableToChart:true
                        })}
                    >看表</Button>
                    <Icon type='retweet' />
                    <Button className='footer-btn-right'
                        onClick={() => this.setState({
                            switchTableToChart: false
                        })}
                    >看图</Button>
                </div>
            </Card>
        );
    }
}

export default Finance