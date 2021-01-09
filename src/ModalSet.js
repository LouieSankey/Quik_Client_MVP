import React, { Component, useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';


export default function ModalSet(props) {


  const [date, setDate] = useState("")
    

  useEffect(() => {
    for (const [key, value] of  props.locationDateMap) {
      if(key === props.activeLocation.id && date !== value){
        const dateString = value + ""
        setDate(dateString.substr(0, 15))
      }
    }
  }, []);






  return (
    <div>
         <h2 className="date-location">Congrats!!</h2>
         <p>You've created a potential date at:</p>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      on {date}!
      <p>Make sure to set any remaining pins to start viewing potential matches!</p>
    </div>
  )

}