import React, { Component } from 'react'
import { Table} from 'antd'

export default class RelativeEva extends Component {


    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Borrow',
                dataIndex: 'borrow',
            },
            {
                title: 'Repayment',
                dataIndex: 'repayment',
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                borrow: 10,
                repayment: 33,
            },
            {
                key: '2',
                name: 'Jim Green',
                borrow: 100,
                repayment: 0,
            },
            {
                key: '3',
                name: 'Joe Black',
                borrow: 10,
                repayment: 10,
            },
            {
                key: '4',
                name: 'Jim Red',
                borrow: 75,
                repayment: 45,
            },
        ];

        return (
    <Table
        style={{margin:'0px -23@px'}}
        columns={columns}
        dataSource={data}
        pagination={false}
        title={(pageData)=>{
            console.log(pageData)
            return 'RelativeEva'
        }}
        summary={pageData => {
            console.log('summary:',pageData)
        }}
    />)
    }
}