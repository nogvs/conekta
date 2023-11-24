import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/shared/Colors';

export default function InfoCard({title, subtitle, icon }) {

    return (
        <View style={styles.container}>
          <View style={styles.square}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "row",
    marginTop: 1,
  },
  square: {
    flex: 1,
      flexDirection: "row",
    width: Dimensions.get('screen').width*0.89,
    height: 50,
    backgroundColor: Colors.DARKGREEN,
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    color: '#fff',
    padding: 15
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,      
  },
  subtitle: {      
    fontSize: 30,
    fontFamily: 'Outfit-SemiBold',
    color: Colors.WHITE,
    marginRight: 55
  },
});