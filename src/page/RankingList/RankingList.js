import React, { useEffect, useState } from 'react';
import { Avatar, Col, List, Row, Typography } from 'antd';
import { BulbOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsers } from './UserSlice';
import Sort from '../../components/Sort';

// const tags = [
//   {
//     key: 'answer',
//     value: '回答最多',
//   },
//   {
//     key: 'like',
//     value: '点赞最多',
//   },
//   {
//     key: 'star',
//     value: '收藏最多',
//   },
// ];
const sort = [
  { label: '最多回答', key: 0 },
  { label: '最多点赞', key: 1 },
  { label: '最多收藏', key: 2 },
];

const RankingList = () => {
  // 设置选中标签
  // const [selectedTag, setSelectTag] = useState('回答最多');
  const [tagKey, setTagKey] = useState(0);
  const dispatch = useDispatch();

  const rankingList = useSelector(selectUsers);

  // 设置选中标签
  const handleSelectedTag = (tag) => {
    // setSelectTag(tag.value);
    setTagKey(tag.key);
  };

  useEffect(() => {
    dispatch(fetchUsers(tagKey));
  }, [tagKey]);

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14} style={{ background: '#fff', padding: '8px 0 24px' }}>
        <Row justify={'center'} gutter={16}>
          <Sort items={sort} selectedTag={tagKey} handleSort={handleSelectedTag} />
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
