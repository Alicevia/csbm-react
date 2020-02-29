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
    const {
      dispatch,
      location: { query },
    } = this.props;
    if (query.openid) {
      //进入首页的时候调用申请个人信息
      dispatch({
        type: 'login/wxLogin',
        payload: query,
      });
    } else {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser, token } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.nickName;

    const queryString = stringify({
      redirect: window.location.href,
    });
    // 没有获取到用户信息 并且loading 已经为true了那么会进入等待
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ user, loading, login }) => {
  // loading记录是否触发过saga，或者理解为是否派发过action
  // console.log(loading)
  return {
    currentUser: user.currentUser,
    loading: loading.models.user || loading.models.login,
    token: login.token,
  };
})(SecurityLayout);
