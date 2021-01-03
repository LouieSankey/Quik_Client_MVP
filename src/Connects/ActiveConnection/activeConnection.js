import React, { Component, useState,  useEffect, useRef } from 'react';
import Message from '../Message/message'
import './activeConnection.css'
const man1 = require('../../Images/blank-woman.jpeg')

export default function ActiveConnection(props) {

    const emptyUser = {
        id: null,
        name: "",
        age: "",
        connectedStatus: null,
        profileImage: man1
      }

      const activeUser = props.connect ? props.connect : emptyUser

    
      const [currentMessage, setCurrentMessage] = useState([])
      const [enteredText, setEnteredText] = useState(''); 


    
      const handleChange = (event) => {
        setCurrentMessage(event.target.value)
      }


      const messagesEndRef = useRef(null)

      const scrollToBottom = () => {
        if(props.sentMessages.length > 0){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }

      }
      
      useEffect(scrollToBottom, [props.sentMessages]);


      const sendMessage = () => {
          
        props.setSentMessages(sentMessages => [...sentMessages, {sent: currentMessage}])
        setCurrentMessage("")
        setEnteredText('');
      }

      const [dateRequested, setDateRequested] = useState(true)

      const requestDate = () => {
        props.setSentMessages(sentMessages => [...sentMessages, {system: "Congrats! Your request is on the way. If " + activeUser.name + " agrees to reveal your date, you'll be notifed in the chat!"} ])
        setDateRequested(!dateRequested)
      }





    return(
    <div className="chat">
    <div className="chat-header clearfix">
      {!activeUser.connectedStatus && 
      <h3>Pin any remaining pins then select a connection to chat.</h3>}
        <img className="small-image" src={activeUser.profileImage} alt="avatar" />

{activeUser.connectedStatus && (dateRequested ?  <button className="reveal-button" onClick={requestDate}>Request Date Reveal</button>
:  <button className="reveal-button" onClick={requestDate}>Requested!</button>)}
       

       

        <div className="chat-about">
            <div className="chat-with">{activeUser.name}</div>
            <div className="chat-num-messages">{activeUser.age}</div>
        </div>
        <i className="fa fa-star"></i>
    </div>
 

    <div className="chat-history">
        <ul className="chat-message-list">


            {props.sentMessages.map((message, i )=> {
                 return <Message key={i} activeUser={activeUser} message={message}> </Message>
            })}
        </ul>
            <div ref={messagesEndRef} />
    </div>
   


    <div className="chat-message clearfix">
        <textarea name="message-to-send" id="message-to-send"  value={currentMessage} onChange={handleChange} placeholder="Type your message" rows="3"></textarea>

        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>

        <button onClick={sendMessage}>Send</button>

    </div>


</div>
    )

}