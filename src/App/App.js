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
import Landing from '../landingPage'
import APIService from '../api-services'
import DateFormat from 'dateformat'



// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();
// const man1 = require('../Images/man-1.png')
// const man2 = require('../Images/man-2.png')
// const man3 = require('../Images/man-3.png')
// const man4 = require('../Images/man-4.png')

const man1 = require('../Images/blank-woman.jpeg')

//connection status codes
// 'like' button = status code 0
// ' your sent a like' = status code 1
// connect button = status code 2
// shows up in 'connects' status code 3

// const exampleMatches = [
//   {
//     id: 1,
//     name: "Lisa",
//     age: "44",
//     connectedStatus: 0,
//     profileImage: man1
//   },
//   {
//     id: 2,
//     name: "Anna",
//     age: "32",
//     connectedStatus: 1,
//     profileImage: man2
//   },
//   {
//     id: 3,
//     name: "Jill",
//     age: "24",
//     connectedStatus: 1,
//     profileImage: man3
//   },
//   {
//     id: 4,
//     name: "Lynn",
//     age: "22",
//     connectedStatus: 1,
//     profileImage: man4
//   }

// ]




export default function App(props) {

  const mapRef = useRef()

  Geocode.setApiKey("AIzaSyASSi9FH6fRM1t7traviF7fqokhJgmsbEY")
  Geocode.setLanguage("en");

  function onLocationChange(location) {
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setMapCenter([lat, lng])
        //call viewportchanged
      },
      error => {
        console.error(error);
      }
    );
  }

  const [pinnedLocationIds, setpinnedLocationIds] = useState(new Set([]));
  const [locationDateMap, setLocationDateMap] = useState(new Map())
  const [pinsRemaining, setPinsRemaining] = useState(3)

  const [mapCenter, setMapCenter] = React.useState([37.77400521704548, -122.43092782795432]);
  const [mapZoom, setMapZoom] = React.useState(13);
  const [matches, setMatches] = useState([])
  const [recentMatchId, setRecentMatchId] = useState(null)

  const id = localStorage.getItem('quik_account_id')
  const [isLoggedIn, setIsLoggedIn] = useState(Number(id) ? true : false)
  const [user, setUser] = useState({})



  useEffect(() => {

    if (isLoggedIn && user !== {}) {

      APIService.getAccountById(
        Number(id)
      ).then(_user => {
        setUser(_user)
        // getConnections(_user)
        getPins(_user)
      }).catch(err => {
        console.log("error", err)
      })

    }
  }, []);


  // const getConnections = (_user) => {
  //   const params = {'user_id': _user.id}
  //   APIService.getConnections(params).then(connects => {
  //     return connects.map(connect => {
  //       connect.profileImage = man1
  //       connect.connectedStatus = 3
  //       connect.name = connect.user_name
  //       return connect
  //     })
  //   }).then((dbConnects) => {
  //     console.log(dbConnects)
  //       setMatches(dbConnects);
  //   })
  // }

  const getPins = (_user) => {
    APIService.getPinsForUser(_user.id).then(pins => {

      if (pinsRemaining === pins.length) {
        setPinsRemaining(0)
        pins.map(pin => {
          const date = DateFormat(pin.pinDate, "mm-d-yyyy");
          setpinnedLocationIds(new Set(pinnedLocationIds.add(pin.location_id)))
          setLocationDateMap(new Map(locationDateMap.set(pin.location_id, date)))
        })
        getMatchesFromDB(_user)

      } 
      else {
     //here first with no pins so what happens??
     
        pins.map(pin => {
          const date = DateFormat(pin.pinDate, "mm-d-yyyy");
          pushPinnedLocation(pin.location_id, date, _user)
        })
      }
    })

  }

  const pushPinnedLocation = (location, date, _user) => {
    console.log('hello')
    //with location date map, I maybe can eliminate pinned locations ids variable
    setpinnedLocationIds(new Set(pinnedLocationIds.add(location)))
    setLocationDateMap(new Map(locationDateMap.set(location, date)))

    setPinsRemaining((prevState) => prevState - 1)

    if (pinsRemaining === 1 || pinsRemaining === 0) {

      getMatchesFromDB(_user)
      
    }

  }



  const getMatchesFromDB = (_user) => {
    let locationDatesArray = Array.from(locationDateMap)
    locationDatesArray.map(obj => {

      let location = obj[0]
      let date = obj[1]
      let locationDate = date + "-" + location

      // let dbMatches;

      let params = {
        location_date_id: locationDate,
        user_id: _user.id,
        seeking: _user.seeking
      }
      APIService.getMatchesByLocationDateId(params).then(data => {

        return data.map((match, i) => {
          match.profileImage = man1

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


      }).then((dbMatches) => {

        const handler = () => {
          setMatches(matches => {return [...matches, ...dbMatches]});
        }
        handler()
     
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

    //changes the 'like' button to a sent like 
    if (potentialMatch.connectedStatus === 0) {
      newStatus = 2
      APIService.sendLike(params)
    }
    //changes the 'connect' button to connected status 
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
      // props.history.push('/connects')

    }
  }


  return (
    <>
      {isLoggedIn ?
        <>
          <SearchBar onLocationChange={onLocationChange}></SearchBar>
          <NavBar></NavBar>

          <Switch>
            <Route exact path="/quik">
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
            <Route path="/profile" component={Profile} />
          </Switch>
        </>
        :
        <Route exact path="/quik">
          <Landing setUser={setUser} setIsLoggedIn={setIsLoggedIn} ></Landing>
        </Route>
      }
    </>
  );
}




