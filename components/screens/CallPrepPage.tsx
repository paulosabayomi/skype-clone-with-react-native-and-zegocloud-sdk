import React from "react";
import { Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

const CallPrepPageRoute = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01, justifyContent: 'center', paddingHorizontal: 15}}>
            <View>
                <View onTouchEnd={() => {
                    props.navigation.navigate('Home')
                    props.navigation.navigate('CallPage', {users: []})
                }} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: theme.gradient_1, borderRadius: 40, height: 50, width: '100%', paddingVertical: 10}}>
                    <Text style={{color: 'white', fontSize: 16}}>Start new meeting</Text>
                </View>
                <View onTouchEnd={() => props.navigation.navigate('JoinWithLinkPrep')} style={{alignItems: 'center', justifyContent: 'center', marginTop: 15, borderColor: theme.inverse_white, borderWidth: 1, borderRadius: 40, height: 50, width: '100%', paddingVertical: 10}}>
                    <Text style={{color: theme.inverse_white, fontSize: 16}}>Join with link</Text>
                </View>
            </View>
        </View>
    )
})

export default CallPrepPageRoute