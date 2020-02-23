import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox, Message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './style.less';
import LoginFrom from './components/Login';
import { reqWeChatQRCode } from '../../../services'
import classNames from 'classnames'
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType,message } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    console.log(values)

    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  //点击时候弹出二维码

  const getWeChatQRCode = async () => {
    // let href = window.location.href.split('#')[0];
    let origin = window.location.origin;
    let pathname = window.location.pathname;
    let href = origin + pathname;
    let { data } = await reqWeChatQRCode({ trueUrl: href });

    if (data.code === 0) {
      let { appid, login, redirect_uri } = data.data;
      new WxLogin({
        id: "qrcode",
        appid,
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(redirect_uri),
        state: Math.ceil(Math.random() * 1000),
        self_redirect: false,
        style: "black"
      });
      // let iframe = document.querySelector("#qrcode>iframe");
      // iframe.sandbox = "allow-scripts allow-top-navigation allow-same-origin";
    } else {
      Message.error("微信二维码获取失败,请刷新页面");
    }
    //  iframe.sandbox = 'allow-top-navigation'
    // iframe.security='restrict'
    // iframe.sandbox = ''
    //  http://192.168.50.236:8080/?openid=oBUh059mnb-GkVYeGmJNouSQOBAo&accessToken=25_oXBtGHvN1AhmF2-cky27mki0Q7LNjn5h2qfmzZTqPjmPwlM-IhX3eaAnFXxDSOgHkBpzrQM_fvbdEfAq5bxrHI2LbMK-VtoguoCYtlXzINQ#/
  }

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} weChatHandle={getWeChatQRCode} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content={message} />
          )}
          <UserName
            name="phone"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Tab key="weChat" tab="微信登录">
          <div className={styles.qrcode} id="qrcode">
          </div>
        </Tab>
        <div className={classNames({ [styles.hidden]: (type === 'weChat') })} >
          <div >
            <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
              自动登录
          </Checkbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
          </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </div>
        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
