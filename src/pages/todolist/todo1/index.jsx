/**
 * title: Index Page
 * Routes:   
 *   - ./src/routes/PrivateRoute.js
 */
import React, { Component } from 'react'
import { connect } from 'dva'

 class Todo1 extends Component {
  render() {
    return (
      <div>
        todo1
      </div>
    )
  }
}
export default connect(state=>{
  console.log(state)
  return state
})(Todo1)