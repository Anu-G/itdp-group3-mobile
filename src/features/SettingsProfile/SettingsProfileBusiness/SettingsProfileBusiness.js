import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { pallete } from "../../../apps/Theme";
import { CustomPicker } from "../../../shared/components/CustomPicker/CustomPicker";
import { CustomSwitch } from "../../../shared/components/CustomSwitch/CustomSwitch";
import { InputTextNoError } from "../../../shared/components/CustomTextInput/CustomTextInput";
import { SettingsImageProfile } from "../../../shared/components/ImageProfile";
import {  Caption, Text13SemiBoldYellow, Text32, TextProfile } from "../../../shared/components/Label";
import { MainContainer } from "../../../shared/components/MainContainer";
import { ROUTE } from "../../../shared/constants/NavigationConstants";
import { useTheme } from "../../../shared/context/ThemeContext"

export const SettingsProfileBusiness = ({navigation}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [gmaps, setGmaps] = useState('');

    const dummyOpeningHour = [
        {
            id:0,
            day: 'Monday',
            openTime: '08.00',
            closeTime: '22.00',
            active: true,
        },
        {
            id:1,
            day: 'Tuesday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
        {
            id:2,
            day: 'Wednesday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
        {
            id:3,
            day: 'Thursday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
        {
            id:4,
            day: 'Friday',
            openTime: '09.00',
            closeTime: '21.00',
            active: true,
        },
        {
            id:5,
            day: 'Saturday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
        {
            id:6,
            day: 'Sunday',
            openTime: '09.00',
            closeTime: '21.00',
            active: false,
        },
    ]

    useLayoutEffect(()=>{
        navigation.setOptions({
           headerLeft: () => (
            <TouchableOpacity style={{margin: 16}} onPress={()=>navigation.goBack()}>
                <Text style={{color: '#f4f4f4', fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>
           
           ),
           headerRight: () => (
            // <View style={{margin: 16}}>
                <TouchableOpacity style={{padding: 16}} ><Text style={{color: "#FED154", fontSize: 16, fontFamily:'Poppins-Medium'}}>Send</Text></TouchableOpacity>
            // </View>
           )
        })
     })
    // const [openingHour, setOpeningHour] = useState(dummyOpeningHour);

    // const navigation = useNavigation();
    // const handleToOpenHourSettingsClick = () => {
    //     navigation.navigate(ROUTE.SETTINGS_OPEN_HOUR)
    // }

    const handleToOpenHourSettingsClick = () => {
        navigation.navigate(ROUTE.SETTINGS_OPEN_HOUR)
    }

    return(
        <MainContainer>
            <ScrollView style={{width: '100%'}}>
                <View style={styles.changeProfileCtn}>
                    <SettingsImageProfile />

                    <Pressable>
                        <Text13SemiBoldYellow text={'Change Profile Picture'}/>
                    </Pressable>
                </View>

                <View style={styles.form}>
                    <InputTextNoError
                        text={'Display Name'}
                        onChange={setName}
                        value={name}
                         />

                        
                    <InputTextNoError
                        text={'Bio'}
                        onChange={setBio}
                        value={bio}
                         />

                    
                    <View style={styles.container}>
                        <CustomPicker label="Category"/>
                    </View>

                    <InputTextNoError
                        text={'Address'}
                        onChange={setAddress}
                        value={address}
                         />

                    <InputTextNoError
                        text={'Google Maps Link'}
                        onChange={setGmaps}
                        value={gmaps}
                         />

                    <View style={[styles.container, styles.heightView]}>
                        <TextProfile text={'Open Hours:'}/>
                        {/* Nanti tampilin macem 'conclusion' kea:
                            monday: 10.00-22.00
                            Tuesday: 14.00-22.00 */}
                        
                        {dummyOpeningHour.map(dummy => {
                            if (dummy.active==true) {
                                return (
                                    <>
                                    <Caption text={`${dummy.day} \t\t ${dummy.openTime} - ${dummy.closeTime}`} style={{paddingHorizontal: 8}}/>
                                    </>
                                )
                            }
                        })}

                        
                        
                        <Pressable onPress={handleToOpenHourSettingsClick}>
                            <View style={styles.goToOtherPage}>
                                <Text32  text={'Edit Open Hours'}/>

                                <Feather 
                                    name="chevron-right"
                                    size={20}
                                    color={styles.goToOtherPage.color}
                                     />
                            </View>
                        </Pressable>
                        
                    </View>

                    

                    <View style={[styles.container, styles.heightView]}>
                        <TextProfile text={'Links'}/>

                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    form: {
       flex: 1,
    //    width: '100%',
       alignSelf: "stretch",
       margin: theme?.spacing?.m,
       alignItems: 'center',
       // justifyContent: 'center'
    },
    imageCtn : {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: theme?.pallete.yellow,
        marginBottom: theme?.spacing?.s,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    changeProfileCtn: {
        alignItems: "center",
        margin: theme?.spacing?.m,
    },
    container : {
        width: '100%',
        marginBottom: theme?.spacing?.m
    },

    heightView: {
        minHeight: 60,
    },

    goToOtherPage: {
        height: 60,
        backgroundColor: theme?.pallete?.lightBlue,
        borderRadius: theme?.radius?.s,
        justifyContent: "space-between",
        alignContent: 'stretch',
        paddingHorizontal: 12,
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: "center",
        ...theme?.text?.text32,
    }

})