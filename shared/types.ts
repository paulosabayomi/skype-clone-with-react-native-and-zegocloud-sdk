export interface IMainState {
    isLoggedIn: boolean;
    user_details: TUserDetails | undefined;
    duration: string;
    chat_rooms: TChatRoom[];
    color_mode: TColorMode;
}

export type TUserDetails = {
    userID: string;
    userName: string;
    streamID: string;
    email: string;
    phone_number: string;
}

export type TChatRoom = {
    roomID: string;
    title: string;
    lastMessage: string;
    lastTime: string;
}

export type TColorMode = 'light' | 'dark' | 'system'