import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import { AppFAB } from "../../shared/Reusable";

const cardWidth = Dimensions.get('screen').width / 2.5

const PhoneTab = React.memo((props: any) => {
    const theme = useColorThemed()

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_01,}}>
            <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10,}}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10, borderColor: theme.gradient_2, borderWidth: 1, borderRadius: 8, height: 45, backgroundColor: theme.input_bg}}>
                    <Text style={{color: theme.inverse_white, fontSize: 16}}>Credit balance: $0.00</Text>
                </View>

                <ScrollView horizontal={true} style={{marginTop: 10}} showsHorizontalScrollIndicator={false}>
                    <View style={{marginRight: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: cardWidth, height: 100, backgroundColor: 'purple'}}>
                        <View>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>International calls subscriptions</Text>
                            <Text style={{fontSize: 12, color: 'white',}}>100+ countries</Text>
                        </View>
                    </View>
                    <View style={{marginRight: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: cardWidth, height: 100, backgroundColor: theme.gradient_2}}>
                        <View>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>Skype Credit</Text>
                            <Text style={{fontSize: 12, color: 'white',}}>Call any phone</Text>
                        </View>
                    </View>
                    <View style={{marginRight: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: cardWidth, height: 100, backgroundColor: theme.general_purple_blue}}>
                        <View>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>Skype Credit</Text>
                            <Text style={{fontSize: 12, color: 'white',}}>Call any phone</Text>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <AppFAB handlePressed={() => props.navigation.navigate('CallPad')} />

        </View>
    )
})

export default PhoneTab