import React, { Component, useState } from 'react';
import './landingPage.css'

const heartpin = require('./Images/qheart2.png')
const bars = require('./Images/bars.png')

export default function Landing(props) {

    console.log("con: " + JSON.stringify(props.history))

    return(

        <>
            <div className="navbar no-click flex">

                <h1 className="logo-text header-column-1"><img className="logo-image" src={heartpin} alt=""></img><span className="logo-main-text">uik</span> </h1>
                <input className="location-search header-column-2" type="text" value="Your City"></input>
                <button type="submit" className="searchButton" >
                    <i className="fa fa-search"></i>
                </button>

                <div className="header-column-3" >
                    <h3 className="my-quik logo-text"> My Quik </h3>
                </div>

                </div>
        <main className="splash-main">

            
        <div className="splash-header">

            <div className="header">
                <h1 >Quik puts the 'date' back in dating.</h1>
                
                <h2 >Tired of 'dating' apps never leading to real dates?</h2>
                <br/>
               
                <p>Quik let's you pin locations for dates you already want to go on, then find potential matches with people who pinned the same location.</p>
                <br/>
                <p>Quik is Safe - Users will never know the exact location you matched until you mutually agreed to reveal it.</p>
        
                 <p>Quik is Fun - pick your favorite locations and see who else shares the same interests.</p>
            </div>

        </div>

        <img className="quik-img" src={require('./Images/iphonelanding.png')} alt=""></img>
       
        <button className="signup-button" onClick={props.setIsLoggedIn(true)}>Login / Sign Up</button>

    </main>
    </>

    )
}



    
