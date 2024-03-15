/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Col, Input, Modal, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { addMsg, cleanMsg, selectQuestion, selectAnswer, fetchQuestion, fetchAnswer } from './ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
// import IconText from '../../components/IconText';
// import testImg from '../../img/test.png';
import './chat.css';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState([]);
  // 设置对话框弹出
  const [isOpen, setIsOpen] = useState(false);
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
    dispatch(fetchAnswer(newAnswer));
    dispatch(addMsg(newAnswer));
    setInputValue('');
    setIsOpen(true);
  };

  // 跳转评价页面
  const changeEvaluate = () => {
    setIsOpen(false);
    navigate(`/evaluate/${questionId}`);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(cleanMsg());
    dispatch(fetchQuestion(questionId));
  }, []);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
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
        <Row gutter={32} justify={'center'} align={'bottom'}>
          <Col xs={16} sm={18} lg={20}><Input.TextArea rows={3} value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="请输入你的回答" /></Col>
          <Button type="primary" onClick={sendMsg}>Submit</Button>
          <Modal open={isOpen} onOk={changeEvaluate} onCancel={handleCancel} >
            <Typography>你已完成对话练习，请对本问题做出评价</Typography>
            {/* <IconText icon={LikeOutlined} hightlight={qusetion.isLike} type={'like'} answerUserId={qusetion.answerUserId} key="like" />,
            <IconText icon={DislikeOutlined} hightlight={qusetion.isUnLike} type={'unLike' } answerUserId={qusetion.answerUserId} key="like" />,
            <IconText icon={StarOutlined} hightlight={qusetion.isFavorite} type={'favorite'} answerUserId={qusetion.answerUserId} key="like" /> */}
          </Modal>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatPage;
