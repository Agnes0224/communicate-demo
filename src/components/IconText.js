/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { handleAnswerAction, selectAnswerById } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../api/server';
import { handleQuestionAction, selectQuestionById } from '../page/QuestionList/QuestionSlice';

const IconText = ({ type, actionAim, actionAimId }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState({ type, actionAim, actionAimId });
  // const [answer, setanswer] = useState();
  const [icon, setIcon] = useState();
  const answer = useSelector(state => selectAnswerById(state, action.actionAimId));
  const question = useSelector(state => selectQuestionById(state, action.actionAimId));
  // console.log(action);
  console.log(question);

  const handleActionType = () => {
    if (action.actionAim === 0) {
      // question
      switch (action.type) {
        case 'favorite':
          setIcon(StarOutlined);
          if (question?.favoriteState === 0) {
          // 已收藏
            setAction({ ...action, actionType: 1, hightlight: true, text: question?.favorite });
          } else {
          // 未收藏
            setAction({ ...action, actionType: 0, hightlight: false, text: question?.favorite });
          }
          break;
        case 'like':
          setIcon(LikeOutlined);
          if (question?.likeState === 2) {
          // 已点赞
            setAction({ ...action, actionType: 3, hightlight: true, text: question?.like });
          } else {
          // 未点赞
            setAction({ ...action, actionType: 2, hightlight: false, text: question?.like });
          }
          break;
        case 'unLike':
          setIcon(DislikeOutlined);
          if (question?.likeState === 5) {
          // 已点踩
            setAction({ ...action, actionType: 3, hightlight: true, text: question?.unLike });
          } else {
          // 未点踩
            setAction({ ...action, actionType: 5, hightlight: false, text: question?.unLike });
          }
          break;
      }
    } else {
      // answer
      switch (action.type) {
        case 'favorite':
          setIcon(StarOutlined);
          if (answer.favoriteState === 0) {
          // 已收藏
            setAction({ ...action, actionType: 1, hightlight: true, text: answer.favorite });
          } else {
          // 未收藏
            setAction({ ...action, actionType: 0, hightlight: false, text: answer.favorite });
          }
          break;
        case 'like':
          setIcon(LikeOutlined);
          if (answer.likeState === 2) {
          // 已点赞
            setAction({ ...action, actionType: 3, hightlight: true, text: answer.like });
          } else {
          // 未点赞
            setAction({ ...action, actionType: 2, hightlight: false, text: answer.like });
          }
          break;
        case 'unLike':
          setIcon(DislikeOutlined);
          if (answer.likeState === 5) {
          // 已点踩
            setAction({ ...action, actionType: 3, hightlight: true, text: answer.unLike });
          } else {
          // 未点踩
            setAction({ ...action, actionType: 5, hightlight: false, text: answer.unLike });
          }
          break;
      }
    }
  };

  const submitAction = async() => {
    const params = {
      actionType: action.actionType,
      actionAim: actionAim,
      actionAimId: actionAimId,
    };
    await http.post('/training/action/saveAction', params);
  };

  const handleClick = () => {
    switch (actionAim) {
      case 0:
        dispatch(handleQuestionAction(action));
        break;
      case 1:
        dispatch(handleAnswerAction(action));
        break;
      default:
        break;
    }
    submitAction();
  };

  useEffect(() => {
    handleActionType();
  }, [answer, question]);

  return (
    <Space>
      {icon && (
        <Button
          type="text"
          icon={React.createElement(icon)}
          key={action.type}
          onClick={handleClick}
          style={{ color: action.hightlight ? 'blue' : '' }}
        />
      )}
      {action.text}
    </Space>
  );
};

export default IconText;
