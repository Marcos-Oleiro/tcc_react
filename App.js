import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import React from "react";
import Home from "./custom-components/Home.js";
import LoginForm from "./custom-components/LoginForm.js";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginForm" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


