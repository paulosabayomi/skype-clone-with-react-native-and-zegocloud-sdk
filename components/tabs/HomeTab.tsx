import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import { AppFAB } from "../../shared/Reusable";
import WriteIcon from "../../assets/icons/edit.svg"
import { useAppSelector } from "../../shared/hooks";

const HomeTab = React.memo((props: any) => {
    const theme = useColorThemed()
    const chatRooms = useAppSelector(state => state.main.chat_rooms)

    return (
        <View style={{backgroundColor: theme.main_bg_01, flex: 1, position: 'relative'}}>

            <ScrollView style={{padding: 10}}>
                <View onTouchEnd={() => props.navigation.navigate('ChatPage', {roomID: 'hello'})} key={Math.floor(Math.random() * 876567)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', 
                            backgroundColor: theme.skype_lighter_blue, width: 60, height: 60,
                            borderRadius: 12,
                            }}>
                                <Image source={require('../../assets/icons/ms-copilot.png')} style={{width: 60, height: 60, borderRadius: 12}} resizeMode='contain' />
                        </View>
                    </View>
                    <View style={{flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 10, justifyContent: 'space-between'}}>
                        <View style={{borderBottomColor: theme.line_color,}}>
                            <Text style={{color: theme.text_color_01, fontSize: 18, marginBottom: 6}}>Copilot</Text>
                            <Text style={{color: theme.text_color_02, fontSize: 14}}>Waiting for your input</Text>
                        </View>

                        <View>
                            <Text style={{color: theme.text_color_02,}}>Yesterday</Text>
                        </View>
                    </View>
                </View>
                {
                    chatRooms.map(room => 
                        <View onTouchEnd={() => props.navigation.navigate('ChatPage', {roomID: 'hello'})} key={Math.floor(Math.random() * 876567)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{alignItems: 'center', justifyContent: 'center', 
                                    backgroundColor: theme.skype_lighter_blue, width: 60, height: 60,
                                    borderRadius: 90,
                                    }}>
                                    <Text>{room.title.split(' ').slice(2).map(t => t[0].toUpperCase())}</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 10, justifyContent: 'space-between'}}>
                                <View style={{borderBottomColor: theme.line_color,}}>
                                    <Text style={{color: theme.text_color_01, fontSize: 18, marginBottom: 6}}>{room.title}</Text>
                                    <Text style={{color: theme.text_color_02, fontSize: 14}}>{room.lastMessage}</Text>
                                </View>

                                <View>
                                    <Text style={{color: theme.text_color_02,}}>{room.lastTime}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
            <AppFAB icon={<WriteIcon fill={'white'} />} handlePressed={() => props.navigation.navigate('NewChatPage')} />
        </View>
    )
})

export default HomeTab