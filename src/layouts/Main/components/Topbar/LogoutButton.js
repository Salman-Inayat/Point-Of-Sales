import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
// import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

class LogoutButton extends Component {
  // const history = useHistory();
  state = {
    redirect: false,
  };
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true,
  //   });
  // };

  logout = () => {
    sessionStorage.removeItem("auth-token");
    this.setState({
      redirect: true,
    });
    console.log("logged out");
    // props.handleLogout()
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return <button style={{border:'2px solid white', cursor: 'pointer'}} onClick={this.logout}>Logout</button>;
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
