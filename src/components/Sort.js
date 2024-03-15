/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Flex, Tag } from 'antd';

const Sort = ({ items, handleSort, selectedTag }) => {
  return (
    <Flex gap="small" style={{ marginLeft: '1.5rem' }}>
      {items.map((tag) => {
        const isSelected = selectedTag === tag.key;
        return (
          <Col key={tag.key} style={{ marginTop: '10px' }}>
            <Tag.CheckableTag
              onClick={() => handleSort(tag)}
              style={{
                fontSize: '14px',
                padding: '5px 10px',
                backgroundColor: isSelected ? '#f5f5f5' : '',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                fontWeight: isSelected ? '800' : 'normal',
              }}
            >
              <span>{tag.label}</span>
            </Tag.CheckableTag>
          </Col>
        );
      })}
    </Flex>
  );
};

export default Sort;
