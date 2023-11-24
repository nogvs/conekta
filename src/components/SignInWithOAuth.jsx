import React from "react";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import Colors from '../../assets/shared/Colors'

 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = () => {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <TouchableOpacity 
          style={styles.button}
          onPress={onPress}>
          <Text style={styles.text}>Login com o Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
   button: {
    padding: 16,
    backgroundColor:Colors.PRIMARY,
    borderRadius:90,
    alignItems:'center',
    marginTop: 20,
    width: Dimensions.get('screen').width*0.8,
   },
   text: {
    fontSize: 17,
    color: Colors.WHITE
   }
})

export default SignInWithOAuth;