const gradients = {
    gradient_1: '#0e72cf',
    gradient_2: '#00bcf2'
}
const shared = {
    skype_green: '#002e43',
    skype_light_blue: '#1bc7f2',
    skype_lighter_blue: '#b0e6f9',
    general_purple_blue: '#081e40'
}
export default {
    light: {
        purple_blue: '#e0faff',
        icon_color: '#2b2c33',
        header_text_color: '#0e72cf',
        main_bg_01: '#ffffff',
        main_bg_02: '#ffffff',
        text_color_01: '#212121',
        text_color_02: '#787878',
        list_bg_01: '#f0f4f8',
        line_color: '#292929',
        inverse_black: '#ffffff',
        inverse_white: '#000000',
        input_bg: '#e1e1e1',
        ...gradients,
        ...shared
    },
    dark: {
        purple_blue: '#081e40',
        icon_color: '#cccccc',
        header_text_color: '#00bcf2',
        main_bg_01: '#141414',
        main_bg_02: '#1f1f1f',
        text_color_01: '#e1e1e1',
        text_color_02: '#acacac',
        list_bg_01: '#292929',
        line_color: '#3c3e40',
        inverse_black: '#000000',
        inverse_white: '#ffffff',
        input_bg: '#1f1f1f',
        ...gradients,
        ...shared
    }
}