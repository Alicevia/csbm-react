import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AccountInfo from './AccountInfo';
import { connect } from 'dva';
const Account = props => (
  <PageHeaderWrapper>
    <Card>
      <AccountInfo currentUser={props.currentUser} />
    </Card>
  </PageHeaderWrapper>
);

export default connect(state => {
  let {
    user: { currentUser },
  } = state;
  return {
    currentUser,
  };
})(Account);
