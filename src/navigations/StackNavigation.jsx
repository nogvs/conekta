import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import News from '../screens/News'
import Alerta from '../screens/Alerta'

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/> 
        <Stack.Screen name='News' component={News}/>     
        <Stack.Screen name='Alerta' component={Alerta}/>          
    </Stack.Navigator>
  )
}