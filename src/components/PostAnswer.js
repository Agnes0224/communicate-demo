import React from 'react';
import { Avatar, Button, Col, List, Row, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
// eslint-disable-next-line react/prop-types
const PostAnswer = ({ answer }) => {
  const handleLikeClick = () => {
    // console.log('');
  };

  const handleStarClick = () => {
    // console.log('');
  };

  return (
    <>
      <List
        dataSource={answer}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.answer_user_id}
              description={<Typography>{item.answer_content}</Typography>}
            />
            <Row gutter={16} justify={'end'}>
              <Col offset={16}><Title italic={true} style={{ color: '#e95866' }}>{item.answer_score}</Title></Col>
              <Button
                type="text"
                icon={<LikeOutlined />}
                onClick={handleLikeClick}
                key="like"
              />
              <Typography style={{ marginTop: '3px' }}>{item.like}</Typography>
              <Button
                type="text"
                icon={<DislikeOutlined />}
                onClick={handleLikeClick}
                key="dislike"
              />
              <Typography style={{ marginTop: '3px' }}>{item.un_like}</Typography>
              <Button
                type="text"
                icon={<StarOutlined />}
                onClick={handleStarClick}
                key="favorite"
              />
              <Typography style={{ marginTop: '3px' }}>{item.favorite}</Typography>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};

export default PostAnswer;
