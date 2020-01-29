import React,{Component} from 'react'
import { message,AutoComplete,Input } from 'antd'
import { connect } from 'react-redux'


import './index.less'
import { getAllFirmCodeNames } from '../../api'
import { selectFirm } from '../../redux/actions'

@connect(state=>state.userInfo,{selectFirm})
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchDataSource: [],
      searchFirmCode: '',
    }
  }
  //处理输入的值，并提供数据源
  handleSearch = value => {
    getAllFirmCodeNames()
      .then(resp => {
        const searchDataSource = resp.data.map(item => {
          return { value: item.stkcd + ` ${item.name}` }
        })
        this.setState({
          searchDataSource
        })
      })
    this.setState({
      searchFirmCode: value
    })
  }
  //处理选择的值
  onSelect = (value) => {
    let stkcd = /^\d{6}/.exec(value)[0]
    if (stkcd) {
      this.setState({
        searchFirmCode: stkcd
      })
    } else {
      message.error("输入有误！")
    }
  }
  //处理输入框回车
  onPressEnter = (value) => {
    let stkcdName = value.split(' ') 
    let [stkcd, firmName] = stkcdName
    stkcd = /^\d{6}/.exec(stkcd) //避免没有空格隔开
    if (stkcd) {
      this.props.selectFirm(stkcd[0], firmName)
    } else {
      message.error("输入的公司不存在")
    }
  }


  render() {
    
    return (
      <div className="search-predict-wrapper">
        <AutoComplete
          className="search-predict"
          options={this.state.searchDataSource}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="查询公司股价预测信息"
          filterOption={(inputValue, option) =>
            option.value.indexOf(inputValue) !== -1
          }
        >
          <Input.Search
            enterButton
            onSearch={this.onPressEnter} />
        </AutoComplete>
      </div>
    );
  }
}

export default SearchBar