import React, { useState } from 'react';
import './landing-page.css'
import LoginModal from '../Login/signup-modal'
import SignupModal from '../Login/login-modal'

const heartpin = require('../Images/qheart2.png')

export default function Landing(props) {

    const [showModal, setShowModal] = useState(false)
    const [signup, setSignup] = useState(true)

    return (
        <>
            {showModal && (signup ?
                <LoginModal showModal={setShowModal} signup={setSignup} setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn}></LoginModal>
                :
                <SignupModal showModal={setShowModal} signup={setSignup} setUser={props.setUser} setIsLoggedIn={props.setIsLoggedIn}></SignupModal>)
            }
            <div className="navbar no-click flex">
                <h1 className="logo-text header-column-1"><img className="logo-image" src={heartpin} alt=""></img><span className="logo-main-text">uik</span> </h1>
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
                        <h1 >Quik puts the 'date' back in online dating.</h1>
                        <br />
                        <p>Quik let's you pin locations in your city or that you'd like to visit, then find potential matches with people who pinned the same location.</p>
                        <br />
                        <ul className="landing-page-bullets">
                            <li>                <p>Quik is Safe - Users will never know the exact location you matched until you mutually agreed to reveal it.</p>
                            </li>
                            <li>                 <p>Quik is Fun - pick your favorite locations and see who else shares the same interests.</p>
                            </li>
                            <li>                 <p>Quik is Free! - With Quik you don't have to pay a fortune to find a date, get 5 reusable locations pins completely free!</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <img className="quik-img" src={require('../Images/iphonelanding.png')} alt=""></img>
                <button className="signup-button" onClick={() => setShowModal(true)}>Log In / Sign Up</button>
            </main>
        </>

    )
}




