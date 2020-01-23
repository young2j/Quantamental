import React, { useReducer, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { List, InputNumber, Slider, Radio, Typography, message,Tag,Table } from 'antd'
import _ from 'lodash'

import './index.less'

const ListItem = ({ k,v,disabled,dispatch}) => {

  const [value, setValue] = useState(v)
  useEffect(() => {
    setValue(v)
  }, [v,value])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <InputNumber
        min={0}
        max={100}
        style={{ width: 70 }}
        value={value}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        onChange={value => {
          setValue(value)
          if (!disabled){
            dispatch({
              type:3,
              payload:{
                [k]:value
              }
            })
          }
        }}
        size='small'
        precision={2}
        disabled={disabled}
      />
      <Slider
        style={{ width: 100 }}
        min={0}
        max={100}
        onChange={value => {
          setValue(value)
          if (!disabled) {
            dispatch({
              type: 3,
              payload: {
                [k]: value
              }
            })
          }
        }}
        value={typeof value === 'number' ? value : 0}
        getTooltipPopupContainer={(triggerNode)=>triggerNode}
        disabled={disabled}
      />
    </div>
  )
}


const colorMapToKey = {
  b0: "magenta",
  b1: "red",
  b2: "lime",
  b3: "volcano",
  b4: "geekblue",
  b5: "purple",
}
const Step23Content = (props) => {
  console.log(props);
  const { factorsForComputeScore,universeData} =props // universeData to remove
  const [dataSource, setDataSource] = useState(factorsForComputeScore)
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 0:
        let meanWeights = {}
        dataSource.forEach(item => (
          meanWeights[item] = (100 / dataSource.length)
        ))
        return meanWeights
      case 1: //这个回归权重实际需要从后端请求
        let regWeights = {}
        dataSource.forEach(item => (
          regWeights[item] = Math.random()
        ))
        const sum = _.sum(Object.values(regWeights))
        dataSource.forEach(item => {
          regWeights[item] = (regWeights[item] / sum) * 100
        })
        return regWeights
      
      case 2:
        return {
          ...state
        }
      case 3:
        const [ k, v ] = Object.entries(action.payload)[0]
        let restKV = Object.assign({}, state)
        restKV[k] = 0
        const restVsum = _.sum(Object.values(restKV))
        if ((restVsum + v)>100){
          message.error('权重和不能大于100%！')
          return {
            ...state,
            [k]:100-restVsum
          }
        } else{
          return {
            ...state,
            ...action.payload
          }
        }

      default:
        return state
    }
  }

  const [weights, dispatch] = useReducer(reducer, {})
  const [choice, setChoice] = useState(0)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const listData = factorsForComputeScore
    setDataSource(listData)
    dispatch({
      type:choice
    }) 
  }, [factorsForComputeScore,choice])
  

  const header = (
    <div style={{display:'flex'}}>
      <Typography.Text strong style={{paddingRight:20}}>权重计算方式：</Typography.Text>
      <Radio.Group 
      onChange={e=>{
        setChoice(e.target.value)
        e.target.value===2? setDisabled(false):setDisabled(true)
        }}
        value={choice}>
        <Radio value={0}>相等权重</Radio>
        <Radio value={1}>多元回归</Radio>
        <Radio value={2}>经验加权</Radio>
      </Radio.Group>
    </div>
  )

  const columns = [
    {
      title: '股票代码',
      dataIndex: 'stkcd'
    }, {
      title: '公司简称',
      dataIndex: 'name'
    }, {
      title: '所属组合',
      dataIndex: 'portfolioName',
      render: (value, record) => {
        return (
          <Tag color={colorMapToKey[record.portfolio]}>
            {value}
          </Tag>
        )
      }
    },{
      title:'综合得分',
      dataIndex:'comprehensiveScore',
      sorter:(a,b)=>a.comprehensiveScore-b.comprehensiveScore,
      defaultSortOrder: 'descend',
    }]
  const tableDataSource = universeData.map(o=>({
    ...o,
    comprehensiveScore:(Math.random()*10).toFixed(4)
  }))
  return (
    <div>
      <List
        className='factor-weight-list'
        header={header}
        // loading
        dataSource={dataSource}
        grid={{ gutter: 10, column: 3 }}
        renderItem={item =>
          <List.Item
          >
            <div style={{ display: 'flex' }}>
              <p style={{ flex: 0.5 }}>{item}</p>
              <ListItem 
                k={item} 
                v={weights[item]} 
                disabled={disabled} 
                dispatch={dispatch}
              />
            </div>
          </List.Item>
        }
      />
      <Table
        columns={columns}
        dataSource={tableDataSource}
        size='middle'
      />
    </div>
  )
}




export default connect(state => state.strategyInfo)(Step23Content)  