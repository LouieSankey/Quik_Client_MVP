import React, { Component, useState, useEffect, useRef, useReducer} from 'react';
// import { Link} from "react-router-dom";
import { withRouter } from "react-router-dom";

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Modal from '../Modal'
import ModalSet from '../ModalSet'
import Potentials from '../Potentials/potentials'
import '../App/App.css'
import './pins.css'
import PinBox from '../PinBox'
import ShowPotentialsModal from '../view-potentials-modal'



const HeartLocationImg = require('../Images/heartpin4.png')

let Zoo = L.icon({
  iconUrl: require('../Images/giraffe.png'),
  iconSize: [44, 44],
});

let FroYo = L.icon({
  iconUrl: require('../Images/froyopink.png'),
  iconSize: [22, 30],
});

let Volleyball = L.icon({
  iconUrl: require('../Images/volleyball.png'),
  iconSize: [42, 42],
});

let Winery = L.icon({
  iconUrl: require('../Images/winbar.png'),
  iconSize: [42, 42],
});

let Pool = L.icon({
  iconUrl: require('../Images/billiard.png'),
  iconSize: [42, 42],
});

let Garden = L.icon({
  iconUrl: require('../Images/flower.png'),
  iconSize: [36, 36],
});

let Beach = L.icon({
  iconUrl: require('../Images/beach.png'),
  iconSize: [42, 42],
});

let BeachBar = L.icon({
  iconUrl: require('../Images/cocktail.png'),
  iconSize: [40, 40],
});



let ThemePark = L.icon({
  iconUrl: require('../Images/theme park.png'),
  iconSize: [42, 42],
});

let Surfing = L.icon({
  iconUrl: require('../Images/surfing.png'),
  iconSize: [42, 42],
});



let MusicIcon = L.icon({
  iconUrl: require('../Images/music icon.png'),
  iconSize: [18, 18],
});

let CoffeeIcon = L.icon({
  iconUrl: require('../Images/coffee.png'),
  iconSize: [42, 42],
});

let JuiceIcon = L.icon({
  iconUrl: require('../Images/blender.png'),
  iconSize: [34, 34],
});

let Skate = L.icon({
  iconUrl: require('../Images/rollerskate.png'),
  iconSize: [30, 30],
});



let MiniGolf = L.icon({
  iconUrl: require('../Images/mini-golf.png'),
  iconSize: [36, 36],
});


let Aquarium = L.icon({
  iconUrl: require('../Images/fish.png'),
  iconSize: [42, 42],
});

let ScienceMuseum = L.icon({
  iconUrl: require('../Images/science-museum.png'),
  iconSize: [42, 42],
});

let Park = L.icon({
  iconUrl: require('../Images/park.png'),
  iconSize: [42, 42],
});

let HeartLocationPin = L.icon({
  iconUrl: HeartLocationImg,
  iconSize: [36, 48],

});

let Invisible = L.icon({
  iconUrl: require('../Images/emptyicon.png'),
  iconSize: [0, 0],
});



const fetcher = (...args) => fetch(...args).then(res => res.json())

const categories = {
  "Mini Golf": "52e81612bcbc57f1066b79eb,",
  "Aquarium": "4fceea171983d5d06c3e9823,",
  "Roller Rink": "52e81612bcbc57f1066b79e9,",
  "Zoo": "4bf58dd8d48988d17b941735,",
  "Beach Bar": "52e81612bcbc57f1066b7a0d,",
  // "Botanical Garden": "52e81612bcbc57f1066b7a22,",
  "Hookah Bar": "4bf58dd8d48988d119941735,",
  // "Ice Cream Shop": "4bf58dd8d48988d1c9941735",
  // "Volleyball Court": "4eb1bf013b7b6f98df247e07,",
  // "Pool Hall": "4bf58dd8d48988d1e3931735,",
  // "Café": "4bf58dd8d48988d16d941735"
  // "National Park": "52e81612bcbc57f1066b7a21"
  //  "Smoothie Shop" : "52f2ab2ebcbc57f1066b8b41"
  "Frozen Yogurt Shop": "512e7cae91d4cbb4e5efe0af",
  // "Winery" : "4bf58dd8d48988d14b941735"
  // "Observatory": "5744ccdfe4b0c0459246b4d9"
  
}

const categoryIcon = {
  "Mini Golf": MiniGolf,
  "Aquarium": Aquarium,
  "Science Museum": Invisible,
  "Zoo": Zoo,
  "Frozen Yogurt Shop": FroYo,
  // "Observatory": Winery,
  // "Observatory": Pool,
  "Billiards Hall": Pool,
  "Volleyball Court": Volleyball,
  "Botanical Garden": Garden,
  "Roller Rink": Skate,
  "Beach Bar": BeachBar,
  "Surf Spot": Surfing,
  "Smoothie Shop": JuiceIcon,
  "National Park": Park
}

let venueCategories = ""
for (const key in categories) {
  venueCategories += categories[key]
}

