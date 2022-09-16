import { useState } from "react";
import { Pressable, StyleSheet, View, TextInput, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { CaptionColor, TextProfile } from "../Label";

export const InputTextNoError = ({ text, value, onChange, placeholder=text, keyboard = 'default', style }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
 
    return (
       <View style={styles.inputContainer}>
          <TextProfile text={text}/>
          <InputTextOnly
            onChange={onChange} 
            placeholder={placeholder} 
            value={value} 
            keyboard={keyboard}/>
       </View>
    );
 }

 export const InputTextWithError = ({ text, value, onChange, placeholder=text, keyboard = 'default', style, error = ''}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
   

    return (
        <View style={styles.inputContainer}>
           <TextProfile text={text}/>
           <InputTextOnly
            onChange={onChange} 
            placeholder={placeholder} 
            value={value} 
            keyboard={keyboard}/>
           { error.length==0 
              ? <View style={{height: 24}}/>
              : <CaptionColor text={`${error}`} style={styles.inputError} openStatus={false}/>}
        </View>
     );
 }

 export const InputTextPassword = ({ text='Password',value, onChange, placeholder=text, error = 'error'}) =>{
    const theme = useTheme();
    const styles = styling(theme.state.style);
 
    const [hide, setHide] = useState(true);
    const [icon, setIcon] = useState('eye-off');
 
    const changeIcon = _ => {
       setHide(!hide);
       setIcon(prevState => prevState === 'eye' ? 'eye-off' : 'eye');
    }

    return(
        <View style={styles.inputContainer}>
        <TextProfile text={text}/>
            <View style={styles.passwordContainer}>
                <InputTextOnly 
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    secureText={hide}>
                </InputTextOnly> 
                <View style={styles.iconContainer}>
                    <Pressable onPress={changeIcon}>
                        <Feather name={icon} size={20} color={styles.inputPass.color} />
                </Pressable>
                </View>
                
            </View>

            { error.length==0 
                ? <View style={{height: 24}}/>
                : <CaptionColor text={`${error}`} style={styles.inputError} openStatus={false}/>}
        </View>
    )
    
 }

 export const InputTextOnly = ({value, onChange, placeholder, keyboard = 'default', secureText = false }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [inputStyle, setInputStyle] = useState([styles.input, styles.inputInactive]);

    const onFocus = () => {
        setInputStyle([styles.input, styles.inputActive])
    }

    const onBlur = () => {
        setInputStyle([styles.input, styles.inputInactive])
    }

    return (
        <View style={styles.inputContainer}>
           <TextInput 
             style={inputStyle} 
             placeholder={placeholder} 
             placeholderTextColor={theme.state.darkMode ? styles.placeholderColor : null} 
             onChangeText={onChange} 
             value={value} 
             keyboardType={keyboard} 
             onFocus = {onFocus}
             onBlur = {onBlur}
             secureTextEntry= {secureText}
             />
        </View>
     );

 }

 const styling = (theme) => StyleSheet.create({
    inputContainer: {
        // flex: 5,
    //    marginHorizontal:theme?.spacing?.m,
       width: '100%',
    //    alignSelf: "stretch",
    //    marginBottom: theme?.spacing?.m,
    },
    input:{
        paddingHorizontal: theme?.spacing?.s,
        height: theme?.spacing?.xxl,
        // marginTop: theme?.spacing?.sm,
        // marginBottom: theme?.spacing?.m,
        borderBottomWidth: 1,
        width: '100%',
        ...theme?.text?.text32,
    },
    inputActive: {
        borderBottomWidth: 2,
        borderBottomColor: theme?.colors?.inputBorder,
    },
    inputInactive: {
        borderBottomWidth: 1,
        borderBottomColor: theme?.colors.inputBorderInactive
    },
    inputContainerWithError: {
        // flex: 5,
    //    marginHorizontal:theme?.spacing?.m,
       width: '100%',
    //    alignSelf: "stretch",
       marginBottom: theme?.spacing?.m,
       height: 85,

    },
    inputError: {
    //    marginBottom:theme?.spacing?.m,
       alignSelf:'center'
    },
    errorContainer : {
        height: 32
    },
    inputPass: {
        width: '100%',
        paddingTop: theme?.spacing?.s,
        ...theme?.text?.text32,
        // height: theme?.spacing?.xxl,
    },
    passwordContainer: {
        borderBottomColor: theme?.colors?.inputBorder,
        width: Dimensions.get('window').width - 52,
        // marginBottom: theme?.spacing?.m,
        flexDirection: 'row', 
        alignItems: "center",

    },
    placeholderColor: theme?.colors?.whiteTrp,
    iconContainer:{
        height: 32,
        alignItems: "center",
    }
});