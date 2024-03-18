/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Space } from 'antd';
import { handleHighlight } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch } from 'react-redux';
import { http } from '../api/server';

const IconText = ({ icon, text, hightlight, type, answerUserId }) => {
  const dispatch = useDispatch();

  const submitAction = async() => {
    const params = {
      actionType: 1,
      actionAim: 1,
      actionAimId: answerUserId,
    };
    await http.post('/training/action/saveAction', params);
  };

  const handleClick = () => {
    console.log(1);
    dispatch(handleHighlight({ answerUserId: answerUserId, type: type }));
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
