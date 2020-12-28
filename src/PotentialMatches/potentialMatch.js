import React, { Component, useState } from 'react';
import './potentialMatch.css'
import { withRouter } from "react-router-dom";



const connectButton = require('../Images/connect-button.jpg')
const likeButton = require('../Images/likebutton.jpeg')

function PotentialMatch(props) {


    
    let [indicatorText, setIndicatorText] = useState(props.potentialMatch.connectedStatus === 0 
        ? "Send " + props.potentialMatch.name + " a Like" 
        : props.potentialMatch.name + " Liked You")

     let button = props.potentialMatch.connectedStatus === 0 ? likeButton : connectButton

  const onClick = () => {
    props.changeStatus(props.potentialMatch, props)
  }

    return(
    <>
        <div className="result-container">
            <img className="result-box result-img" src={props.potentialMatch.profileImage} alt=""></img>
            <div className="result-box">
                <h3 className="potentialName">{props.potentialMatch.name}</h3>
                <h4 className="potentialAge"> Age: {props.potentialMatch.age}</h4>
                { props.potentialMatch.connectedStatus < 2 &&
                    <div>
                        <p>{indicatorText}</p>
                        <img onClick={() => onClick()} className="like-button" src={button} alt=""></img>
                    </div>
                }
                {
                    props.potentialMatch.connectedStatus === 2 &&
                    <p>{"You Sent " + props.potentialMatch.name
                    + " a Like! If he chooses to connect, he'll show up in your 'Connects'"}</p>
                }
                            
            </div>
        </div>
    </>
    
    )
}

export default withRouter(PotentialMatch);


