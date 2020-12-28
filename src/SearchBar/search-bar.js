import React, { Component, useState,  } from 'react';
import { useHistory } from 'react-router-dom';
import './search-bar.css'



const heartpin = require('../Images/heartpin.png')
const bars = require('../Images/bars.png')

export default function SearchBar(props) {
    const history = useHistory();
    const [location, setLocation] = useState([])
    const handleInput = event => {
        setLocation(event.target.value)
    };

    const changeLocation = () => {
        props.onLocationChange(location)
        history.push('/quik')
      };

      const handleEnterPressed = (event) => {
        if (event.key === 'Enter') {
            setLocation(event.target.value)
            changeLocation()
          
          }
      }



    return (
        <div className="navbar flex">

            <h1 className="logo-text header-column-1"><img className="logo-image" src={heartpin} alt=""></img><span className="logo-main-text">uik</span> </h1>
            <input className="location-search header-column-2" onKeyPress={handleEnterPressed} onChange={handleInput} type="text" placeholder="Town, city, location..."></input>
            <button type="submit" className="searchButton" onClick={changeLocation}>
                <i className="fa fa-search"></i>
            </button>
         
            <div className="header-column-3" >
                <h3 className="my-quik logo-text"> My Quik </h3>
            </div>

        </div>
    )
}
