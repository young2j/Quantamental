import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFactorValidateInfo } from '../../api'
import _ from 'lodash'

@connect(state => state.strategyInfo)
class Step22Content extends Component {
    state = {
        data: []
    }

 
    handleData =  () => {
        const { dataSource } = this.props
        const factors = _.flatMapDeep(dataSource, ds => ds.map(o => Object.values(o)[1]))
   
        let data = []
        factors.forEach( item => {
           getFactorValidateInfo(item)
            .then(resp=>{
                data.push({
                    ...resp.data,
                    factor: item
                })
                // return 
            })
        })
        this.setState({
            data
        })
    }

    componentDidMount() {
        this.handleData()
    }
    render() {
        console.log(this.state);
        return (
            <div>
                Step22Content
            </div>
        )
    }
}

export default Step22Content
