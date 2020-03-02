import React from 'react';
import { Radio } from 'antd';
import styles from './index.less';

const CategoryTag = props => {
  const handleChange = value => {
    console.log(value);
    props.setCategoryId(value.target.value);
  };

  const renderCategoryInfo = () => {
    return props.categoryInfo.map(item => {
      return (
        <Radio.Button key={item.id} value={item.id}>
          {item.groupName}
        </Radio.Button>
      );
    });
  };
  return (
    <div className={styles.device}>
      <Radio.Group defaultValue={props.categoryId} onChange={handleChange} size="large">
        {renderCategoryInfo()}
      </Radio.Group>
    </div>
  );
};

export default CategoryTag;
