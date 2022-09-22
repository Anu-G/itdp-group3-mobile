import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { pallete } from "../../../apps/Theme";
import { InputTextNoError } from "../../../shared/components/CustomTextInput/CustomTextInput";
import { SettingsImageProfile } from "../../../shared/components/ImageProfile";
import {  Text13SemiBoldYellow } from "../../../shared/components/Label";
import { MainContainer } from "../../../shared/components/MainContainer";
import { useTheme } from "../../../shared/context/ThemeContext"

export const SettingsProfileNonBusiness = ({navigation}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');


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
  
  
    return(
        <MainContainer>
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

                </View>
            
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
    }
})