import { reqWeChatAuthInfo, reqAliMessageAuth } from '@/services';
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
