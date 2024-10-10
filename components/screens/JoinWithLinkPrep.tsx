import React from "react";
import { Text, TextInput, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

const JoinWithLinkPrepRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const [meetingLink, setMeetingLink] = React.useState<string>('')

    const handleJoin = React.useCallback(() => {
        props.navigation.navigate('Home')
        props.navigation.navigate('CallPage', {roomID: meetingLink, joined: true})
    }, [meetingLink])

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01, justifyContent: 'center', paddingHorizontal: 15}}>
            <View>
                <View>
                    <Text style={{marginBottom: 20, textAlign: 'center', color: theme.text_color_01, fontSize: 22}}>Join a meeting with one click</Text>
                    <Text style={{marginBottom: 5, textAlign: 'center', color: theme.text_color_02, fontSize: 18}}>
                        Enter a meeting link or start your own meeting
                    </Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 15, justifyContent: 'center', backgroundColor: theme.gradient_1, borderRadius: 40, height: 50, width: '100%', paddingVertical: 10}}>
                    <TextInput 
                        style={{width: '100%', color: theme.text_color_02, padding: 15, fontSize: 18, height: 55, borderRadius: 8, backgroundColor: theme.input_bg}}
                        placeholder="https://join.skype.com/code"
                        placeholderTextColor={theme.text_color_02}
                        defaultValue={meetingLink}
                        onChangeText={(text: string) => setMeetingLink(text)}
                    />
                </View>
                <View onTouchEnd={handleJoin} style={{alignItems: 'center', opacity: meetingLink.length == 0 ? 0.4 : 1, marginTop: 15, justifyContent: 'center', backgroundColor: theme.gradient_1, borderRadius: 40, height: 50, width: '100%', paddingVertical: 10}}>
                    <Text style={{color: 'white', fontSize: 16}}>Join</Text>
                </View>
                <View onTouchEnd={() => {
                    props.navigation.navigate('Home')
                    props.navigation.navigate('CallPage', {users: []})
                }} style={{alignItems: 'center', justifyContent: 'center', marginTop: 15, borderColor: theme.inverse_white, borderWidth: 1, borderRadius: 40, height: 50, width: '100%', paddingVertical: 10}}>
                    <Text style={{color: theme.inverse_white, fontSize: 16}}>Start your own meeting</Text>
                </View>
            </View>
        </View>
    )
})

export default JoinWithLinkPrepRoute