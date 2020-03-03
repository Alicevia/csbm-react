import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Card } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const WxManage = props => {
  let { dispatch } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'wx/getWeChatInfo',
      });
      // dispatch({
      //   type:'wx/getAliMessageInfo'
      // })
    }
  }, []);
  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！">
      <Card>{props.children}</Card>
    </PageHeaderWrapper>
  );
};
export default connect()(WxManage);
