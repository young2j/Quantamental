import React, { Component,useState } from 'react'
import {
    Icon,
    Button,
    Input,
    AutoComplete,
    message,
    Typography,
} from 'antd';

import './index.less'

import { searchFirmcode,getFinancialData} from '../../../api'


export const PageTitle = ()=>{
    const [switchTitle, setSwitchTitle] = useState(false)
    return (
        <div className='page-title'>
            <Typography.Text className='page-title-text'
                onClick={() => setSwitchTitle(!switchTitle)}
                >
                {switchTitle ? '纵向分析' : '横向分析'}
                <Icon type="block" />
            </Typography.Text>
        </div>
    )
}



export class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchDataSource: [],
            isSearching: false,
        }
    }
    //处理输入的值，并提供数据源
    handleSearch = value => {
        searchFirmcode()
            .then(resp => {
                const searchDataSource = resp.data.map(item => {
                    return item.stkcd + ` ${item.name}`
                })
                this.setState({
                    searchDataSource
                })
            })
    };
    //处理选择的值
    onSelect = (value) => {
        this.setState({
            isSearching: true
        })
        const stkcd = /^\d{6}/.exec(value) //返回数组,没有则返回null
        if (stkcd) {
            getFinancialData(stkcd[0])
                .then(resp => {
                    console.log(resp);
                })
                .finally(() =>
                    this.setState({
                        isSearching: false
                    })
                )
        } else {
            message.error("输入的公司不存在")
            this.setState({
                isSearching: false
            })
        }
    }
    //处理输入框回车
    onPressEnter = (value) => {
        this.onSelect(value)
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
                        placeholder="输入公司代码或公司名"
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
                            loading={this.state.isSearching}
                            onSearch={this.onPressEnter} />
                    </AutoComplete>
                </div>
            )
    }
}
