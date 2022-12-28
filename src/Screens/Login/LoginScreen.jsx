import React, { useEffect, useContext, useState } from "react";
import { StyleSheet,  Image } from "react-native";
import { Layout, Text, Toggle   } from '@ui-kitten/components';
import { ThemeContext } from "../../../theme-context";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Login from "../../Auth/Login";


export default function LoginScreen ({ navigation }) {
 
    const [checked, setCheked] = useState(false);
    const themeContext = useContext(ThemeContext);

    useEffect(() => {

      GoogleSignin.isSignedIn().then((resp) =>{ 
        if(resp){
          navigation.navigate('ListProducts');
        }       
        
      })
    }, []);

    const onChangeCheckbox = () =>{
      setCheked(!checked);
      themeContext.toggleTheme();
    }

    return (
        <Layout style={styles.container}>
            <Text category='h1' style={styles.title}>Alternova Store</Text> 
            <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}} /> 
            <Login />
            <Toggle 
                checked={checked}
                onChange={onChangeCheckbox}
                style={styles.check}
                status='primary'>
                Cambiar a tema oscuro
                </Toggle >
        </Layout> 
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 60,
    width: 75,
    height: 75,
    resizeMode: 'stretch'
  },
  check: {
    top: 50,
  },
  title:{
    margin :12,
    bottom: 75
  },
});