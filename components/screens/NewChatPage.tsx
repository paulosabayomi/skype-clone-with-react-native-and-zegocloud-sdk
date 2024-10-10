import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

import TimesIcon from '../../assets/icons/times.svg'
import SearchIcon from '../../assets/icons/search.svg'
import VideoCallIcon from '../../assets/icons/video-call.svg'
import AddUserIcon from '../../assets/icons/add-user.svg'
import AddCallIcon from '../../assets/icons/call-plus.svg'
import GroupUserIcon from '../../assets/icons/user-group.svg'
import PadlockIcon from '../../assets/icons/padlock.svg'
import PhoneBubbleIcon from '../../assets/icons/phone-bubble.svg'

const NewChatPageRoute = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{backgroundColor: theme.main_bg_01, flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 45, marginBottom: 15}}>
                <View style={{marginLeft: 10}} onTouchEnd={() => props.navigation.goBack()}>
                    <TimesIcon width={25} height={25} stroke={theme.inverse_white} />
                </View>
                <View style={{marginLeft: 15}}>
                    <Text style={{color: theme.inverse_white, fontSize: 18, fontWeight: '600'}}>New Chat</Text>
                </View>
            </View>

            <ScrollView style={{paddingHorizontal: 15}}>
                <View style={{justifyContent: 'center', marginBottom: 20}}>
                    <TextInput
                        placeholder="Search"
                        style={{backgroundColor: theme.input_bg, width: '100%', height: 35, fontSize: 18, borderRadius: 10, paddingLeft: 30}}
                        placeholderTextColor={theme.text_color_02}
                    />
                    <SearchIcon width={25} height={25} fill={theme.text_color_01} style={{position: 'absolute', left: 5}} />
                </View>

                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <VideoCallIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>Meet Now</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <AddUserIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>New Group Chat</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <AddCallIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>New Call</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <GroupUserIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>New Moderated Chat</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <PadlockIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>New Private Conversation</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: theme.line_color, borderBottomWidth: .5, paddingVertical: 10}}>
                        <PhoneBubbleIcon width={22} height={22} fill={theme.text_color_01} />
                        <Text style={{fontSize: 16, marginLeft: 20, fontWeight: '600', color: theme.text_color_01}}>New SMS</Text>
                    </View>
                </View>
            </ScrollView>


            
        </View>
    )
})

export default NewChatPageRoute