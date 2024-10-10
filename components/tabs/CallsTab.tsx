import React from "react";
import { ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import VideoIcon from '../../assets/icons/call.svg'
import LinkIcon from '../../assets/icons/link.svg'
import UserIcon from '../../assets/icons/user.svg'
import PhoneIcon from '../../assets/icons/phone.svg'
import users from "../../shared/users";
import { useAppSelector } from "../../shared/hooks";
import { AppFAB } from "../../shared/Reusable";

const CallsTab = React.memo((props: any) => {
    const theme = useColorThemed()
    const user_details = useAppSelector(state => state.main.user_details)

    return (
        <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{height: '100%'}} style={{backgroundColor: theme.main_bg_01, position: 'relative', flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View onTouchEnd={() => props.navigation.navigate('Contact')} style={{height: 90, width: '49%', borderRadius: 8, backgroundColor: theme.gradient_1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <VideoIcon width={30} height={30} fill={theme.inverse_black} />
                        <Text style={{color: theme.inverse_black, marginTop: 10, fontSize: 16}}>Start a call</Text>
                    </View>
                </View>
                <View onTouchEnd={() => props.navigation.navigate('CallPrepPage')} style={{height: 90, width: '49%', borderRadius: 8, backgroundColor: theme.list_bg_01,alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <LinkIcon width={30} height={30} stroke={theme.gradient_2} />
                        <Text style={{color: theme.inverse_white, marginTop: 10, fontSize: 16}}>Create Skype link</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop: 15}}>
                <View style={{marginVertical: 10}}>
                    <Text style={{color: theme.text_color_02, fontSize: 16, fontWeight: '600'}}>People</Text>
                </View>

                <View>

                    {
                        users.filter(user => user.email != user_details?.email).map(user => 
                                <View key={Math.floor(Math.random() * 876567)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{alignItems: 'center', justifyContent: 'center', 
                                            backgroundColor: theme.skype_lighter_blue, width: 70, height: 70,
                                            borderRadius: 90,
                                            }}>
                                            <UserIcon width={40} height={40} fill={'white'} />
                                        </View>
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{color: theme.text_color_01, fontSize: 18}}>{user.userName}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <PhoneIcon width={25} height={25} fill={theme.text_color_02} />
                                    </View>
                                </View>
                            )
                    }

                </View>
            </View>

            </ScrollView>
            <AppFAB handlePressed={() => props.navigation.navigate('CallPad')} />

        </View>
    )
})

export default CallsTab