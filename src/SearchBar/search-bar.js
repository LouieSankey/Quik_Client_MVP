import React, { Component, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import './search-bar.css'

const heartpin = require('../Images/quik-logo-no-bottom.png')

export default function SearchBar(props) {

    const history = useHistory();
    const [location, setLocation] = useState([])
    const [displayDropdown, setDisplayDropdown] = useState(false)

    const handleSearchInput = event => {
        setLocation(event.target.value)
    };

    const changeLocation = () => {
        props.onLocationChange(location)
        history.push('/')
    };

    const handleEnterPressed = (event) => {
        if (event.key === 'Enter') {
            setLocation(event.target.value)
            changeLocation()

        }
    }

    const logout = () => {
        localStorage.setItem("quik_account_id", null)
        history.push('/')
    }


    return (
        <div className="navbar flex">
            <h1 className="logo-text header-column-1"><img className="logo-image" src={heartpin} alt=""></img> </h1>
            <input className="location-search header-column-2" onKeyPress={handleEnterPressed} onChange={handleSearchInput} type="text" placeholder="Town, city, location..."></input>
            <button type="submit" className="searchButton" onClick={changeLocation}>
                <i className="fa fa-search"></i>
            </button>
            <div className="header-column-3" >
                <div className="dropdown">
                    <button className="btn" >
                        <img className="burger" onClick={() => setDisplayDropdown(!displayDropdown)} src={require('../Images/hamburgerIcon.png')} alt="" />
                    </button>
                    {displayDropdown &&
                        <div className="dropdown-content">
                            <a onClick={logout} href="">Log Out</a>
                        </div>}
                </div>
            </div>
        </div>
    )
}
