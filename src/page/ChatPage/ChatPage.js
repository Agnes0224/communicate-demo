/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Col, Input, Row } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { addMsg, cleanMsg, selectQuestion, selectAnswer, fetchChatQuestion, fetchChatAnswer } from './ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
// import IconText from '../../components/IconText';
// import testImg from '../../img/test.png';
import './chat.css';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState([]);
  // 设置对话框弹出
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questionId } = useParams();

  // 获取问题和回答
  const qusetion = useSelector(selectQuestion);
  const answer = useSelector(selectAnswer);

  // 发送消息
  const sendMsg = () => {
    const newAnswer = {
      questionId: questionId,
      answerUserId: 1,
      answerContent: inputValue,
    };
    dispatch(fetchChatAnswer(newAnswer));
    dispatch(addMsg(newAnswer));
    setInputValue('');
    navigate(`/evaluate/${questionId}`);
  };

  // // 跳转评价页面
  // const changeEvaluate = () => {
  //   setIsOpen(false);
  //   navigate(`/evaluate/${questionId}`);
  // };

  // const handleCancel = () => {
  //   setIsOpen(false);
  // };

  useEffect(() => {
    dispatch(cleanMsg());
    const timer = setTimeout(() => {
      dispatch(fetchChatQuestion(questionId));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14}>
        <Row justify={'center'} className="chatBox">
          <Col span={22}>
            {/* {chat.map((item) => {
              return item.isSender
                ? <Row justify={'end'} key={item.msgId} style={{ marginBottom: '16px' }}>
                  <div className="dialog">{item.content}</div>
                  <Avatar icon={<UserOutlined />} />
                </Row>
                : <Row gutter={16} key={item.msgId} style={{ marginBottom: '16px' }}>
                  <Avatar icon={<UserOutlined />} />
                  //判断为文本还是文字问题
                  {item.msgType === 'text'
                    ? <div className="dialog">{item.content}</div>
                    : <Image src={item.src} />
                  }
                </Row>;
            })} */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Avatar icon={<UserOutlined />} />
              <div className="dialogQ">{qusetion.questionContent}</div>
            </Row>
            {answer.answerUserId
              ? <Row justify={'end'} style={{ marginBottom: '16px' }}>
                <div className="dialogA">{answer.answerContent}</div>
                <Avatar icon={<UserOutlined />} />
              </Row>
              : <></>
            }
          </Col>
        </Row>
        <Row gutter={32} className="send">
          <Col offset={2} xs={18} sm={20} lg={22}>
            <Input.TextArea
              className="send-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入你的回答"
            />
            <Button
              icon={<SendOutlined />}
              className="send-btn"
              onClick={sendMsg}
              type="primary"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatPage;
