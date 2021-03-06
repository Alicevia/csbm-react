// import axios from '../axios'
import { instance1 as axios, ajax } from '@/utils/axiosDefault';

// 微信管理页面----------------------------------------------------
// 获取公众号信息
export const reqWeChatAuthInfo = () =>
  axios({
    url: '/api/auth/getWeChatAuth',
  });
//初始化公众号信息
export const reqInitWeChatAuthInfo = data =>
  axios({
    url: '/api/auth/uploadCustomerImg',
    data,
    method: 'post',
  });
//修改公众号信息
export const reqModiWeChatAuth = data =>
  axios({
    url: '/api/auth/modifyWeChatAuth',
    data,
    method: 'put',
  });

// 通过appid查询公众号是否授权
export const reqCheckAuth = data => {
  let url = `auth/queryAuthorization/${data.appId}`;
  return axios({
    url,
  });
};

// 用户扫码授权
export const reqUserScanQR = () =>
  axios({
    url: 'auth/getPreAuthCode',
    flag: false,
  });

// 阿里云短信页面--
export const reqAliMessageAuth = () =>
  axios({
    url: '/api/ali/message/findMessage',
  });
//阿里云短信修改
export const reqModiAliMessage = data =>
  axios({
    url: '/api/ali/message/updateMessage',
    data,
    method: 'post',
  });
