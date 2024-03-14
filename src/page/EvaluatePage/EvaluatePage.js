/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswers, selectEvaluate, fetchEvaluate, fetchAnswer } from './AnswerSlice';
import PostAnswer from '../../components/PostAnswer';
const { Title } = Typography;

const EvaluatePage = () => {
  const dispatch = useDispatch();
  // 获取回复
  const answer = useSelector(selectAnswers);
  console.log(answer);
  // 获取ai评分
  const evaluate = useSelector(selectEvaluate);

  const answer_id = 1;

  const onLoadMore = () => {
    const params = {
      question_id: 1,
      page: 1,
      sort: 1,
    };
    dispatch(fetchAnswer(params));
  };

  // 获取评价
  useEffect(() => {
    dispatch(fetchEvaluate(answer_id));
  }, []);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Card bordered={false}>
          <Row align={'bottom'} justify={'space-around'}>
            <Col>
              <Title italic={true} style={{ fontSize: '48px', color: '#e95866' }}>{evaluate.answer_score}</Title>
            </Col>
            <Col span={20}>
              <div>{evaluate.answer_ai_result}</div>
            </Col>
          </Row>
          <Row justify={'end'} style={{ marginTop: '5px' }}><Button type="text" size="large" style={{ fontWeight: 'bold' }}>邀请好友回答</Button></Row>
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
