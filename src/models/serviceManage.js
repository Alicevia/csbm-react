import { reqGroupInfo, reqGroupItemInfo, reqOpenService } from '@/services';
import utils from '@/utils/myutils';
import { message } from 'antd';
import produce from 'immer';
const serviceManage = {
  namespace: 'serviceManage',
  state: {
    categoryInfo: [],
    categoryItemInfo: {},
  },
  effects: {
    *getCategoryInfo(action, { call, put }) {
      let {
        data: { succeed, data },
      } = yield call(reqGroupInfo);
      if (succeed) {
        yield put({ type: 'saveCategoryInfo', payload: data });
      } else {
        message.error('分类数据获取失败');
      }
      yield put({
        type: 'getGroupItemInfo',
        payload: { id: 1, page: 0, size: 8, examineType: 'GROUP' },
      });

      // utils.detailBackCode(data, {}, (data) => {

      // })
    },
    *getGroupItemInfo(action, { put, call }) {
      let {
        data: { succeed, data },
      } = yield call(reqGroupItemInfo, action.payload);
      // console.log(result)
      console.log(data);
      if (succeed) {
        yield put({ type: 'saveCategoryItemInfo', payload: data });
      } else {
        message.error('获取设备分组具体数据失败');
      }
    },
    *applyOpenService(
      { payload: { manageId, categoryId, page, size, examineType } },
      { put, call },
    ) {
      let {
        data: { succeed },
      } = yield call(reqOpenService, { manageId });
      console.log(succeed);
      if (succeed) {
        yield put({
          type: 'getGroupItemInfo',
          payload: { id: categoryId, page, size, examineType },
        });
      } else {
        message.error('开通失败');
      }
    },
  },
  reducers: {
    saveCategoryInfo(state, { payload }) {
      return produce(state, draft => {
        draft.categoryInfo = payload;
      });
    },
    saveCategoryItemInfo(state, { payload }) {
      return produce(state, draft => {
        draft.categoryItemInfo = payload;
      });
    },
  },
};
export default serviceManage;
