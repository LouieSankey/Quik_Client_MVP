import React, { Component, useState } from 'react';
import './login-modal.css'


export default function DemoModal(props) {

    return (

        <div className="login-modal">
            <div className="main-block">
                <button className="close-button" onClick={() => props.showDemo(false)}>x</button>
            
            <p>Quik is a dating app that requires at least two users to test its features.</p>            
            <br></br>
           <p>Since Quik takes advantage of local storage to store login credentials, you'll want to create each user in a separate BROWSER (i.e. Chrome and Safari).</p>
            <br></br>
            <p>Guest credentials couldn't be supplied as a previous visit from one tester could influence the state for the next.</p>
            <br></br>
            <p>To create a user, use any string longer than 3 characters for 'first name', 'birthday', and 'password'. Email must be formatted correctly, but it can be a throw away.</p>
            <br></br>
            <p>Inside, you'll want to SET YOUR FIVE PINS for each user, making sure that at least one pin is overlapping.</p>
            <br></br>
            <p>You'll have to refresh for connection status updates between your two users, but once connected you can chat and request/reveal your shared location date in real time.</p>

            <br></br>
            <p>Enjoy!</p>
            </div>
        </div>
    )


}