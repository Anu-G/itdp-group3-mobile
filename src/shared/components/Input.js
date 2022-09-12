import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext"

export const InputText = ({ value, onChange, placeholder, keyboard = 'default' }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.inputPass.color} />
   );
}

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16, marginHorizontal: 40, borderBottomWidth: 1, ...styles.container }}>
         <TextInput style={styles.inputPass} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} secureTextEntry={hide} selectionColor={styles.inputPass.color} />
         <Pressable onPress={changeIcon}>
            <Feather name={icon} size={20} color={styles.inputPass.color} />
         </Pressable>
      </View>
   )
}

const styling = (theme) => StyleSheet.create({
   input: {
      height: theme?.spacing?.xxl,
      marginVertical: theme?.spacing?.m,
      marginHorizontal: theme?.spacing?.xxl,
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors?.inputBorder,
      ...theme?.text?.text32,
   },
   container: {
      height: theme?.spacing?.xxl,
      borderBottomColor: theme?.colors?.inputBorder,
   },
   inputPass: {
      width: '90%',
      ...theme?.text?.text32,
   },
   placeholderColor: theme?.colors?.whiteTrp
});