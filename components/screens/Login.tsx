import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import UserIcon from '../../assets/icons/user.svg'
import PlusIcon from '../../assets/icons/plus.svg'
import QRIcon from '../../assets/icons/qr-code.svg'

import users from "../../shared/users";
import { useAppDispatch } from "../../shared/hooks";
import { updateUserDetails } from "../../shared/rdx-slice";
import { TUserDetails } from "../../shared/types";

const LoginRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const dispatch = useAppDispatch()

    const login = React.useCallback((user_details: TUserDetails) => {
        dispatch(updateUserDetails(user_details))
        props.navigation.replace('Home')
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: theme.skype_green, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: '80%'}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: theme.skype_light_blue, fontSize: 24, fontWeight: '700'}}>Welcome to Skype</Text>
                    <Text style={{color: 'white', }}>Sign in with...</Text>
                </View>

                <View style={{marginTop: 15,}}>

                    {
                        users.map(user => 
                            <View onTouchEnd={() => login(user)} key={Math.floor(Math.random() * 987656789)} style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.line_color}}>
                                <View style={{backgroundColor: theme.skype_lighter_blue, width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                                    <UserIcon width={22} height={22} fill={'white'} />
                                </View>
                                <View style={{marginLeft: 15}}>
                                    <Text style={{fontSize: 18, color: 'white'}}>{user.userName}</Text>
                                    <Text style={{fontSize: 14, color: 'white'}}>{user.email}</Text>
                                </View>
                            </View>
                        )
                    }
                    

                    <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.line_color}}>
                        <View style={{backgroundColor: theme.general_purple_blue, width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <PlusIcon width={22} height={22} stroke={'white'} />
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Text style={{fontSize: 18, color: 'white'}}>Add another account</Text>
                        </View>
                    </View>

                </View>

            </View>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: 30, alignItems: 'center'}}>
                <QRIcon width={20} height={20} fill={'white'} />
                <Text style={{color: 'white', marginLeft: 10}}>Sign in with QR code</Text>
            </View>
        </View>
    )
})

// const styles = StyleSheet.create({
//     main: {

//     }
// })

export default LoginRoute