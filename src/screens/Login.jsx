import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import appLogo from './../../assets/images/app-login-logo.png'
import Colors from '../../assets/shared/Colors'
import SignInWithOAuth from '../components/SignInWithOAuth'

export default function Login() {
  return (
    <View style={styles.container}> 
      <Image source={appLogo}
      style={styles.image}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>O seu app de alerta de chuva em Cataguases</Text>
        <Text style={styles.subtitle}>Receba notificações, verifique os pontos de alagamento e entre em contato com as autoridades competentes.</Text>
      <SignInWithOAuth/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    backgroundColor: Colors.LIGHTGREY
  },
   image: {
      width:280,
      height:550,
      objectFit:'contain',
      marginTop: 100,
      borderRadius:20,
   },
   titleContainer: {
    backgroundColor: Colors.WHITE,
    padding:25,
    alignItems:'center',
    marginTop: -50,
   },
   title: {
    fontSize:26,
    fontWeight:'bold'
   },
   subtitle:{
      marginTop: 20
   },
})

