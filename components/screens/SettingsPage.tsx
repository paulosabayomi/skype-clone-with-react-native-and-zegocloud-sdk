import React from "react";
import { Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

import UserIcon from '../../assets/icons/user.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import PadlockIcon from '../../assets/icons/padlock.svg'
import AppearanceIcon from '../../assets/icons/appearance.svg'
import MicrophoneIcon from '../../assets/icons/microphone.svg'
import PhoneIcon from '../../assets/icons/phone.svg'
import ChatIcon from '../../assets/icons/chat.svg'
import NotificationIcon from '../../assets/icons/notification.svg'
import ContactIcon from '../../assets/icons/contact.svg'
import InfoIcon from '../../assets/icons/info.svg'
import AngleRightIcon from '../../assets/icons/angle-right.svg'

const SettingsPageRoute = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: theme.main_bg_02}}>
            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <UserIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Account & Profile</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <SettingsIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>General</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <PadlockIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Privacy</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View onTouchEnd={() => props.navigation.navigate('AppearancePage')} style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <AppearanceIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Appearance</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <MicrophoneIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Audio & Video</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <PhoneIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Calling</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <ChatIcon width={25} height={25} fill={'none'} stroke={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Messaging</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <NotificationIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Notification</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <ContactIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Contacts</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderBottomColor: theme.line_color, borderBottomWidth: .5, justifyContent: 'space-between',  alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <InfoIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                    <Text style={{fontSize: 18, color: theme.text_color_01, fontWeight: '600', marginLeft: 15}}>Help & Feedback</Text>
                </View>
                <View>
                    <AngleRightIcon width={25} height={25} fill={theme.icon_color} />
                </View>
            </View>

        </View>
    )
})

export default SettingsPageRoute