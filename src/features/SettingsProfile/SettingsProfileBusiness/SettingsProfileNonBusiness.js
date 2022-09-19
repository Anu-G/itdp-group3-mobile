import { useState } from "react";
import { Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { pallete } from "../../../apps/Theme";
import { InputTextNoError } from "../../../shared/components/CustomTextInput/CustomTextInput";
import { SettingsImageProfile } from "../../../shared/components/ImageProfile";
import {  Text13SemiBoldYellow } from "../../../shared/components/Label";
import { MainContainer } from "../../../shared/components/MainContainer";
import { useTheme } from "../../../shared/context/ThemeContext"

export const SettingsProfileBusiness = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

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