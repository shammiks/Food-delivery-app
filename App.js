import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import UserProfile from './src/screen/UserProfile';
import ProductPage from './src/screen/ProductPage'
import UserCart from './src/screen/UserCart';
import PlaceOrder from './src/screen/PlaceOrder';
import TrackOrders from './src/screen/TrackOrders';

const App = ()=> {

  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage'>
        <Stack.Screen name='welcomepage' component={WelcomeScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen name='signup' component={SignUpScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen name='login' component={LoginScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen name='Home' component={HomeScreen}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name='userprofile' component={UserProfile}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name='Productpage' component={ProductPage}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name='cart' component={UserCart}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="placeorder" component={PlaceOrder}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="trackorders" component={TrackOrders}
          options={{
            headerShown: false,
          }}
        />
    </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;