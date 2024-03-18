/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Flex, Tag } from 'antd';
import '../css/Sort.css';

const Sort = ({ items, handleSort, selectedTag }) => {
  return (
    <Flex className="sort" gap="small" style={{ marginLeft: '0.5em' }}>
      {items.map((tag) => {
        const isSelected = selectedTag === tag.key;
        return (
          <Col key={tag.key} style={{ marginTop: '10px' }}>
            <Tag.CheckableTag
              onClick={() => handleSort(tag)}
              style={{
                fontSize: '14px',
                padding: '5px 5px',
                color: 'black',
                backgroundColor: isSelected ? '#f5f5f5' : '',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                fontWeight: isSelected ? '800' : 'normal',
                whiteSpace: 'nowrap',
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
