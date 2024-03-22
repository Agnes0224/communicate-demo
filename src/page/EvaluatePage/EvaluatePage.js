import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Skeleton, Typography, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswers, selectEvaluate, fetchEvaluate, fetchAnswer, selectStatus, selectCount, fetchBestAnswer } from '../../redux/AnswerSlice';
import PostAnswer from '../../components/PostAnswer';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../css/Card.css';
const { Title, Paragraph } = Typography;

const EvaluatePage = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  // 获取回复
  const answer = useSelector(selectAnswers);
  // 获取加载状态
  const loading = useSelector(selectStatus);
  // 获取ai评分
  const evaluate = useSelector(selectEvaluate);
  // 获取回答数目
  const count = useSelector(selectCount);
  // 设置按钮隐藏
  const [isButtonOpen, setIsButtonOpen] = useState(true);
  // 获取当前页码
  const [page, setPage] = useState(1);

  const answerId = 1;
  const link = 'http://ai.sciclubs.com/chat/' + questionId;

  // 邀请好友回答
  const invite = (
    <div>
      <Paragraph copyable>{link} </Paragraph>
    </div>
  );

  // 设置按钮加载
  const onLoadMore = () => {
    loadMore();
    if (isButtonOpen) {
      setIsButtonOpen(false);
    }
  };

  // 加载更多回答
  const loadMore = () => {
    if (loading === 'loading') {
      return;
    }
    const params = {
      questionId: questionId,
      page: page,
      sort: 1,
      pageSize: 10,
    };
    dispatch(fetchAnswer(params));
    setPage(page + 1);
  };

  // 获取评价
  useEffect(() => {
    dispatch(fetchEvaluate(answerId));
    dispatch(fetchBestAnswer(questionId));
  }, []);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: 'linear-gradient(#ebeff7, #fff)', padding: '8px 0 24px' }}>
        <Row justify={'center'}>
          <Col span={20}>
            <Card className="card">
              <Row align={'bottom'} justify={'center'} gutter={16}>
                <Col>
                  <Title italic={true} style={{ fontSize: '48px', color: '#e95866' }}>{evaluate.answerScore}</Title>
                </Col>
                <Col span={20}>
                  <div>{evaluate.answerAiResult}</div>
                </Col>
              </Row>
              <Row justify={'end'} style={{ marginTop: '5px' }}>
                <Popover content={invite} trigger="click">
                  <Button>邀请好友回答</Button>
                </Popover>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ padding: '8px 0 24px', height: '400px' }} justify={'center'} id="scrollContainer">
          <Col span={22}>
            <InfiniteScroll
              next={loadMore}
              hasMore={answer.length < count + 2}
              dataLength={answer.length}
              loader={ !isButtonOpen && (
                <Skeleton
                  avatar
                  paragraph={{ rows: 1 }}
                  active
                />)
              }
            >
              <PostAnswer answer={answer} />
            </InfiniteScroll>
            {isButtonOpen && (
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
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EvaluatePage;
