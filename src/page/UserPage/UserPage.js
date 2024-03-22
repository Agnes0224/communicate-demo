import React, { useState } from 'react';
import { Col, Menu, Row } from 'antd';
import Mys from './Mys';
import MyAnswer from './MyAnswer';

const itemsType = [
  { label: '我赞过的', key: '2' },
  { label: '我收藏的', key: '0' },
  { label: '我踩过的', key: '5' },
  { label: '我回答的', key: 'answered' },
];

const UserPage = () => {
  const [currentType, setCurrentType] = useState('2');

  // 设置当前分类
  const onChangeType = (e) => {
    setCurrentType(e.key);
  };

  return (
    <Row justify={'center'}>
      <Col xs={24} lg={14}>
        <Row justify={'center'}>
          <Col span={22}>
            {/* <Card className="card">
              <span>userCard</span>
            </Card> */}
          </Col>
          <Menu onClick={onChangeType} selectedKeys={[currentType]} mode="horizontal" items={itemsType} style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} />
          <Col span={22}>
            {currentType === 'answered' ? (
              <MyAnswer />
            ) : (
              <Mys currentType={currentType} />
            )}
          </Col>
        </Row>
      </Col>
    </Row>

  );
};

export default UserPage;
