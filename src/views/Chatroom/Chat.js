import React, {Component,Fragment} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Chatkit from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import MYChatkit from '@pusher/chatkit-server'
import {tokenUrl, instanceLocator, key} from './config'
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  loginUser = (posUser) => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: posUser,
      tokenProvider: new Chatkit.TokenProvider({url: tokenUrl})
    })

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser
      // console.log(this.currentUser)
      this.getRooms()
    }).catch(err => console.log('error on connecting: ', err))
  }

  usersFindOrCreate = (res, posUser, chatkit) => {
    // debugger;
    if (res.find(user => user.id === posUser) === undefined) {
      chatkit.createUser({id: posUser, name: posUser}).then((user) => {
        console.log('Success', user);
        return this.loginUser(posUser)
      }).catch((err) => {
        console.log(err);
      });
    } else {
      return this.loginUser(posUser)
    }
  }

  componentDidMount() {

    const posUser = this.props.currentUser.username

    const chatkit = new MYChatkit({instanceLocator, key});
    chatkit.getUsers().then(res => this.usersFindOrCreate(res, posUser, chatkit))
  }

  getRooms() {
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({joinableRooms, joinedRooms: this.currentUser.rooms})
    }).catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
    this.setState({messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          // console.log("check this out", message)
          this.setState({
            messages: [
              ...this.state.messages,
              message
            ]
          })
        },
        onUserStartedTyping: user => {
          /** render out the users */
          console.log(user)
        }

      }
    }).then(room => {
      this.setState({roomId: room.id})
      this.getRooms()
    }).catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({text, roomId: this.state.roomId})
  }

  createRoom(name) {
    this.currentUser.createRoom({name}).then(room => {
      this.subscribeToRoom(room.id)
    }).catch(err => console.log('error with createRoom: ', err))
  }

  // <Link to="/home">Home</Link>
  // <Navbar/>
  render() {
    return (
      <Fragment>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <br/>
      <div className="app">

      <RoomList subscribeToRoom={this.subscribeToRoom} rooms={[
          ...this.state.joinableRooms,
          ...this.state.joinedRooms
        ]} roomId={this.state.roomId}/>
      <MessageList roomId={this.state.roomId} messages={this.state.messages}/>
      <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage}/>
      <NewRoomForm createRoom={this.createRoom}/>
    </div>
</Fragment>
  );
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}
export default connect(mapStateToProps)(Chat)
