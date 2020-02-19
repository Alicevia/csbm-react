import React, { useEffect, useState } from 'react'
import styles from './index.less';
import { Input, List, Avatar, Button, Skeleton } from 'antd'
import { connect } from 'dva';
import Link from 'umi/link'
 function Todolist (props) {
  let [plan,setPlan] = useState('')
  let [unFinish,setUnFinish] = useState(0)
  let [finish,setFinish] = useState(0)
  useEffect(()=>{
    finish = props.todolist.list.reduce((a,b)=>{
      return b.complate?a +=1:a
    },0)
    setFinish(finish)
    setUnFinish(props.todolist.list.length-finish)
  },[props.todolist])

  let handlePlan = (e)=>{
    setPlan(e.target.value)
  }
  let addPlan = (value)=>{
    props.dispatch({type:'todolist/addPlan',payload:value})
    setPlan('')
  }
  let deletePlan = (index)=>{
    props.dispatch({type:'todolist/deletePlanAsync',payload:index})
  }
  let finishPlan = (index)=>()=>{
    props.dispatch({type:'todolist/finishPlan',payload:index})
  }
  let allFinish = ()=>{
    props.dispatch({type:'todolist/finishPlanAsync'})
  }
  let clearFinish = ()=>{
    props.dispatch({type:'todolist/clearPlan'})
    
  }
  let clearTodolist = ()=>{
    props.dispatch({type:'login/finishAllPlan'})
  }

  
  return (
    <div className={styles.container}>
      <Link to='/'>首页</Link>
      <div className={styles.header}>
        <Input.Search
          placeholder="输入要添加的计划"
          enterButton="add"
          size="large"
          value={plan}
          onChange={handlePlan}
          onSearch={addPlan}
        />
      </div>
      <div className={styles.content}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={props.todolist.list}
          renderItem={(item,index) => (
            <List.Item
              actions={[<a key="list-loadmore-edit" onClick={()=>deletePlan(index)}>删除</a>,
               <a key="list-loadmore-more" onClick={finishPlan(index)}>完成</a>]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.plan}</a>}
              />
              <div>{item.complate ? '完成' : '未完成'}</div>
            </List.Item>
          )}
        />
      </div>
      <div className={styles.footer}>
              <span>已完成：{finish} </span> 
              <span>未完成：{unFinish} </span> 
        <span onClick={allFinish}>全部完成</span>
        <span onClick={clearFinish}>清除已完成</span>
        <span onClick={clearTodolist}>将首页计划全部完成</span>
      </div>
    </div>
  );
}
export default connect(state=>{
  return state
},null)(Todolist)
