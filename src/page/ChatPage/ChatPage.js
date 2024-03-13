import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Col, Input, Image, Menu, Modal, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import testImg from '../../img/test.png';
import './chat.css';

// 模拟分类数据
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
  },
];

// 模拟聊天数据
const initialMessages = [
  {
    msgId: 1,
    msgType: 'text',
    content: '你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx你好xxxx',
    user: 'Chat',
    isSender: false,
  },
  // {
  //   msgId: 2,
  //   msgType: 'img',
  //   src: testImg,
  //   user: 'Chat',
  //   isSender: false,
  // },
  // {
  //   msgId: 2,
  //   content: '回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala',
  //   user: 'You',
  //   isSender: true,
  // },
];

const ChatPage = () => {
  // 设置当前对话分类
  const [currentChat, setCurrentChat] = useState('order');
  const [inputValue, setInputValue] = useState('');
  // 设置消息管理
  const [messages, setMessages] = useState(initialMessages);
  // 设置对话框弹出
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // 切换分类
  const onClick = (e) => {
    setCurrentChat(e.key);
    // console.log(e.key);
  };

  // 发送消息
  const sendMsg = () => {
    const newMessage = {
      msgId: messages.length + 1, // 简单的方式生成新消息的ID
      content: inputValue,
      user: 'You',
      isSender: true,
    };
    setMessages([...messages, newMessage]); // 更新消息列表
    setInputValue(''); // 清空输入框
    setIsOpen(true);
  };

  // 跳转评价页面
  const changeEvaluate = () => {
    setIsOpen(false);
    navigate('/evaluate');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, [currentChat]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={16} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Menu onClick={onClick} selectedKeys={[currentChat]} mode="horizontal" items={items} />
        <Row justify={'center'} className="chatBox">
          <Col span={22}>
            {messages.map((item) => {
              return item.isSender
                ? <Row justify={'end'} key={item.msgId} style={{ marginBottom: '16px' }}>
                  <div className="dialog">{item.content}</div>
                  <Avatar icon={<UserOutlined />} />
                </Row>
                : <Row gutter={16} key={item.msgId} style={{ marginBottom: '16px' }}>
                  <Avatar icon={<UserOutlined />} />
                  {item.msgType === 'text'
                    ? <div className="dialog">{item.content}</div>
                    : <Image src={item.src} />
                  }
                </Row>;
            })}
          </Col>
        </Row>
        <Row gutter={32} justify={'center'} align={'bottom'}>
          <Col xs={16} sm={18} lg={20}><Input.TextArea rows={3} value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="请输入你的回答" /></Col>
          <Button type="primary" onClick={sendMsg}>Submit</Button>
          <Modal open={isOpen} onOk={changeEvaluate} onCancel={handleCancel} >
            <Typography>已完成对话练习</Typography>
          </Modal>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatPage;
