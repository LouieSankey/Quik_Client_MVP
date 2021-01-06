import React, { Component, useState } from 'react';
import './loginModal.css'
import './signupModal.css'
import ApiService from './api-services'

export default function LoginModal(props) {

    let emailInput = React.createRef();
    let passwordInput = React.createRef();

    // const [reenterEmail, setReenterEmail] = useState("hidden")
    const [passwordError, setPasswordError] = useState("")

    const login = () => {
        if (!validateEmail(emailInput.current.value)) {
            setPasswordError("Please enter a valid password")
        }else {
            const data = {
                "email": emailInput.current.value,
                "password": passwordInput.current.value,
            }
            ApiService.getAccountByEmail(data).then(user => {
                console.log(user)
                localStorage.setItem("quik_account_id", user.id)
                props.setUser(user)

                props.setIsLoggedIn(true)
            }).catch(err => {
                setPasswordError(err.error.message)
                console.log("error", err)
            })

        } 

    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    return (

        <div className="signin-modal">

            <div class="main-block">
                <button className="close-button" onClick={() => props.showModal(false)}>x</button>

                <form className="signup-form" action="/">
                    <p className="signup-header" >Log In</p>


                    <div class="account-details">
                        <div><label>Email*<span className="show">{passwordError}</span></label><input ref={emailInput} type="text" name="name" required></input></div>

                        <div><label>Password* </label><input ref={passwordInput} type="password" name="name" required></input></div>

                    </div>

                </form>
                <button className="login-button" href="/" onClick={login}>Log In</button>


                <p className="toggle-signin">Don't have an account yet? <span onClick={() => props.signup(true)} className="signin-link">Sign Up</span></p>
            </div>
        </div>
    )


}