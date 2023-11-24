import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import News from '../screens/News'
import Alerta from '../screens/Alerta'
import { FontAwesome, Ionicons  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
  return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon:({color,size}) => (
                        <FontAwesome name="home" size={30} color={color} />
                    )
                }}
            />            
            <Tab.Screen name='Alertas' component={Alerta}
            options={{
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="warning" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name='Notícias' component={News}
            options={{
                tabBarIcon:({color,size}) => (
                    <Ionicons name="newspaper" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
  )
}