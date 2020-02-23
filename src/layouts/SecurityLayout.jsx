import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {//进入首页的时候调用申请个人信息
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser,token } = this.props; 
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
  
    // const isLogin = currentUser && currentUser.userid;
    const isLogin = token;//如果redux中获取到了token那么就继续登录

    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ user, loading,login }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  token:login.token
}))(SecurityLayout);
