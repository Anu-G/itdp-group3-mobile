import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ButtonMediumComponent = ({label,onClick,style={},icon=null}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <TouchableOpacity style={[styles.mediumButton, style]} onPress={onClick}>
            <Text style={styles.mediumButtonText} >{label}</Text>
        </TouchableOpacity>
    )
}

const styling = (theme) => StyleSheet.create({
    mediumButton:{
        width:200,
        height:36,
        alignItems: 'center',
        backgroundColor: theme?.colors?.button,
        padding: theme?.spacing?.s,
        borderRadius: theme?.radius?.xl,
        // alignSelf: 'stretch',
        // flexDirection: 'row',
        justifyContent: 'center',
        // margin: theme?.spacing?.xl       
    },
    mediumButtonText:theme?.text?.mediumButtonText
})