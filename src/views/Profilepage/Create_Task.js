import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Adapter from "../../Adapter"
import '../../App.css'


class CreateTask extends Component {

  handleCreateTaskSubmit = (event) => {
    event.preventDefault()
    let submissionBody = {
      user_id: this.props.currentUser.id,
      message: this.props.message,
      create_by: this.props.currentUser.username,
      to_username: this.props.task_to,
      task_completed: false
    }
    const createdTasks = this.props.currentUser.todolists
    createdTasks.push(submissionBody)
    this.props.addCurrentUserTask({
      ...this.props.currentUser,
      currentUser: createdTasks
    })
    const url = "https://limitless-fjord-48119.herokuapp.com/api/v1/todolists"
    this.props.handleResetTaskToInput()
    this.props.handleResetTaskMessageInput()
    Adapter.fetchRequest(url, submissionBody, "POST").then(() => this.props.history.push("/profile"))
  }

  render() {
    return (
    <div className="create-task-section">
      <form className='new_task_form' onSubmit={this.handleCreateTaskSubmit}>
        <h2 style={{marginBottom:'20px'}}>Create a task for your team member</h2>
        <div className="input-div">
          <label className="left-label" >Task to </label>
          <input className="right-label" type="text" value={this.props.task_to} onChange={(event) => this.props.handleTaskToInput(event)}required/>
        </div>
        <div className="input-div">
          <label className="left-label" >Message: </label>
          <input className="right-label" type="text" value={this.props.message} onChange={(event) => this.props.handleCreateTaskMessageInput(event)} required/>
        </div>
        <button type="submit" style={{marginTop:'30px'}}>Create Task</button>
      </form>
    </div>)
  }

}

function mapStateToProps(state) {
  return {task_to: state.task_to, message: state.message, currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    //setState use callback function
    // addHeads: (data) => {
    //   dispatch({type: "ADD_HEADS", payload: data})
    // } it will be this.props.addHeads() instead of setState({})
    handleTaskToInput: (event) => {
      dispatch({type: "SEND_TASK_TO", payload: event.target.value})
    },
    handleCreateTaskMessageInput: (event) => {
      dispatch({type: "CREATE_MESSAGE", payload: event.target.value})
    },
    handleResetTaskToInput: () => {
      dispatch({type: "RESET_TASK_TO_INPUT"})
    },
    handleResetTaskMessageInput: () => {
      dispatch({type: "RESET_TASK_MESSAGE_INPUT"})
    },
    addCurrentUserTask: (task) => {
      dispatch({type: "ADD_TASK_TO_CURRENT_USER", payload: task})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)
