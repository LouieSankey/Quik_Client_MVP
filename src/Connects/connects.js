import React, { Component, useState } from 'react';
import './connects.css'
import ConnectionProfile from './ConnectionProfile/connectionProfile'
import ActiveConnection from './ActiveConnection/activeConnection'

export default function Connects(props) {

    let connects = props.matches.filter(match => {
            if (match && match.connectedStatus === 3) {
                return match
        }
    })

    const uniqueConnects = connects
    .filter((object,index) => index === connects
    .findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)));

    if (props.recentMatchId !== null) {
        uniqueConnects.unshift(uniqueConnects
            .splice(uniqueConnects.findIndex(item => item.id === props.recentMatchId), 1)[0])
    }
    
    const [isSelectedItem, setSelectedItem] = useState(0)
    const [sentMessages, setSentMessages] = useState([])

    const onClick = (connect, index) => {
        setSelectedItem(index)
        setSentMessages([])
    }


    return (
        <div className="container clearfix">
            <div className="people-list" id="people-list">
                {
                <h2 className="connected-header">You have {uniqueConnects.length} new connection(s).</h2>
                }
                <h3 className="chat-selection-header">The day and location you matched will be kept secret until you mutually agree to reveal it.</h3>
                <ul className="connection-list">
                    {uniqueConnects.map((connect, i) => {
                        return <li
                            key={i}
                            className={i === isSelectedItem ? "selectedItem clearfix connection-profile" : "clearfix connection-profile"}
                            onClick={() => onClick(connect, i)}>
                            <ConnectionProfile
                                connect={connect} >
                            </ConnectionProfile>
                        </li>
                    })}

                </ul>
            </div>
            <ActiveConnection 
            connect={connects[isSelectedItem]} 
            sentMessages={sentMessages}
            setSentMessages={setSentMessages}
            user={props.user}
            connects={connects}
           
            ></ActiveConnection>
        </div>
    )
}