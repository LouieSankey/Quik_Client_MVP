import React, { Component, useState } from 'react';
import './message.css'


export default function Message(props) {



    return (

        <>

            {props.message.username === props.user.id &&

                <li className="clearfix">
                    <div className="message-data align-right">

                        <span className="message-data-time">00:00 AM, Today</span> &nbsp; &nbsp;

                    {/* <span className="message-data-name">You</span> <i className="fa fa-circle me"></i> */}

                    </div>
                    <img className="profile-image-chat float-right" src={require('../../Images/blank-woman.jpeg')} alt="" />

                    <div className="message other-message float-right">

                        {props.message.msg} </div>
                </li>


            }
            {props.message.username === props.activeUser.user_id &&
                <li className="clearfix">
                    <div className="message-data">

                        {/* <span className="message-data-name"><i className="fa fa-circle online"></i> {props.activeUser.name}</span> */}
                        <span className="message-data-time">00:00 AM, Today</span>

                    </div>

                    <img className="connection-image-chat" src={props.activeUser.profileImage} alt="" />

                    <div className="message my-message">
                        {props.message.msg}

                    </div>
                </li>


            }


            {props.message.username === 'Quik' &&
                <li>
                    <div className="message-data-system">
                        <span className="message-data-name"><i className="fa fa-circle online"></i> message from Quik</span>
                        <span className="message-data-time">00:00 AM, Today</span>
                    </div>
                    <div className="message-system my-message-system">

                        {props.message.msg.includes(props.user.username) ?
                        props.message.msg.replace(props.user.username + " has", "you've")
                        : props.message.msg }

                    </div>
                </li>
            }
        </>

    )

}