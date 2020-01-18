import React, { Component } from 'react'
import { Card,Steps, Typography, Button,Tag} from 'antd'

import './index.less'
import { 
    Step1Content,
    Step21Content,
    Step22Content,
    Step23Content,
    Step3Content 
} from '../../components/Strategy'


const {Step} = Steps

const steps = [
    {   
        key:1,
        title:'选择股票池',
        icon: <Button type='primary' 
                shape='circle' size='small'
              >1</Button>,
        content:<Step1Content/>
    },
    {   
        key:2,
        title:'筛选多因子',
        icon: <Button type='primary' 
                shape='circle' size='small'
              >2</Button>,
        content:<Step21Content/>
    },
    {   
        key:2.1,
        title:'因子有效性检验',
        icon: <Button ghost type='primary' 
                shape='circle' size='small'
               style={{border:0,boxShadow:'none'}}
               >2.1</Button>,
        content: <Step22Content/>
    },
    {
        key:2.2,
        title:'冗余因子剔除',
        icon: <Button ghost type='primary' 
                shape='circle' size='small'
               style={{ border: 0, boxShadow: 'none' }}
               >2.2</Button>,
        content:"content"
    },
    {
        key:2.3,
        title:'因子综合得分',
        icon: <Button ghost type='primary' 
                shape='circle' size='small'
               style={{ border: 0, boxShadow: 'none' }}
               >2.3</Button>,
        content: <Step23Content/>
    },
    {
        key:3,
        title:'策略回测评价',
        icon: <Button type='primary' 
                shape='circle' size='small'
              >3</Button>,
        content: <Step3Content/>
    },
]

export default class Strategy extends Component {
    render() {
        return (
            <Card title="多因子选股策略" bordered={false}>
                <Steps onChange={()=>{}} className='strategy-steps'
                    progressDot={(iconDot, { index }) => steps[index].icon}
                >
                    {
                        steps.map(item=><Step key={item.key} title={item.title} />)
                    }
                </Steps>
                {
                    steps.map(item=>{
                        if(item.key>2 && item.key<3){
                            return (
                                <Card.Grid key={item.key} hoverable={false} style={{width:'100%',minHeight:300}}>
                                    <Typography.Title style={{fontSize:14,fontWeight:'bold',textAlign:'center'}}>
                                        <Tag>Step {item.key}</Tag> 
                                        {item.title}
                                    </Typography.Title >
                                    {item.content}
                                </Card.Grid>
                            )
                        } else{
                            return (
                                <Card.Grid key={item.key} hoverable={false} style={{ width: '100%', minHeight: 300 }}>
                                    <Typography.Title style={{ fontSize: 15, fontWeight: 'bold',textAlign:'center' }}>
                                        <Tag color='green'>Step {item.key}</Tag> 
                                        {item.title}
                                    </Typography.Title >
                                    {item.content}
                                </Card.Grid>
                            )
                        }
                    })
                }

            </Card>
        )
    }
}
