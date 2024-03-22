/* eslint-disable react/prop-types */
import React from 'react';
import { Col, List, Row, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import IconText from './IconText';

const PostQuestion = ({ questions }) => {
  return (
    <Row justify={'center'}>
      <Col span={24} >
        <List
          className="question-list"
          dataSource={questions}
          itemLayout="vertical"
          pagination={{
            pageSize: 10,
          }}
          split="false"
          style={{ background: '#fff', marginTop: '1rem', padding: '0 1rem', borderRadius: 15 }}
          renderItem={item => (
            <List.Item
              actions={[
                <IconText item={item} key="icon" />,
              ]}
              className="list-item"
            >
              <List.Item.Meta
                title={ <Link to={`/chat/${item.questionId}`}><Typography>{item.questionTitle}</Typography></Link>}
                description={item.questionType.split(',').map((type, index) => (
                  <Tag color="green" style={{ fontSize: '10px', marginRight: '5px' }} key={index}>{type}</Tag>
                ))}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default PostQuestion;
