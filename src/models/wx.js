import {
  reqWeChatAuthInfo,
  reqModiWeChatAuth,
  reqModiAliMessage,
  reqAliMessageAuth,
  reqInitWeChatAuthInfo,
} from '@/services';
import { message } from 'antd';
import produce from 'immer';
const WxModel = {
  namespace: 'wx',
  state: {
    weChatInfo: {},
    aliMessageInfo: {},
  },
  effects: {
    *getWeChatInfo({ payload }, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqWeChatAuthInfo);
      if (succeed) {
        yield put({ type: 'saveWeChatInfo', payload: data });
      } else {
        message.error('获取wechat信息失败');
      }
    },
    *getInitWeChatInfo({ payload }, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqInitWeChatAuthInfo, payload);
      if (succeed) {
        message.success('初始化信息成功');
        yield put({ type: 'saveWeChatInfo', payload: data });
      } else {
        message.error('初始化信息失败');
      }
    },
    *getModiWeChatInfo({ payload }, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqModiWeChatAuth, payload);
      if (succeed) {
        message.success('修改信息成功');
        yield put({ type: 'saveWeChatInfo', payload: data });
      } else {
        message.error('修改信息失败');
      }
    },

    *getAliMessageInfo({}, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqAliMessageAuth);
      if (succeed) {
        yield put({ type: 'saveAliMessageInfo', payload: data });
      } else {
        message.error('获取ali信息失败');
      }
    },
    *getModiAliMessageInfo({ payload }, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqModiAliMessage, payload);
      console.log(data);
      if (succeed) {
        message.error('修改ali信息成功');

        yield put({ type: 'saveAliMessageInfo', payload: data });
      } else {
        message.error('修改ali信息失败');
      }
    },
  },
  reducers: {
    saveWeChatInfo(state, { payload }) {
      return produce(state, draft => {
        draft.weChatInfo = payload;
      });
    },
    saveAliMessageInfo(state, { payload }) {
      return produce(state, draft => {
        draft.aliMessageInfo = payload;
      });
    },
  },
};
export default WxModel;
