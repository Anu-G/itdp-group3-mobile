import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext"
import { CaptionColor, TextProfile } from "./Label";

export const InputTextActive = ({ text, value, onChange, placeholder, keyboard = 'default', isCorrect = false, style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput style={[styles.input,styles.inputActive,styles.inputWithError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
         { isCorrect 
            ? <CaptionColor text={`${text} is valid`} style={styles.inputError} openStatus={isCorrect}/>
            : <CaptionColor text={`${text} is invalid`} style={styles.inputError} openStatus={isCorrect}/>}
      </View>
   );
}

export const InputTextInactive = ({ text, value, onChange, placeholder, keyboard = 'default', isCorrect = false, style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput style={[styles.input,styles.inputInactive,styles.inputWithError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
         { isCorrect 
            ? <CaptionColor text={`${text} is valid`} style={styles.inputError} openStatus={isCorrect}/>
            : <CaptionColor text={`${text} is invalid`} style={styles.inputError} openStatus={isCorrect}/>}
      </View>
   );
}

export const InputTextActiveNoError = ({ text, value, onChange, placeholder, keyboard = 'default', style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput style={[styles.input,styles.inputActive,styles.inputNoError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
      </View>
   );
}

export const InputTextInactiveNoError = ({ text, value, onChange, placeholder, keyboard = 'default', style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput style={[styles.input,styles.inputInactive,styles.inputNoError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
      </View>
   );
}

export const InputTextActiveSmallSize = ({ text, value, onChange, placeholder, keyboard = 'default', isCorrect = false, style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput style={[styles.inputSmall,styles.inputActive,styles.inputWithError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
         { isCorrect 
            ? <CaptionColor style={styles.inputErrorSmall} openStatus={isCorrect}/>
            : <CaptionColor text={`${text} is invalid`} style={[styles.inputErrorSmall, {color: '#FE5454'}]} openStatus={isCorrect}/>}
      </View>
   );
}

const styling = (theme) => StyleSheet.create({
   inputContainer: {
      marginHorizontal:theme?.spacing?.m
   },
   input:{
      paddingHorizontal: theme?.spacing?.s,
      height: theme?.spacing?.xxl,
      marginTop: theme?.spacing?.m,
      borderBottomWidth: 1,
      ...theme?.text?.text32,
   },
   inputSmall:{
      paddingHorizontal: theme?.spacing?.s,
      height: theme?.spacing?.xl,
      marginTop: theme?.spacing?.xxs,
      borderBottomWidth: 1,
      ...theme?.text?.caption,
   },
   inputActive: {
      borderBottomColor: theme?.colors?.inputBorder,
   },
   inputInactive: {
      borderBottomColor: theme?.colors?.inputBorderInactive,
   },
   inputWithError: {
      marginBottom: theme?.spacing?.xs,
   },
   inputNoError: {
      marginBottom: theme?.spacing?.m,
   },
   inputError: {
      marginBottom:theme?.spacing?.m,
      alignSelf:'center'
   },
   inputErrorSmall: {
      marginBottom:theme?.spacing?.xxs,
      alignSelf:'center',
      ...theme?.text?.textComment
   },
   placeholderColor: theme?.colors?.whiteTrp
});