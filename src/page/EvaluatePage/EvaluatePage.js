import React from 'react';
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectAnswers } from './AnswerSlice';
const { Title } = Typography;

const EvaluatePage = () => {
  // 获取回复
  const answer = useSelector(selectAnswers);
  const handleLikeClick = () => {
    // console.log('');
  };

  const handleStarClick = () => {
    // console.log('');
  };

  const onLoadMore = () => {

  };

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Card bordered={false}>
          <Row align={'bottom'} justify={'space-around'}>
            <Col>
              <Title italic={true} style={{ fontSize: '48px', color: '#e95866' }}>88</Title>
            </Col>
            <Col span={20}>
              <div>评价xxxxxx评价xxxxxx评价xxxxxx评价xxxxxx评价xxxxxx评价xxx评价xxxxxx评价xxxxxx评价xxx评价xxxxxx评价xxxxxx评价xxx评价xxxxxx评价xxxxxx评价xxx评价xxxxxx评价xxxxxx评价xxxxxx</div>
            </Col>
          </Row>
          <Row justify={'end'} style={{ marginTop: '5px' }}><Button type="text" size="large" style={{ fontWeight: 'bold' }}>邀请好友回答</Button></Row>
        </Card>
        <Row style={{ padding: '8px 0 24px' }} justify={'center'}>
          <Col span={22}>
            <List
              dataSource={answer}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Row key="like" >
                      <Button
                        type="text"
                        icon={<LikeOutlined />}
                        onClick={handleLikeClick}
                        key="like"
                      />
                      <Typography>{item.likes}</Typography>
                    </Row>,
                    <Row key="dislike" >
                      <Button
                        type="text"
                        icon={<DislikeOutlined />}
                        onClick={handleLikeClick}
                        key="dislike"
                      />
                      <Typography>{item.likes}</Typography>
                    </Row>,
                    <Row key="star" >
                      <Button
                        type="text"
                        icon={<StarOutlined />}
                        onClick={handleStarClick}
                        key="star"
                      />
                      <Typography>{item.stars}</Typography>
                    </Row>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.userName}
                    description={<Typography>{item.content}</Typography>}
                  />
                </List.Item>
              )}
            />
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Button onClick={onLoadMore}>查看更多回答</Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EvaluatePage;
