import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Adapter from "../../Adapter"
import {Link} from 'react-router-dom'
import '../../App.css'

// don't need chatid in our db since username is unique
class CreateUser extends Component {

  handleCreateUserSubmit = (event) => {
    event.preventDefault()
    console.log("I will fetch", this.props.currentUser)

    let submissionBody = {
      username: this.props.newUser_username,
      created_by_username: this.props.currentUser.username,
      created_by_userID: this.props.currentUser.id,
      password: this.props.newUser_password,
      role: this.props.newUser_role,
      status: this.props.newUser_status,
    }

    const url = "https://limitless-fjord-48119.herokuapp.com/api/v1/users"
    Adapter.fetchRequest(url, submissionBody, "POST")
    this.props.history.push("/profile")
  }

  render() {
    return (
    <Fragment>
      <div style={{padding:'50px'}}>
      <Link to="/profile" style={{ margin: "30px", color: "black" }}>
        Go Back
      </Link>
        <form className='new-user-form'  onSubmit={this.handleCreateUserSubmit}>
          <h2 style={{textAlign:'center', marginBottom:'20px'}}>Create a User</h2>
          <div className="input-div">
            <label className="left-label" >Username </label>
            <input className="right-label" type="text" value={this.props.newUser_username} onChange={(event) => this.props.handleNewUserUsernameInput(event)} required/>
          </div>
          <div className="input-div">
            <label className="left-label" >Password </label>
            <input className="right-label" type="password" value={this.props.newUser_password} onChange={(event) => this.props.handleNewUserPasswordInput(event)} required/>
          </div>
          <div className="input-div">
            <label className="left-label" >Role </label>
            <input className="right-label" type="text" value={this.props.newUser_role} onChange={(event) => this.props.handleNewUserRoleInput(event)} required/>
          </div>
          <div className="input-div">
            <label className="left-label" >Status </label>
            <input className="right-label" type="text"  value={this.props.newUser_status} onChange={(event) => this.props.handleNewUserStatusInput(event)}required/>
          </div>
  {/* 
          <label>Username:<input type="text" value={this.props.newUser_username} onChange={(event) => this.props.handleNewUserUsernameInput(event)} required/></label>

          <label>password:<input type="password" value={this.props.newUser_password} onChange={(event) => this.props.handleNewUserPasswordInput(event)} required/></label>

          <label>Role:<input type="text" value={this.props.newUser_role} onChange={(event) => this.props.handleNewUserRoleInput(event)} required/></label>

          <label>Status:<input type="text" value={this.props.newUser_status} onChange={(event) => this.props.handleNewUserStatusInput(event)}required/></label> */}

          <button type="submit" style={{marginTop:'30px'}}>Create User</button>
        </form>
      </div>
    </Fragment>)
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, newUser_username: state.newUser_username, newUser_password: state.newUser_password, newUser_role: state.newUser_role, newUser_status: state.newUser_status}
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewUserUsernameInput: (event) => {
      dispatch({type: "NEW_USER_USERNAME_INPUT", payload: event.target.value})
    },
    handleNewUserPasswordInput: (event) => {
      dispatch({type: "NEW_USER_PASSWORD_INPUT", payload: event.target.value})
    },
    handleNewUserRoleInput: (event) => {
      dispatch({type: "NEW_USER_ROLE_INPUT", payload: event.target.value})
    },
    handleNewUserStatusInput: (event) => {
      dispatch({type: "NEW_USER_STATUS_INPUT", payload: event.target.value})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
