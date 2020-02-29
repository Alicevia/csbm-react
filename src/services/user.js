// import request from '@/utils/request';
// export async function query() {
//   return request('/api/users');
// }
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }

// import axios from '../axios'
import { instance1 as axios } from '../utils/axiosDefault';
// account--------------------------------------------------------------
// 获取通过userToken获得用户信息
export const reqUserInfo = () =>
  axios({
    url: `/api/user/userinfo`,
    method: 'get',
  });
// 修改个人信息
export const reqModiUserInfo = data =>
  axios({
    url: 'user/info',
    data,
    type: 'PUT',
    flag: false,
  });

// 更换密码
export const reqChangePassword = data =>
  axios({
    url: '/api/user/password/change',
    data,
    method: 'put',
  });
// 更换手机号
export const reqChangePhone = data =>
  axios({
    url: 'user/updatephone',
    data,
    type: 'POST',
    flag: false,
  });
