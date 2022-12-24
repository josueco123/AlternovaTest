import React, {Fragment} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MainScreen from './src/IndexNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './theme-context';

GoogleSignin.configure({ 
  webClientId: '345945387331-g9ujg5839ku92c9f6vqmo4ooiam1mu03.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER     
});


export default () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return(
      <Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <MainScreen />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </Fragment>
  );  
}