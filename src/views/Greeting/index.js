import React, { Component } from 'react'
import { Layout,Button,Icon} from 'antd';


import './index.less'
import './index-pad.less'
import './index-mobile.less'
import logo from './images/logo1.png'
import searchImg from './images/fangdajing.svg'
import kImg from './images/Kxiantu.svg'
import computerImg from './images/diannao.svg'
import githubImg from './images/GitHub.svg'

const { Header, Content} = Layout;

export default class Greeting extends Component {

    render() {
        return (
            <Layout className='page-body'>
                <Header className='page-header' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <img src={logo} alt="logo"/>
                    <Button.Group className='page-header-button'>
                        <Button ghost className='btn-login'>登录</Button>|
                        <Button ghost className='btn-register'>注册</Button>
                    </Button.Group>
                </Header>
                <Content className='page-main'>
                    <div className="page-content">
                        <div className="page-content-left">
                            <img src={searchImg} alt=""/>
                            <div className='text'>Ac<span>count</span>ing</div>
                        </div>
                        <div className="page-content-center">
                            <div className='title'>基本面量化投资</div>
                            <p>——开启您的价值投资之旅</p>
                            <div className="button-group">
                                <Button style={{fontWeight:'bold',width:"120px"}}>开始使用</Button>
                                <img src={githubImg} alt='' />
                                <Button style={{ fontWeight: 'bold' }}>
                                    biu一下呗~
                                    <Icon type='heart' style={{ color: 'hotpink',margin:'0px'}}/>
                                </Button>
                            </div>
                        </div>
                        <div className="page-content-right">
                          <img src={computerImg} id='computer' alt=''/>
                          <img src={kImg} id="k" alt=''/>
                          <div className="text">> Tech <span>. . .</span></div>
                        </div>
                    </div>
                </Content>
            </Layout> 

            // <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>

        )
    }
}

