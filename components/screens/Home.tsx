import React from "react";
import { View, Text, TouchableOpacity, StatusBar, TextInput } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from "../tabs/HomeTab";
import CallsTab from "../tabs/CallsTab";
import PhoneTab from "../tabs/PhoneTab";
import ContactsTab from "../tabs/Contacts";
import TodayTab from "../tabs/TodayTab";

import ChatIcon from '../../assets/icons/chat.svg'
import CallsIcon from '../../assets/icons/call.svg'
import PhoneIcon from '../../assets/icons/number-pad.svg'
import ContactsIcon from '../../assets/icons/contact.svg'
import SkypeIcon from '../../assets/icons/skype-logo.svg'
import NotificationIcon from '../../assets/icons/notification.svg'
import SearchIcon from '../../assets/icons/search.svg'
import FilterIcon from '../../assets/icons/filter.svg'
import useColorThemed from "../../themed/useColorThemed";
import { useAppSelector } from "../../shared/hooks";

const Tab = createBottomTabNavigator();

const HomeRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const user_details = useAppSelector(state => state.main.user_details)

    function TabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
        const set_icon = {
            HomeTab: (isFocused: boolean) => <ChatIcon width={28} height={28} fill={isFocused ? theme.skype_light_blue : 'none'} stroke={isFocused ? 'none' : theme.icon_color} />,
            Calls: (isFocused: boolean) => <CallsIcon width={28} height={28} fill={isFocused ? theme.skype_light_blue : theme.icon_color} />,
            Phone: (isFocused: boolean) => <PhoneIcon width={28} height={28} fill={isFocused ? theme.skype_light_blue : theme.icon_color} />,
            Contacts: (isFocused: boolean) => <ContactsIcon width={28} height={28} fill={isFocused ? theme.skype_light_blue : theme.icon_color} />,
            Today: (isFocused: boolean) => <SkypeIcon width={28} height={28} stroke={isFocused ? theme.skype_light_blue : theme.icon_color} />,
        }
        return (
          <View style={{ flexDirection: 'row', borderTopWidth: .3, borderTopColor: 'lightgray', height: 80, paddingTop: 5, justifyContent: 'space-between', backgroundColor: theme.main_bg_02 }}>
            {state.routes.map((route: any, index: number) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
      
              const isFocused = state.index === index;
      
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
      
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };
      
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
      
              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  /**
                   * Added after the tutorial
                   */
                  key={Math.floor(Math.random() * 9999999)}
                  onLongPress={onLongPress}
                  style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
                >
                    {set_icon[route.name as keyof typeof set_icon](isFocused)}
                    <Text style={{ color: isFocused ? theme.skype_light_blue : theme.icon_color }}>
                    {label}
                    </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }
    return (
        <Tab.Navigator tabBar={TabBar} screenOptions={{
            header(props) {
                return <View style={{paddingTop: StatusBar.currentHeight || 60, backgroundColor: theme.purple_blue, 
                            paddingBottom: 10, paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                        <View onTouchEnd={() => props.navigation.navigate('OptionsPanel')} style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 50, height: 50, 
                                borderRadius: 80, backgroundColor: theme.skype_lighter_blue, 
                                alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: theme.general_purple_blue, fontSize: 18, fontWeight: '600'}}>{user_details?.userName.split(' ').map(name => name[0].toUpperCase())}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 18, fontWeight: '500', color: theme.header_text_color, marginLeft: 15}}>{user_details?.userName}</Text>
                                <Text style={{fontSize: 16, color: theme.header_text_color, marginLeft: 15}}>Share what you're up to</Text>
                            </View>
                        </View>
                        <View onTouchEnd={() => props.navigation.navigate('NotificationPage')}>
                            <NotificationIcon width={30} height={30} fill={theme.header_text_color} />
                        </View>
                    </View>

                    <View style={{width: '100%', marginTop: 10, flexDirection: 'row', flexGrow: 1, flexShrink: 0}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TextInput 
                                placeholder="Search"
                                style={{backgroundColor: theme.main_bg_01, width: '100%', height: 35, fontSize: 18, borderRadius: 10, paddingLeft: 30}}
                                placeholderTextColor={theme.text_color_02}
                            />
                            <SearchIcon width={25} height={25} fill={theme.text_color_01} style={{position: 'absolute', left: 5}} />
                        </View>
                        <View style={{backgroundColor: theme.main_bg_01, height: 35, marginLeft: 10, 
                            paddingHorizontal: 6, borderRadius: 10, justifyContent: 'center'}}>
                            <FilterIcon width={20} height={20} fill={theme.text_color_01} />
                        </View>
                        
                    </View>
                </View>
            },
        }}>
            <Tab.Screen name="HomeTab" 
                options={{
                    title: 'Chats'
                }} 
                component={HomeTab} />
            <Tab.Screen name="Calls" component={CallsTab} />
            <Tab.Screen name="Phone" component={PhoneTab} />
            <Tab.Screen name="Contacts" component={ContactsTab} />
            <Tab.Screen name="Today" component={TodayTab} />
        </Tab.Navigator>
    )
})

export default HomeRoute