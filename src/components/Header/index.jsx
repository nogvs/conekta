import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';

export function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.helloContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.helloText}>Olá,</Text>
          <Text style={styles.username}>{user.fullName} 👋</Text>
        </View>
      </View>
      {/* Melhoria futura, implementar sistema de notificação <Feather name="bell" size={28} color="black" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helloContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  helloText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 20,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 99,
  },
  username: {
    fontSize: 30,
    fontFamily: 'Outfit-Bold',
  },
});
