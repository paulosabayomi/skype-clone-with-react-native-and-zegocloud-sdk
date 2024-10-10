import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import { AppFAB } from "../../shared/Reusable";

import AddUserIcon from '../../assets/icons/add-user.svg'

const ContactsTab = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01}}>

            <ScrollView style={{paddingHorizontal: 10, paddingVertical: 15}}>
                <Text style={{color: theme.text_color_02, marginBottom: 15, fontSize: 18, fontWeight: '600'}}>Favorites</Text>

                <View onTouchEnd={() => props.navigation.navigate('ChatPage', {roomID: 'hello'})} key={Math.floor(Math.random() * 876567)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', 
                            backgroundColor: theme.skype_lighter_blue, width: 60, height: 60,
                            borderRadius: 12,
                            }}>
                            <Image source={require('../../assets/icons/ms-copilot.png')} style={{width: 60, height: 60, borderRadius: 12}} resizeMode='contain' />
                        </View>
                    </View>
                    <View style={{flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'center', paddingBottom: 10, justifyContent: 'space-between'}}>
                        <View style={{borderBottomColor: theme.line_color,}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18, marginBottom: 6}}>Copilot</Text>
                        </View>

                        <View>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <AppFAB icon={<AddUserIcon fill="black" />} handlePressed={() => null} />

        </View>
    )
})

export default ContactsTab