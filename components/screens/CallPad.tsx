import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import useColorThemed from "../../themed/useColorThemed";
import AnngleDownIcon from '../../assets/icons/angle-down.svg'
import TimesIcon from '../../assets/icons/times.svg'
import SettingsIcon from '../../assets/icons/settings.svg'
import AngleRightIcon from '../../assets/icons/angle-right.svg'
import WorldIcon from '../../assets/icons/world.svg'
import PhoneBubbleIcon from '../../assets/icons/phone-bubble.svg'
import PhoneIcon from '../../assets/icons/phone.svg'
import DeleteIcon from '../../assets/icons/delete.svg'

const CallPadRoute = React.memo((props: any) => {
    const theme = useColorThemed()
    const [phoneNumber, setPhoneNumber] = React.useState<string>('')

    const updateNum = React.useCallback((num: string) => {
        setPhoneNumber(phoneNumber+num)
    }, [phoneNumber])

    const removeNum = React.useCallback(() => {
        setPhoneNumber(phoneNumber.slice(0, phoneNumber.length - 1))
    }, [phoneNumber])

    const handleCallUser = React.useCallback(() => {
        props.navigation.navigate('CallPage', {users: [], roomID: 'p-' + phoneNumber})
    }, [phoneNumber])

    return (
        <View style={{backgroundColor: 'red', flex: 1,}}>
            <View style={{backgroundColor: theme.gradient_1, height: '45%', paddingTop: StatusBar.currentHeight || 70}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
                    <View onTouchEnd={() => props.navigation.goBack()}>
                        <TimesIcon width={25} height={25} fill={'white'} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                            Countries and Regions
                        </Text>
                        <AnngleDownIcon style={{marginLeft: 10}} width={18} height={18} fill={'white'} />
                    </View>
                    <View>
                        <SettingsIcon width={25} height={25} fill={'white'} />
                    </View>
                </View>

                <View style={{marginTop: 20, paddingHorizontal: 10, flex: 1,}}>
                    <Text style={{fontSize: 35, color: 'white', fontWeight: '700'}}>
                        {phoneNumber.length == 0 ? 'Phone number' : phoneNumber}
                    </Text>
                </View>
            </View>

            <View style={{backgroundColor: theme.gradient_1, borderTopColor: 'white', borderTopWidth: .17, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between'}}>
                <Text style={{color: 'white'}}>Set your Caller ID so people know it's you who's calling</Text>
                <AngleRightIcon width={16} height={16} fill={'white'} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.main_bg_01, paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{marginRight: 15}}>
                    <WorldIcon width={60} height={60} fill={theme.gradient_1} />
                </View>
                <View style={{flexShrink: 1}}>
                    <Text style={{color: theme.text_color_02}}>Skype to Phone</Text>
                    <Text style={{color: theme.text_color_02}}>Call phone numbers at affordable rates</Text>
                </View>
                <View style={{marginLeft: 15}}>
                    <View style={{backgroundColor: theme.gradient_1, borderRadius: 40, padding: 10}}>
                        <Text style={{color: 'white'}}>Get credit</Text>
                    </View>
                </View>
            </View>

            <View style={{flex: 1, backgroundColor: theme.main_bg_01}}>
                <View style={styles.numberGroup}>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('1')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>1</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('2')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>2</Text>
                        <Text style={[{color: theme.text_color_02}]}>abc</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('3')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>3</Text>
                        <Text style={[{color: theme.text_color_02}]}>def</Text>
                    </View>
                </View>

                <View style={styles.numberGroup}>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('4')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>4</Text>
                        <Text style={[{color: theme.text_color_02}]}>ghi</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('5')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>5</Text>
                        <Text style={[{color: theme.text_color_02}]}>jkl</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('6')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>6</Text>
                        <Text style={[{color: theme.text_color_02}]}>mno</Text>
                    </View>
                </View>

                <View style={styles.numberGroup}>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('7')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>7</Text>
                        <Text style={[{color: theme.text_color_02}]}>pqrs</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('8')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>8</Text>
                        <Text style={[{color: theme.text_color_02}]}>tuv</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('9')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>9</Text>
                        <Text style={[{color: theme.text_color_02}]}>wxyz</Text>
                    </View>
                </View>

                <View style={styles.numberGroup}>
                    <View style={styles.numberItemContainer}>
                        <Text style={[[styles.numberItem, {color: theme.text_color_01}], {color: theme.text_color_02}]}>,</Text>
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={() => updateNum('0')}>
                        <Text style={[styles.numberItem, {color: theme.text_color_01}]}>0</Text>
                        <Text style={[{color: theme.text_color_02}]}>+</Text>
                    </View>
                    <View style={styles.numberItemContainer}>
                        <Text style={[[styles.numberItem, {color: theme.text_color_01}], {color: theme.text_color_02}]}>#</Text>
                    </View>
                </View>

                <View style={[styles.numberGroup, {alignItems: 'center', marginTop: 10}]}>
                    <View style={styles.numberItemContainer}>
                        <PhoneBubbleIcon width={25} height={25} fill={theme.text_color_02} />
                    </View>
                    <View onTouchEnd={handleCallUser} style={[{padding: 20, borderRadius: 50, opacity: phoneNumber.length < 2 ? .4 : 1,  backgroundColor: theme.gradient_1}]}>
                        <PhoneIcon width={25} height={25} fill={'white'} />
                    </View>
                    <View style={styles.numberItemContainer} onTouchEnd={removeNum}>
                        <DeleteIcon width={25} height={25} fill={theme.text_color_02} />
                    </View>
                </View>

            </View>

        </View>
    )
})

const styles = StyleSheet.create({
    numberGroup: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    numberItemContainer: {
        width: '33.33%',
        paddingVertical: 5,
        alignItems: 'center'
    },
    numberItem: {
        fontSize: 38, 
        color: 'black', 
        fontWeight: '700'
    },
    numberItemSubText: {
    }
})

export default CallPadRoute