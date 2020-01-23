import React, { useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd'

import './index.less'

import { toComputeScore } from '../../redux/actions'


const Step22Content = (props) => {

  const { factorsValidateOK,toComputeScore} = props
  const [factors, setFactors] = useState([])

  useEffect(() => {
    const factors = factorsValidateOK.map(o => o.factor)
    setFactors(factors)
    toComputeScore(factors)
  }, [factorsValidateOK,toComputeScore]) //组件挂载后 以及 props中的factorsValidateOK变化时执行

  
  //columns
  const columns = factors.map(item => {
    return {
      title: `${item}`,
      dataIndex: `${item}`,
      width:100,
      render: (value, record) => (
        <div style={{ color: value > 0.5? 'red' : null }}>{value}</div>
      )
    }
  })

  columns.unshift({
    title: 'Corr.',
    dataIndex: 'factor',
  })

  columns.push({
    title:'',
    render: (value,record) => (
      <CloseCircleOutlined 
        onClick={()=>{
          const updatedFactors = factors.filter(item => item !== record.factor)
          setFactors(updatedFactors)
          props.toComputeScore(updatedFactors)
        }}
      />)
  })
  //dataSource
  const dataSource = factors.map((k, i) => {
    let row = {}
    factors.forEach((item, index) => {
      row.key = i
      row.factor = k
      // eslint-disable-next-line
      if (index == i) {
        row[item] = 1
      }
      else if (index < i) {
        row[item] = Math.random().toFixed(2)
      }
      else {
        row[item] = ''
      }
    })
    return row
  })

  return (
      <Table 
        className='corr-table'
        columns={columns}
        dataSource={dataSource}
        size='small'
        ellipsis
        pagination={{hideOnSinglePage:true}}
        />
  )
}






export default connect(state => state.strategyInfo,{toComputeScore})(Step22Content)
