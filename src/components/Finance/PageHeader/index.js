import React, { Component} from 'react'

import {
    Icon,
    Button,
    Input,
    AutoComplete,
    message,
    Typography,
    Select,
    Divider,
    Radio
} from 'antd';

import './index.less'

import { getAllFirmCodeNames} from '../../../api'
import { connect } from 'react-redux'
import { horizontalComparision, searchFirm, addFirm, selectFirm, deleteFirm,getEvaInfo,getQuaInfo } from '../../../redux/actions'

//==============================
@connect(state=> {
        return { 
            horizontal: state.financeInfo.horizontal,
            currentFirmName:state.financeInfo.currentFirmName
        } 
},{horizontalComparision,addFirm})
class PageTitle extends Component {
    render(){
        
      return (
        <div className='page-title'>
            <Typography.Text className='page-title-text'
                onClick={() => this.props.horizontalComparision()}
                >
                {
                    this.props.horizontal ? 
                    this.props.currentFirmName + '|横向分析'
                    :
                    this.props.currentFirmName + '|纵向分析'
                }
                <Icon type="block" style={{ color:"#2db7f5"}}/>
            </Typography.Text>
        </div>
        )
    }
}

//============================
@connect(state=>{
    return {
        financeInfo:state.financeInfo
    }
},{searchFirm,addFirm})
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchDataSource: [],
            addFirmCode:'',
            addFirmCondition:1,
        }
    }
    //处理输入的值，并提供数据源
    handleSearch = value => {
        getAllFirmCodeNames()
            .then(resp => {
                const searchDataSource = resp.data.map(item => {
                    return item.stkcd + ` ${item.name}`
                })
                this.setState({
                    searchDataSource
                })
            })
        this.setState({
            addFirmCode:value
        })            
    }
    //处理选择的值
    onSelect = (value) => {
        this.setState({
            addFirmCode: value
        }) 
    }
    //处理输入框回车
    onPressEnter=(value)=>{                
        // const stkcd = /^\d{6}/.exec(value) //返回数组,没有则返回null
        const stkcdName = value.split(' ')
        const [stkcd,firmName]=stkcdName
        if (stkcd) {
            this.props.searchFirm(stkcd,firmName)
        } else {
            message.error("输入的公司不存在")
        }
    }

    handleAddFirm = () => {
        if (!this.state.addFirmCode){
            this.props.addFirm()
            message.success('默认添加成功!')
        } else{
            const stkcd = /^\d{6}/.exec(this.state.addFirmCode) //返回数组,没有则返回null
            if (stkcd) {
                this.props.addFirm(stkcd[0])
                message.success('指定添加成功!')
            } else {
                message.error("输入的公司不存在")
            }
        }
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
                        placeholder="搜索或添加公司代码"
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
                            onSearch={this.onPressEnter} />
                    </AutoComplete>

                    <Button 
                        // ghost
                        style={{padding:5}}                            
                        onClick={this.handleAddFirm}
                        // type="primary"
                        // shape='square'
                        icon='plus'>
                        添加可比公司
                    </Button>
                    <Radio.Group defaultValue={1} name="radiogroup" className='radio-group'
                        onChange={e=>this.setState({addFirmCondition:e.target.value})}
                    >
                        <Radio value={1}>按聚类</Radio>
                        <Radio value={2}>按行业</Radio>
                    </Radio.Group>
                </div>
            )
    }
}

//=================纵向分析公司选择框===============

@connect(state=>{
    return {
        financeInfo:state.financeInfo,
    }
},{addFirm,selectFirm,deleteFirm,getEvaInfo,getQuaInfo})
class SelectBar extends Component {
        state = {
            open: false,
            searchDataSource:[],
            addFirmCode:'',
            maybeDeleteFirm:''
        };
        //处理Selet选中项
        handleSelect = (value,option) => {
            const [stkcd,firmName] = value.split(' ')
            this.props.selectFirm(stkcd,firmName)
            this.props.getEvaInfo(stkcd)
            this.props.getQuaInfo(stkcd)
        }
        

        // 处理AutoComplete输入的值，并提供数据源
        handleSearch = value => {
            getAllFirmCodeNames()
                .then(resp => {
                    const searchDataSource = resp.data.map(item => {
                        return item.stkcd + ` ${item.name}`
                    })
                    this.setState({
                        searchDataSource
                    })
                })
            this.setState({
                addFirmCode: value
            })
        }
        //处理选择的值
        onAutoCompleteSelect = (value) => {
            this.setState({
                addFirmCode: value
            })
        }

        //添加指定公司
        handleAddFirm = () => {
            if(!this.state.addFirmCode){
                this.props.addFirm() //默认添加
            } else{
                const stkcd = /^\d{6}/.exec(this.state.addFirmCode) //返回数组,没有则返回null
                if (stkcd) {
                    this.props.addFirm(stkcd[0])
                    
                } else {
                    message.error("输入的公司不存在")
                }
            }
        }
        //删除制定公司
        handleDeleteFirm = (e) => {
            e.stopPropagation()
            this.props.deleteFirm(
                this.state.maybeDeleteFirm
            )
        }

        render() {
            const options = this.props.financeInfo.data.map(obj => obj.stkcd + ` ${obj.name}`)    
            return (
                <div className="select-wrapper" style={{width:240}}
                    onClick={() => this.setState({ open: !this.state.open })}
                >
                <Select 
                    // autoFocus
                    className='select-bar'
                    defaultValue={this.props.financeInfo.currentFirmCode+` ${this.props.financeInfo.currentFirmName}`}
                    open={this.state.open}
                    loading={this.props.financeInfo.isLoading}
                    onChange={this.handleSelect}
                    // onSelect={(value,option)=>console.log(value,option)} //不带搜索框时===onChange
                    dropdownRender={menu => (
                        <div >
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 5}}
                                onClick={e => e.stopPropagation()}
                            >
                                <AutoComplete
                                    className="global-search"
                                    size="default"
                                    dataSource={this.state.searchDataSource}
                                    onSelect={this.onAutoCompleteSelect}
                                    onSearch={this.handleSearch}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.indexOf(inputValue) !== -1
                                    }
                                >
                                  <Input />
                                </AutoComplete>
                                <Button icon='plus' ghost type='primary' className='add-firm-btn'
                                    onClick={this.handleAddFirm}>
                                        添加公司
                                </Button>
                            </div> 
                        </div>
                    )}
                >
                    {options.map(item => (
                        <Select.Option key={item} 
                         onMouseEnter={({ key }) => this.setState({ maybeDeleteFirm: /^\d{6}/.exec(key)[0] })}                                    
                        >
                            {item}
                            <Icon type='close-circle' className='close-icon'
                                onClick={this.handleDeleteFirm}
                            />
                        </Select.Option>
                    ))}
                </Select>
                </div>
            )
        }
    }



export {
    PageTitle,
    SearchBar,
    SelectBar
}