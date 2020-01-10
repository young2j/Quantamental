import React from 'react'
import { Rate } from 'antd'

const TableFooter = () => {
    return (
        <div className='table-footer'
            style={{ display: 'flex', justifyContent: 'space-around', width: '40%', alignItems: 'center' }}
        >
            <span>注:</span>
            <div className='higher-rate'>
                <Rate allowHalf
                    disabled
                    value={3}
                    style={{ color: 'red' }}
                /> 高于行业平均
            </div>
            <div><Rate allowHalf defaultValue={2.5} disabled />行业平均</div>
            <div className='lower-rate'>
                <Rate allowHalf
                    disabled
                    value={1}
                    style={{ color: 'green' }}
                /> 低于行业平均
            </div>
        </div>
    )
}

export default TableFooter