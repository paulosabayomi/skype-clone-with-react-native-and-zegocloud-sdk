/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeRoute from './components/screens/Home';
import LoginRoute from './components/screens/Login';
import { useAppDispatch, useAppSelector } from './shared/hooks';
import CallPadRoute from './components/screens/CallPad';
import ContactRoute from './components/screens/Contact';
import useColorThemed from './themed/useColorThemed';
import CallPageRoute from './components/screens/CallPage';
import CallPrepPageRoute from './components/screens/CallPrepPage';
import JoinWithLinkPrepRoute from './components/screens/JoinWithLinkPrep';
import ChatPageRoute from './components/screens/ChatPage';
import NewChatPageRoute from './components/screens/NewChatPage';
import NotificationPageRoute from './components/screens/NotificationPage';
import OptionsPanelRoute from './components/screens/OptionsPanel';
import SettingsPageRoute from './components/screens/SettingsPage';
import AppearancePageRoute from './components/screens/AppearancePage';
import storage, { color_mode_db_name } from './shared/storage';
import { updateColorMode } from './shared/rdx-slice';
import { TColorMode } from './shared/types';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const scheme = useColorScheme() || 'light';
  const user_details = useAppSelector(state => state.main.user_details)
  const theme = useColorThemed()
  const color_mode = useAppSelector(state => state.main.color_mode)
  const dispatch = useAppDispatch()

  const getBarStyle = React.useCallback((color_mode: TColorMode) => {
    if (color_mode == 'light') {
      return 'dark-content'
    }else if (color_mode == 'dark') {
      return 'light-content'
    }else{
      return getBarStyle(scheme)
    }
  }, [])

  const set_color = React.useCallback(() => {
    storage.load({key: color_mode_db_name})
    .then((data) => {
      dispatch(updateColorMode(data))
    })
    .catch(err => {})
  }, [])

  React.useLayoutEffect(() => {
    set_color()
  }, [])
  

  return (
    <>
      <StatusBar
        barStyle={getBarStyle(color_mode)}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator initialRouteName={user_details != undefined ? 'Home' : 'Login'}>
        <Stack.Screen name="Home" 
          options={{
            headerShown: false
          }} 
          component={HomeRoute} />
        <Stack.Screen name="Login" 
          component={LoginRoute} 
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="ChatPage" 
          component={ChatPageRoute} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: theme.inverse_white
            },
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerShadowVisible: false,
          }} />
        <Stack.Screen name="SettingsPage" 
          component={SettingsPageRoute} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: theme.inverse_white
            },
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            title: 'Settings',
            headerBackTitleVisible: false,
          }} />
        <Stack.Screen name="AppearancePage" 
          component={AppearancePageRoute} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: theme.inverse_white
            },
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            title: 'Appearance',
            headerBackTitleVisible: false,
          }} />
        <Stack.Screen name="NewChatPage" 
          component={NewChatPageRoute} 
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: Platform.OS == 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forFadeFromBottomAndroid
          }} />
        <Stack.Screen name="NotificationPage" 
          component={NotificationPageRoute} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: theme.inverse_white
            },
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerTitle: 'Notifications',
            gestureDirection: 'vertical',
            cardStyleInterpolator: Platform.OS == 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forFadeFromBottomAndroid
          }} />
        <Stack.Screen name="OptionsPanel" 
          component={OptionsPanelRoute} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              color: theme.inverse_white
            },
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerTitle: '',
            gestureDirection: 'vertical',
            cardStyleInterpolator: Platform.OS == 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forFadeFromBottomAndroid
          }} />
        <Stack.Screen name="CallPrepPage" 
          component={CallPrepPageRoute} 
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitleStyle: {display: 'none'}
          }} />
        <Stack.Screen name="JoinWithLinkPrep" 
          component={JoinWithLinkPrepRoute} 
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitleStyle: {display: 'none'}
          }} />
        <Stack.Screen name="CallPage" 
          component={CallPageRoute} 
          options={{
            headerTitleStyle: {
              display: 'none'
            },
            headerShown: false,
            headerShadowVisible: false
          }} />
        <Stack.Screen name="Contact" 
          component={ContactRoute} 
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.main_bg_01
            },
            headerTitleStyle: {display: 'none'},
            headerShadowVisible: false,
          }} />
        <Stack.Screen name="CallPad" 
          component={CallPadRoute} 
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: Platform.OS == 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forFadeFromBottomAndroid
          }} />
      </Stack.Navigator>
      
    </>
  );
}


export default App;