function Pins(props) {

  const [activeLocation, setActiveLocation] = React.useState(null);

  function unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  const popup = React.createRef();
  const closePopupOnClick = () => {
    popup.current.leafletElement.options.leaflet.map.closePopup();
  }

  const [venues, setVenues] = React.useState([]);

  const [showPotentialsModal, setshowPotentialsModal] = useState(true)
  // setshowPotentialsModal(props.pinsRemaining === 0)

  const onViewportChanged = (viewport) => {

    let center = (typeof viewport === 'undefined') ? props.mapCenter : viewport.center
    let zoom = (typeof viewport === 'undefined') ? props.zoom : viewport.zoom 
    // typeof viewport !== 'undefined' && props.setMapZoom(zoom)
    // typeof viewport !== 'undefined' && props.setMapCenter(center)
    

    Promise.all([
      "https://api.foursquare.com/v2/venues/search?client_id=UVAGMVPM2CSP02QGCJDM0TW10PMMDO2AJQYEKTH3ON0AB020&client_secret=ZR4PVACGO4QU2WTXE3QW04D0ZIMKA3CILMWWSIX2LWGNK4KB&v=20200101&near=" + center + "&intent=browse&radius=5000&categoryId=" + "52f2ab2ebcbc57f1066b8b41" + "&limit=50",
      "https://api.foursquare.com/v2/venues/search?client_id=UVAGMVPM2CSP02QGCJDM0TW10PMMDO2AJQYEKTH3ON0AB020&client_secret=ZR4PVACGO4QU2WTXE3QW04D0ZIMKA3CILMWWSIX2LWGNK4KB&v=20200101&near=" + center + "&intent=browse&radius=5000&categoryId=" + venueCategories + "&limit=50",

    ].map((request) => {
      return fetch(request).then((response) => {
        return response.json();
      }).then((data) => {
        return data;
      });
    }))
      .then((values) => {

        const coffee = [...values[0].response.venues].filter(venue => {
          return venue.name !== "Starbucks" && venue.name !== "Peet's Coffee & Tea"
        })

        const addedVenues = [...coffee, ...values[1].response.venues, ...venues]
        
        const allVenues = unique(addedVenues, "id")

        const trendingScoreVenues = allVenues.map(venue => {
          return {
            ...venue,
            trendingScore: Math.floor(Math.random() * 5) + 1  
          }

        })


          setVenues(trendingScoreVenues)

        

      }).catch(console.error.bind(console));

  };

    useEffect(() => {
      onViewportChanged();
    }, []);

    useEffect(() => {
      onViewportChanged();
    }, [props.mapCenter]);




// useEffect(() => {
//   const timer = setTimeout(() => {
//     console.log('This will run after 1 second!')
//   }, 1000);
//   return () => clearTimeout(timer);
// }, []);

const pushPotentials = () => {
  console.log('pushed')
  props.history.push('/potentials')
}


  return (<>

    <div className="row">
      <div className="column-1">
        <Map
        ref={props.mapRef}
        
          onViewportChanged={onViewportChanged}
          center={props.mapCenter}
          className="map"
          zoom={props.mapZoom}
          scrollWheelZoom={false}>

          <TileLayer
            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/hoopstagee/cki0zr4yd3h4a19p55hvuetli/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9vcHN0YWdlZSIsImEiOiJja2ZkYTE0ZWwwNGEzMnpudjI4NjVpMjNrIn0.1FXjmyRxVcUtrX4adGXUJQ"
          />

          {venues.map((location, i) => (
            <Marker
            key={i}
              icon={
                props.pinnedLocationIds.has(location.id) ?
                  HeartLocationPin :
                  (! categoryIcon[location.categories[0].name]
                    ? Invisible
                    : categoryIcon[location.categories[0].name] )
              }
              zIndexOffset={props.pinnedLocationIds.has(location.id) ? 100 : 0}
              position={[location.location.lat, location.location.lng]}
              onClick={() => {
                setActiveLocation(location);
              }}
            >
               <Tooltip direction="top" offset={[10, 0]}>
       {<>
        <p>{location.name}</p>
         <p>{location.categories[0].name}</p>
         </>}
     </Tooltip>
            </Marker>
          ))}

          {activeLocation && (!props.pinnedLocationIds.has(activeLocation.id) ? (
            <Popup
              ref={popup}
              position={[activeLocation.location.lat, activeLocation.location.lng]}
              onClose={() => {
                setActiveLocation(null);
              }}
            >
              <Modal activeLocation={activeLocation}
                pushPinnedLocation={props.pushPinnedLocation}
                closeModal={closePopupOnClick}
                usePin={props.usePin}
                pinsRemaining={props.pinsRemaining}
              />

            </Popup>

          ) :
            <Popup
              ref={popup}
              position={[activeLocation.location.lat, activeLocation.location.lng]}           
              onClose={() => {
                setActiveLocation(null);
              }}
            >
              <ModalSet activeLocation={activeLocation}
              />

            </Popup>
          )}

      <PinBox
        pinsRemaining={props.pinsRemaining}
      />
{props.pinsRemaining === 0 && showPotentialsModal &&
      <ShowPotentialsModal pushPotentials={pushPotentials} showPotentialsModal={showPotentialsModal} handleClose={() => setshowPotentialsModal(false)}></ShowPotentialsModal>
}
        </Map>


      </div>
      <div className="column-2">
        <Potentials 
         pinsRemaining={props.pinsRemaining}  
        matches={props.matches} 
        changeStatus={props.changeStatus}></Potentials>
      </div>
    </div>

  </>
  );
}

export default withRouter(Pins)




