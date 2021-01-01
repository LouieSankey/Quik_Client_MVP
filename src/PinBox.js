import React, { Component } from 'react';



export default function PinBox(props) {
  return (
    <div className="pin-box">
        <img className="pin-box-heartpin" src={require('./Images/heartpin4.png')} alt="" />
        <p className="pin-box-pins-remaining">x{props.pinsRemaining}</p>
    </div>
  )

}