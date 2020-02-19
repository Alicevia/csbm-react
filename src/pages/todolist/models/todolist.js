
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'todolist',
  state: {
    list: [
      { plan: '数学', complate: false },
      { plan: '语文', complate: true },
      { plan: '英语', complate: false },
    ]
  },
  reducers: {
    addPlan(state, action) {
      let list = state.list
      list.push({ plan: action.payload, complate: false })
      return { ...state, list };
    },
    deletePlan(state, action) {
      let { list } = state
      list = list.filter((item, index) => {
        return action.payload !== index ? true : false
      })
      return { ...state, list }
    },
    finishPlan(state, action) {
      let { list } = state
      list = list.map((item, index) => {
        if (action.payload===index) {
          return {...item,complate:true}
        }
        return item
      })
      return { ...state, list }
    },
    finishAllPlan(state, action) {
      let list = state.list.map(item=>{
        if (!item.complate) {
          item.complate = true
          return item
        }
        return item
      })
      return { ...state,list };
    },
    clearPlan(state, action) {
      let list = state.list.filter(item=>{
        return item.complate===false
      })
      return { ...state, list};
    },
  },
  effects: {
    *deletePlanAsync({ payload }, { call, put }) {
      let temp = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('ok')
          }, 1000);
        })
      }
      yield call(temp)
      yield put({ type: 'deletePlan', payload })
    },
    *finishPlanAsync(action,{call,put}){
      let temp = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('ok')
          }, 2000);
        })
      }
      yield call(temp)
      yield put({type:'finishAllPlan'})

    }

    // *signin({payload},{put,call}){
    //     let result = yield call(service.signin,payload);//{code:0,data} {code:1,error}
    //     if(result.code === 0){
    //        //如果登录成功了需要跳到后台管理中心页
    //        //1.把返回值jwt token放到localStorage里去，以便刷新的时候能重新获取回来
    //        let token = result.data;
    //        let user = decode(token); 
    //        yield put({type:'save',payload:{user}});//redux在内存里，一刷新就没了
    //        localStorage.setItem('token',token);//把token保存到localStorage里面
    //        //跳到后台理中心页 /admin routerRedux connected-react-router
    //        //routerRedux.push('/admin') {type:'@@redux/CHANGE_LOCATION',path:'/admin'}
    //        yield put(routerRedux.push('/admin'));
    //     }else{
    //         message.error(result.error);
    //     }
    // },

  }

}