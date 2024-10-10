import React from "react";
import { ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

import TimesIcon from '../../assets/icons/times.svg';
import CameraIcon from '../../assets/icons/camera.svg'
import AngleDownIcon from '../../assets/icons/angle-down.svg'
import ConeSpeakerIcon from '../../assets/icons/cone-phone.svg'
import PenIcon from '../../assets/icons/pen.svg'
import FriendsIcon from '../../assets/icons/friends.svg'
import SkypeSIcon from '../../assets/icons/skype-logo-s.svg'
import SkypePhoneIcon from '../../assets/icons/skype-num.svg'
import UserIcon from '../../assets/icons/user.svg'
import BookmarksIcon from '../../assets/icons/bookmark.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import BulbIcon from '../../assets/icons/bulb.svg'
import SignOutIcon from '../../assets/icons/logout.svg'
import QRCodeIcon from '../../assets/icons/qr-code.svg'

const OptionsPanelRoute = React.memo((props: any) => {
    const theme = useColorThemed()

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <View style={{marginLeft: 10}} onTouchEnd={() => props.navigation.goBack()}>
                        <TimesIcon width={22} height={22} fill={theme.inverse_white} />
                    </View>
                )
            }
        })
    }, [theme])

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01}}>
            <ScrollView style={{paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 60, height: 60, backgroundColor: theme.gradient_2, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <CameraIcon width={14} height={14} fill={'red'} />
                        </View>

                        <View style={{marginLeft: 20}}>
                            <Text style={{color: theme.text_color_01, fontWeight: '600', fontSize: 18}}>Paulos Ab</Text>
                            <Text style={{color: theme.text_color_01, fontSize: 12}}>paulos@y.com</Text>
                            <Text style={{color: theme.gradient_2, fontSize: 12, marginTop: 10}}>My Microsoft account</Text>
                        </View>
                    </View>

                    <View style={{padding: 8, borderRadius: 50, backgroundColor: theme.list_bg_01}}>
                        <QRCodeIcon width={25} height={25} fill={theme.icon_color} />
                    </View>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 12, height: 12, borderRadius: 50, backgroundColor: 'lightgreen'}} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18}}>Active</Text>
                        </View>
                    </View>
                    <View>
                        <AngleDownIcon width={14} height={14} fill={theme.icon_color} />
                    </View>
                </View>

                <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ConeSpeakerIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_02, fontSize: 18}}>Share what you are up to</Text>
                        </View>
                    </View>
                    <View>
                        <PenIcon width={14} height={14} fill={theme.icon_color} />
                    </View>
                </View>

                <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FriendsIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18, fontWeight: '600'}}>Invite Friends</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{backgroundColor: theme.list_bg_01, paddingVertical: 6}}>
                    <Text style={{textTransform: 'uppercase', color: theme.text_color_02, fontWeight: '600'}}>Skype Phone</Text>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SkypeSIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Skype to Phone</Text>
                            <Text style={{color: theme.text_color_02, fontSize: 12,}}>Reach people anywhere at low rates</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SkypePhoneIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Skype Number</Text>
                            <Text style={{color: theme.text_color_02, fontSize: 12,}}>Keep your personal number private</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{backgroundColor: theme.list_bg_01, paddingVertical: 6}}>
                    <Text style={{textTransform: 'uppercase', color: theme.text_color_02, fontWeight: '600'}}>Manage</Text>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <UserIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Skype profile</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <BookmarksIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Bookmarks</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View onTouchEnd={() => props.navigation.navigate('SettingsPage')} style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SettingsIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Settings</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <BulbIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>What's new</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

                <View style={{paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SignOutIcon width={16} height={16} fill={theme.icon_color} />
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18,}}>Sign out</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
})

export default OptionsPanelRoute