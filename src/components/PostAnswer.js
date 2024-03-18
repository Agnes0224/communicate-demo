/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, List, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
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
              <IconText icon={LikeOutlined} text={item.like} hightlight={item.isLike} type={'like'} answerUserId={item.answerUserId} key="like" />,
              <IconText icon={DislikeOutlined} text={item.unLike} hightlight={item.isUnLike} type={'unLike' } answerUserId={item.answerUserId} key="unLike" />,
              <IconText icon={StarOutlined} text={item.favorite} hightlight={item.isFavorite} type={'favorite'} answerUserId={item.answerUserId} key="favorite" />,
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
