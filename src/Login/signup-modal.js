import React, { Component, useState } from 'react';
import './login-modal.css'
import ApiService from '../api-services'


export default function SignupModal(props) {

    let emailInput = React.createRef();
    let usernameInput = React.createRef();
    let birthdayInput = React.createRef();
    let passwordInput = React.createRef();
    let repeatPasswordInput = React.createRef();

    const [seeking, setSeeking] = useState(null)
    const [reenterEmail, setReenterEmail] = useState("hidden")
    const [reenterName, setReenterName] = useState("hidden")
    const [reenterPassword, setReenterPassword] = useState("hidden")
    const [makeSelection, setMakeSelection] = useState("hidden")
    const [enterBirthday, setEnterBirthday] = useState("hidden")

    const createAccount = () => {
        if (usernameInput.current.value.length < 3) {
            setReenterName("show")
        } else if (!validateEmail(emailInput.current.value)) {
            setReenterEmail("show")
        } else if (birthdayInput.current.value === "") {
            setEnterBirthday("show")
        } else if (passwordInput.current.value === "" || passwordInput.current.value !== repeatPasswordInput.current.value) {
            setReenterPassword("show")
        } else if (!seeking) {
            setMakeSelection("show")
        }
        else {
            const data = {
                "username": usernameInput.current.value,
                "email": emailInput.current.value,
                "birthday": birthdayInput.current.value,
                "password": passwordInput.current.value,
                "seeking": seeking
            }
            ApiService.createUser(data).then(user => {
                props.setUser(user)
                localStorage.setItem("quik_account_id", user.id)
            })

            props.setIsLoggedIn(true)
        }

    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (

        <div className="login-modal">
            <div className="main-block">
                <button className="close-button" onClick={() => props.showModal(false)}>x</button>
                <form className="signup-form" action="/">
                    <p className="signup-header" >Create a Free Account</p>
                    <div className="account-details">
                        <div><label>Email*<span className={reenterEmail}>Please enter a valid email</span></label><input ref={emailInput} type="text" name="name" required></input></div>
                        <div><label>First Name*<span className={reenterName}>Must be at least 3 letters</span></label><input ref={usernameInput} type="text" name="username" required></input></div>
                        <div><label htmlFor="birthday">Birthday:<span className={enterBirthday}> Please Enter Your Birthday</span></label><input ref={birthdayInput} type="date" id="birthday" name="birthday" /></div>
                        <div><label>Password*<span className={reenterPassword}>Your passwords do not match</span></label><input ref={passwordInput} type="password" name="name" required></input></div>
                        <div><label>Repeat password*</label><input ref={repeatPasswordInput} type="password" name="name" required></input></div>
                    </div>
                    <div className="personal-details">
                        <div>
                        </div>
                        <div>
                            <div>
                                <label>Seeking* <span className={makeSelection}>Please make a selection</span></label>
                                <div className="gender">
                                    <input onChange={(e) => setSeeking(e.target.value)} type="radio" value="men" id="male" name="gender" required />
                                    <label htmlFor="male" className="radio">Men</label>
                                    <input onChange={(e) => setSeeking(e.target.value)} type="radio" value="women" id="female" name="gender" required />
                                    <label htmlFor="female" className="radio">Women</label>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>

                <button className="create-account-button" href="/" onClick={createAccount}>Create Account</button>

                <p className="toggle-signin">Already have an Account? <span onClick={() => props.signup(false)} className="signin-link">Log In</span></p>
            </div>
        </div>
    )


}