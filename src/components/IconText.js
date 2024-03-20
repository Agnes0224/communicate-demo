/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Col, Row, Space } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { http } from '../api/server';
import { handleQuestionAction } from '../page/QuestionList/QuestionSlice';
import { handleAnswerAction } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch } from 'react-redux';
// import { http } from '../api/server';
// import { handleQuestionAction } from '../page/QuestionList/QuestionSlice';

const IconText = ({ item }) => {
  const dispatch = useDispatch();

  const getParams = (type) => {
    const baseParams = { actionAim: item.questionId ? 0 : 1, actionAimId: item.questionId || item.answerId };
    let actionType;
    switch (type) {
      case 'favorite':
        actionType = item.favoriteState ? 0 : 1;
        break;
      case 'like':
        if (item?.likeState === 2) {
          actionType = 3;
        } else {
          actionType = 2;
        }
        break;
      case 'unLike':
        if (item?.likeState === 5) {
          actionType = 3;
        } else {
          actionType = 5;
        }
        break;
      default:
        break;
    }
    return { ...baseParams, actionType };
  };

  const submitAction = async(type) => {
    const params = getParams(type);
    await http.post('/training/action/saveAction', params);
    switch (params.actionAim) {
      case 0:
        dispatch(handleQuestionAction(params));
        break;
      case 1:
        dispatch(handleAnswerAction(params));
        break;
    }
  };

  const handleClick = (type) => {
    submitAction(type);
  };

  return (
    <Row gutter={16}>
      {(item.questionId || item.answerId) && (
        <>
          <Col>
            <Space>
              <Button
                type="text"
                icon={<LikeOutlined />}
                key="like"
                onClick={() => handleClick('like')}
                style={{ color: item.likeState === 2 ? 'blue' : '' }}
              />
              {item.like}
            </Space>
          </Col>
          <Col>
            <Space>
              <Button
                type="text"
                icon={<DislikeOutlined />}
                key="unLike"
                onClick={() => handleClick('unLike')}
                style={{ color: item.likeState === 5 ? 'blue' : '' }}
              />
              {item.unLike}
            </Space>
          </Col>
          <Col>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                key="favorite"
                onClick={() => handleClick('favorite')}
                style={{ color: item.favoriteState ? '' : 'blue' }}
              />
              {item.favorite}
            </Space>
          </Col>
        </>
      )}
    </Row>
  );
};

export default IconText;
