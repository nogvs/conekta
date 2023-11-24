import { View, Text, StyleSheet,Dimensions,Flatlist} from 'react-native';
import React,{useState,useEffect}from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import globalApi from '../../services/globalApi';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../assets/shared/Colors';

export default function Map() {
  const [location, setLocation] = useState();
  const [markerList, setMarkerList] = useState(); 

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      await Location.watchPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      }, (response) => {
        setLocation(response)
      })

    })();
  }, []);

  useEffect(() => {
    getMarkers();
  },[])

  const getMarkers = () => {
    globalApi.getMarkers().then(resp => {
      setMarkerList(resp.data.data)
    })
  }
  
  if(!markerList){
    return null;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mapa de Alagamento</Text>

        {
          location &&
          <MapView 
          style={styles.mapa}
          showsUserLocation
          showsMyLocationButton
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
            {markerList.map((marker) => (
              <Marker key={marker.id} coordinate={{
                latitude: parseFloat(marker.attributes.Latitude),
                longitude: parseFloat(marker.attributes.Longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>     
            <FontAwesome5 name={"water"} size={35} color={Colors.DARKGREEN} />
              </Marker>
            ))} 
            </MapView>
        }

        <View style={styles.legendaContainer}>
        {markerList.map((marker) => (
              <View style={styles.legendaWrapper}>
               <FontAwesome5 name={"water"} size={15} color={Colors.DARKGREEN} />
              <Text style={styles.textoLegenda}>{marker.attributes.Name}</Text>
              </View>
            ))}   
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      margin:5,
      fontFamily:'Outfit-Bold'
    }, 
    mapa:{
    width: Dimensions.get('screen').width*0.9,
    height: 300,
    marginTop: 10
    },
    calloutView:{
      padding: 10
    },
    calloutText:{
      fontSize: 14,
      fontFamily: 'Outfit-Regular'
    },
    legendaContainer: {
      marginTop: 5
    },
    legendaWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    textoLegenda: {
      marginLeft: 10,
      fontSize: 15,
      fontFamily: 'Outfit-SemiBold'
    }
  })