import React, { useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd'

import './index.less'




const Step22Content = (props) => {

  const [factors, setFactors] = useState([])

  useEffect(() => {
    const factors = props.factorsValidateOK.map(o => o.factor)
    setFactors(factors)
  }, [props])

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
        onClick={()=>setFactors(factors.filter(item=>item!=record.factor))}
      />)
  })
  //dataSource
  const dataSource = factors.map((k, i) => {
    let row = {}
    factors.forEach((item, index) => {
      row.key = i
      row.factor = k
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






export default connect(state => state.strategyInfo)(Step22Content)
