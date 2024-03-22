/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, List, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IconText from './IconText';

const { Title } = Typography;

const PostAnswer = ({ answer }) => {
  console.log(answer);
  return (
    <>
      <List
        dataSource={answer}
        itemLayout="vertical"
        renderItem={item => (
          <List.Item
            extra={
              <Title style={{ color: '#e95866' }}>{item.answerScore}</Title>
            }
            actions={[
              <IconText item={item} key="icon" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.answerUserId || '推荐回答'}
              description={<Typography>{item.answerContent}</Typography>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostAnswer;
