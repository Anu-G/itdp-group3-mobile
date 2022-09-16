import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ButtonMediumComponent } from "../../shared/components/ButtonMedium";
import { InputTextPassword, InputTextWithError } from "../../shared/components/CustomTextInput/CustomTextInput";
import { AuthExtLabel, Title1 } from "../../shared/components/Label";
import { MainContainer } from "../../shared/components/MainContainer";
import { useTheme } from "../../shared/context/ThemeContext";

export const SignUp = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [errorusername, seterrorUsername] = useState('');
    const [erroremail, seterrorEmail] = useState('');
    const [errorpassword, seterrorPassword] = useState('');
    const [errorconPassword, seterrorConPassword] = useState('');

    const checkEmail = (text) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(text)

        const result = mail.toLowerCase().match(re);

        console.log(mail,result)

        if (!result) {
            if(mail.length<1){
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
        if (password.length < 8 && password.length>0) {
            seterrorPassword('Minimal 8 character')
        } else if(password.length ===0){
            seterrorPassword('')
        } else {
            seterrorPassword('')
        }
    }

    const checkConfirmPassword = () => {
        if (conPassword.length == 0) {
            seterrorConPassword('')
        } else if (conPassword == password) {
            seterrorConPassword('')
        } else if (password != conPassword) {
            seterrorConPassword('Password missmatch')
        } else {
            seterrorConPassword('')
        }
    }

    useEffect(()=>{
        checkPassword()
    }, [password])
    
    useEffect(()=>{
        checkConfirmPassword()
    },[conPassword])

    //handle CHange
    const handleEmailChange = (text) => {
        setEmail(prevState => ({...prevState, text}));
        checkEmail(text);
    }


    return(
        <MainContainer>
            <View style={styles.header}>
                <Title1 label={'Sign Up'} />
            </View>

            <View style={styles.form}>
                <InputTextWithError
                    text={'Username'} 
                    onChange={setUsername}
                    value={username}/>

                <InputTextWithError
                    text={'Email'} 
                    placeholder='ex: johndoe@mail.com'
                    onChange={(text)=>{
                        handleEmailChange(text)
                    }}
                    value={email}
                    keyboard='email-address'
                    error={erroremail}/>

                <InputTextPassword 
                    value={password}
                    onChange={(text)=>{
                        setPassword(text)
                        checkPassword()
                    }}
                    error={errorpassword}/>


                <InputTextPassword 
                    text="Confirm Password"
                    value={conPassword}
                    onChange={setConPassword}
                    error={errorconPassword}
                    placeholder='Confirm Password'/>

            <View style={styles.buttonContainer}>
               <ButtonMediumComponent label={'Login'}/>
            </View>  

            <View style={styles.addAuth}>
               <Pressable>
                  <AuthExtLabel text1={`Have an account?`} text2={'Sign in'}/>
               </Pressable>
            </View>
            </View>

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
      flex: 7,
      // width: '100%',
      alignSelf: 'stretch',
      margin: theme?.spacing?.m,
      alignItems: 'center',
      // justifyContent: 'center'
   },
   buttonContainer : {
      paddingTop: theme?.spacing?.xl,
   },
   addAuth: {
      padding: theme?.spacing?.m,
   }

})