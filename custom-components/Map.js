import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Map({ lat, long, latDelta, sliderValue, usersArr }) {

  const [latLoc, setLatLoc] = useState(0.0);
  const [longLoc, setLongLoc] = useState(0.0);
  const [nearUsersMap, setNearUsersMap] = useState({});

  useEffect(() => {
    setLatLoc(lat);
    setLongLoc(long);
    setNearUsersMap(usersArr);
    console.log(`nearusers MAP=> ${JSON.stringify(nearUsersMap)}`);
    console.log(`nearusers MAP=> ${Array.isArray(nearUsersMap)}`);
  });


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
      {/* {nearUsersMap((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))} */}
      {/* {nearUsersMap.map((user) => (
        <Marker
          key={user.id}
          coordinate={{ latitude: user.lat, longitude: user.long }}
          title={user.nickname}
        />
      ))} */}
      {/* <Marker
        coordinate={{ latitude: lat, longitude: long }}
        tappable={false}
        pinColor={"deepskyblue"}
        opacity={0.6}
      /> */}
      <Circle
        center={{ latitude: lat, longitude: long }}
        radius={sliderValue * 1000}
        geodesc={false}
      />
    </MapView>
  );
}
// {
//   "id": 2,
//   "nickname": "user1",
//   "lat": "-32.16589900000000000000",
//   "long": "-52.19659300000000000000",
//   "distance": "4377.30"
// },

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