import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Typography, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswers, selectEvaluate, fetchEvaluate, fetchAnswer } from './AnswerSlice';
import PostAnswer from '../../components/PostAnswer';
import { useParams } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const EvaluatePage = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  // 获取回复
  const answer = useSelector(selectAnswers);
  // 获取ai评分
  const evaluate = useSelector(selectEvaluate);

  const answerId = 1;
  const link = 'http://localhost:3000/chat/' + questionId;
  const invite = (
    <div>
      <Paragraph copyable>{link} </Paragraph>
    </div>
  );

  const onLoadMore = () => {
    const params = {
      questionId: 1,
      page: 1,
      sort: 1,
    };
    dispatch(fetchAnswer(params));
  };

  // 获取评价
  useEffect(() => {
    dispatch(fetchEvaluate(answerId));
  }, []);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: 'linear-gradient(#ebeff7, #fff)', padding: '8px 0 24px' }}>
        <Card style={{ backgroundColor: '#eceff5', boxShadow: '5px' }}>
          <Row align={'bottom'} justify={'space-around'}>
            <Col>
              <Title italic={true} style={{ fontSize: '48px', color: '#e95866' }}>{evaluate.answerScore}</Title>
            </Col>
            <Col span={20}>
              <div>{evaluate.answerAiResult}</div>
            </Col>
          </Row>
          <Row justify={'end'} style={{ marginTop: '5px' }}>
            {/* <Button type="text" size="large" onClick={invite} style={{ fontWeight: 'bold' }}>邀请好友回答</Button> */}
            <Popover content={invite} trigger="click">
              <Button>邀请好友回答</Button>
            </Popover>
          </Row>
        </Card>
        <Row style={{ padding: '8px 0 24px' }} justify={'center'}>
          <Col span={22}>
            <PostAnswer answer={answer} />
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Button onClick={onLoadMore}>查看更多回答</Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EvaluatePage;
