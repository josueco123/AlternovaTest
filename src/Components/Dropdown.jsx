import React, { useState } from 'react';
import { Button, OverflowMenu, Icon, MenuItem } from '@ui-kitten/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../theme-context';

const SettingIcon = (props) => (
    <Icon {...props} name='more-vertical'/>
  );

export const Dropdown = () => {

    const [visible, setVisible] = useState(false); 
    const navigation = useNavigation();  
    const themeContext = React.useContext(ThemeContext);


    const onLogOut = async  () => {
        try {
          await GoogleSignin.signOut();
          navigation.push('Login');
        } catch (error) {
          console.error(error);
        }
          setVisible(false);
        };
      
        const onChangeTheme = () => {
          setVisible(false);
          themeContext.toggleTheme();
        };
        
        const renderToggleButton = () => (
          <Button onPress={() => setVisible(true)}
                  accessoryLeft={SettingIcon}
                  appearance='ghost'>
          </Button>
        );

        return(
                <OverflowMenu
                        visible={visible}
                        anchor={renderToggleButton}
                        onBackdropPress={() => setVisible(false)}
                        >
                        <MenuItem title='Cambiar Tema' onPress={onChangeTheme}/>
                        <MenuItem title='Cerrar Session' onPress={onLogOut}/>
                    </OverflowMenu>
        );
  
}