import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { TextProfile } from "./Label";

export const InputPassword = ({ value, onChange, placeholder, keyboard = 'default' }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
 
    const [hide, setHide] = useState(true);
    const [icon, setIcon] = useState('eye-off');
 
    const changeIcon = _ => {
       setHide(!hide);
       setIcon(prevState => prevState === 'eye' ? 'eye-off' : 'eye');
    }
 
    return (
        <View>
            <TextProfile text={'Password'}/>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, ...styles.container }}>
                <TextInput style={styles.inputPass} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} secureTextEntry={hide} selectionColor={styles.inputPass.color} />
                <Pressable onPress={changeIcon}>
                    <Feather name={icon} size={20} color={styles.inputPass.color} />
                </Pressable>
            </View>
        </View>
       
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        height: theme?.spacing?.xxl,
        borderBottomColor: theme?.colors?.inputBorder,
        width: '100%',
        marginBottom: theme?.spacing?.m,
    },
    inputPass: {
        width: '90%',
        paddingHorizontal: theme?.spacing?.s,
        ...theme?.text?.text32,
    },
    placeholderColor: theme?.colors?.whiteTrp
})