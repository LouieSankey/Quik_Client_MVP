import React, { useState } from 'react';
import './landing-page.css'
import LoginModal from '../Login/signup-modal'
import SignupModal from '../Login/login-modal'
import  DemoModal from '../Login/demo-modal'


export default function Landing(props) {

    const [showModal, setShowModal] = useState(false)
    const [showDemo, setShowDemo] = useState(false)
    const [signup, setSignup] = useState(true)

    return (
        <>

            {showDemo && <DemoModal showDemo={setShowDemo}></DemoModal>}

            {showModal && (signup ?
                <LoginModal showModal={setShowModal} signup={setSignup} setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn}></LoginModal>
                :
                <SignupModal showModal={setShowModal} signup={setSignup} setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn}></SignupModal>)
            }
            <div className="navbar no-click flex">
                <h1 className="logo-text header-column-1"><img className="logo-image" src={require('../Images/quik-web-logo.png')} alt=""></img></h1>
                <input className="location-search header-column-2" type="text" defaultValue="Your City"></input>
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
                        <h1 >Quik is Destination Based Dating for Explorers, Travelers, and Newcomers to a City.</h1>
                        <br />
                        <p>Quik lets you pin popular locations that you'd like to visit, then find potential matches with people who pinned the same location.</p>
                        <br />
                        <ul className="landing-page-bullets">
                            <li>                <p>Quik is Safe - Users will never know the exact location they matched until both parties chat and agree to reveal it.</p>
                            </li>
                            <li>                 <p>Quik is Fun - Pick exciting destinations you'd like to visit and see who else shares the same interests.</p>
                            </li>
                            <li>                 <p>Quik is Free! - With Quik you don't have to pay a fortune to find a date, get 5 reusable locations pins free!</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <img className="quik-img" src={require('../Images/iphonelanding.png')} alt=""></img>

                <button className="signup-button" onClick={() => setShowModal(true)}>Log In / Sign Up</button>
                <p className="demo" onClick={() => setShowDemo(true)} >Testing Instructions</p>
            </main>
        </>

    )
}




