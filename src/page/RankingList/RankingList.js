import React, { useEffect, useState } from 'react';
import { Avatar, Col, List, Row, Tag } from 'antd';
import { LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const rankingList = [
  {
    userId: 1,
    userName: 'user1',
    likes: 593,
  },
  {
    userId: 2,
    userName: 'user2',
    likes: 492,
  },
];

const tags = ['回答最多', '最多点赞', '最多收藏'];

const RankingList = () => {
  // 设置选中标签
  const [selectedTag, setSelectTag] = useState('');

  // 设置选中标签
  const handleSelectedTag = (tag, checked) => {
    const nextSelectedTag = checked ? tag : '';
    setSelectTag(nextSelectedTag);
  };

  useEffect(() => {

  }, [selectedTag]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={16} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Row justify={'center'} gutter={16}>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <Col key={tag} style={{ marginTop: '10px' }}>
                <Tag
                  onClick={(checked) => handleSelectedTag(tag, checked)}
                  style={{
                    fontSize: '14px',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    fontWeight: isSelected ? '800' : 'normal',
                  }}
                >
                  <span>{tag}</span>
                </Tag>
              </Col>
            );
          })}
        </Row>
        <Row style={{ padding: '8px 0 24px' }} justify={'center'}>
          <Col span={20}>
            <List
              dataSource={rankingList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <LikeOutlined key="like" />,
                    <StarOutlined key="star" />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.userName}
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

export default RankingList;
