import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Card, Radio } from 'antd';
import styles from './index.less';
import TableShow from '@/components/TableShow/TableShow';
import { connect } from 'dva';

const ServiceManage = props => {
  useEffect(() => {
    let { dispatch } = props;
    dispatch({
      type: 'serviceManage/getCategoryInfo',
      payload: '22',
    });
  }, []);
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
    <PageHeaderWrapper>
      <Card>
        <div className={styles.device}>
          <Radio.Group defaultValue={1} size="large">
            {renderCategoryInfo()}
          </Radio.Group>
        </div>
        <TableShow categoryItemInfo={props.categoryItemInfo}></TableShow>
      </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({ serviceManage }) => {
  let { categoryInfo, categoryItemInfo } = serviceManage;
  return {
    categoryInfo,
    categoryItemInfo,
  };
})(ServiceManage);
