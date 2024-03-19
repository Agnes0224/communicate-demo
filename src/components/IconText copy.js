/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Space } from 'antd';
import { handleHighlight } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch } from 'react-redux';
import { http } from '../api/server';

const IconText = ({ item }) => {
  const dispatch = useDispatch();
  const { icon, text, hightlight, type, id } = item;

  const submitAction = async() => {
    const params = {
      actionType: 1,
      actionAim: 1,
      actionAimId: id,
    };
    await http.post('/training/action/saveAction', params);
  };

  // const like = {
  //   icon: 'LikeOutlined',

  // }

  const handleClick = () => {
    console.log(1);
    dispatch(handleHighlight({ answerUserId: id, type: type }));
    submitAction();
  };
  return (
    <Space>
      <Button
        type="text"
        icon={React.createElement(icon)}
        key={type}
        onClick={handleClick}
        style={{ color: hightlight ? 'blue' : '' }}
      />
      {text}
    </Space>
  );
};

export default IconText;
