/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Flex, Tag } from 'antd';
import '../css/Sort.css';

const Sort = ({ items, handleSort, selectedTag }) => {
  return (
    <Flex className="sort" gap="small" style={{ marginLeft: '0.5em' }}>
      {items.map((tag) => {
        let isSelected;
        if (Array.isArray(selectedTag)) {
          isSelected = selectedTag.includes(tag.key);
        } else {
          isSelected = selectedTag === tag.key;
        }
        return (
          <Col key={tag.key} style={{ marginTop: '10px' }}>
            <Tag.CheckableTag
              onClick={() => handleSort(tag)}
              checked={isSelected}
              style={{
                fontSize: '14px',
                padding: '5px 5px',
                color: 'black',
                backgroundColor: isSelected ? '#f5f5f5' : '#fff',
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
