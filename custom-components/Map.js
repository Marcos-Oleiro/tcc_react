import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from "react-native-maps";

export default function Map({ lat, long, latDelta, sliderValue }) {

  const [latLoc, setLatLoc] = useState(0.0);
  const [longLoc, setLongLoc] = useState(0.0);

  useEffect(() => {
    setLatLoc(lat)
    setLongLoc(long)
  })

  // console.log("------------------------------------")
  // console.log("CARREGANDO O MAPA")
  // console.log("lat : " + latLoc)
  // console.log("long : " + longLoc)
  // console.log("------------------------------------")
  return (

    <MapView
      style={styles.map}
      loadingEnabled={true}
      region={{
        latitude: latLoc,
        longitude: longLoc,
        latitudeDelta: latDelta,
        longitudeDelta: 0
      }}
      showUserLocation={true}
      showsPointsOfInterest={false}
      customMapStyle={customStlye}
      rotateEnabled={false}
      toolbarEnabled={false}
      followsUserLocation={true}

    >
      <Marker
        coordinate={{ latitude: lat, longitude: long }}
        tappable={false}
      />
      <Circle
        center={{ latitude: lat, longitude: long }}
        radius={sliderValue * 1000}
        geodesc={false}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.55,
  }
});

const customStlye = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]