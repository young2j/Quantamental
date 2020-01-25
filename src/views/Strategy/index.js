import React, { useState } from 'react'
import { Card,Steps, Typography, Button,Tag} from 'antd'

import './index.less'
import { 
    Step1Content,
    Step20Content,
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
        content:<Step20Content/>
    },
    {   
        key:2.1,
        title:'因子有效性检验',
        icon: <Button ghost type='primary' 
                shape='circle' size='small'
               style={{border:0,boxShadow:'none'}}
               >2.1</Button>,
        content: <Step21Content/>
    },
    {
        key:2.2,
        title:'冗余因子剔除',
        icon: <Button ghost type='primary' 
                shape='circle' size='small'
               style={{ border: 0, boxShadow: 'none' }}
               >2.2</Button>,
        content: <Step22Content/>
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

const Strategy = ()=>{
    const [current, setCurrent] = useState(0)

    return (
        <Card title="多因子选股策略" 
            className='strategy-card'
            bordered={false}
            extra={
                <Steps 
                    type='navigation'
                    className='strategy-steps' 
                    current={current}
                    size='small'
                    onChange={current => setCurrent(current)}
                    progressDot={(iconDot, { index }) => steps[index].icon}
                >
                    {
                        steps.map(item=><Step key={item.key} title={item.title}/>)
                    }
                </Steps>
            }
            >
            <div style={{margin:'10px auto'}}>
                <Typography.Title 
                    style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center',marginBottom:20 }}>
                    <Tag color='green'>Step {steps[current].key}</Tag>
                    {steps[current].title}
                </Typography.Title >
                {steps[current].content}
            </div>
            {/* {
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
            } */}

        </Card>
    )
}


export default Strategy