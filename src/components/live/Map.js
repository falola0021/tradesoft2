import React, { useEffect,useRef,useState } from 'react';
import { View, Text } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import getDirections from 'react-native-google-maps-directions'


const map = ({location,projectDetails}) => {
 

  const mapRef = useRef(null);

let projectLat=Number(projectDetails?.address.lat)
let projectLng=Number(projectDetails?.address.lng)
  const origin = {
    zoom: 8,
    location: { lat:location? location?.coords?.latitude:0, lng:location? location?.coords?.longitude:0 },
  };
  const destination = {
    zoom: 8,
    location: { lat:projectLat, lng:projectLng },
  };

  useEffect(() => {
    if (!origin || !destination) return;
  

 mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);


  const origin1 = {latitude: location? location?.coords?.latitude:0, longitude: location? location?.coords?.longitude:0};
  const destination1 = {latitude: projectLat, longitude: projectLng};



 const handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: [
        {
          latitude: -33.8600025,
          longitude: 18.697452,
        },
        {
          latitude: -33.8600026,
          longitude: 18.697453,
        },
           {
          latitude: -33.8600036,
          longitude: 18.697493,
        },
           {
          latitude: -33.8600046,
          longitude: 18.69743,
        },

      ]
    }

    getDirections(data)
  }

  return (
  <>
  <TouchableOpacity onPress={handleGetDirections}>

  </TouchableOpacity>
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
          origin={origin1}
          destination={destination1}
          apikey="AIzaSyCUGnm8XzXR26tbZRnCHOQXkY1mn43dPJA&libraries=places"
          strokeWidth={3}
          strokeColor='red'
          
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
            latitude: destination?.location?.lat ||0,
            longitude: destination?.location?.lng ||0,
          }}
          title='Destination'
          description={destination?.description}
          identifier='destination'
        />
      )}
    </MapView>
    </>
  
  );
};

export default map;