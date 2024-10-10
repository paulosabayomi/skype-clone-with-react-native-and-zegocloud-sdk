import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import useColorThemed from '../../themed/useColorThemed'
import LeftArrowIcon from '../../assets/icons/arrow-left.svg'
import VideoCallIcon from '../../assets/icons/video-call.svg'
import PlusIcon from '../../assets/icons/plus.svg'
import MicrophoneIcon from '../../assets/icons/microphone.svg'
import CameraIcon from '../../assets/icons/camera.svg'
import StarsIcon from '../../assets/icons/stars.svg'
import SmileyIcon from '../../assets/icons/smiley-face.svg'
import SendIcon from '../../assets/icons/send.svg'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import ZegoExpressEngine, { ZegoBroadcastMessageInfo } from 'zego-express-engine-reactnative'
import ZegoRealTimeSequentialDataManager from 'zego-express-engine-reactnative'
import { updateChatRoom } from '../../shared/rdx-slice'

const ChatPageRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const [chatText, setChatText] = React.useState('')
    const roomID = props.route.params?.roomID || '';
    const user_details = useAppSelector(state => state.main.user_details)
    const [messages, setMessages] = React.useState<ZegoBroadcastMessageInfo[]>([])
    const chatRooms = useAppSelector(state => state.main.chat_rooms)
    const dispatch = useAppDispatch()

    const handleConnect = React.useCallback(async () => {
        // @ts-ignore
        await ZegoExpressEngine.instance().loginRoom(roomID, {userID: user_details?.userID, userName: user_details?.userName, phoneNum: user_details?.phone_number}, {token: ZC_TOKEN, isUserStatusNotify: true});
        ZegoExpressEngine.instance().on('IMRecvBroadcastMessage', (roomID: string, messageList: ZegoBroadcastMessageInfo[]) => {
            // messageList
                // message: string;
                // /** message id */
                // messageID: number;
                // /** Message send time, UNIX timestamp, in milliseconds. */
                // sendTime: number;
                // /** Message sender.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc. */
                // fromUser: ZegoUser;
            console.log("message", messageList);
            
            setMessages(messageList)
            setTimeout(() => {
                handleUpdateChatRoom()
            }, 0);
        })
    }, [user_details])

    const handleDisconnect = React.useCallback(() => {
        ZegoExpressEngine.instance().logoutRoom(roomID)
    }, [])

    const handleBroadcastMessgae = React.useCallback(() => {
        ZegoExpressEngine.instance().sendBroadcastMessage(roomID, chatText)
        setChatText('')
    }, [chatText])

    const handleUpdateChatRoom = React.useCallback(() => {
        if (chatRooms.findIndex((room) => room.roomID == roomID) > -1) {
            // roomID: string;
            // title: string;
            // lastMessage: string;
            // lastTime: string;
            const room = chatRooms.find((room) => room.roomID == roomID)
            room!.lastMessage = messages.at(-1)?.message as string
            room!.lastTime = messages.at(-1)?.sendTime.toString() as string
            dispatch(updateChatRoom(chatRooms))
        }else{
            dispatch(updateChatRoom([...chatRooms, {
                roomID,
                title: 'Message in ' + roomID,
                lastMessage:  messages.at(-1)?.message as string,
                lastTime:  messages.at(-1)?.sendTime.toString() as string
            }]))
            
        }
    }, [chatRooms, messages])

    React.useLayoutEffect(() => {

        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <View style={{marginLeft: 10}} onTouchEnd={() => props.navigation.goBack()}>
                        <LeftArrowIcon width={30} height={30} fill={theme.inverse_white} />
                    </View>
                )
            },
            headerTitle: () => {
                return <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 40, backgroundColor: theme.gradient_1}}>
                        <Text style={{color: theme.gradient_2}}>MW</Text>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{color: theme.inverse_white, fontWeight: '600', fontSize: 18}}>Meeting with Paulos</Text>
                        <Text style={{color: theme.text_color_02}}>1 participants</Text>
                    </View>
                </View>
            },
            headerRight: () => {
                return <View style={{marginRight: 15}}>
                    <VideoCallIcon fill={theme.inverse_white} width={25} height={25} />
                </View>
            }
        })

        handleConnect();

        () => handleDisconnect()
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: theme.main_bg_01}}>
            <ScrollView contentContainerStyle={{justifyContent: 'flex-end', paddingHorizontal: 10, paddingVertical: 20, height: '100%'}}>

                <View style={{padding: 20, alignItems: 'center', borderRadius: 12, backgroundColor: theme.list_bg_01, marginHorizontal: 20, marginVertical: 15}}>
                    <View style={{height: 40, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 50, backgroundColor: theme.input_bg}}>
                        <Text style={{color: theme.text_color_02, fontSize: 16}}>join.skype.com/{roomID}</Text>
                    </View>
                    <Text style={{marginTop: 10, fontSize: 16, textAlign: 'center', color: theme.text_color_01}}>Invite Skype contacts or share the link</Text>

                    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 60, width: '50%', height: 40, backgroundColor: theme.input_bg, marginTop: 15}}>
                        <Text style={{color: theme.inverse_white, fontWeight: '600', fontSize: 16}}>Invite</Text>
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 60, width: '50%', height: 40, backgroundColor: theme.gradient_2, marginTop: 15}}>
                        <Text style={{color: theme.inverse_white, fontWeight: '600', fontSize: 16}}>Add people</Text>
                    </View>
                </View>

                {
                    messages.map(message => 
                        <View style={{alignSelf: message.fromUser.userID == user_details?.userID ? 'flex-end' : 'flex-start'}}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={{color: theme.text_color_02}}>{message.sendTime}</Text>
                            </View>
                            
                            <View style={[{padding: 6, borderRadius: 8, width: 'auto', backgroundColor: theme.gradient_1}, message.fromUser.userID == user_details?.userID ? {borderBottomRightRadius: 1,} : {borderBottomLeftRadius: 1,}]}>
                                <Text style={{color: 'white', fontSize: 16}}>{message.message}</Text>
                            </View>
                        </View>
                    )
                }
                
            </ScrollView>

            <View style={{paddingHorizontal: 15, paddingBottom: 30, alignItems: 'center', flexDirection: 'row'}}>
                <View style={{width: 45, marginRight: 10, alignItems: 'center', justifyContent: 'center', height: 45, backgroundColor: theme.gradient_1, borderRadius: 60, }}>
                    <PlusIcon width={25} height={25} stroke={'white'} />
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <TextInput 
                        style={{backgroundColor: theme.input_bg, padding: 10, fontSize: 18, color: theme.text_color_02, borderRadius: 50, height: 45,}}
                        placeholder='Type a message'
                        placeholderTextColor={theme.text_color_02}
                        multiline={true}
                        defaultValue={chatText}
                        onChangeText={(text: string) => setChatText(text)}
                    />
                    <SmileyIcon style={{position: 'absolute', right: 10}} width={25} height={25} fill={theme.icon_color} />
                </View>

                {
                    chatText.length == 0 ?
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <View style={{marginRight: 10}}>
                            <MicrophoneIcon width={22} height={22} fill={theme.icon_color} />
                        </View>
                        <View style={{marginRight: 10}}>
                            <CameraIcon width={22} height={22} fill={theme.icon_color} />
                        </View>
                        <View>
                            <StarsIcon width={22} height={22} fill={theme.icon_color} />
                        </View>
                    </View>:
                    <View onTouchEnd={handleBroadcastMessgae} style={{width: 45, marginLeft: 10, alignItems: 'center', justifyContent: 'center', height: 45, backgroundColor: theme.gradient_1, borderRadius: 60, }}>
                        <SendIcon width={25} height={25} fill={'white'} />
                    </View>
                }
            </View>
        </View>
    )
})

export default ChatPageRoute