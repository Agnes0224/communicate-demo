/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Space } from 'antd';
import { handleHighlight } from '../page/EvaluatePage/AnswerSlice';
import { useDispatch } from 'react-redux';

const IconText = ({ icon, text, hightlight, type, answerUserId }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(1);
    dispatch(handleHighlight({ answerUserId: answerUserId, type: type }));
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
