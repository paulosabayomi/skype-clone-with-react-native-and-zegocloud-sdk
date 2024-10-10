import React, { ComponentProps } from "react";
import { Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

import TimesIcon from '../../assets/icons/times.svg';

const NotificationPageRoute = React.memo((props: any) => {
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
    }, [])

    return (
        <View style={{backgroundColor: theme.main_bg_01, flex: 1}}>
            <View style={{marginTop: '15%', paddingHorizontal: 20}}>
                <Text style={{textAlign: 'center', color: theme.gradient_2, fontSize: 26, fontWeight: '600', marginBottom: 15}}>No new notifications</Text>
                <Text style={{textAlign: 'center', color: theme.text_color_02}}>Check back to see new @ mentions, reactions, quotes and much more.</Text>

            </View>
        </View>
    )
})

export default NotificationPageRoute