import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    // const [coordinates, setCoords] = useState({ lat: 24.903016, lng: 67.1140284 })
    const [latitude, setLatitude] = useState(24.902752)
    const [longitude, setLongitude] = useState(67.1124084)
    const [isMarkerShown, setMarkerShown] = useState(true)
    const [places, setPlaces] = useState([])


    const setCoordinates = (event) => {
        setLatitude(event.latLng.lat)
        setLongitude(event.latLng.lng)
    
    
        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=W5MHMIFLJDFRLR3SGQT0LZAB0WZL2VV1PYARY3VTHUJ5RSMX&client_secret=MUVNGVFDA4GRU2QEAVBAUSWCFDXFHGZXYHXCRH3ZY2LN5FPN
            &v=20180323&ll=${latitude},${longitude}`)
          .then(res => res.json())
          // .then(res => console.log("response from API", res.response.groups[0].items.map((item, ind) =>
          .then(res => setPlaces(res.response.groups[0].items)
          )
      }
    

    // const setMarker = (event) => {
    //     setMarkerShown(false)
    //     setCoords({
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng()
    //     })
    //     setTimeout(() => {
    //         console.log('marker***')
    //         setMarkerShown(true)
    //     }, 2000)
    // }

    // console.log("cords****************", coordinates)

    // const lattitue = coordinates.laty

    // const longitude = coordinates.lng
    // const coords = lattitue + ',' + longitude

    // fetch(`https://api.foursquare.com/v2/venues/search?client_id=W5MHMIFLJDFRLR3SGQT0LZAB0WZL2VV1PYARY3VTHUJ5RSMX&client_secret=MUVNGVFDA4GRU2QEAVBAUSWCFDXFHGZXYHXCRH3ZY2LN5FPN&v=20180323&ll=${coords}`)
    //     .then(res => res.json())
    //     .then(res => console.log(res))

//     return <GoogleMap
//         defaultZoom={18}
//         defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
//     >
//         {isMarkerShown
//             && <Marker position={coordinates}
//                 draggable={true} onDragEnd={setMarker} />
//         }
//     </GoogleMap>
// }
// ))


  return (
    <div>
      <br></br>
      <br></br>
      <h1>Drag marker to select Places</h1>
      <select>
        {places.map((place, index) => {
          return <option key={index} value={place}>{place.venue.name}</option>
        })}
      </select>
      <br></br>
      <br></br>
      <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
      >
        {props.isMarkerShown && <Marker draggable={true} onDragEnd={(event) => setCoordinates(event)} position={{ lat: latitude, lng: longitude }} />}
      </GoogleMap>

    </div>
  )
}))

export default MyMapComponent;