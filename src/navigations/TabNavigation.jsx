import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Alertas } from '../screens/Alertas';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../../assets/shared/Colors';
import StackNavigation from './StackNavigation';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  const color = Colors.DARKGREEN;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Alertas"
        component={Alertas}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="warning" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Notícias"
        component={StackNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
