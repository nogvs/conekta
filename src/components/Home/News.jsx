import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

export default function News() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Últimas Notícias</Text>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container:{
          marginTop: 10
        },
        title: {
          fontSize: 20,
          margin:5,
          fontFamily:'Outfit-Bold'
        }
      })