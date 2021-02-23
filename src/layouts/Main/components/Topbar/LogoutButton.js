import React from 'react';
import {connect} from "react-redux"

const LogoutButton = (props)=>{

  function logout() {
    localStorage.removeItem("token")
    props.handleLogout()
  }

  return(
    <button onClick={logout}>Logout</button>
    )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
   }
}

function mapDispatchToProps(dispatch) {
  return{
    handleLogout:() => {
      dispatch({type: "LOGOUT"})
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LogoutButton);