import React from "react";
import { Platform, StyleSheet, Text, TextInput, View, findNodeHandle } from "react-native";
import AngleLeftIcon from '../../assets/icons/angle-left.svg'
import useColorThemed from "../../themed/useColorThemed";
import PhoneIcon from '../../assets/icons/phone.svg'
import HeartIcon from '../../assets/icons/heart.svg'
import MicrophoneIcon from '../../assets/icons/microphone.svg'
import MicrophoneSlashIcon from '../../assets/icons/mic-slash.svg'
import SpeakerSlashIcon from '../../assets/icons/speaker-slashed.svg'
import DotsIcon from '../../assets/icons/dots.svg'
import VideoIcon from '../../assets/icons/call.svg'
import VideoSlashIcon from '../../assets/icons/video-slash.svg'
import TelephoneIcon from '../../assets/icons/telephone.svg'
import SmileyIcon from '../../assets/icons/smiley-face.svg'
import PenIcon from '../../assets/icons/pen.svg'
import LinkIcon from '../../assets/icons/link.svg'
import ShareIcon from '../../assets/icons/share.svg'
import AddUserIcon from '../../assets/icons/add-user.svg'
import {PermissionsAndroid} from 'react-native';
import ZegoExpressEngine, { ZegoRoomExtraInfo, ZegoStream, ZegoTextureView, ZegoUpdateType, ZegoUser } from "zego-express-engine-reactnative";
import { ZC_TOKEN } from "../../assets/vars";
import { useAppSelector } from "../../shared/hooks";
import { store } from "../../shared/rdx-store";
import { updateDuration } from "../../shared/rdx-slice";

let timeout_set: NodeJS.Timeout | undefined = undefined
let duration_ref = 0
const startDuration = () => {
    if (timeout_set != undefined) return;
    timeout_set = setInterval(() => {
        duration_ref += 1;
        const min = Math.floor(duration_ref / 60)
        let sec = duration_ref % 60;
        // @ts-ignore
        sec = sec < 10 ? '0' + sec : sec;
        store.dispatch(updateDuration(min + ':' + sec))
    }, 1000)
}

const stopDuration = () => {
    if (timeout_set != undefined) {
        clearInterval(timeout_set)
        timeout_set = undefined
        duration_ref = 0
    }
}

const DurationComp = React.memo((props: any) => {
    const duration = useAppSelector(state => state.main.duration)
    React.useLayoutEffect(() => {
        startDuration();            
        // if (props.joined_user_list > 1) {
        // }else{
        //     stopDuration()
        // }
        () => stopDuration()
    }, [props.joined_user_list])

    return (
        <Text>
            {duration}
        </Text>
    )
})

