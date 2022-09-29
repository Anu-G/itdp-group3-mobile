import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext"
import { CaptionColor, TextProfile } from "./Label";

export const InputTextActive = ({ text, value, onChange, placeholder, keyboard = 'default', isCorrect = false, style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput 
            style={[styles.input,styles.inputActive,styles.inputWithError]} 
            placeholder={placeholder} 
            placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} 
            onChangeText={onChange} 
            value={value} 
            keyboardType={keyboard}  />
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
         <TextInput 
            style={[styles.input,styles.inputInactive,styles.inputWithError]} 
            placeholder={placeholder} 
            placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} 
            onChangeText={onChange} 
            value={value} 
            keyboardType={keyboard} 
             />
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

export const InputTextInactiveNoError = ({ text, value, onChange, placeholder, keyboard = 'default', style, editable=true }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={style}>
         <TextProfile text={text}/>
         <TextInput editable={editable} style={[styles.input,styles.inputInactive,styles.inputNoError]} placeholder={placeholder} placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} onChangeText={onChange} value={value} keyboardType={keyboard} selectionColor={styles.input.color} />
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

export const InputOnly = ({ id, label, handleOnChange, value, style }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   <View style={styles.inputClassSrc} >
      <Text style={styles.inputAreaSearch} placeholder={label} type={"text"} id={id} onChange={handleOnChange} value={value} />
   </View>
};

const styling = (theme) => StyleSheet.create({
   inputContainer: {
      width: '100%',
   },
   input:{
      paddingHorizontal: theme?.spacing?.s,
      height: theme?.spacing?.xxl,
      borderBottomWidth: 1,
      width: '100%',
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
   inputClassSrc: {
      flex: 1,
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
      color: '#f4f4f4',
   },
   inputAreaSearch: {
      padding: 8,
      height: 24,
      borderRadius: 10,
      backgroundColor: '#f4f4f4',
      fontSize: 14,
      fontWeight: 200,
      color: '#3B4046',
   },
   placeholderColor: theme?.colors?.whiteTrp
});