import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';


export default function ModalSet(props) {
  return (
    <div>
         <h2 className="date-location">Congrats!!</h2>
         <p>You've created a potential date at:</p>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      on Saturday 12/22/2020!
      <p>Make sure to set any remaining pins to start viewing potential matches!</p>
    </div>
  )

}