import React from "react";
import { Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";

import CheckmarkIcon from '../../assets/icons/checkmark.svg'
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { updateColorMode } from "../../shared/rdx-slice";
import { TColorMode } from "../../shared/types";
import storage, { color_mode_db_name } from "../../shared/storage";

const AppearancePageRoute = React.memo((props: any) => {
    const theme = useColorThemed();
    const color_mode = useAppSelector(state => state.main.color_mode)
    const dispatch = useAppDispatch()

    const handleSetColorMode = React.useCallback((mode: TColorMode) => {
        console.log(mode);
        dispatch(updateColorMode(mode))
        storage.save({key: color_mode_db_name, data: mode})
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: theme.main_bg_02, paddingHorizontal: 10, paddingVertical: 20}}>
            <View>
                <Text style={{color: theme.text_color_02, fontSize: 16, fontWeight: '700', textTransform: 'uppercase'}}>Modes</Text>
            </View>

            <View onTouchEnd={() => handleSetColorMode('light')} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: .5}}>
                <View style={[{borderColor: theme.text_color_02, alignItems: 'center', justifyContent: 'center', borderWidth: 1, backgroundColor: theme.main_bg_01, width: 25, height: 25, borderRadius: 50}, color_mode == 'light' && {backgroundColor: theme.gradient_2}]}>
                    {
                        color_mode == 'light' &&
                        <CheckmarkIcon width={14} height={14} stroke={theme.inverse_white} />
                    }
                </View>
                <View>
                    <Text style={{color: theme.text_color_01, marginLeft: 20, fontWeight: '600', fontSize: 18}}>Light</Text>
                </View>
            </View>

            <View onTouchEnd={() => handleSetColorMode('dark')} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomColor: theme.line_color, borderBottomWidth: .5}}>
                <View style={[{borderColor: theme.text_color_02, alignItems: 'center', justifyContent: 'center', borderWidth: 1, backgroundColor: theme.main_bg_01, width: 25, height: 25, borderRadius: 50}, color_mode == 'dark' && {backgroundColor: theme.gradient_2}]}>
                    {
                        color_mode == 'dark' &&
                        <CheckmarkIcon width={14} height={14} stroke={theme.inverse_white} />
                    }
                </View>
                <View>
                    <Text style={{color: theme.text_color_01, marginLeft: 20, fontWeight: '600', fontSize: 18}}>Dark</Text>
                </View>
            </View>

            <View onTouchEnd={() => handleSetColorMode('system')} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15,}}>
                <View style={[{borderColor: theme.text_color_02, alignItems: 'center', justifyContent: 'center', borderWidth: 1, backgroundColor: theme.main_bg_01, width: 25, height: 25, borderRadius: 50}, color_mode == 'system' && {backgroundColor: theme.gradient_2}]}>
                    {
                        color_mode == 'system' &&
                        <CheckmarkIcon width={14} height={14} stroke={theme.inverse_white} />
                    }
                </View>
                <View>
                    <Text style={{color: theme.text_color_01, marginLeft: 20, fontWeight: '600', fontSize: 18}}>Use system settings</Text>
                </View>
            </View>
        </View>
    )
})

export default AppearancePageRoute