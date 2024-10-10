import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import NumberPadIcon from '../assets/icons/number-pad.svg'
import useColorThemed from "../themed/useColorThemed";

export const AppFAB = React.memo((props: {handlePressed: (e: GestureResponderEvent) => void; icon?: any}) => {
    const theme = useColorThemed()
    return (
        <FAB
            icon={() => props.icon ? props.icon : <NumberPadIcon fill={'white'} />}
            style={[styles.fab, {backgroundColor: theme.gradient_1, zIndex: 5}]}
            onPress={props.handlePressed}
        />
    )
})

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 90,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})