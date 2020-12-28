import React, { Component, useState } from 'react';
import './message.css'


export default function Message(props) {

    return(

<>
        
            {props.message.sent &&
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time">00:00 AM, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name">You</span> <i className="fa fa-circle me"></i>

                </div>
                <div className="message other-message float-right">
                    {props.message.sent} </div>
            </li> 
            }           
            {props.message.recieved &&
              <li>
                <div className="message-data">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> {props.activeUser.name}</span>
                    <span className="message-data-time">00:00 AM, Today</span>
                </div>
                <div className="message my-message">
                    Hmm, Ok. 
                </div>
            </li>
            }


             {props.message.system &&
              <li>
                <div className="message-data-system">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> message from Quik</span>
                    <span className="message-data-time">00:00 AM, Today</span>
                </div>
                <div className="message-system my-message-system">
                {props.message.system}
                </div>
            </li>
            }         
            </>
      
    )

}