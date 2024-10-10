import React from "react";
import { useColorScheme } from "react-native";
import colors from "../shared/colors";
import { useAppSelector } from "../shared/hooks";

const useColorThemed = () => {
    const color_mode = useAppSelector(state => state.main.color_mode)
    const deviceMode = useColorScheme() || 'light'
    return colors[color_mode == 'system' ? deviceMode : color_mode]
}

export default useColorThemed