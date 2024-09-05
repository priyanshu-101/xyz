// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as SplashScreen from 'expo-splash-screen'; // Expo Splash Screen API

// import Login from './Login';
// import Profile from './Profile';
// import HolidayList from './HolidayList';
// import Employees from './Employee';
// import Leave from './Leave';
// import ViewAtt from './ViewAtt';
// import Application from './Application';

// const Stack = createNativeStackNavigator();

// // Keep the splash screen visible while we load resources
// SplashScreen.preventAutoHideAsync();

// const App = () => {
//   useEffect(() => {
//     const prepareResources = async () => {
//       // Simulate some resources loading here, like fonts or async data fetching
//       // For now, we'll just use a timeout to simulate the loading
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // After resources are ready, hide the splash screen
//       await SplashScreen.hideAsync();
//     };

//     prepareResources();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Login" // Set initial route to Login
//         screenOptions={{ headerShown: true }}
//       >
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Leave" component={Leave} options={{ title: 'Leave' }} />
//         <Stack.Screen name="Employees" component={Employees} />
//         <Stack.Screen name="HolidayList" component={HolidayList} options={{ title: 'Public Holidays' }} />
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="ViewAtt" component={ViewAtt} />
//         <Stack.Screen name="Application" component={Application} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HolidayList from '../(tabs)/HolidayList'; // Adjust the path as necessary
import Leave from "../(tabs)/Leave";
import Notice from "../(tabs)/Notice";
import Profile from "../(tabs)/Profile";
import Login from '../(tabs)/Login';
import ViewAtt from '../(tabs)/ViewAtt';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}> 
      <Stack.Navigator
        initialRouteName="Login" // Set Login as the initial route
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HolidayList" component={HolidayList} options={{ title: 'Public Holidays' }} />
        <Stack.Screen name='Leave' component={Leave} options={{ title: 'Leave' }} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='ViewAtt' component={ViewAtt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
 