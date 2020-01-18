import React, { Component } from 'react'
import { LikeOutlined, WarningOutlined } from '@ant-design/icons';
import { PageHeader, Collapse, Statistic, Descriptions, Spin } from 'antd';
import { connect } from 'react-redux'

import './index.less'
import { SelectBar } from '../../../components/Finance/PageHeader'
import {
    ProfitQuality,
    OperationQuality,
    EarningsQuality,
    RDQuality } from '../../../components/Quality'

import { selectFirm, getQuaInfo } from '../../../redux/actions'


const {Panel} = Collapse

const statsValue = [
    <div style={{ fontSize: 16, width: 60, color: 'red' }}>☹较差</div>,
    <div style={{ fontSize: 16, width: 60, color: '#ff9f1a' }}><WarningOutlined />警惕</div>,
        <div style={{fontSize:16,width:60,color:''}}>一般</div>,
    <div style={{ fontSize: 16, width: 60, color: 'green' }}>☺良好</div>,
    <div style={{ fontSize: 16, width: 60, color: 'green' }}><LikeOutlined />很棒</div>,
    ]

const statsValueFormatter = value =>{
    return statsValue[Math.floor(Math.random() * 5)]
}


const Content = (props) => {
    const {selectFirmCode,basicInfo} = props.qualityInfo
    const {createAt,market,industry} = basicInfo
    return (
        <div className="page-content"
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <div className='description-content'
                style={{ flex: 0.8, marginTop: -15, paddingLeft: 20 }}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="公司代码">{selectFirmCode}</Descriptions.Item>
                    <Descriptions.Item label="成立时间">{createAt}</Descriptions.Item>
                    <Descriptions.Item label="上市交易所">{market}</Descriptions.Item>
                    <Descriptions.Item label="所属行业">{industry}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="statistic-content"
                style={{ display: 'flex', flex: 0.55, marginTop: -15 }}
            >
                <Statistic title="经营质量" formatter={statsValueFormatter} style={{ marginRight: 32 }} />
                <Statistic title="盈利质量" formatter={statsValueFormatter} style={{ marginRight: 32 }}/>
                <Statistic title="盈余质量" formatter={statsValueFormatter} style={{ marginRight: 32 }} />
                <Statistic title="研发质量" formatter={statsValueFormatter} />
            </div>
        </div>
    )
}

const Footer = (props) => {
    const { selectFirmCode, 
            profitQualityInfo,
            operationQualityInfo,
            earningsQualityInfo,
            RDQualityInfo
        } = props.qualityInfo
    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['3']}
            // activeKey={['1']}
            className="quality-footer-collapse"
            expandIconPosition='right'
        >
            <Panel header='❶ 经营效率质量' key="2" className="qulity-footer-panel">
                <OperationQuality operationQualityInfo={operationQualityInfo} key={selectFirmCode}/>
            </Panel>
            <Panel header="❷ 盈利能力质量" key="1" className="qulity-footer-panel">
                <ProfitQuality profitQualityInfo={profitQualityInfo} key={selectFirmCode}/>
            </Panel>
            <Panel header="❸ 盈余质量" key="3" className="qulity-footer-panel">
                <EarningsQuality earningsQualityInfo={earningsQualityInfo} key={selectFirmCode}/>
            </Panel>
            <Panel header="❹ 研发质量" key="4" className="qulity-footer-panel">
                <RDQuality RDQualityInfo={RDQualityInfo} key={selectFirmCode}/>
            </Panel>
        </Collapse>
    )

}

@connect(state => {
    return {
        qualityInfo: state.qualityInfo,
        financeInfo: state.financeInfo,
    }
}, { getQuaInfo,selectFirm})
class Quality extends Component {
    state = {
        qualityInfo:this.props.qualityInfo
    }
    componentDidMount() {
        this.props.selectFirm(
            this.props.financeInfo.currentFirmCode,
            this.props.financeInfo.currentFirmName
        )
        this.props.getQuaInfo(this.props.financeInfo.currentFirmCode)
    }
    
    render() {
        console.log('this.props:',this.props);
        const { qualityInfo } = this.props
        return (
        <Spin spinning={qualityInfo.isLoading}>        
            <PageHeader
                // ghost
                className="qua-page"
                backIcon={false}
                title={qualityInfo.selectFirmName}
                subTitle="质量信息"
                extra={<SelectBar />}
                footer={<Footer qualityInfo={qualityInfo}/>} 
                >
                <Content qualityInfo={qualityInfo}/>
            </PageHeader>
        </Spin>
        )
    }
}



export default Quality