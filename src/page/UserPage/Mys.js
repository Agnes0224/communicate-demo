import React, { useState } from 'react';
import { Card, Collapse, Col, Row } from 'antd';
import PostQuestion from '../../components/PostQuestion';
import PostAnswer from '../../components/PostAnswer';

const QAtype = [
  { label: 'Question', key: 'question' },
  { label: 'Answer', key: 'answer' },
];

const questions = [
  {
    questionId: 2,
    questionTitle: '这是问题2',
    questionType: '测试',
    questionLevel: 1,
    questionCreateTime: '2024-03-16 17:28:37',
    like: 3,
    unLike: 0,
    favorite: 0,
    share: 0,
    answerCount: 1,
    likeState: 3,
    favoriteState: 1,
  },
  {
    questionId: 3,
    questionTitle: '这是问题3',
    questionType: '测试',
    questionLevel: 1,
    questionCreateTime: '2024-03-16 17:28:37',
    like: 3,
    unLike: 0,
    favorite: 0,
    share: 0,
    answerCount: 1,
    likeState: 2,
    favoriteState: 1,
  },
];

const answers = [
  {
    answerId: 1,
    answerQuestionId: 1,
    answerUserId: 1,
    answerContent: '这是回答的内容',
    answerScore: 60,
    answerCreateTime: '2024-03-16 18:12:06',
    like: 5,
    unLike: 0,
    favorite: 0,
    likeState: 3,
    favoriteState: 1,
  },
  {
    answerId: 1,
    answerQuestionId: 1,
    answerUserId: 1,
    answerContent: '这是回答的内容',
    answerScore: 60,
    answerCreateTime: '2024-03-16 18:12:06',
    like: 5,
    unLike: 0,
    favorite: 0,
    likeState: 3,
    favoriteState: 1,
  },
];

const items = [
  {
    key: '1',
    label: '这是问题1',
    children: <PostAnswer answer={answers} />,
  },
  {
    key: '2',
    label: '这是问题2',
    children: <PostAnswer answer={answers} />,
  },
];

const Mys = () => {
  const [type, setTyoe] = useState('question');

  // 设置问题or答案
  const onChangeQA = (key) => {
    setTyoe(key);
  };

  // 设置折叠问题
  const onChangeQuestion = (key) => {
    console.log(key);
  };

  const contentList = {
    question:
        <Col span={24}>
          <PostQuestion questions={questions} />
        </Col>,
    answer:
        <Col span={24}>
          <Collapse size="large" ghost onChange={onChangeQuestion} items={items} expandIconPosition="end" collapsible="icon" />
        </Col>,
  };

  return (
    <Card tabList={QAtype} activeTabKey={type} onTabChange={onChangeQA} styles={{ body: { padding: 0 } }}>
      <Row justify={'center'}>
        {contentList[type]}
      </Row>
    </Card>
  );
};

export default Mys;
