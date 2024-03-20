/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { handleAnswerAction } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch } from 'react-redux';
import { http } from '../api/server';
import { handleQuestionAction } from '../page/QuestionList/QuestionSlice';

const IconText = ({ type, actionAim, actionAimId, item }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const [params, setParams] = useState({ actionAim, actionAimId });
  const [icon, setIcon] = useState();
  console.log(actionAimId);
  console.log(action);

  const handleActionType = () => {
    // if (action.actionAim === 0) {
    // question
    console.log('test');
    switch (action.type) {
      case 'favorite':
        setIcon(StarOutlined);
        if (item?.favoriteState === 0) {
          // 已收藏
          setAction({ hightlight: true, text: item?.favorite });
          setParams({ actionType: 1 });
        } else {
          // 未收藏
          setAction({ hightlight: false, text: item?.favorite });
          setParams({ actionType: 0 });
        }
        break;
      case 'like':
        setIcon(LikeOutlined);
        if (item?.likeState === 2) {
          // 已点赞
          setAction({ hightlight: true, text: item?.like });
          setParams({ actionType: 3 });
        } else {
          // 未点赞
          setAction({ hightlight: false, text: item?.like });
          setParams({ actionType: 2 });
        }
        break;
      case 'unLike':
        setIcon(DislikeOutlined);
        if (item?.likeState === 5) {
          // 已点踩
          setAction({ hightlight: true, text: item?.unLike });
          setParams({ actionType: 3 });
        } else {
          // 未点踩
          setAction({ hightlight: false, text: item?.unLike });
          setParams({ actionType: 5 });
        }
        break;
    }
    // } else {
    //   // answer
    //   switch (action.type) {
    //     case 'favorite':
    //       setIcon(StarOutlined);
    //       if (item.favoriteState === 0) {
    //       // 已收藏
    //         setAction({ ...action, actionType: 1, hightlight: true, text: answer.favorite });
    //       } else {
    //       // 未收藏
    //         setAction({ ...action, actionType: 0, hightlight: false, text: answer.favorite });
    //       }
    //       break;
    //     case 'like':
    //       setIcon(LikeOutlined);
    //       if (answer.likeState === 2) {
    //       // 已点赞
    //         setAction({ ...action, actionType: 3, hightlight: true, text: answer.like });
    //       } else {
    //       // 未点赞
    //         setAction({ ...action, actionType: 2, hightlight: false, text: answer.like });
    //       }
    //       break;
    //     case 'unLike':
    //       setIcon(DislikeOutlined);
    //       if (answer.likeState === 5) {
    //       // 已点踩
    //         setAction({ ...action, actionType: 3, hightlight: true, text: answer.unLike });
    //       } else {
    //       // 未点踩
    //         setAction({ ...action, actionType: 5, hightlight: false, text: answer.unLike });
    //       }
    //       break;
    //   }
    // }
  };

  const submitAction = async() => {
    // const params = {
    //   actionType: action.actionType,
    //   actionAim: actionAim,
    //   actionAimId: actionAimId,
    // };
    console.log(params);
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
    // setAction({ type, actionAim, actionAimId });
    handleActionType();
  }, []);

  return (
    <Space>
      {icon && (
        <Button
          type="text"
          icon={React.createElement(icon)}
          key={type}
          onClick={handleClick}
          style={{ color: action.hightlight ? 'blue' : '' }}
        />
      )}
      {action.text}
    </Space>
  );
};

export default IconText;
