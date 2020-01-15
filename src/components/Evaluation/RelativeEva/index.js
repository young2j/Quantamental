import React from 'react'
import { Table} from 'antd'


import './index.less'

const upArrow = <svg t="1578779997089" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22495" width="16" height="16"><path d="M559.795332 978.804414h-95.390684l2.499756 45.195586h90.391173z" fill="#d81e06" p-id="22496"></path><path d="M567.2946 843.217655H456.90538l4.999512 90.391172h100.390196z" fill="#d81e06" p-id="22497"></path><path d="M512.09999 0.09999L240.926472 255.775022h183.282101l30.197051 542.247046h115.488722L599.991407 255.775022h183.282101z" fill="#d81e06" p-id="22498"></path></svg>
const downArrow = <svg t="1578779865230" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21787" width="16" height="16"><path d="M464.404648 45.295577h95.390684L557.295577 0.09999h-90.391173z" fill="#19fa28" p-id="21788"></path><path d="M456.90538 180.882336h110.38922l-4.999512-90.391173H461.904892z" fill="#19fa28" p-id="21789"></path><path d="M512.09999 1024l271.173518-255.575041H599.991407l-30.097061-542.347037H454.405624l-30.197051 542.347037H240.926472z" fill="#19fa28" p-id="21790"></path></svg>



const RelativeEva= (props)=>{
    const columns = [
        {
            title: '市盈率(P/E)估值',
            children: [
                {
                    title: 'instruction',
                    dataIndex: 'peInstruction',
                    colSpan: 0,
                    render: (value, record, index) => {
                        let obj = {
                            children: '',
                        }
                        if (index === 0) {
                            obj.children = '①平均市盈率'
                        }
                        if (index === 1) {
                            obj.children = '②每股收益(元)'
                        }
                        if (index === 2) {
                            obj.children = '③每股估价(元)'
                        }
                        if (index === 3) {
                            obj.children = '每股股价(元)'
                        }
                        return obj
                    }
                },
                {
                    title: '市盈率TTM',
                    colSpan: 2,
                    dataIndex: 'peRatio_TTM',
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }

                }, {
                    title: '市盈率AI',
                    dataIndex: 'peRatio_AI',
                    colSpan: 1,
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }
                }
            ]
        },
        {
            title: '市盈增长率(P/E)估值_AI',
            children: [
                {
                    title: 'instruction',
                    dataIndex: 'pegInstruction',
                    colSpan: 0,
                    render: (value, record, index) => {
                        let obj = {
                            children: ''
                        }
                        if (index === 0) {
                            obj.children = '①平均市盈增长率'
                        }
                        if (index === 1) {
                            obj.children = '②每股收益x预计增长率(元)'
                        }
                        if (index === 2) {
                            obj.children = '③每股估价(元)'
                        }
                        if (index === 3) {
                            obj.children = '每股股价(元)'
                        }
                        return obj
                    }
                }, {
                    title: 'EPS复合增长率',
                    dataIndex: 'PEG',
                    colSpan: 2,
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }
                }, {
                    title: 'EPS复合增长率_AI',
                    dataIndex: 'PEG_AI',
                    colSpan: 1,
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }
                }
            ]
        },
        {
            title: '市净率(P/B)估值',
            children: [
                {
                    title: 'instruction',
                    dataIndex: 'pbInstruction',
                    colSpan: 0,
                    render: (value, record, index) => {
                        let obj = {
                            children: ''
                        }
                        if (index === 0) {
                            obj.children = '①平均市净率'
                        }
                        if (index === 1) {
                            obj.children = '②每股净资产(元)'
                        }
                        if (index === 2) {
                            obj.children = '③每股估价(元)'
                        }
                        if (index === 3) {
                            obj.children = '每股股价(元)'
                        }
                        return obj
                    }
                }, {
                    title: '',
                    dataIndex: 'pbRatio',
                    colSpan: 2,
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }
                }
            ]
        },
        {
            title: '市销率(P/S)估值',
            children: [
                {
                    title: 'instruction',
                    dataIndex: 'psInstruction',
                    colSpan: 0,
                    render: (value, record, index) => {
                        let obj = {
                            children: ''
                        }
                        if (index === 0) {
                            obj.children = '①平均市销率'
                        }
                        if (index === 1) {
                            obj.children = '②每股销售收入(元)'
                        }
                        if (index === 2) {
                            obj.children = '③每股估价(元)'
                        }
                        if (index === 3) {
                            obj.children = '每股股价(元)'
                        }
                        return obj
                    }
                }, {
                    title: '',
                    dataIndex: 'psRatio',
                    colSpan: 2,
                    render: (value, record, index) => {
                        if (index === 2 && value > 50) {
                            return <div style={{ display: 'flex' }}>{value}{upArrow}</div>
                        }
                        else if (index === 2 && value < 50) {
                            return <div style={{ display: 'flex' }}>{value}{downArrow}</div>
                        }
                        else {
                            return value
                        }
                    }
                }
            ]
        }
    ]
    const { relativeEvaInfo, isLoading } = props.evaluationInfo    


    return (
        <Table
            className='relative-eva-table'
            style={{margin:'0px auto'}}
            columns={columns}
            dataSource={relativeEvaInfo}
            pagination={false}
            footer={()=>{
                return <p>其中：① x ② = ③</p>
            }}
            rowKey={record=>record.peRatio_AI}
            loading={isLoading}
            />
        )
}

export default RelativeEva