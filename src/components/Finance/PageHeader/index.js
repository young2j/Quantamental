import React, { Component} from 'react'

import {
    Icon,
    Button,
    Input,
    AutoComplete,
    message,
    Typography,
} from 'antd';

import './index.less'

import { autoCompleteFirmCode} from '../../../api'
import { connect } from 'react-redux'
import { horizontalComparision,searchFirm,addFirm } from '../../../redux/actions'
import { handleDataSource } from '../../../utils'

//==============================
@connect(state=> {
            return { 
            horizontal: state.horizontal 
            } 
        },{
            horizontalComparision,
            addFirm        
        })
class PageTitle extends Component {
    render(){
        
      return (
        <div className='page-title'>
            <Typography.Text className='page-title-text'
                onClick={() => this.props.horizontalComparision()}
                >
                {this.props.horizontal ?  '横向分析':'纵向分析'}
                <Icon type="block" />
            </Typography.Text>
        </div>
        )
    }
}

//============================
@connect(state=>{
    return {
        currentFirmCode:state.financeInfo.currentFirmCode,
        isLoading:state.financeInfo.isLoading
    }
 },{searchFirm,addFirm})
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchDataSource: [],
            searchFirmCode:''
        }
    }
    //处理输入的值，并提供数据源
    handleSearch = value => {
        autoCompleteFirmCode()
            .then(resp => {
                const searchDataSource = resp.data.map(item => {
                    return item.stkcd + ` ${item.name}`
                })
                this.setState({
                    searchDataSource
                })
            })
        this.setState({
            searchFirmCode:value
        })
            
    }
    //处理选择的值
    onSelect = (value) => {
        this.setState({
            searchFirmCode:value
        })
    }
    //处理输入框回车
    onPressEnter = (value) => {
        const stkcd = /^\d{6}/.exec(value) //返回数组,没有则返回null
        if (stkcd) {
            this.props.searchFirm(stkcd[0])
        } else {
            message.error("输入的公司不存在")
        }        
    }
    //添加指定公司
    handleAdd=()=>{
        const stkcd = /^\d{6}/.exec(this.state.searchFirmCode) //返回数组,没有则返回null
        if (stkcd) {
            this.props.addFirm(stkcd[0])
        } else {
            message.error("输入的公司不存在")
        }                      
    }

    componentDidMount(){
        this.props.searchFirm(this.props.currentFirmCode) //组件加载完,自动获取上次搜索的公司信息
    }
    
    render() {
        
        return (
                <div className="global-search-wrapper">
                <AutoComplete 
                        className="global-search"
                        size="default"
                        dataSource={this.state.searchDataSource}
                        onSelect={this.onSelect}
                        onSearch={this.handleSearch}
                        placeholder="输入公司代码进行查询或添加"
                        filterOption={(inputValue, option) =>
                            option.props.children.indexOf(inputValue) !== -1
                        }
                    >
                        <Input.Search 
                            enterButton={
                                <Button type='default' shape='circle' style={{ height: '32px' }}>
                                    <Icon type='search' />
                                </Button>
                            }
                            loading={this.props.isLoading}
                            onSearch={this.onPressEnter} />
                    </AutoComplete>
                    <Button ghost
                            type='primary' 
                            shape='circle' 
                            style={{ height: '30px' }}
                            onClick={this.handleAdd}
                    >
                        <Icon type='plus' />
                    </Button>
                </div>
            )
    }
}

export {
    PageTitle,
    SearchBar
}