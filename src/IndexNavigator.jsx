import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login/LoginScreen';
import { ListProducts } from './Screens/Products/ListProdutcs';
import { DetailProduct } from './Screens/Products/DetailProduct';


const Stack = createNativeStackNavigator();


function  MainScreen() {
    
    return( 
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen}  />                
                <Stack.Screen name="ListProducts" component={ListProducts}/>
                <Stack.Screen name="DetailProduct" component={DetailProduct} />            
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainScreen;