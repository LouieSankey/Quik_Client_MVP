import React, { Component, useState } from 'react';
import './loginModal.css'
import ApiService from './api-services'


export default function SignupModal(props) {

    let emailInput = React.createRef();
    let usernameInput = React.createRef();
    let passwordInput = React.createRef();
    let repeatPasswordInput = React.createRef();

    const [seeking, setSeeking] = useState(null)

    const [reenterEmail, setReenterEmail] = useState("hidden")
    const [reenterName, setReenterName] = useState("hidden")
    const [reenterPassword, setReenterPassword] = useState("hidden")
    const [makeSelection, setMakeSelection] = useState("hidden")

    const createAccount = () => {
            //get data from all fields and create obj

            if(usernameInput.current.value.length < 3){
                setReenterName("show")
            }else if(!validateEmail(emailInput.current.value)){
                setReenterEmail("show")
            }else if(passwordInput.current.value !== repeatPasswordInput.current.value) {
                setReenterPassword("show")
            }else if(!seeking){
                setMakeSelection("show")
            }
            else{
                const data = {
                    "username": usernameInput.current.value,
                    "email": emailInput.current.value,
                    "password": passwordInput.current.value,
                    "seeking": seeking
            }
                ApiService.createUser(data).then(user => {

                     props.setUser(user)

                    localStorage.setItem("quik_account_id", user.id)
                })
                
                //this will get called after posting created user data to db
                props.setIsLoggedIn(true)
            }

            }

            function validateEmail(email){
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
                }

           

    return (

        <div className="login-modal">
            <div class="main-block">
                <button className="close-button" onClick={() => props.showModal(false)}>x</button>
                <form className="signup-form" action="/">
                    <p className="signup-header" >Create a Free Account</p>

                    <div class="account-details">
                        <div><label>Email*<span className={reenterEmail}>Please enter a valid email</span></label><input ref={emailInput} type="text" name="name" required></input></div>
                        <div><label>First Name*<span className={reenterName}>Must be at least 3 letters</span></label><input ref={usernameInput} type="text" name="username" required></input></div>
                        <div><label>Password*<span className={reenterPassword}>Your passwords do not match</span></label><input ref={passwordInput} type="password" name="name" required></input></div>
                        <div><label>Repeat password*</label><input ref={repeatPasswordInput} type="password" name="name" required></input></div>
                    </div>

                    <div class="personal-details">
                        <div>
                        </div>
                        <div>
                            <div>
                                <label>Seeking* <span className={makeSelection}>Please make a selection</span></label>
                                <div class="gender">
                                    <input onChange={(e) => setSeeking(e.target.value)} type="radio" value="men" id="male" name="gender" required />
                                    <label for="male" class="radio">Men</label>
                                    <input onChange={(e) => setSeeking(e.target.value)} type="radio" value="women" id="female" name="gender" required />
                                    <label for="female" class="radio">Women</label>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>

                <button className="create-account-button"  href="/" onClick={createAccount}>Create Account</button>


                <p className="toggle-signin">Already have an Account? <span onClick={()=> props.signup(false)} className="signin-link">Log In</span></p>
            </div>
        </div>
    )


}