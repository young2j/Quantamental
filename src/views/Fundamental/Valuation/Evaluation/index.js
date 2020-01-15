import React, { Component } from 'react'
import { PageHeader, Tabs, Icon, Statistic, Descriptions } from 'antd';
import { connect } from 'react-redux'

import './index.less'
import { SelectBar } from '../../../../components/Finance/PageHeader'
import { RelativeEva, AbsoluteEva } from '../../../../components/Evaluation'
import {selectFirm,getEvaInfo } from '../../../../redux/actions'


const Content = (props) => {
    const { selectFirmCode } = props.firmInfo
    const { createAt,market,industry } = props.firmInfo.basicInfo
    return (
        <div className="page-content"
            style={{display: 'flex',justifyContent: 'space-between'}}
        >
            <div className='description-content'
                style={{flex:0.8,marginTop:-15,paddingLeft:20}}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="公司代码">{selectFirmCode}</Descriptions.Item>
                    <Descriptions.Item label="成立时间">{createAt}</Descriptions.Item>
                    <Descriptions.Item label="上市交易所">{market}</Descriptions.Item>
                    <Descriptions.Item label="所属行业">{industry}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="statistic-content"
                style={{display: 'flex',flex:0.35,marginTop:-15}}
            >
                <Statistic title="平均估值" prefix="E¥" value={(Math.random()*100).toFixed(2)} style={{marginRight: 32}}/>
                <Statistic title="当前股价" prefix="¥" value={(Math.random() * 100).toFixed(2)} />
            </div>
        </div>            
    )
}

const Footer = (props)=>{
    return (
    <Tabs defaultActiveKey='1'
        type='card'
        className='eva-tabs'
    >
        <Tabs.TabPane key='1'
            tab={
                <span>
                    <Icon type="vertical-align-middle" />
                    相对估值结果
                </span>
            }>
            <RelativeEva {...props}/>
        </Tabs.TabPane>
        <Tabs.TabPane key='2'
            tab={
                <span>
                    <Icon type="vertical-align-top" />
                    绝对估值结果
                </span>
            }>
            <AbsoluteEva {...props}/>   
        </Tabs.TabPane>
    </Tabs>    
    )
}

@connect(state => {
    return {
        evaluationInfo: state.evaluationInfo,
        financeInfo: state.financeInfo
    }
}, { getEvaInfo, selectFirm })
class Evaluation extends Component {
    componentDidMount() {
        this.props.selectFirm(
            this.props.financeInfo.currentFirmCode,
            this.props.financeInfo.currentFirmName
        )
        this.props.getEvaInfo(this.props.financeInfo.currentFirmCode)

    }    
    render() {
        console.log("this.props.evaluationInfo:", this.props.evaluationInfo);
        
        return (
            <PageHeader
                // ghost
                className="eva-page"
                backIcon={false}
                title={this.props.evaluationInfo.selectFirmName}
                subTitle="模型估值信息"
                extra={<SelectBar />}
                footer={<Footer evaluationInfo={this.props.evaluationInfo}/>}
            >
                <Content firmInfo={this.props.evaluationInfo}/>
            </PageHeader>
        )
    }
}



export default Evaluation