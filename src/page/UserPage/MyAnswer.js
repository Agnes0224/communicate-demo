import React from 'react';
import { Card, Col, Collapse, Row } from 'antd';
import PostAnswer from '../../components/PostAnswer';

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

const MyAnswer = () => {
  // 设置折叠问题
  const onChangeQuestion = (key) => {
    console.log(key);
  };

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

  return (
    <Card styles={{ body: { padding: 0 } }}>
      <Row justify={'center'}>
        <Col span={24}>
          <Collapse size="large" ghost onChange={onChangeQuestion} items={items} expandIconPosition="end" collapsible="icon" />
        </Col>,
      </Row>
    </Card>
  );
};

export default MyAnswer;
