import axios from 'axios'
import {Message} from 'antd'

let instance1 = axios.create({
  // baseURL: 'http://192.168.50.163:8090/smtApi/',
  // baseURL: 'http://192.168.50.30:8090/smtApi/',
  baseURL:'',
  timeout: 10000,
  headers:{
    // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
})

instance1.interceptors.request.use(config => {
  let token = localStorage.getItem('user-token')
  if (token) {
    config.headers['user-token'] = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance1.interceptors.response.use(response => {
  if (response.data.succeed === false && response.data.code === 401) {//检测所有的响应
    Message.error('用户信息已过期')
    localStorage.removeItem('user-token');
    // location.href = 'http://localhost:8000/user/login'
    // router.replace({ path: '/login' })
    // location.href="http://192.168.50.236:8080/login"
}//如果返回的数据提示user-token过期 那么会自动跳转到login
  return response

}, err => {
  return Promise.reject(err)
})

let instance2 = axios.create({
  baseURL: 'https://www.cluster-dt.com/pcwechat/',
  timeout: 10000
})

instance2.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance2.interceptors.response.use(response => {

  return response
}, err => {
  return Promise.reject(err)
})


export { instance1, instance2 }