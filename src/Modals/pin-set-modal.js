import React, { Component, useState, useEffect } from 'react';

export default function PinSetModal(props) {

  const [date, setDate] = useState("")

  useEffect(() => {
    for (const [key, value] of props.locationDateMap) {
      if (key === props.activeLocation.id && date !== value) {
        const dateString = value + ""
        setDate(dateString.substr(0, 15))
      }
    }
  }, []);

  return (
    <div>
      <p className="created-date-header">Congrats! You're potential date is set for: </p>
      <h2 className="date-location">{props.activeLocation.name}</h2>
      on {date}!

      <p>You can use this pin again once it expires!</p>
      <p>Make sure to set any remaining pins to view your potential matches!</p>
    </div>
  )

}