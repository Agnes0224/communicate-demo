import React, { useState } from 'react'
import { Avatar, Button, Card, Input , Layout, List, Menu  } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Header, Content } = Layout

//模拟分类数据
const items = [
    {
      label: '下单咨询',
      key: 'order',
    },
    {
      label: '设备咨询',
      key: 'equipment',
    },
    {
        label: '模拟计算',
        key: 'calculate',
    },
    {
        label: '售后服务',
        key: 'service',
    }    
]

// 模拟聊天数据
const messages = [
    {
        id: 1,
        content: '你好xxxx',
        user: 'Chat',
        isSender: false
    },
    {
        id: 2,
        content: '回答balabala',
        user: 'You',
        isSender: true
    },
]

const ChatPage = () => {
    //设置当前对话分类
    const [currentChat, setCurrentChat] = useState('order')

    //切换分类
    const onClick = (e) => {
        setCurrentChat(e.key);
      }

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        {/* Logo and Header content */}
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Card>
            <Menu onClick={onClick} selectedKeys={[currentChat]} mode="horizontal" items={items} />
            <List
                dataSource={messages}
                style={{ margin: '24px 16px 0' }}
                renderItem={item => (
                <List.Item style={{ alignItems: 'flex-start' }}>
                    <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    style={{ justifyContent: item.isSender ? 'flex-end' : 'flex-start' }}
                    />
                </List.Item>
                )}
            /> 
            
            <Input.TextArea rows={4} placeholder="请输入你的回答"></Input.TextArea>
            <Button type="primary" onClick={onClick}>Submit</Button>
        </Card>
        
      </Content>
    </Layout>
  )
}

export default ChatPage
