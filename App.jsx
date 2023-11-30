import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import {Login} from './src/screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Colors from './assets/shared/Colors';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigations/TabNavigation';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Outfit-Light': require('./assets/fonts/Outfit-Light.ttf'),
    'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),    
  });

  if(!fontsLoaded){
    return null
  }
  return (
    <ClerkProvider publishableKey={"pk_test_ZGVlcC1yaW5ndGFpbC0xNi5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <SafeAreaView style={styles.container}>
      <StatusBar/>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <Login />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
