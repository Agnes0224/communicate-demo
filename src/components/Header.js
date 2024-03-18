import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';
const { Header } = Layout;

const HeaderNav = () => {
  return (
    <Header style={{ background: '#e2e8f6', padding: 0 }}>
      <Row justify={'space-around'}>
        <Col>
          <Link to="/">首页</Link>
        </Col>
        {/* <Col>
          <Link to="/evaluate">评估页面</Link>
        </Col>
        <Col>
          <Link to="/rank">排行榜</Link>
        </Col>
        <Col>
          <Link to="/my">个人空间</Link>
        </Col> */}
      </Row>
    </Header>
  );
};

export default HeaderNav;
