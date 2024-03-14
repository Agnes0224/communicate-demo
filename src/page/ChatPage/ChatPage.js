import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Col, Input, Image, Menu, Modal, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { addMsg, selectMsg, fetchQuestion } from './ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
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

const ChatPage = () => {
  // 设置当前对话分类
  const [currentChat, setCurrentChat] = useState('order');
  const [inputValue, setInputValue] = useState([]);
  // 设置对话框弹出
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const qusetion = useSelector(selectQuestion);
  // const answer = useSelector(selectAnswer);
  const chat = useSelector(selectMsg);
  // console.log(chat);

  // 切换分类
  const onClick = (e) => {
    setCurrentChat(e.key);
  };

  // 发送消息
  const sendMsg = () => {
    const newMessage = [{
      msgId: chat.length + 1, // 简单的方式生成新消息的ID
      content: inputValue,
      user: 'You',
      isSender: true,
    }];
    dispatch(addMsg(newMessage)); // 更新消息列表
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
    dispatch(addMsg([]));
    dispatch(fetchQuestion(currentChat));
  }, [currentChat]);

  // useEffect(() => {
  //   chat = [...qusetion, ...answer];
  //   console.log(chat);
  // }, [qusetion, answer]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Menu onClick={onClick} selectedKeys={[currentChat]} mode="horizontal" items={items} />
        <Row justify={'center'} className="chatBox">
          <Col span={22}>
            {chat.map((item) => {
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
