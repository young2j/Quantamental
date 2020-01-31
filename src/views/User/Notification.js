import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  List,
  Avatar,
  Button,
  Badge,
  Spin
} from 'antd'


import { getNotificationList,markNotification, markAllNotification } from '../../redux/actions'



const Notification = (props)=>{
  const { 
    isLoading, 
    notifications, 
    getNotificationList, 
    markNotification, 
    markAllNotification} = props
  
  useEffect(() => {
    getNotificationList()
  }, [getNotificationList])
  
  const allHasRead = notifications.every(item => item.hasRead === true)

  return (
    <Spin spinning={isLoading}>
      <Card
        title={<Badge dot={!allHasRead}><h3 style={{marginLeft:10}}>消息中心</h3></Badge>}
        bordered={false}
        extra={
          <Button
            onClick={()=>markAllNotification()}
            disabled={allHasRead}
          >
            全部标记为已读
          </Button>}
      >
        <List
          size='small'
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={item => (
            <List.Item
              extra={
                item.hasRead ?
                  null : <Button onClick={()=>markNotification(item.id)}>标记为已读</Button>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                description={item.description}
              />
            </List.Item>)}
        />
      </Card>
    </Spin>
  )
}






export default connect(
  state=>state.userInfo,
  {
    getNotificationList,
    markNotification,
    markAllNotification
})(Notification)