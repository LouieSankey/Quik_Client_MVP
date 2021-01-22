import React, { useState, useEffect, useRef } from 'react';
import Message from '../Message/message'
import './activeConnection.css'
import io from 'socket.io-client'
import apiService from '../../api-services'
import DateFormat from 'dateformat'
import config from '../../config'


let socket;
const ENDPOINT = config.API_ENDPOINT
socket = io(ENDPOINT)

const man1 = require('../../Images/female_avatar.jpg')

export default function ActiveConnection(props) {
  const userPlaceholder = {
    id: null,
    name: "",
    age: "",
    connectedStatus: null,
    location_date_id: null,
    profileImage: man1
  }

  const selectedUser = props.connect ? props.connect : userPlaceholder
  const [currentMessage, setCurrentMessage] = useState([])
  const [dateRequestStatus, setDateRequestStatus] = useState(0)
  const user_ids = [selectedUser.user_id, props.user.id].sort()
  const room_id = user_ids[0] + "-" + user_ids[1] + "-" + selectedUser.location_date_id
  const messageBoxBottom = useRef(null)
  const messageBox = useRef(null)

  const [scroll, setScroll] = useState(0)

  const onMessageChange = (event) => {
    setCurrentMessage(event.target.value)
  }

  const scrollToBottom = () => {
    if (props.sentMessages.length > 0) {
      messageBox.current.scrollTop = scroll + 5000
      setScroll(scroll => scroll + 5000)
    }
  }

  useEffect(scrollToBottom, [props.sentMessages]);

  useEffect(() => {
    setDateRequestStatus(0)

    apiService.getMessages(room_id).then(messages => {
      props.setSentMessages([])
      messages.map(msgInfo => {
        msgInfo.username = Number(msgInfo.username) ? Number(msgInfo.username) : msgInfo.username
        props.setSentMessages(sentMessages => [...sentMessages, { msgInfo }])

      })
    })

    if (selectedUser.requestStatus === 2 || (selectedUser.date_request_recieved
      && selectedUser.date_request_recieved.includes(props.user.id + "-" + selectedUser.location_date_id))) {
      setDateRequestStatus(2)
    }

    if (selectedUser.requestStatus === 1 || (selectedUser.date_request_sent
      && selectedUser.date_request_sent.includes(props.user.id + "-" + selectedUser.location_date_id))) {
      setDateRequestStatus(1)

    }

    if (selectedUser.requestStatus === 3 || selectedUser.date_request_recieved && selectedUser.date_request_sent
      && selectedUser.date_request_recieved.includes(props.user.id + "-" + selectedUser.location_date_id)
      && selectedUser.date_request_sent.includes(props.user.id + "-" + selectedUser.location_date_id)) {
      setDateRequestStatus(3)
    }
  }, [selectedUser.id])

  
  useEffect(() => {
    socket.removeAllListeners()
    socket.once('chat message ' + room_id, function (msgInfo) {
      props.setSentMessages(sentMessages => [...sentMessages, { msgInfo }])
    })
    socket.once('request ' + room_id, function (params) {
      if (params.status === 1 && params.sender_id === props.user.id) {
        setDateRequestStatus(2)
        selectedUser.requestStatus = 2
      } else {
        setDateRequestStatus(params.status)
        selectedUser.requestStatus = params.status
      }
    })
  }, [props])

  const sendMessage = () => {
    const msg = {
      "room_id": room_id,
      "username": props.user.id,
      "msg": currentMessage
    }
    socket.emit('chat message', msg)
    setCurrentMessage("")
  }

  const requestDate = () => {

    const msg = {
      "room_id": room_id,
      "username": 'Quik',
      "msg": dateRequestStatus === 1 ? `Congrats!! ${props.user.username} has revealed your date!`
        : `${props.user.username} has requested a date reveal!`
    }

    const request = {
      "room_id": room_id,
      "status": dateRequestStatus === 0 ? 1 : 3,
      "sender_id": props.user.id
    }

    socket.emit('chat message', msg)
    socket.emit('request', request)

    const params = {
      location_date_id: selectedUser.location_date_id,
      own_id: props.user.id,
      others_id: selectedUser.user_id
    }

    apiService.requestDate(params)
    props.connects.forEach(connect => {
      if (selectedUser.id === connect.id) {
        connect.requestStatus = dateRequestStatus
      }
    })
    setDateRequestStatus(1)
  }

  const renderButton = (status) => {

    switch (status) {
      case 0:
        return <button className="reveal-button" onClick={requestDate}>Request Date Reveal</button>
      case 1:
        return <button className="reveal-button" onClick={requestDate}>Reveal Date!</button>
      case 2:

        return <button className="reveal-button no-click" onClick={requestDate}>Requested!</button>
      case 3:
        return selectedUser.date_location ? <div className="date-reveal-text" >
          <p>Your date is for: </p>
          <p><span className="blue-text">{selectedUser.date_location}</span></p>
          <p><span className="blue-text-small">{selectedUser.date_location_category}</span></p>
          <p> on </p>
          <p><span className="blue-text">{DateFormat(selectedUser.pin_date, "ddd, mmmm dS")}</span></p> </div>
          : <p className="date-reveal-text"></p>
      default:
        return 'foo';
    }
  }

  return (
    <div className="chat">
      <div className="chat-header clearfix">
        {!selectedUser.connectedStatus &&
          <h3>Pin any remaining pins then select a connection to chat.</h3>}
        <img className="small-image" src={selectedUser.profileImage} alt="avatar" />
        {renderButton(dateRequestStatus)}
        <div className="chat-about">
          <div className="chat-with">{selectedUser.name}</div>
          <div className="chat-num-messages">{selectedUser.age}</div>
        </div>
        <i className="fa fa-star"></i>
      </div>
      <div className="chat-history" ref={messageBox}>
        <ul className="chat-message-list">
          {props.sentMessages.map((message, i) => {
            return <Message key={i} activeUser={selectedUser} user={props.user} message={message.msgInfo}> </Message>
          })}
        </ul>
        <div  />
      </div>
      <div className="chat-message clearfix">
        <textarea name="message-to-send" id="message-to-send" value={currentMessage} onChange={onMessageChange} placeholder="Type your message" rows="3"></textarea>
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )

}