/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, List, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IconText from './IconText';

const { Title } = Typography;

const PostAnswer = ({ answer }) => {
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
              <IconText type="like" actionAim={1} actionAimId={item.answerId} key="like" />,
              <IconText type="unLike" actionAim={1} actionAimId={item.answerId} key="unLike" />,
              <IconText type="favorite" actionAim={1} actionAimId={item.answerId} key="favorite" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.answerUserId}
              description={<Typography>{item.answerContent}</Typography>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostAnswer;
