import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext"

export const InputSearchComponent = ({ value, onChange, placeholder, keyboard = 'default'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <TextInput style={styles.inputSearch} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.inputSearch.color} />
    )
}

const styling = (theme) => StyleSheet.create({
    inputSearch:{
        backgroundColor:theme?.colors?.searchBackground,
        alignSelf:'stretch',
        textAlign:'center',
        height: theme?.spacing?.xxl,
        margin:theme?.spacing?.m,
        borderRadius: theme?.radius?.xl,
        ...theme?.text?.text32,
    },
    tes:{
        backgroundColor:'white',
        alignSelf:'center',
        textAlign:'center',
        borderRadius:theme?.radius?.xl,
        margin:theme?.spacing?.m,
    },
    placeholderColor: theme?.colors?.searchPlaceholder
})