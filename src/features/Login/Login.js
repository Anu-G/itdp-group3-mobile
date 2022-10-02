import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { ButtonMediumComponent } from "../../shared/components/ButtonMedium";
import { InputTextPassword, InputTextWithError } from "../../shared/components/CustomTextInput/CustomTextInput";
import { AuthExtLabel, Text32, Title1 } from "../../shared/components/Label";
import { MainContainer } from "../../shared/components/MainContainer";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useAuth } from "../../shared/context/AuthContext";
import { useTheme } from "../../shared/context/ThemeContext";
import { useViewState } from "../../shared/hooks/ViewState";
import { checkErr } from "../../utils/CommonUtils";

export const Login = _ => {
   // theme
   const theme = useTheme();
   const styles = styling(theme.state.style);

   // state
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { viewState, setLoading, setError } = useViewState();
   const [visible, setVisible] = useState(false);
   const [disable, setDisable] = useState(true)


   const [erroremail, seterrorEmail] = useState('');
   const [errorpassword, seterrorPassword] = useState('');

   const onDismissSnackBar = _ => {
      setVisible(false);
      if (viewState.error !== null) {
         setError(null);
      };
   };

   const checkEmail = (text) => {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      const mail = String(text)

      const result = mail.toLowerCase().match(re);

      if (!result) {
         if (mail.length < 1) {
            seterrorEmail('')

         }
         else {
            seterrorEmail('E-mail is invalid!');

         }
      } else {
         seterrorEmail('')
      }
   }

   const checkPassword = () => {
      if (password.length < 8 && password.length > 0) {
         seterrorPassword('Minimal 8 character')
      } else if (password.length === 0) {
         seterrorPassword('')
      } else {
         seterrorPassword('')
      }
   }

   const checkTrue = () => {
      if (email.length == 0 || password.length == 0) {
         setDisable(true)
      } else if (erroremail !== '' && errorpassword !== '') {
         setDisable(true)
      } else if (erroremail === '' && errorpassword === '') {
         setDisable(false)
      } else {
         setDisable(true)
      }
   }

   useEffect(() => {
      checkPassword()
   }, [password])

   useEffect(() => {
      checkTrue()
   })

   // service
   const navigation = useNavigation();
   const { onLogin } = useAuth();

   const doLogin = async _ => {
      Keyboard.dismiss();
      try {
         if (email.text === '' && password === '') {
            throw new Error('Please input your user E-mail and password');
         } else {
            if (await onLogin({ email: email.text, password: password })) {
               navigation.replace(ROUTE.MAIN)
            }
         }
      } catch (e) {
         setError(checkErr(e));
      }
   }

   const handleSignUpClick = () => {
      navigation.replace(ROUTE.SIGNUP)

   }

   const handleEmailChange = (text) => {
      setEmail(prevState => ({ ...prevState, text }));
      checkEmail(text);
   }

   return (
      <MainContainer>
         <View style={styles.header}>
            <Title1 label={'TokTok Login'} />
         </View>
         <View style={styles.form}>
            <InputTextWithError
               text={'Email'}
               placeholder='ex: johndoe@mail.com'
               onChange={(text) => {
                  handleEmailChange(text)
               }}
               value={email}
               keyboard='email-address'
               error={erroremail} />

            <InputTextPassword
               value={password}
               onChange={(text) => {
                  setPassword(text)
                  checkPassword()
               }}
               error={errorpassword} />

            <View style={styles.buttonContainer}>
               <ButtonMediumComponent label={'Login'} onClick={doLogin} disable={disable} />
            </View>

            <View style={styles.addAuth}>
               <Pressable onPress={handleSignUpClick}>
                  <AuthExtLabel text1={`Doesn't have an account?`} text2={'Sign Up'} />
               </Pressable>
            </View>
         </View>

         {viewState.error !== null && !visible ? setVisible(true) : null}
         {viewState.error !== null && <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>{viewState.error}</Snackbar>}
      </MainContainer>
   )
}

const styling = (theme) => StyleSheet.create({
   header: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: theme?.spacing?.m,
   },
   form: {
      flex: 2,
      // width: '100%',
      alignSelf: 'stretch',
      margin: theme?.spacing?.m,
      alignItems: 'center',
      // justifyContent: 'center'
   },
   buttonContainer: {
      paddingTop: theme?.spacing?.xl,
   },
   addAuth: {
      padding: theme?.spacing?.m,
   }
})