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
import ApiService from '../api-services'


// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();
const man1 = require('../Images/man-1.png')
const man2 = require('../Images/man-2.png')
const man3 = require('../Images/man-3.png')
const man4 = require('../Images/man-4.png')

//connection status codes
// 'like' button = status code 0
// ' your sent a like' = status code 1
// connect button = status code 2
// shows up in 'connects' status code 3

const exampleMatches = [
  {
    id: 1,
    name: "Lisa",
    age: "44",
    connectedStatus: 0,
    profileImage: man1
  },
  {
    id: 2,
    name: "Anna",
    age: "32",
    connectedStatus: 1,
    profileImage: man2
  },
  {
    id: 3,
    name: "Jill",
    age: "24",
    connectedStatus: 1,
    profileImage: man3
  },
  {
    id: 4,
    name: "Lynn",
    age: "22",
    connectedStatus: 1,
    profileImage: man4
  },
  // {
  //   id: 5,
  //   name: "Ron",
  //   age: "34",
  //   connectedStatus: 1,
  //   profileImage: man2
  // },
  // {
  //   id: 6,
  //   name: "Dan",
  //   age: "38",
  //   connectedStatus: 1,
  //   profileImage: man3
  // },
]




export default function App(props) {

  const mapRef = useRef()

  Geocode.setApiKey( "AIzaSyASSi9FH6fRM1t7traviF7fqokhJgmsbEY")
  Geocode.setLanguage("en");

  function onLocationChange(location){
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setMapCenter([lat,lng])
        //call viewportchanged
      },
      error => {
        console.error(error);
      }
    );
  }


  const [pinnedLocationIds, setpinnedLocationIds] = useState(new Set([]));
  const [pinsRemaining, setPinsRemaining] = useState(2)
  const [mapCenter, setMapCenter] = React.useState([37.77400521704548, -122.43092782795432]);
  const [mapZoom, setMapZoom] = React.useState(13);
  const [matches, setMatches] = useState(exampleMatches)
  const [recentMatchId, setRecentMatchId] = useState(null)

  const usePin = () => {
    setPinsRemaining(pinsRemaining - 1)
  }

  const pushPinnedLocation = (location) => {
    setpinnedLocationIds(new Set(pinnedLocationIds.add(location)))
  }

  const changeStatus = (potentialMatch, props) => {
    let newStatus;
    if(potentialMatch.connectedStatus === 0){
        newStatus = 2
    }else{
        newStatus = 3
    }

    let id;

    setMatches([...matches].map((match) => {
      if(match.id === potentialMatch.id) {
        if(newStatus === 3){
          id = match.id
        }
        return {
          ...match,
          connectedStatus: newStatus
        }

      }
      else return match;
    }))

    if(newStatus === 3){
      setRecentMatchId(id)
      props.history.push('/connects')
   
    }
  }

  const id = localStorage.getItem('quik_account_id')

  const [isLoggedIn, setIsLoggedIn] = useState(Number(id)  ? true : false)
   const [user, setUser] = useState({})

  useEffect(() => {
    console.log("use effect", isLoggedIn, user,  Number(id))

    if(isLoggedIn && user !== {}){
   
      ApiService.getAccountById(
        Number(id)
      ).then(user => {
      setUser(user)
    }).catch(err => {

        console.log("error", err)
    })

    }


  }, []);



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
            pinnedLocationIds={pinnedLocationIds}
            pinsRemaining={pinsRemaining} 
            pushPinnedLocation={pushPinnedLocation} 
            usePin={usePin} 
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            matches={matches}
            setMapZoom={setMapZoom}
            mapZoom={mapZoom}
            changeStatus={changeStatus}
            />
          </Route>

         
          <Route path="/potentials">

            {/* dont forget, 
            the props for 'Potentials' must also pass 
            through 'potentials in the 'Pins' component! */}

            <Potentials
            pinsRemaining={pinsRemaining}  
            matches={matches}
            changeStatus={changeStatus}/>
            
          </Route>

          <Route path="/connects">
            <Connects matches={matches} recentMatchId={recentMatchId}/>
          </Route>
          <Route path="/profile" component={ Profile }/>
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




