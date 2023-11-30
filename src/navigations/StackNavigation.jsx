import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Blog } from '../screens/Blog';
import { Noticia } from '../screens/Noticia';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="Noticia" component={Noticia} />
    </Stack.Navigator>
  );
}
