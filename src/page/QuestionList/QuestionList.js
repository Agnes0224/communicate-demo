import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, selectQuestions } from './QuestionSlice';
import PostQuestion from '../../components/PostQuestion';
import Sort from '../../components/Sort';
import '../../css/Card.css';

const sortItems = [
  { label: '综合', key: 'sort' },
  { label: '最多', key: 0 },
  { label: '最热', key: 1 },
  { label: '最新', key: 2 },
];

const typeItems = [
  { label: '分类', key: 'type' },
  { label: '仪器', key: 0 },
  { label: '售后', key: 1 },
  { label: '流程', key: 2 },
  { label: '检测', key: 3 },
];

const levelItems = [
  { label: '综合', key: 'level' },
  { label: '简单', key: 0 },
  { label: '普通', key: 1 },
  { label: '困难', key: 2 },
];

const QuestionList = () => {
  const [sort, setSort] = useState(1);
  const [type, setType] = useState('type');
  const [level, setLevel] = useState(1);

  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();

  const handleSort = e => {
    setSort(e.key);
  };
  const handleType = e => {
    setType(e.key);
  };
  const handleLevel = e => {
    setLevel(e.key);
  };

  useEffect(() => {
    const params = {
      page: 1,
      sort: sort,
      // type: type,
      level: level,
      pageSize: 10,
    };
    dispatch(fetchQuestion(params));
  }, [sort, type, level]);

  return (
    <Row justify={'center'}>
      <Col xs={22} lg={14}>
        <Card className="card">
          <Sort items={sortItems} selectedTag={sort} handleSort={handleSort} />
          <Sort items={typeItems} selectedTag={type} handleSort={handleType} />
          <Sort items={levelItems} selectedTag={level} handleSort={handleLevel} />
        </Card>
        <PostQuestion questions={questions} />
      </Col>
    </Row>
  );
};

export default QuestionList;
