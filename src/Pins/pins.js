import React, {  useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import AddPinModal from '../Modals/add-pin-modal'
import PinSetModal from '../Modals/pin-set-modal'
import Potentials from '../Potentials/potentials'
import '../App/App.css'
import './pins.css'
import MapPinBox from './pin-box'
import ShowPotentialsModal from '../Modals/mobile-view-potentials-modal'

const HeartLocationImg = require('../Images/heartpin4.png')


let FroYo = L.icon({
  iconUrl: require('../Images/froyopink.png'),
  iconSize: [22, 30],
});

let BeachBar = L.icon({
  iconUrl: require('../Images/cocktail.png'),
  iconSize: [40, 40],
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

let HeartLocationPin = L.icon({
  iconUrl: HeartLocationImg,
  iconSize: [36, 48],

});

let Invisible = L.icon({
  iconUrl: require('../Images/emptyicon.png'),
  iconSize: [0, 0],
});

const categories = {
  "Mini Golf": "52e81612bcbc57f1066b79eb,",
  "Aquarium": "4fceea171983d5d06c3e9823,",
  "Roller Rink": "52e81612bcbc57f1066b79e9,",
  "Beach Bar": "52e81612bcbc57f1066b7a0d,",
  "Hookah Bar": "4bf58dd8d48988d119941735,",
  "Frozen Yogurt Shop": "512e7cae91d4cbb4e5efe0af",
}

const categoryIcon = {
  "Mini Golf": MiniGolf,
  "Aquarium": Aquarium,
  "Science Museum": Invisible,
  "Frozen Yogurt Shop": FroYo,
  "Roller Rink": Skate,
  "Beach Bar": BeachBar,
  "Smoothie Shop": JuiceIcon,
}

let venueCategories = ""
for (const key in categories) {
  venueCategories += categories[key]
}

function Pins(props) {

  const [activeLocation, setActiveLocation] = React.useState(null);
  const [venues, setVenues] = React.useState([]);
  const [showPotentialsModal, setshowPotentialsModal] = useState(true)

  const popup = React.createRef();
  const closePopupOnClick = () => {
    onViewportChanged()
    popup.current.leafletElement.options.leaflet.map.closePopup();
  }

  const uniqueVenues = (array, propertyName) => {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  const onViewportChanged = (viewport) => {

    let center = (typeof viewport === 'undefined') ? props.mapCenter : viewport.center

    Promise.all([
      "https://api.foursquare.com/v2/venues/search?client_id=UVAGMVPM2CSP02QGCJDM0TW10PMMDO2AJQYEKTH3ON0AB020&client_secret=ZR4PVACGO4QU2WTXE3QW04D0ZIMKA3CILMWWSIX2LWGNK4KB&v=20200101&near=" + center + "&intent=browse&radius=5000&categoryId=52f2ab2ebcbc57f1066b8b41&limit=50",
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
        const allVenues = uniqueVenues(addedVenues, "id")
        const trendingScoreVenues = allVenues.map(venue => {

          let icon = props.pinnedLocationIds.has(venue.id) ?
            HeartLocationPin :
            (!categoryIcon[venue.categories[0].name]
              ? Invisible
              : categoryIcon[venue.categories[0].name])

          return {
            ...venue,
            icon: icon,
            trendingScore: Math.floor(Math.random() * 5) + 1
          }
        })

        setVenues(trendingScoreVenues)
      }).catch(console.error.bind(console));

  };

  useEffect(() => {
    if(props.pinsRemaining === 0) {
      onViewportChanged();
    }
   
  }, props.pinsRemaining)

  useEffect(() => {
    onViewportChanged();
  }, []);

  useEffect(() => {
    onViewportChanged();
  }, [props.mapCenter]);


  const pushPotentials = () => {
    props.history.push('/potentials')
  }

  return (<>

    <div className="row">
      <div className="column-1">
        <Map
          ref={props.mapRef}
          preferCanvas={true}
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
              key={location.id}
              icon={location.icon}
              zIndexOffset={props.pinnedLocationIds.has(location.id) ? 100 : 0}
              position={[location.location.lat, location.location.lng]}
              onClick={() => {
                setActiveLocation(location);
              }}>
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
              <AddPinModal activeLocation={activeLocation}
                pushPinnedLocation={props.pushPinnedLocation}
                closeModal={closePopupOnClick}
                usePin={props.usePin}
                pinsRemaining={props.pinsRemaining}
                user={props.user}
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
              <PinSetModal activeLocation={activeLocation} locationDateMap={props.locationDateMap}/>
            </Popup>
          )}

          <MapPinBox
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

Pins.defaultProps = {
  matches: []
}

export default withRouter(Pins)




