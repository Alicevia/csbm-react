import React, { Component } from 'react'
import {Link} from 'dva/router'
export default class _layouts extends Component {
  render() {
    return (
      <div>
        <Link to='/todolist'>todolist</Link>
        <Link to='/todolist/todo1'>todo1</Link>
        {this.props.children}
      </div>
    )
  }
}
