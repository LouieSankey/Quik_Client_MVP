import React, { Component, useState } from 'react';
import './loginModal.css'
import './signupModal.css'


export default function LoginModal(props) {

    return(
       
        <div className="signin-modal">
            
            <div class="main-block">
            <button className="close-button" onClick={() => props.showModal(false)}>x</button>

                <form className="signup-form" action="/">
                    <p className="signup-header" >Log In</p>


                    <div class="account-details">
                        <div><label>Email*</label><input type="text" name="name" required></input></div>

                        <div><label>Password*</label><input type="password" name="name" required></input></div>

                        <div><label>Repeat password*</label><input type="password" name="name" required></input></div>
                    </div>

                </form>
                <button className="login-button" href="/" onClick={props.setIsLoggedIn(true)}>Log In</button>


                <p className="toggle-signin">Don't have an account yet? <span onClick={() => props.signup(true)} className="signin-link">Sign Up</span></p>
            </div>
        </div>
    )


}