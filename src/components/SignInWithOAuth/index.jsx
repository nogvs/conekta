import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Dimensions, TouchableOpacity, Text, Image, View } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import Colors from '../../../assets/shared/Colors';

WebBrowser.maybeCompleteAuthSession();

export function SignInWithOAuth() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const googleLogo = require('../../../assets/images/google-logo.png');

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={googleLogo} style={{ width: 40, height: 40, marginRight: 17 }} />
      <Text style={styles.text}>Entrar com o Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 0.03,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.DARKGREEN,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 25,
    width: Dimensions.get('screen').width * 0.8,
  },
  text: {
    fontSize: 20,
    color: Colors.WHITE,
  },
});
