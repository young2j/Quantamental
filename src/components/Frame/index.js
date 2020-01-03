import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { 
    Layout, 
    Menu, 
    Icon,
    Button
} from 'antd';

import logo from './logo2.png'
import './index.less'


const { Header, Sider, Content } = Layout;


@withRouter
class Frame extends Component {
    state = {
        collapsed: false,
        menutheme:'light',
        triggertype: 'double-left'
    };

    menuToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            menutheme: this.state.collapsed ? 'light': 'dark',
            triggertype: this.state.collapsed ?'double-left':'double-right'
        });
    };

    menuClick = ({key}) => {
        this.props.history.push(key)    
    }
    
    render() {
        return (
            <Layout className='frame' >
                <Header className='frame-header'>
                    <img src={logo} alt="logo"/>
                    <Button.Group className='frame-header-button'>
                        <Button  type='primary' ghost >登录</Button>
                        <Button  type='primary' ghost >注册</Button>
                    </Button.Group>
                </Header>                
                <Layout>
                    <Sider collapsible 
                           collapsed={this.state.collapsed} 
                           trigger={
                               < Icon type={this.state.triggertype} 
                                      onClick={this.menuToggle}/>
                           }
                           className='frame-sider'
                    >
                        <Menu theme={this.state.menutheme} 
                              mode="inline" 
                              defaultSelectedKeys={['sub1']}
                              onClick={this.menuClick}
                              >
                            <Menu.Item key="/dashboard">
                                <Icon type="stock" />
                                <span>股市概览</span>
                            </Menu.Item>
                            <Menu.SubMenu title={
                                          <span>
                                            <Icon type="account-book" />
                                            <span>挖基本面</span>
                                          </span>
                                        }
                            >

                                <Menu.SubMenu title={
                                                <span>
                                                    <Icon type="calculator" />
                                                    <span>估值维度</span>
                                                </span>
                                            }
                                >
                                    <Menu.Item key="/fundamental/finance">
                                        <Icon type="pay-circle" />
                                        <span>财务分析</span>
                                    </Menu.Item>
                                    <Menu.Item key="/fundamental/evaluation">
                                        <Icon type="percentage" />
                                        <span>估值模型</span>
                                    </Menu.Item>
                                </Menu.SubMenu>


                                <Menu.Item key="/fundamental/quality">
                                    <Icon type="tool" />
                                    <span>质量维度</span>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key='/strategy'>
                                <Icon type='experiment' />
                                <span>策略应用</span>
                            </Menu.Item>
                            <Menu.Item key='/knowledge'>
                                <Icon type='read' />
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