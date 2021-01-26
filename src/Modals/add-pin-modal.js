import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import './add-pin-modal.css'
import APIService from '../api-services'
import DateFormat from 'dateformat'


export default function AddPinModal(props) {

  const [dateValue, onChange] = React.useState(new Date());

  const createNewPin = () => {

    if (props.pinsRemaining > 0) {
      const date = DateFormat(dateValue, "mm-d-yyyy");
      props.pushPinnedLocation(props.activeLocation.id, date, props.user);

      const pin = {
        location_date_id: date + "-" + props.activeLocation.id,
        pin_date: dateValue,
        location_id: props.activeLocation.id,
        user_id: props.user.id,
        seeking: "",
        user_name: props.user.username,
        age: "",
        bio: "",
        photo_url: "",
        likes_recieved: {},
        likes_sent: {},
        date_request_recieved: {},
        date_request_sent: {},
        date_location: props.activeLocation.name,
        date_location_category: props.activeLocation.categories[0].name

      }
      props.usePin(props.pinsRemaining - 1)

      APIService.pushPin(pin)
      props.closeModal()
    }

  }

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 7)

  const disabled = false;


  return (
    <div>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      <h2 className="date-address">{props.activeLocation.categories[0].name
        + (props.activeLocation.location.address ? " - " + props.activeLocation.location.address : "")}</h2>
      <div className="stars">
        <h2 className="stars-label">Trending:</h2>
        <form className="trending-stars-form" action="">
          <input className="star star-1" id="star-1" type="radio" defaultChecked={props.activeLocation.trendingScore === 1} name="star" />
          <label className="star star-1" htmlFor="star-1"></label>
          <input className="star star-2" id="star-2" type="radio" defaultChecked={props.activeLocation.trendingScore === 2} name="star" />
          <label className="star star-2" htmlFor="star-2"></label>
          <input className="star star-3" id="star-3" type="radio" defaultChecked={props.activeLocation.trendingScore === 3} name="star" />
          <label className="star star-3" htmlFor="star-3"></label>
          <input className="star star-4" id="star-4" type="radio" defaultChecked={props.activeLocation.trendingScore === 4} name="star" />
          <label className="star star-4" htmlFor="star-4"></label>
          <input className="star star-5" id="star-5" type="radio" defaultChecked={props.activeLocation.trendingScore === 5} name="star" />
          <label className="star star-5" htmlFor="star-6"></label>
        </form>
      </div>

      <label htmlFor="date">Pin as potential date location on:</label>

      <DatePicker
        onChange={onChange}
        value={dateValue}
        minDate={minDate}
        maxDate={maxDate}
      />
      <br></br>

      {props.pinsRemaining > 0
        ? <><button onClick={() => { createNewPin() }} id="pinButton">PIN</button>
          <p className="report-location">Flag Location</p>
          <img className="red-flag" src={require('../Images/redflag.png')} alt="" /></>
        : <p className="no-pins-view">No Pins remaining. You'll have to wait for one of your pins to expire!</p>}
    </div>
  )

}

AddPinModal.defaultProps = {
  activeLocation: {
    name: "",
    location: {address: ""},
    categories: [
      {name: ""},
      {address: ""}
    ]
  }
}