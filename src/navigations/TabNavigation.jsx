import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import News from '../screens/News'
import Alerta from '../screens/Alerta'
import { FontAwesome, Ionicons  } from '@expo/vector-icons';
import Colors from '../../assets/shared/Colors'

const Tab = createBottomTabNavigator()
export default function TabNavigation() {

    const color = Colors.DARKGREEN;

  return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon:() => (
                        <FontAwesome name="home" size={30} color={color} />
                    )
                }}
            />            
            <Tab.Screen name='Alertas' component={Alerta}
            options={{
                tabBarIcon:({size}) => (
                    <FontAwesome name="warning" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name='Notícias' component={News}
            options={{
                tabBarIcon:({size}) => (
                    <Ionicons name="newspaper" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
  )
}