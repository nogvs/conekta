import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/shared/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export function InfoSquareCard({title, subtitle, updated, icon, fontAwesome}) {

    return (
        <View style={styles.container}>
          <View style={styles.square}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{subtitle}</Text>
              {icon && fontAwesome ? <FontAwesome5 name={icon} size={30} color="#fff" /> : <Ionicons name={icon} size={35} color="#fff" /> }
            </View>
            <Text style={styles.lastUpdated}>{updated}</Text>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: Dimensions.get('screen').width*0.435,
    height: 150,
    backgroundColor: Colors.DARKGREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    color: '#fff',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,      
    justifyContent: "space-between"
  },
  subtitle: {      
    fontSize: 50,
    fontFamily: 'Outfit-SemiBold',
    color: Colors.WHITE,
    marginRight: 20
  },
  lastUpdated: {
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
    color: Colors.WHITE,
    marginTop: 20,
    fontStyle: "italic"
  }
});