const CallPageRoute = React.memo((props: any) => {
    const end_users = props.route.params.users
    const user_joined = props.route.params.joined
    const roomID = props.route.params.roomID
    // const chat_type = props.route.params.chat_type
    const theme = useColorThemed()
    const user_details = useAppSelector(state => state.main.user_details)
    const [joined_users, set_joined_users] = React.useState<(ZegoUser & {streamID: string})[]>([])
    /**
     * Added after the tutorial to fix the issue of the `set_joined_users` state not 
     * getting updated because the `joined_users` state was not getting updated directly
     * and I needed a ref
     */
    const joined_users_ref = React.useRef<(ZegoUser & {streamID: string})[]>([])
    const zego_play_view = React.useRef<any>(null)
    const timeout_set = React.useRef<NodeJS.Timeout | undefined>(undefined)
    // const zego_preview_view = React.useRef<any[]>([])
    // const duration_ref = React.useRef<number>(0)
    const [showVideo, setShowVideo] = React.useState<boolean>(true)
    const [enableMicrophone, setEnableMicrophone] = React.useState<boolean>(true)
    const [isSessionStarted, setIsSessionStarted] = React.useState<boolean>(false)

    
    const requestPermission = React.useCallback(() => {
        const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,
            // @ts-ignore
            PermissionsAndroid.RECORD_AUDIO);
        granted.then(async (data)=>{
        if(!data) {
        const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
            await PermissionsAndroid.requestMultiple(permissions);
            initializeSession()
        }else{
            initializeSession()
        }
        }).catch((err)=>{
            console.log(err.toString());
        })
    }, [])

    

    const initializeSession = React.useCallback(async () => {
        console.log("roomID || user_details?.phone_number", roomID || user_details?.phone_number);
        
        // @ts-ignore
        await ZegoExpressEngine.instance().loginRoom(roomID || user_details?.phone_number, {userID: user_details?.userID, userName: user_details?.userName, phoneNum: user_details?.phone_number}, {token: ZC_TOKEN, isUserStatusNotify: true});
        setIsSessionStarted(true)
        ZegoExpressEngine.instance().startPublishingStream(user_details?.streamID as string, undefined, undefined);

        let remoteViewRef = findNodeHandle(zego_play_view.current);
        // Start playing a stream

        /**
         * Added after the tutorial to fix the issue of the meeting creator 
         * not broadcasting its stream to new joiners, so the workaround I did
         * was to listen for the `roomExtraInfoUpdate` event
         */
        ZegoExpressEngine.instance().on('roomExtraInfoUpdate', (roomID: string, roomExtraInfoList: ZegoRoomExtraInfo[]) => {
            console.log("roomExtraInfoUpdate", user_details?.userName, roomID, roomExtraInfoList);

            roomExtraInfoList.forEach(info => {
                console.log("roomExtraInfoUpdate info", user_details?.userName, info, joined_users, 'ref', joined_users_ref.current);
                if (joined_users_ref.current.findIndex(user => user.userID == info.updateUser.userID) == -1 && info.updateUser.userID != user_details?.userID) {
                    set_joined_users([...joined_users_ref.current, {...info.updateUser, streamID: info.value}])
                    joined_users_ref.current.push({...info.updateUser, streamID: info.value})
                }else{
                    console.log("roomExtraInfoUpdate was not implemented", user_details?.userName,);

                }
            })
        })

        
        ZegoExpressEngine.instance().on('roomUserUpdate', (_roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]) => {
            console.log("roomUserUpdate", user_details?.userName, updateType, userList, _roomID);
            // [{"userID": "ajskslsj", "userName": "Physical iOS Device"}]
            // if (updateType == 0) {
            //     set_joined_users([...joined_users, ...userList])
            // }
            /**
             * Added after the tutorial to fix the issue of the meeting creator 
             * not broadcasting its stream to new joiners
             */
            ZegoExpressEngine.instance().setRoomExtraInfo(roomID || user_details?.phone_number, 'streamID', user_details!.streamID)

            if (updateType == 1) {
                const flat_user_list = userList.map(user => user.userID)
                const removedUsers = joined_users_ref.current.filter(user => !flat_user_list.includes(user.userID))
                console.log("removedUsers", removedUsers);
                
                set_joined_users(removedUsers)
                /**
                 * Added after the tutorial
                 */
                joined_users_ref.current = removedUsers
            }
        })

        ZegoExpressEngine.instance().on('roomStreamUpdate', async (roomID: string, updateType: ZegoUpdateType, streamList: ZegoStream[], extendedData: string) => {
            console.log("streamList: ", user_details?.userName, streamList, updateType, extendedData);
            // if (timeout_set.current == undefined && streamList.length > 0) {
            //     startDuration()
            // }
            // streamList:  [{"extraInfo": "", "streamID": "adawfwqdedce", "user": {"userID": "ajskslsj", "userName": "Physical iOS Device"}}]
            if (updateType == 0) {
                for (let i = 0; i  < streamList.length; i++) {
                    const stream = streamList[i];
                    if (joined_users_ref.current.findIndex(user => user.userID == stream.user.userID) == -1 && stream.user.userID != user_details?.userID) {
                        // let remoteViewRef = findNodeHandle(zego_play_view.current);
                        // Start playing a stream
                        // await ZegoExpressEngine.instance().startPlayingStream(stream?.streamID as string, {
                        //     'reactTag': remoteViewRef as number,
                        //     'viewMode': 0,
                        //     'backgroundColor': 0
                        // }, undefined);    
                        
    
                        // let localViewRef = findNodeHandle(zego_preview_view.current[i + 1]);
                        // ZegoExpressEngine.instance().startPreview({
                        //     'reactTag': localViewRef as number,
                        //     'viewMode': 0,
                        //     'backgroundColor': 0
                        // }, undefined);
    
                        
                        set_joined_users([...joined_users_ref.current, {...stream.user, streamID: stream.streamID}])
                        /**
                         * Added after the tutorial
                         */
                        joined_users_ref.current.push({...stream.user, streamID: stream.streamID})
                    }                
                }                
            }
            
            
        })

        // let localViewRef = findNodeHandle(zego_preview_view.current[0]);
        /**
         * uncommented after the tutorial
         */
        ZegoExpressEngine.instance().startPreview({
            'reactTag': remoteViewRef as number,
            'viewMode': 0,
            'backgroundColor': 0
        }, undefined);
        // }, [joined_users.current, timeout_set.current, zego_play_view.current, zego_preview_view.current])
    }, [joined_users, timeout_set.current, zego_play_view.current, joined_users_ref.current ])

    const endCall = React.useCallback((navigate?: boolean) => {
        console.log("I will end the call now");        
        ZegoExpressEngine.instance().stopPreview(undefined);
        ZegoExpressEngine.instance().stopPublishingStream(undefined);
        ZegoExpressEngine.instance().stopPlayingStream(user_details?.streamID as string);
        ZegoExpressEngine.instance().logoutRoom(roomID || user_details?.phone_number as unknown as string);
        stopDuration()
        if (navigate) props.navigation.goBack()
    }, [])

    const handleStartPreview = React.useCallback(async (e: any, data: ZegoUser & {streamID: string}) => {
        let localViewRef = findNodeHandle(e);
        await ZegoExpressEngine.instance().startPlayingStream(data?.streamID as string, {
            'reactTag': localViewRef as number,
            'viewMode': 0,
            'backgroundColor': 0
        }, undefined); 
        ZegoExpressEngine.instance().startPreview({
            'reactTag': localViewRef as number,
            'viewMode': 0,
            'backgroundColor': 0
        }, undefined);

        /**
         * Added after the tutorial to force the default preview video
         * on physical iOS to be redisplayed after starting to preview a remote video
         */
        let remoteViewRef = findNodeHandle(zego_play_view.current);
        ZegoExpressEngine.instance().startPreview({
            'reactTag': remoteViewRef as number,
            'viewMode': 0,
            'backgroundColor': 0
        }, undefined);
    }, [zego_play_view.current])


    React.useLayoutEffect(() => {
        // props.navigation.setOptions({
        //     headerLeft() {
        //         return (
        //             <View onTouchEnd={() => props.navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center'}}>
        //                 <View><AngleLeftIcon width={40} height={40} fill={theme.inverse_white} stroke={theme.inverse_white} /></View>
        //                 <View>
        //                     <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.text_color_01}}>Meeting with Paulos</Text>
        //                     <Text style={{color: theme.text_color_02}}>
        //                         {joined_users.current.length + 1} participants | {duration}
        //                     </Text>
        //                 </View>
        //             </View>
        //         )
        //     },
        //     headerRight() {
        //         return (
        //             <View style={{paddingRight: 10}}>
        //                 <View onTouchEnd={() => endCall(true)} style={{backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 50}}>
        //                     <PhoneIcon width={15} height={15} fill={'white'} />
        //                     <Text style={{color: 'white', marginLeft: 8}}>End Call</Text>
        //                 </View>
        //             </View>
        //         )
        //     }
        // })

        user_joined && handleStartSession();
        


        () => endCall();    
    // }, [zego_play_view.current, zego_preview_view.current, joined_users.current])
    }, [])

    const handleStartSession = React.useCallback(() => {
        if (Platform.OS == 'android') {
            requestPermission()
        }else{
            console.log("platform is ios");
            initializeSession()
        }
    }, [zego_play_view.current, joined_users])

    const handleEnableMic = React.useCallback(() => {
        setEnableMicrophone(!enableMicrophone);
        ZegoExpressEngine.instance().muteMicrophone(enableMicrophone)
    }, [enableMicrophone])

    const handleEnableVideo = React.useCallback(() => {
        setShowVideo(!showVideo)
        ZegoExpressEngine.instance().enableCamera(!showVideo, undefined)
    }, [showVideo])

    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: theme.main_bg_01, paddingHorizontal: 0, paddingTop: 0}}>
            <View style={isSessionStarted ? styles.headerConnected : styles.headerNotConnected}>
                <View onTouchEnd={() => !isSessionStarted ? props.navigation.goBack() : props.navigation.navigate('ChatPage', {roomID: roomID || user_details?.phone_number})} style={{flexDirection: 'row', alignItems: 'center', }}>
                    <View>
                        <AngleLeftIcon width={40} height={40} fill={theme.inverse_white} stroke={theme.inverse_white} />
                    </View>
                    {
                        isSessionStarted &&
                        <View>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.text_color_01}}>Meeting with Paulos</Text>
                            <Text style={{color: theme.text_color_02}}>
                                {joined_users.length + 1} participants | 
                                
                                {
                                    isSessionStarted &&
                                    <DurationComp />
                                }
                            </Text>
                        </View>
                    }
                </View>

                {
                    isSessionStarted &&
                    <View style={{paddingRight: 15}}>
                        <View onTouchEnd={() => endCall(true)} style={{backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 50}}>
                            <PhoneIcon width={15} height={15} fill={'white'} />
                            <Text style={{color: 'white', marginLeft: 8}}>End Call</Text>
                        </View>
                    </View>
                }
            </View>

            {
                // !showVideo ?
                // <View style={{backgroundColor: theme.skype_lighter_blue, alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 8}}>
                //     <View style={{width: 150, height: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 130, backgroundColor: theme.skype_light_blue}}>
                //         <TelephoneIcon width={80} height={80} fill={theme.gradient_1} />
                //     </View>
                // </View>:
                // <ZegoTextureView ref={zego_play_view} style={{backgroundColor: theme.skype_lighter_blue, alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 8}} />
                // // <ZegoTextureView ref={(e) => {zego_preview_view.current.push(e); handleStartPreview(e)}} style={{backgroundColor: theme.skype_lighter_blue, alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 8}} />
                // <ZegoTextureView ref={(e) => {handleStartPreview(e)}} style={{backgroundColor: theme.skype_lighter_blue, alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 8}} />
            }
            <ZegoTextureView ref={zego_play_view} style={[Platform.OS == 'ios' && {backgroundColor: theme.skype_lighter_blue,}, isSessionStarted ? styles.videoConnected : styles.videoLarge]} />
            {/* <ZegoTextureView ref={zego_play_view}/> */}

            {
                joined_users.map(user => 
                    // <ZegoTextureView ref={(e) => {zego_preview_view.current.push(e); handleStartPreview(e)}} style={{backgroundColor: theme.skype_lighter_blue, alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 8}} />
                    <ZegoTextureView /** ===> Added after the tutorial */ key={Math.floor(Math.random() * 99999999).toString()} /** Added after the tutorial <==== */ ref={(e) => {handleStartPreview(e, user)}} style={[Platform.OS == 'ios' && {backgroundColor: theme.skype_lighter_blue,}, isSessionStarted ? styles.videoConnected : styles.videoLarge]} />
                )
            }

            {
                isSessionStarted &&
                <View style={{justifyContent: 'space-between', paddingHorizontal: 15, flexDirection: 'row', paddingBottom: 30, paddingTop: 20}}>
                    <View onTouchEnd={handleEnableVideo} style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.gradient_1}}>
                        {
                            showVideo ?
                            <VideoIcon width={26} height={26} fill={'white'} />:
                            <VideoSlashIcon width={26} height={26} fill={'white'} />                        
                        }
                    </View>
                    <View onTouchEnd={handleEnableMic} style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.gradient_1}}>
                        {
                            enableMicrophone ?
                            <MicrophoneIcon width={26} height={26} fill={'white'} />:
                            <MicrophoneSlashIcon width={26} height={26} fill={'white'} />
                        }
                    </View>
                    <View style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.input_bg}}>
                        <HeartIcon width={40} height={40} stroke={theme.inverse_white} />
                    </View>
                    <View style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.input_bg}}>
                        <SpeakerSlashIcon width={26} height={26} fill={theme.inverse_white} />
                    </View>
                    <View style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.input_bg}}>
                        <DotsIcon width={26} height={26} fill={theme.inverse_white} />
                    </View>
                </View>
            }
            
            {
                !isSessionStarted && 
                <View style={{zIndex: 8, position: "absolute", bottom: 0, left: 0, width: '100%'}}>
                    <View style={{marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View onTouchEnd={handleEnableMic} style={{width: 55, height: 55, marginRight: 10, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.inverse_black}}>
                            {
                                enableMicrophone ?
                                <MicrophoneIcon width={26} height={26} fill={theme.inverse_white} />:
                                <MicrophoneSlashIcon width={26} height={26} fill={theme.inverse_white} />
                            }
                        </View>
                        <View onTouchEnd={handleEnableMic} style={{width: 55, height: 55, borderRadius: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.inverse_black}}>
                            {
                                showVideo ?
                                <VideoIcon width={26} height={26} fill={theme.inverse_white} />:
                                <VideoSlashIcon width={26} height={26} fill={theme.inverse_white} />                        
                            }
                        </View>
                    </View>

                    <View style={{height: 350, width: '100%', paddingVertical: 20, paddingHorizontal: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15, backgroundColor: theme.main_bg_01}}>
                        <View>
                            <Text style={{fontSize: 24, fontWeight: '700', color: theme.inverse_white}}>Your meeting is ready!</Text>
                        </View>
                        <View style={{marginTop: 15, position: 'relative', justifyContent: 'center'}}>
                            <SmileyIcon style={{position: "absolute", zIndex: 4, left: 10}} width={26} height={26} fill={theme.icon_color} />
                            <TextInput
                                style={{height: 45, color: theme.text_color_02, width: '100%', fontSize: 18, paddingVertical: 15, paddingHorizontal: 40, backgroundColor: theme.input_bg, borderRadius: 10}}
                                placeholder="Type a meeting name (optional)"
                                placeholderTextColor={theme.text_color_02}
                            />
                            <PenIcon style={{position: "absolute", right: 10}} width={26} height={26} fill={theme.icon_color} />
                        </View>
                        <View style={{marginTop: 15, position: 'relative', justifyContent: 'center'}}>
                            <LinkIcon style={{position: "absolute", zIndex: 4, left: 10}} width={26} height={26} stroke={theme.icon_color} />
                            <TextInput
                                style={{height: 45, color: theme.text_color_02, textAlign: 'center', width: '100%', fontSize: 18, padding: 15, backgroundColor: theme.input_bg, borderRadius: 40}}
                                defaultValue={"join.skype.com/" + (roomID || user_details?.phone_number)}
                            />
                            <ShareIcon style={{position: "absolute", right: 10}} width={26} height={26} fill={theme.icon_color} />
                        </View>
                        <View style={{alignItems: 'center', marginTop: 25, justifyContent: 'center', flexDirection: 'row',}}>
                            <AddUserIcon style={{}} width={26} height={26} fill={theme.gradient_2} />
                            <Text style={{fontSize: 18, marginLeft: 5, fontWeight: '500', color: theme.gradient_2}}>Add contacts</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25}}>
                            <View style={{width: '48%', padding: 10, borderWidth: 1, borderRadius: 50, borderColor: theme.inverse_white}}>
                                <Text style={{color: theme.inverse_white, fontSize: 20, textAlign: 'center'}}>Open chat</Text>
                            </View>
                            <View onTouchEnd={handleStartSession} style={{width: '48%', padding: 12, backgroundColor: theme.gradient_2, borderRadius: 50,}}>
                                <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Start now</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
})

const styles = StyleSheet.create({
    videoLarge: {
        height: '100%',
        width: '100%',
    },
    videoConnected: {
        // alignItems: 'center', 
        // justifyContent: 'center', 
        flex: 1, 
        borderRadius: 8,
        marginHorizontal: 10,
    },
    headerConnected: {
        flexDirection: 'row', 
        marginTop: 45, 
        marginBottom: 15,
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    headerNotConnected: {
        flexDirection: 'row', 
        position: 'absolute',
        top: 45,
        left: 0,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'space-between',
        zIndex: 4
    }
})

export default CallPageRoute