import React, { Component } from 'react'
import { Card} from 'antd'
import { connect } from 'react-redux'

import { SelectBar } from '../../../../components/Finance/PageHeader'
import { RelativeEva,AbsoluteEva } from '../../../../components/Evaluation'

import './index.less'



@connect(state=>{
    const {currentFirmCode,currentFirmName} = state.financeInfo
    const title = `${currentFirmCode} ${currentFirmName} 模型估值`
    return {
        title
    }
})
class Evaluation extends Component {
    render() {       
        return (
            <Card 
                type='inner'
                title={this.props.title}
                extra={<SelectBar/>}
            >
                <Card.Grid style={{width:'100%'}}>
                    <RelativeEva/>
                </Card.Grid>
                <Card.Grid style={{width:'100%'}}>
                    <AbsoluteEva/>
                </Card.Grid>
            </Card>
        )
    }
}

export default Evaluation