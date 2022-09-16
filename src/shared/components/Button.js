import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext"

export const ButtonComponent = ({ label, onClick, style = {}, icon = null }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <TouchableOpacity style={[styles.button, style]} onPress={onClick}>
         <Text style={styles.buttonText} >{label}</Text>
      </TouchableOpacity>
   )
}

const styling = (theme) => StyleSheet.create({
   button: {
      width:80,
      height:24,
      alignItems: 'center',
      backgroundColor: theme?.colors?.button,
      borderRadius: theme?.radius?.xl,
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: theme?.spacing?.xl,
   },
   buttonText: theme?.text?.buttonText
})