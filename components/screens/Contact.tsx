import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import SearchIcon from '../../assets/icons/search.svg'
import TelephoneIcon from '../../assets/icons/telephone.svg'
import { Checkbox } from 'react-native-paper';
import users from "../../shared/users";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { TUserDetails } from "../../shared/types";
import TimesIcon from '../../assets/icons/times.svg'

const ContactRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const user_details = useAppSelector(state => state.main.user_details)
    const [selected_users, set_selected_users] = React.useState<TUserDetails[]>([]);
    // const bottomSheetRef = React.useRef<BottomSheet>(null);

    const handleSelectUsers = React.useCallback((user: TUserDetails) => {
        console.log(user, selected_users);
        
        if (selected_users.findIndex(u => u.userID == user.userID) > -1) {
            const rm_user = selected_users.filter(u => u.userID != user.userID )
            set_selected_users(rm_user)            
        }else{
            set_selected_users([...selected_users, user])
        }
    }, [selected_users])

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return (
                  <View onTouchEnd={() => props.navigation.goBack()} style={{flexDirection: 'row', paddingLeft: 15}}>
                      <TimesIcon width={26} height={26} fill={theme.inverse_white} />
                      <View style={{marginLeft: 20}}>
                        <Text style={{fontWeight: '700', color: theme.inverse_white, fontSize: 20}}>New Call</Text>
                      </View>
                  </View>
                )
            }
        })
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01}}>
            <View style={{paddingHorizontal: 15, marginTop: 20, paddingBottom: 10}}>
                <View style={{justifyContent: 'center',}}>
                    <TextInput 
                        placeholder="Search"
                        style={{backgroundColor: theme.input_bg, width: '100%', height: 35, fontSize: 18, borderRadius: 10, paddingLeft: 40}}
                        placeholderTextColor={theme.text_color_02}
                    />
                    <SearchIcon width={25} height={25} fill={theme.text_color_01} style={{position: 'absolute', left: 5}} />
                </View>
            </View>

            <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
                <View style={{marginVertical: 15}}>
                    <Text style={{color: theme.text_color_02, fontSize: 18, fontWeight: '600'}}>People</Text>
                </View>
                {
                    users.filter(user => user.email != user_details?.email).map(user => 
                            <View onTouchEnd={() => handleSelectUsers(user)} key={Math.floor(Math.random() * 876567)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{alignItems: 'center', justifyContent: 'center', 
                                        backgroundColor: theme.skype_lighter_blue, width: 40, height: 40,
                                        borderRadius: 90,
                                        }}>
                                        <TelephoneIcon width={25} height={25} fill={'white'} />
                                    </View>
                                </View>
                                <View style={{flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.text_color_02, paddingBottom: 10, borderBottomWidth: 1, justifyContent: 'space-between'}}>
                                    <View style={{borderBottomColor: theme.line_color,}}>
                                        <Text style={{color: theme.text_color_01, fontSize: 18, marginBottom: 6}}>{user.userName}</Text>
                                        <Text style={{color: theme.text_color_02, fontSize: 14}}>Today at 2:56 PM</Text>
                                    </View>

                                    <View>
                                        <View style={{width: 28, height: 28, borderColor: theme.line_color, 
                                            borderWidth: 1, borderRadius: 40, backgroundColor: selected_users.findIndex(u => u.email == user.email) > -1 ? theme.gradient_1 : 'transparent'}}
                                        />
                                    </View>
                                </View>
                            </View>
                    )
                }

            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 35, paddingTop: 10}}>
                <View onTouchEnd={() => selected_users.length == 0 ? null : props.navigation.navigate('CallPage', {users: selected_users})} style={{paddingHorizontal: 25, opacity: selected_users.length == 0 ? .4 : 1, paddingVertical: 10, backgroundColor: theme.gradient_1, borderRadius: 20}}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 20, }}>Call</Text>
                </View>
            </View>

            {/* <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose={true}
                snapPoints={[200]}
                handleIndicatorStyle={{display: "none"}}
                onChange={() => null}>
                <BottomSheetView style={{backgroundColor: 'red'}}>
                <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet> */}
        </View>
    )
})

export default ContactRoute