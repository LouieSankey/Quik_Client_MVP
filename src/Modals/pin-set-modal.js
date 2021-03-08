import React, { Component, useState, useEffect } from 'react';
import Countdown from 'react-countdown'

export default function PinSetModal(props) {

  const [dateStr, setDateStr] = useState("")
  const [date, setDate] = useState()

  useEffect(() => {
    for (const [key, value] of props.locationDateMap) {
      if (key === props.activeLocation.id && dateStr !== value) {
        const dateString = value + ""
        var result = new Date(value);
        setDate(result.setDate(result.getDate() + 1))
        setDateStr(dateString.substr(0, 15))
      }
    }
  }, []);

  return (
    <div>
      <p className="created-date-header">Congrats! Your potential date is set for: </p>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      on {dateStr}!

      <p>You can use this pin again when it expires in: </p>
      {date && 

      <Countdown className={"red_font"} zeroPadDays={1} date={date} />
      }

      <p>Make sure to set any remaining pins to view your potential matches!</p>
    </div>
  )

}

PinSetModal.defaultProps = {
  activeLocation: {
    name: ""
  },
  locationDateMap: []
}