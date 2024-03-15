import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, List, Row, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { http } from '../../api/server';
import IconText from '../../components/IconText';
import Sort from '../../components/Sort';

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
  const [sort, setSort] = useState('sort');
  const [type, setType] = useState('type');
  const [level, setLevel] = useState('level');
  const [questionList, setQuestionList] = useState([]);

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
      type: type,
      level: level,
    };
    const getQuestionList = async(params) => {
      const response = await http.get('/training/question/list', params);
      setQuestionList(response.data.data.data);
    };
    getQuestionList(params);
  }, [sort, type, level]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: 'linear-gradient(#ebeff7, #fff)' }}>
        <Card style={{ backgroundColor: '#e2e8f6', boxShadow: 1 }}>
          <Sort items={sortItems} selectedTag={sort} handleSort={handleSort} />
          <Sort items={typeItems} selectedTag={type} handleSort={handleType} />
          <Sort items={levelItems} selectedTag={level} handleSort={handleLevel} />
        </Card>
        <Row justify={'center'}>
          <Col span={24} >
            <List
              dataSource={questionList}
              itemLayout="vertical"
              pagination={{
                pageSize: 5,
              }}
              bordered="true"
              split="false"
              style={{ background: '#fff', marginTop: '1rem' }}
              renderItem={item => (
                <List.Item
                  actions={[
                    <IconText icon={LikeOutlined} text={item.like} key="list-vertical-star-o" />,
                    <IconText icon={DislikeOutlined} text={item.unlike} key="list-vertical-like-o" />,
                    <IconText icon={StarOutlined} text={item.favorite} key="list-vertical-message" />,
                  ]}
                >
                  <List.Item.Meta
                    title={ <Link to={`/chat/${item.questionId}`}><Typography>{item.questionTitle}</Typography></Link>}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default QuestionList;
