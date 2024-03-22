import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Input, Pagination, Row, Tag, Typography } from 'antd';
import PostAnswer from '../../components/PostAnswer';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserQA, selectAnswers, selectUserQuestions } from '../../redux/AnswerSlice';
import { Link } from 'react-router-dom';
const { Search } = Input;
const { Title } = Typography;

const MyAnswer = () => {
  const [page, setPage] = useState(1);

  const userQuestions = useSelector(selectUserQuestions);
  const answers = useSelector(selectAnswers);
  const dispatch = useDispatch();

  useEffect(() => {
    // 获取问题
    const params = {
      page: page,
      pageSize: 10,
      searchKeyword: '',
    };
    dispatch(fetchUserQA(params));
  }, []);

  const items = userQuestions.map((item) => {
    const answer = answers.filter(answer => answer.answerQuestionId === item.question.questionId);
    const types = item.question.questionType.split(',');
    return {
      key: item.question.questionId,
      label:
      <>
        <Title level={5} style={{ margin: '1em 0' }}>{item.question.questionTitle}</Title>
        <Row justify={'space-between'}>
          <Col>
            {types.map((type, index) => (
              <Tag color="green" style={{ fontSize: '10px', marginRight: '5px' }} key={index}>{type}</Tag>
            ))}
          </Col>
          <Col><Link to={`/chat/${item.question.questionId}`}><Button >再次回答</Button></Link></Col>
        </Row>
      </>,
      children: <PostAnswer answer={answer} />,
      showArrow: false,
    };
  });

  const onChangePage = (value) => {
    setPage(value);
  };

  const onSearchAnswer = (value) => {
    const params = {
      page: page,
      pageSize: 10,
      searchKeyword: value,
    };
    dispatch(fetchUserQA(params));
  };

  return (
    <Card styles={{ body: { padding: '1.5em 0' } }}>
      <Row justify={'center'}>
        <Col span={20}><Search placeholder="search the answer" enterButton onSearch={onSearchAnswer} /></Col>
        <Col span={24}>
          <Collapse size="large" bordered={false} items={items} className="question-list" />
        </Col>
        <Pagination current={page} onChange={onChangePage} style={{ marginBottom: '' }} />
      </Row>
    </Card>
  );
};

export default MyAnswer;
