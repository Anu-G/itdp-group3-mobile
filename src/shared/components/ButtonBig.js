import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ButtonBigComponent = ({label,onClick,style={},icon=null}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <TouchableOpacity style={[styles.bigButton, style]} onPress={onClick}>
            <Text style={styles.bigButtonText} >{label}</Text>
        </TouchableOpacity>
    )
}

const styling = (theme) => StyleSheet.create({
    bigButton:{
        alignItems: 'center',
        backgroundColor: theme?.colors?.button,
        padding: theme?.spacing?.s,
        borderRadius: theme?.radius?.xl,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: theme?.spacing?.xl       
    },
    bigButtonText:theme?.text?.bigButtonText
})