

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Form, Input, Button, Checkbox, Card, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less'
import { Index } from '../Greeting'
import { login } from '../../redux/actions'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 },
  },
}



const Login = (props)=>{
  
  const {isLogin,isLoading} = props
  
  const handleFinish = values => {
    props.login(values)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    props.history.push('/user/register')
  }

  return (
    <Index>
      <div className='login-page'>
        {isLogin ?
          <Redirect to='/' />
          :
          <div className='login-content'>
            <Spin spinning={isLoading}>
            <Card 
                className='login-card'
                title={
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    欢迎登录
                  </Typography.Title>}
            >

              <Form className="login-form" 
                {...formItemLayout}
                onFinish={handleFinish}
                initialValues={{
                  remember: true,
                }}>
                <Form.Item label='用户名'
                  name='username'
                  rules={[{required: true, message: '请输入用户名!' }]}
                >
                  <Input
                      disabled={isLoading}
                      prefix={<UserOutlined />}
                      placeholder="用户名"
                      style={{marginLeft:20}}
                  />
                </Form.Item>
                <Form.Item label={<span>密&emsp;码</span>}
                  name='password'
                  rules={[{required: true, message: '请输入密码!' }]}
                >
                  <Input
                    disabled={isLoading}
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="密码"
                    style={{marginLeft:20}}
                  />
                </Form.Item>
              <div className='login-form-login'>
                <Form.Item name="remember" valuePropName="checked" noStyle >
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  <div className="login-form-remember-forgot">
                    <Button ghost style={{color:'#1890ff',border:'none'}} onClick={e=>handleRegister(e)}>立即注册!</Button>
                    <Button  ghost style={{color:'#1890ff',border:'none'}}>忘记密码</Button>
                  </div>
                </Form.Item>
              </div>  
            </Form>
          </Card>
        </Spin>
        </div>
      }
      </div>
    </Index>
  )

}

export default connect(state=>state.userInfo,{login})(Login)


const Register = (props)=>{
  return (
    <Index>
      <h1 style={{position:'fixed',left:'45%',top:'40%',color:'#fff'}}>
        傲娇的注册页
      </h1>
    </Index>
  )
}

export {
  Register
}