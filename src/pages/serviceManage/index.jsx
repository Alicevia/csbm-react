import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Card, Radio } from 'antd';
import styles from './index.less';
import TableShow from '@/components/TableShow/TableShow';
import { connect } from 'dva';
import CategoryTag from './components/CategoryTag/CategoryTag';

const ServiceManage = props => {
  let { dispatch, categoryItemInfo, categoryInfo } = props;

  const [categoryId, setCategoryId] = useState(1);
  const [page, setPage] = useState(1);
  const onChange = page => {
    setPage(page);
    --page;
    dispatch({
      type: 'serviceManage/getGroupItemInfo',
      payload: { id: categoryId, page, size: 8, examineType: 'GROUP' },
    });
  };

  const openService = manageId => {
    dispatch({
      type: 'serviceManage/applyOpenService',
      payload: { manageId, page: page - 1, categoryId, size: 8, examineType: 'GROUP' },
    });
  };

  useEffect(() => {
    //获取传感器大类
    dispatch({
      type: 'serviceManage/getCategoryInfo',
      payload: '22',
    });
  }, []);

  useEffect(() => {
    //切换传感器大类
    setPage(1);
    dispatch({
      type: 'serviceManage/getGroupItemInfo',
      payload: { id: categoryId, page: 0, size: 8, examineType: 'GROUP' },
    });
  }, [categoryId]);

  return (
    <PageHeaderWrapper>
      <Card>
        <CategoryTag
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categoryInfo={categoryInfo}
        ></CategoryTag>
        <TableShow
          openService={openService}
          onChange={onChange}
          current={page}
          categoryItemInfo={categoryItemInfo}
        ></TableShow>
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
