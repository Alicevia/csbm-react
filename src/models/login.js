import { stringify } from 'querystring';
import { router } from 'umi';
import { reqPhoneLogin } from '@/services'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    token: localStorage.getItem('user-token')||''
  },
  effects: {
    *login({ payload }, { call, put }) {
      let { phone, password, type } = payload
      const response = yield call(reqPhoneLogin, { phone, password });
     
      yield put({ //登录之后不管成功与否都将结果给reducer，
        //让reducer处理成功与失败的反应,顺便告诉用户登录失败的原因
        type: 'changeLoginStatus',
        payload: { ...response.data, token: response.headers['user-token']||'', type },
      }); // Login successfully
      if (response.data.succeed) {

        localStorage.setItem('user-token', response.headers['user-token'])

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.removeItem('user-token')
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority('guest');
      return {
        ...state,
        message: payload.message, 
        status: payload.succeed ? null : 'error',
        token: payload.token,
        type: payload.type
      };
    },
  },
};
export default Model;
