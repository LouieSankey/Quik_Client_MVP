import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import './modal.css'

let HeartPin = L.icon({
  iconUrl: require('./Images/heartpin4.png'),
  iconSize: [24, 24],
});



export default function Modal(props) {
  const [value, onChange] = React.useState(new Date());

  const onClick = () => {
    if(props.pinsRemaining > 0){
      props.pushPinnedLocation(props.activeLocation.id); 
      props.usePin(); 
      props.closeModal()
    } 

  }

  const disabled = false;

  console.log("stat" + JSON.stringify(props.activeLocation))

  return (
    <div>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      <h2 className="date-address">{props.activeLocation.categories[0].name
       + (props.activeLocation.location.address ? " - " + props.activeLocation.location.address : "")}</h2>
     
        <div class="stars">
          <h2 className="stars-label">Trending:</h2>
          <form className="trending-stars-form" action="">
            <input class="star star-1" id="star-1" type="radio" checked={props.activeLocation.trendingScore === 1}  name="star"/>
            <label class="star star-1" for="star-1"></label>
            <input class="star star-2" id="star-2" type="radio" checked={props.activeLocation.trendingScore === 2}  name="star"/>
            <label class="star star-2" for="star-2"></label>
            <input class="star star-3" id="star-3" type="radio" checked={props.activeLocation.trendingScore === 3} name="star"/>
            <label class="star star-3" for="star-3"></label>
            <input class="star star-4" id="star-4" type="radio" checked={props.activeLocation.trendingScore === 4}  name="star"/>
            <label class="star star-4" for="star-4"></label>
            <input class="star star-5" id="star-5" type="radio" checked={props.activeLocation.trendingScore === 5}  name="star"/>
            <label class="star star-5" for="star-6"></label>
          </form>
        </div>

      <label htmlFor="date">Pin as potential date location on:</label>

      <DatePicker
        onChange={onChange}
        value={value}
      />
      <br></br>
    
{props.pinsRemaining > 0 
? <><button onClick={ () => {onClick()}} id="pinButton">PIN</button> 
<p className="report-location">Bad Location?</p>
<img className="red-flag" src={require('./Images/redflag.png')} alt=""/></>
: <p className="no-pins-view">No Pins remaining. You'll have to wait for one of your pins to expire!</p>}
      

    </div>
  )

}