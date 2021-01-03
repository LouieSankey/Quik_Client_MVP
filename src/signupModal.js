import React, { Component, useState } from 'react';
import './loginModal.css'


export default function SignupModal(props) {

    return (

        <div className="login-modal">
            <div class="main-block">
                <button className="close-button" onClick={() => props.showModal(false)}>x</button>
                <form className="signup-form" action="/">
                    <p className="signup-header" >Create a Free Account</p>


                    <div class="account-details">
                        <div><label>Email*</label><input type="text" name="name" required></input></div>
                        <div><label>Username*</label><input type="text" name="username" required></input></div>

                        <div><label>Password*</label><input type="password" name="name" required></input></div>

                        <div><label>Repeat password*</label><input type="password" name="name" required></input></div>
                    </div>

                    <div class="personal-details">
                        <div>
                        </div>
                        <div>
                            <div>
                                <label>Seeking*</label>
                                <div class="gender">
                                    <input type="radio" value="none" id="male" name="gender" required />
                                    <label for="male" class="radio">Men</label>
                                    <input type="radio" value="none" id="female" name="gender" required />
                                    <label for="female" class="radio">Women</label>
                               
                                </div>
                            </div>
                            <div class="birthdate">
                                <label>Birthdate*</label>
                                <div class="bdate-block">
                                    <select class="day" required>
                                        <option value=""></option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    <select class="month" required>
                                        <option value=""></option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                    <input type="text" name="name" required></input>
                                </div>
                            </div>


                        </div>
                    </div>

                </form>
                <button className="create-account-button"  href="/" onClick={props.setIsLoggedIn(true)}>Create Account</button>


                <p className="toggle-signin">Already have an Account? <span onClick={()=> props.signup(false)} className="signin-link">Log In</span></p>
            </div>
        </div>
    )


}