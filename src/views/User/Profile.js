import React, { Component } from 'react'
import { Input,Card,Form,Row,Col,Divider,Button,Spin} from 'antd'
import { connect } from 'react-redux';

import { saveProfile } from '../../redux/actions'

const pStyle = {
  fontSize: 16,
  color:'#1890ff',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};
const DescriptionItem = ({ title, content,name,editting }) => 
  (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {editting? (<Form.Item wrapperCol={{span:16}} name={name}>
                  <Input value={content.props? content.props.href:content}/>
                </Form.Item>):content}
  </div>
)

@connect(state=>state.userInfo,{saveProfile})
class Profile extends Component {
  state = { 
      editting: false,
    }

  onEdit = ()=>{
    const { username, password, blacksheet, follows, baseInfo } = this.props
    const fieldsValue = {
      ...baseInfo,
      username,
      password,
      blacksheet,
      follows
    }    
    this.refs.formRef.setFieldsValue(fieldsValue)
    const {editting} = this.state
    this.setState({
      editting:!editting
    })
  }

  onFinish = (values)=>{
    this.props.saveProfile(values)
  }

  onSubmit = ()=>{
    this.refs.formRef.submit()
    this.setState({
      editting:false
    })
  }

  render() {
    const {username,password,blacksheet,follows,baseInfo,isLoading,isLogin} = this.props
    const {
      name,
      sex,
      city,
      country,
      birthday,
      email,
      phonenumber,
      github,
    } = baseInfo
    const {editting } = this.state
    
    return (
      <div>
        {isLogin?
        (
        <Spin spinning={isLoading}>
        <Card title='个人设置'
          extra={editting? 
          <Button type='primary' onClick={this.onSubmit}>保存</Button>:
          <Button type='primary' onClick={this.onEdit}>编辑</Button>}
        >
        <Form onFinish={this.onFinish} ref='formRef'>
          <p className="site-description-item-profile-p" style={pStyle}>
            基本信息
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="姓名" content={name} name='name' editting={editting}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="性别" content={sex} name='sex' editting={editting}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="城市" content={city} name='city' editting={editting}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="国籍" content={country} name='country' editting={editting}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="生日" content={birthday} name='birthday' editting={editting}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="邮箱" content={email} name='email' editting={editting}/>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <DescriptionItem title="电话号码" content={phonenumber} name='phonenumber' editting={editting}/>
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Github"
                content=
                {
                  <a href={github}>
                    {github}
                  </a>
                }
                editting={editting}
              />
            </Col>
          </Row>      
          <Divider />

          <p className="site-description-item-profile-p" style={pStyle}>
            账户信息
          </p>
          <Row>
            <Col span={24}>
              <DescriptionItem title="用户名" content={username} name='username' editting={editting}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="密码" content={password} name='password' editting={editting}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="我的黑名单" content={blacksheet.join(' ')} name='blacksheet' editting={editting}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="我的关注" content={follows.join(' ')} name='follows' editting={editting}/>
            </Col>
          </Row>
        </Form>
        </Card> 
      </Spin>
      ):(
            <Card title='个人设置'
              bordered={false}
            >
              <div style={{
                    background: '#dedede',
                    width: "100%", 
                    height: '500px',
                    }}>
              <div style={{display:'flex',paddingLeft:'40%',paddingTop:'15%'}}>
                <h3>需要登录查看</h3>
                <Button type='primary' onClick={()=>this.props.history.push('/user/login')}>登录</Button>
              </div>
              </div>
            </Card>
      )
    }
      </div>
    )
  }
}


export default Profile