import React, { Component, useState } from 'react';
import './connects.css'
import ConnectionProfile from './ConnectionProfile/connectionProfile'
import ActiveConnection from './ActiveConnection/activeConnection'

export default function Connects(props) {

    let connects = props.matches.filter(match => {
            if (match.connectedStatus === 3) {
                return match
        }
    })

    //moves the most recent connection to top of array for display purpose
    if (props.recentMatchId !== null) {
        connects.unshift(connects.splice(connects.findIndex(item => item.id === props.recentMatchId), 1)[0])
    }
    
    const [isSelectedItem, setSelectedItem] = useState(0)

    const [sentMessages, setSentMessages] = useState([])

      //sentMessages is an array of messages, there needs to be one for each user

    const onClick = (connect, index) => {
        // setActiveConnection(connect)
        setSelectedItem(index)
        setSentMessages([])
    }

    return (
        <div className="container clearfix">
            <div className="people-list" id="people-list">
                {props.recentMatchId === null 
                ?<h2 className="connected-header">You have 0 new connections.</h2>
                :<h2 className="connected-header">Congrats! You are now connected with {connects[0].name}.</h2>
                }
                <h3 className="chat-selection-header">The day and location you matched will be kept secret until you mutually agree to reveal it.</h3>
                <ul className="connection-list">
                    {connects.map((connect, i) => {
                        return <li
                            key={i}
                            className={i === isSelectedItem ? "selectedItem clearfix connection-profile" : "clearfix connection-profile"}
                            onClick={() => onClick(connect, i)}>
                            <ConnectionProfile
                                connect={connect}>
                            </ConnectionProfile>
                        </li>
                    })}

                </ul>
            </div>
            <ActiveConnection 
            connect={connects[isSelectedItem]} 
            sentMessages={sentMessages}
            setSentMessages={setSentMessages}
            ></ActiveConnection>
        </div>
    )
}