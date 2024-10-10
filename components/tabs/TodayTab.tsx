import React from "react";
import { ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

const TodayTab = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01}}>
            <ScrollView style={{padding: 15}}>
                <Text style={{fontSize: 25, textAlign: 'center', fontWeight: '700', color: theme.gradient_2}}>News News News</Text>

            </ScrollView>
        </View>
    )
})

export default TodayTab