import React, { Component, useState, useEffect, useRef } from 'react';
import { Route, Switch } from "react-router-dom";
import Geocode from "react-geocode";
import Pins from '../Pins/pins'
import Potentials from '../Potentials/potentials'
import Connects from '../Connects/connects'
import Profile from '../Profile/profile'
import SearchBar from '../SearchBar/search-bar'
import NavBar from '../NavBar/nav-bar'
import 'leaflet/dist/leaflet.css';
import './App.css';
import Landing from '../LandingPage/landing-page'
import APIService from '../api-services'
import DateFormat from 'dateformat'


const man1 = require('../Images/female_avatar.jpg')
const man2 = require('../Images/man-3.png')

const exampleMatches = [
  {
    id: 'example',
    name: "Lisa from Quik",
    age: "34",
    connectedStatus: 1,
    profileImage: man2
  }
]

export default function App(props) {

  const mapRef = useRef()

  Geocode.setApiKey("AIzaSyASSi9FH6fRM1t7traviF7fqokhJgmsbEY")
  Geocode.setLanguage("en");

  function onLocationChange(location) {
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setMapCenter([lat, lng])
      },
      error => {
        console.error(error);
      }
    );
  }

  const [pinnedLocationIds, setpinnedLocationIds] = useState(new Set([]));
  const [locationDateMap, setLocationDateMap] = useState(new Map())
  const [pinsRemaining, setPinsRemaining] = useState(5)
  const [mapCenter, setMapCenter] = React.useState([37.77400521704548, -122.43092782795432]);
  const [mapZoom, setMapZoom] = React.useState(13);
  const [matches, setMatches] = useState([])
  const [recentMatchId, setRecentMatchId] = useState(null)

  const id = localStorage.getItem('quik_account_id')

  const [isLoggedIn, setIsLoggedIn] = useState(Number(id) ? true : false)
  const [user, setUser] = useState({})

  useEffect(() => {

    if (isLoggedIn && user !== {}) {
      let user_id = user.id ? user.id : id

      console.log("logged in", isLoggedIn, user )
      APIService.getAccountById(
       user_id
      ).then(_user => {
      
        setUser(_user)
        getPins(_user)
      }).catch(err => {
        console.error("error", err)
        setIsLoggedIn(false)
      })
    }else{
      console.log("not logged in", isLoggedIn, user !== {})

    }
  }, [isLoggedIn]);


  const getPins = (_user) => {

    setMatches(exampleMatches)
    APIService.getPinsForUser(_user.id).then(pins => {

  

      if (pinsRemaining === pins.length) {

        pins.map(pin => {
          console.log("pindate", pin)


          pin.pin_date.setDate(pin.pin_date.getDate() + 1)

          const date = DateFormat(pin.pin_date, "mm-d-yyyy");
        
          setpinnedLocationIds(new Set(pinnedLocationIds.add(pin.location_id)))

          setLocationDateMap(new Map(locationDateMap.set(pin.location_id, date)))
        })
        getMatchesFromDB(_user)
        setPinsRemaining(0)

      }
      else {

        pins.map(pin => {
          pin.pin_date.setDate(pin.pin_date.getDate() + 1)

          const date = DateFormat(pin.pin_date, "mm-d-yyyy");
        
          

          pushPinnedLocation(pin.location_id, date, _user)
        })

        setPinsRemaining(pinsRemaining - pins.length)
      }
    })

  }

  const pushPinnedLocation = (location, date, _user) => {

    setLocationDateMap(new Map(locationDateMap.set(location, date)))
    setpinnedLocationIds(new Set(pinnedLocationIds.add(location)))


    if (pinsRemaining <= 1) {
      getMatchesFromDB(_user)
    }
  }



  const getMatchesFromDB = (_user) => {

    let locationDatesArray = Array.from(locationDateMap)
    locationDatesArray.map(obj => {
      let location = obj[0]
      let date = obj[1]
      let locationDate = date + "-" + location

      let params = {
        location_date_id: locationDate,
        user_id: _user.id,
        seeking: _user.seeking
      }


      APIService.getMatchesByLocationDateId(params).then(data => {

        const locationMatches = data.map((match, i) => {
          if (!match.profileImage) {
            match.profileImage = man1
          } else {
            match.profileImage = man2
          }

          if (match.likes_recieved && match.likes_sent
            && match.likes_recieved.includes(_user.id + "")
            && match.likes_sent.includes(_user.id + "")) {

            match.connectedStatus = 3

          } else if (match.likes_recieved && match.likes_recieved.includes(_user.id + "")) {
            match.connectedStatus = 2
          } else if (match.likes_sent && match.likes_sent.includes(_user.id + "")) {
            match.connectedStatus = 1
          } else {
            match.connectedStatus = 0
          }

          match.name = match.user_name
          match.location_date_id = params.location_date_id
          return match
        })

        setMatches(matches => [...matches, ...locationMatches]);

      })

    })

  }

  const changeStatus = (potentialMatch, props) => {
    let newStatus;

    const params = {
      location_date_id: potentialMatch.location_date_id,
      own_id: user.id,
      others_id: potentialMatch.user_id
    }

    if (potentialMatch.connectedStatus === 0) {
      newStatus = 2
      APIService.sendLike(params)
    }

    else if (potentialMatch.connectedStatus === 1) {
      newStatus = 3
      APIService.sendLike(params)
    }

    let id;

    setMatches([...matches].map((match) => {
      if (match.id === potentialMatch.id) {
        if (newStatus === 3) {
          id = match.id
        }
        return {
          ...match,
          connectedStatus: newStatus
        }

      }
      else return match;
    }))

    if (newStatus === 3) {
      setRecentMatchId(id)
    }
  }


  return (
    <>
      {isLoggedIn ?
        <>
          <SearchBar onLocationChange={onLocationChange}></SearchBar>
          <NavBar></NavBar>

          <Switch>
            <Route exact path="/">
              <Pins
                mapRef={mapRef}
                user={user}
                pinnedLocationIds={pinnedLocationIds}
                pinsRemaining={pinsRemaining}
                pushPinnedLocation={pushPinnedLocation}
                locationDateMap={locationDateMap}
                usePin={setPinsRemaining}
                mapCenter={mapCenter}
                setMapCenter={setMapCenter}
                matches={matches}
                setMapZoom={setMapZoom}
                mapZoom={mapZoom}
                changeStatus={changeStatus}
              />
            </Route>


            <Route path="/potentials">

              {/* IMPORTANT!!
            the props for 'Potentials' must also pass 
            through 'potentials in the 'Pins' component! */}
              <Potentials
                pinsRemaining={pinsRemaining}
                matches={matches}
                changeStatus={changeStatus} />
            </Route>

            <Route path="/connects">
              <Connects matches={matches} recentMatchId={recentMatchId} user={user} />
            </Route>
            <Route path="/profile" >
              <Profile user={user}></Profile>
            </Route>
          </Switch>
        </>
        :
        <Route exact path="/">
          <Landing setUser={setUser} setIsLoggedIn={setIsLoggedIn} ></Landing>
        </Route>
      }
    </>
  );
}




