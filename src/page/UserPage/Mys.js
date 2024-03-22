/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Collapse, Col, Row, Tag, Typography, Pagination, Button } from 'antd';
import PostQuestion from '../../components/PostQuestion';
import PostAnswer from '../../components/PostAnswer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavoriteQuestion, fetchUserQuestion, selectQuestions } from '../../redux/QuestionSlice';
// import { selectAnswers } from '../EvaluatePage/AnswerSlice';
import './user.css';
import { fetchUserFavorite, fetchUserLike, selectAnswers, selectUserQuestions } from '../../redux/AnswerSlice';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const QAtype = [
  { label: 'Question', key: 0 },
  { label: 'Answer', key: 1 },
];

const Mys = ({ currentType }) => {
  const [aim, setAim] = useState(0);
  const [page, setPage] = useState(1);

  const userQuestions = useSelector(selectUserQuestions);
  const answers = useSelector(selectAnswers);

  const questions = useSelector(selectQuestions);
  // const answer = useSelector(selectAnswers);

  const dispatch = useDispatch();

  // 设置answer
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

  // 设置问题or答案
  const onChangeQA = (key) => {
    setAim(key);
  };

  const onChangePage = (value) => {
    console.log(value);
    setPage(value);
  };

  useEffect(() => {
    setAim(0);
  }, [currentType]);

  useEffect(() => {
    switch (aim) {
      case 0:
        if (currentType === '0') {
          // favorite
          const params = { page: page, aim: aim };
          console.log('favorite');
          dispatch(fetchUserFavoriteQuestion(params));
        } else {
          const params = { page: page, aim: aim, type: currentType };
          dispatch(fetchUserQuestion(params));
        }
        break;
      case 1:
        console.log(currentType);
        if (currentType === '0') {
          // favorite
          const params = { page: page, aim: aim };
          console.log('favorite');
          dispatch(fetchUserFavorite(params));
        } else {
          const params = { page: page, aim: aim, type: currentType };
          console.log(params);
          dispatch(fetchUserLike(params));
        }
        break;
    }
  }, [currentType, aim]);

  const contentList = {
    0:
    // question
        <Col span={24}>
          <PostQuestion questions={questions} />
        </Col>,
    1:
    // answer
    <>
      <Col span={24}>
        <Collapse size="large" bordered={false} items={items} className="question-list" />
      </Col>
      <Pagination current={page} onChange={onChangePage} style={{ marginBottom: '' }} />
    </>,
  };

  return (
    <Card tabList={QAtype} activeTabKey={aim} onTabChange={onChangeQA} styles={{ body: { padding: 0 } }}>
      <Row justify={'center'}>
        {contentList[aim]}
      </Row>
    </Card>
  );
};

export default Mys;
