import { Avatar, Box, Heading, HStack, Text, VStack, Slider } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReputationEnum from "../util/ReputationEnum";
import * as Location from "expo-location";
import Map from "./Map";
import { parse } from "react-native-svg";
import { updateLocation } from "../util/Utils.js"

export default function Home({ navigation, route }) {

    const [sliderValue, setSliderValue] = useState(15)
    const [coordLat, setCoordLat] = useState(0.0);
    const [coordLong, setCoordLong] = useState(0.0);
    const [latDelta, setLatDelta] = useState(0.027);
    // const [latDelta, setLatDelta] = useState(0.009);
    const [errorMsg, setErrorMsg] = useState('');
    const window = useWindowDimensions();


    useEffect(() => {
        (async () => {
            try {

                let { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let resp = await Location.getCurrentPositionAsync({});


                // let backPerm = await Location.requestBackgroundPermissionsAsync();
                setCoordLat(resp.coords.latitude)
                setCoordLong(resp.coords.longitude)

                // console.log("---------------------------------------")
                // console.log('Inicial')
                // console.log("lat : " + coordLat)
                // console.log("long : " + coordLong)
                // console.log("---------------------------------------")
                let update = await Location.watchPositionAsync({
                    distanceInterval: 10,
                    // timeInterval: 5000,
                    accuracy: Location.Accuracy.Highest

                },
                    newLocation => {
                        // console.log("---------------------------------------")
                        // console.log('ATUALIZANDO')
                        // console.log("Nova Loc : " + JSON.stringify(newLocation))
                        setCoordLat(newLocation.coords.latitude)
                        setCoordLong(newLocation.coords.longitude)
                        updateLocation({ coordLat, coordLong })
                        // console.log("lat : " + coordLat)
                        // console.log("long : " + coordLong)
                        // console.log("---------------------------------------")
                    });
            }
            catch {
                setErrorMsg('Exceção na hora de pegar a localização')
            }


        })();
    }, []);

    return (
        <SafeAreaProvider>
            <Box bg="darkBlue.900" flex={2} pt={16} pl={2} pr={1} safeArea>
                {/* <Button onPress={() => navigation.navigate('LoginForm')}>
                    Ir para tela de Login
                </Button> */}
                <VStack pt={8} pb={8}>
                    <Heading >
                        <HStack>
                            <Box ml={6} >
                                <Avatar
                                    source={{
                                        uri: "https://pt.gravatar.com/avatar/f131c7311c139d95f5a217d80ab8acb5",
                                    }}
                                    size={"xl"}
                                >
                                    MO
                                </Avatar>
                            </Box>
                            {/* <VStack bg="blueGray.900" style={styles.userCard} borderRadius={45} px={0}> */}
                            <VStack bg="blueGray.900" ml={4} borderRadius={45} px={70}>
                                <Text style={styles.userProfie} alignSelf="center" lineHeight="5xl" letterSpacing="2xl">spellzito</Text>
                                <Text style={styles.userProfie} >Reputação: {ReputationEnum.BOA}</Text>
                            </VStack>
                        </HStack>
                    </Heading>
                </VStack>
                <Map pt={20} long={coordLong} lat={coordLat} latDelta={latDelta} sliderValue={sliderValue} />
                <Slider pt={20}>
                    <Slider
                        defaultValue={sliderValue}
                        minValue={1}
                        maxValue={100}
                        accessibilityLabel="hello world"
                        step={2}
                        onChange={(v) => {
                            setSliderValue(v)
                            setLatDelta(setLatDeltaBySlideValue(v));
                        }}
                    >
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                </Slider>
            </Box >
            {/* <Text>lat : {coordLat}</Text>
            <Text>long : {coordLong}</Text>
            <Text>erro : {errorMsg}</Text>
            <Text>slider : {sliderValue}</Text>
            <Text>LatDelta : {latDelta}</Text> */}
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    userProfie: {
        color: "white"
    }
})


const setLatDeltaBySlideValue = (sliderValue) => {

    const ratio = 0.009;
    return parseFloat((sliderValue * 0.02).toFixed(4));
    // return parseFloat((sliderValue * 0.05).toFixed(4));
}

// latDelta=0.9    -> 100km
// latDelta=0.45   -> 50km
// latDelta=0.18   -> 20km
// latDelta=0.09   -> 10km
// latDelta=0.045  -> 5km
// latDelta=0.036  -> 4km
// latDelta=0.027  -> 3km
// latDelta=0.018  -> 2km
// latDelta=0.009  -> 1km
// latDelta=0.0045 -> 0,5km