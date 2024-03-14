import React, { useEffect, useState } from 'react';
import { Avatar, Col, List, Row, Tag, Typography } from 'antd';
import { BulbOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsers } from './UserSlice';

const tags = [
  {
    key: 'answer',
    value: '回答最多',
  },
  {
    key: 'like',
    value: '点赞最多',
  },
  {
    key: 'star',
    value: '收藏最多',
  },
];

const RankingList = () => {
  // 设置选中标签
  const [selectedTag, setSelectTag] = useState('回答最多');
  const [tagKey, setTagKey] = useState('answer');
  const dispatch = useDispatch();

  const rankingList = useSelector(selectUsers);

  // 设置选中标签
  const handleSelectedTag = (tag) => {
    setSelectTag(tag.value);
    setTagKey(tag.key);
  };

  useEffect(() => {
    dispatch(fetchUsers(tagKey));
  }, [selectedTag]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Row justify={'center'} gutter={16}>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag.value;
            return (
              <Col key={tag.key} style={{ marginTop: '10px' }}>
                <Tag
                  onClick={() => handleSelectedTag(tag)}
                  style={{
                    fontSize: '14px',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    fontWeight: isSelected ? '800' : 'normal',
                  }}
                >
                  <span>{tag.value}</span>
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
                    <Row key="answer" ><BulbOutlined /><Typography>{item.answers}</Typography></Row>,
                    <Row key="like" ><LikeOutlined /><Typography>{item.likes}</Typography></Row>,
                    <Row key="star" ><StarOutlined /><Typography>{item.stars}</Typography></Row>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.userName}
                    description={item.motto}
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
