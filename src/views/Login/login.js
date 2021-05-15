import React, { useState} from "react";
import { connect } from "react-redux";

function Login(props) {
  //   getUserFromApi = (user,toDoList) => {
  //     user.todolists=toDoList
  //     const userinfo= user

  //     this.props.handleLogin(userinfo)
  //   }

  //   handleSubmit = (event) => {
  //     event.preventDefault()

  //     const submissionBody ={
  //       username:this.props.usernameInput,
  //       password:this.props.passwordInput
  //     }
  //     const confi={
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(submissionBody)
  //     }

  //     fetch("https://limitless-fjord-48119.herokuapp.com/api/v1/login",confi).then(r=>r.json()).then(data=>{
  //       // debugger;
  //         localStorage.setItem('token', data.token)
  //         this.getUserFromApi(data.user_details,data.todolists)
  //         this.props.history.push("/profile")
  // }).catch(err => {
  // 			// console.warn(err);
  // 			localStorage.removeItem('token')
  // 			this.props.history.push('/login');
  // 		})
  //     this.props.resetUsernameInput()
  //     this.props.resetPasswordInput()
  //     // debugger;

  //   }

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // const history = useHistory();

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let hardcodedCred = {
      email: "admin",
      password: "admin",
    };

    if (
      emailInput == hardcodedCred.email &&
      passwordInput == hardcodedCred.password
    ) {
      const token = "123456abcdef";
      sessionStorage.setItem("auth-token", token);
      props.history.push("/dashboard");
      console.log("authenticated");
    } else {
      alert("wrong email or password combination");
    }
  };

  return (
    <div className="main">
      <img
        src="https://pbs.twimg.com/profile_images/747458892058271745/MuP5gYmD.jpg"
        alt=" "
        className="login-image"
      />
      <p className="sign" align="center">
        Login
      </p>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input
          className="un "
          style={{ width: "76%", height: "30px" }}
          type="text"
          value={emailInput}
          align="center"
          placeholder="Username"
          onChange={(event) => {
            // this.props.handleUsernameInput(event);
            handleEmailChange(event);
          }}
          required
        ></input>
        <input
          className="pass"
          style={{ width: "76%", height: "30px" }}
          type="password"
          align="center"
          value={passwordInput}
          placeholder="Password"
          onChange={(event) => {
            // this.props.handlePasswordInput(event);
            handlePasswordChange(event);
          }}
          required
        />
        <input className="submit button" type="submit" value="Login" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    // read state
    usernameInput: state.usernameInput,
    passwordInput: state.passwordInput,
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //setState use callback function
    // addHeads: (data) => {
    //   dispatch({type: "ADD_HEADS", payload: data})
    // } it will be this.props.addHeads() instead of setState({})
    handleUsernameInput: (event) => {
      dispatch({ type: "LOGIN_USERNAME", payload: event.target.value });
    },
    handlePasswordInput: (event) => {
      dispatch({ type: "LOGIN_PASSWORD", payload: event.target.value });
    },
    handleLogin: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },

    resetUsernameInput: () => {
      dispatch({ type: "RESET_USERNAME" });
    },
    resetPasswordInput: () => {
      dispatch({ type: "RESET_PASSWORD" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
