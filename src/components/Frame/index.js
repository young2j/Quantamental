import React, { Component } from 'react'
import { withRouter } from 'react-router'

import {
  AccountBookOutlined,
  CalculatorOutlined,
  ExperimentOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  ReadOutlined,
  StockOutlined,
  ToolOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined
} from '@ant-design/icons';

import { Layout, Menu, Badge,Dropdown,Avatar} from 'antd';
import moment from 'moment'
import ReactAnimatedWeather from 'react-animated-weather'
import { connect } from 'react-redux'


import './index.less'
import logo from './logo2.png'
import strangerAvatar from './avatar1.gif'
import loginAvatar from './avatar2.jpg'

import { logout } from '../../redux/actions'

//-----------------------------
const weeks = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
]

//-----------------------------
const weathers = [
  'CLEAR_DAY',
  'CLEAR_NIGHT',
  'PARTLY_CLOUDY_DAY',
  'PARTLY_CLOUDY_NIGHT',
  'CLOUDY',
  'RAIN',
  'SLEET',
  'SNOW',
  'WIND',
  'FOG'
]

const weatherDefaults = {
  icon: weathers[Math.round(Math.random()*10)],
  color: 'goldenrod',
  size: 40,
  animate: true
};

//------------------------------------
const { Header, Sider, Content } = Layout;

@connect(state=>state.userInfo,{logout})
@withRouter
class Frame extends Component {
  state = {
  collapsed: false,
  menutheme:'light',
  timeNow: moment().format('YYYY-MM-DD hh:mm:ss')
  };

  menuToggle = () => {
  this.setState({
    collapsed: !this.state.collapsed,
    menutheme: this.state.collapsed ? 'light': 'dark',
  });
  };

  menuClick = ({key}) => {
    if (key === '/user/login') {
        this.props.isLogin ? this.props.logout() : this.props.history.push(key)
    } else {
        this.props.history.push(key)
    }
}
  
  getTime=()=>{
  setInterval(() => {
    const timeNow = moment().format('YYYY-MM-DD hh:mm:ss')
    this.setState({
      timeNow
    })
  }, 1000);
  }

  componentDidMount(){
    this.getTime()
  }

  render() {

    const {notifications,username,isLogin} = this.props
    const notReadCount = notifications.filter(item=>item.hasRead!==true).length

    return (
        <Layout className='frame' >
        <Header className='frame-header'>
        <img src={logo} alt="logo"/>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center',verticalAlign:'center'}}>
                <div style={{ marginTop: 20, marginRight: 10 }}>
                    <ReactAnimatedWeather
                        icon={weatherDefaults.icon}
                        color={weatherDefaults.color}
                        size={weatherDefaults.size}
                        animate={weatherDefaults.animate}
                    />
                </div>
                <div style={{ marginRight: 50 }}>{weeks[moment().week()-1]}&nbsp;{this.state.timeNow}</div>
            </div>

            <div>
                <Dropdown trigger={['click']}
                overlay={
                    <Menu onClick={this.menuClick}>
                        <Menu.Item key='/user/notification'>
                        <Badge dot={Boolean(notReadCount)}>
                            消息中心
                        </Badge>
                        </Menu.Item>
                        <Menu.Item key='/user/profile'>
                            个人设置
                        </Menu.Item>
                        <Menu.Item key='/user/login'>
                            {isLogin? '退出登录':'点击登录'}
                        </Menu.Item>
                    </Menu>
                    }>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={isLogin? loginAvatar:strangerAvatar} 
                            className='avatar-img' shape='square'/> 
                        <span><b>欢迎你，{username}</b></span>
                        <Badge count={notReadCount} offset={[8, -2]}>
                            <DownOutlined style={{marginLeft:10,color:'#1890ff'}}/>
                        </Badge>
                    </div>
                </Dropdown>
            </div> 
        </div>
        </Header>    
        <Layout>
        <Sider collapsible 
            collapsed={this.state.collapsed} 
            trigger={
            (< div onClick={this.menuToggle}>
            {this.state.collapsed ? <DoubleRightOutlined />:<DoubleLeftOutlined/>}
            </ div>)
            }
            className='frame-sider'
        >
        <Menu theme={this.state.menutheme} 
            mode="inline" 
            // defaultSelectedKeys={[]}
            onClick={this.menuClick}
            >
            <Menu.Item key="/stockpredict">
            <StockOutlined />
            <span>个股预测</span>
            </Menu.Item>
            <Menu.SubMenu title={
                <span>
                <AccountBookOutlined />
                <span>挖基本面</span>
                </span>
            }
            >

            <Menu.SubMenu title={
                <span>
                <CalculatorOutlined />
                <span>估值维度</span>
                </span>
                }
            >
            <Menu.Item key="/fundamental/finance">
            <PayCircleOutlined />
            <span>财务分析</span>
            </Menu.Item>
            <Menu.Item key="/fundamental/evaluation">
            <PercentageOutlined />
            <span>估值模型</span>
            </Menu.Item>
            </Menu.SubMenu>


            <Menu.Item key="/fundamental/quality">
            <ToolOutlined />
            <span>质量维度</span>
            </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key='/strategy'>
            <ExperimentOutlined />
            <span>策略应用</span>
            </Menu.Item>
            <Menu.Item key='/knowledge'>
            <ReadOutlined />
            <span>知识百科</span>
            </Menu.Item>
        </Menu>
        </Sider>
        <Content className="frame-content"
        >
        {this.props.children}
        </Content>
        </Layout>
        </Layout>
    );
    
  }
}

export default Frame