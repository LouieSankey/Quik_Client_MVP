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
     <p className="created-date-header">Congrats!</p>

         <p className="created-date-header">You've created a potential date for:</p>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      on {date}!

      <p>You can use this pin again once it expires!</p>
      <p>Make sure to set any remaining pins to view your potential matches!</p>
    </div>
  )

}