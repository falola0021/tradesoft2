import React, { useEffect,useRef,useState } from 'react';
import { View, Text } from 'react-native';

// import tw from 'tailwind-react-native-classnames';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { useSelector, useDispatch } from 'react-redux';

// import {
//   selectOrigin,
//   selectDestination,
//   setTravelTimeInformation,
// } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { GOOGLE_MAPS_APIKEY } from '@env';

const map = ({location,projectDetails}) => {
//   const dispatch = useDispatch();
  const mapRef = useRef(null);
  //const origin = "lagos"
  //const destination = "abuja"

let projectLat=Number(projectDetails?.address.lat)
let projectLng=Number(projectDetails?.address.lng)
  const origin = {
    zoom: 8,
    location: { lat:location? location?.coords?.latitude:0, lng:location? location?.coords?.longitude:0 },
  };
  const destination = {
    zoom: 8,
    location: { lat:projectLat, lng:projectLat },
  };

  useEffect(() => {
    if (!origin || !destination) return;
    // console.log(origin, destination)

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  
//   useEffect(() => {
//     if (!origin || !destination) return;
//     const getTravelTime = async () => {
//       fetch(
//         `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           let distanceTimeInfo = data.rows[0].elements[0];
//           console.log(distanceTimeInfo);
//           dispatch(setTravelTimeInformation(distanceTimeInfo));
//         });
//     };
//     getTravelTime();
//   }, [origin, destination, GOOGLE_MAPS_APIKEY]);




  return (
  
    <MapView
    
    //minZoomLevel={0}  // default => 0
    maxZoomLevel={10} // default => 20
      ref={mapRef}
      mapType='mutedStandard'
      style={{width:"100%",height:"100%"}}
      region={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,

      }}>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey="AIzaSyCUGnm8XzXR26tbZRnCHOQXkY1mn43dPJA&libraries=places"
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title='Origin'
          description={origin?.description}
          identifier='origin'
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title='Destination'
          description={destination?.description}
          identifier='destination'
        />
      )}
    </MapView>
  
  );
};

export default map;