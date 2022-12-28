import React from 'react';
import {StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();  
//google sign in
const startGoogleSession = async () => {
    try {
        await GoogleSignin.signIn();

        navigation.navigate('ListProducts');
        
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log('login cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated       
        } else {
          // some other error happened
          console.log('login was unsuscesfull ' + error);
        }
      }
    }

    return (
        <GoogleSigninButton
            style={styles.btnLoginGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={startGoogleSession}
      />
     );

}

const styles = StyleSheet.create({
    btnLoginGoogle: {
       width: "70%",
        marginTop: 40,
      }
});