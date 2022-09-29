import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Keyboard, Pressable, StyleSheet, View } from "react-native";
import { ButtonMediumComponent } from "../../shared/components/ButtonMedium";
import { InputTextPassword, InputTextWithError } from "../../shared/components/CustomTextInput/CustomTextInput";
import { AuthExtLabel, Title1 } from "../../shared/components/Label";
import { MainContainer } from "../../shared/components/MainContainer";
import { useTheme } from "../../shared/context/ThemeContext";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useDep } from '../../shared/context/DependencyContext'
import { useViewState } from "../../shared/hooks/ViewState";
import { checkErr } from "../../utils/CommonUtils";
import { Snackbar } from "react-native-paper";
import { useAuth } from "../../shared/context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

    const [disable, setDisable] = useState(true)
    const { viewState, setLoading, setError } = useViewState();
    const [visible, setVisible] = useState(false);

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

    const checkTrue = () => {
        if (username === '' || email === '' || password === '' || conPassword === '') {
            setDisable(true)
        } else if (errorusername !== '' || erroremail !== '' || errorpassword !== '' || errorconPassword !== '') {
            setDisable(true)
        } else { setDisable(false) }
    }

    useEffect(() => {
        checkPassword()
    }, [password])

    useEffect(() => {
        checkConfirmPassword()
    }, [conPassword, password])

    useEffect(() => {
        checkTrue()
    }, [email, username, password, conPassword, errorusername, erroremail, errorpassword, errorconPassword])

    //service
    const navigation = useNavigation();
    const { authService } = useDep()
    const { onLogin } = useAuth();

    const handleSignUpClick = async () => {
        Keyboard.dismiss();

        try {
            const response = await authService.doRegister({
                user_name: username,
                email: email,
                password: password
            });

            if (response.status === 200) {
                if (await onLogin({ email: email, password: password })) {
                    navigation.replace(ROUTE.SETTINGS_NON_BUSINESS, {
                        prevPage: 'signUp'
                    })
                }
            }
        } catch (e) {
            setError(checkErr(e));
        }

    }

    const handleSignInClick = () => {
        navigation.replace(ROUTE.LOGIN)
    }


    //handle CHange
    const handleEmailChange = (text) => {
        setEmail(text);
        checkEmail(text);
    }

    const onDismissSnackBar = _ => {
        setVisible(false);
        if (viewState.error !== null) {
            setError(null);
        };
    };

    return (
        <MainContainer>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                style={{ alignSelf: 'stretch' }}
                keyboardShouldPersistTaps={'handled'}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
            >
                <View style={styles.header}>
                    <Title1 label={'Sign Up'} />
                </View>

                <View style={styles.form}>
                    <InputTextWithError
                        text={'Username'}
                        onChange={setUsername}
                        value={username} />

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


                    <InputTextPassword
                        text="Confirm Password"
                        value={conPassword}
                        onChange={setConPassword}
                        error={errorconPassword} />

                    <View style={styles.buttonContainer}>
                        <ButtonMediumComponent label={'Continue'} disable={disable} onClick={handleSignUpClick} />
                    </View>

                    <View style={styles.addAuth}>
                        <Pressable onPress={handleSignInClick} >
                            <AuthExtLabel text1={`Have an account?`} text2={'Sign in'} />
                        </Pressable>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: theme?.spacing?.xl,
    },
    form: {
        flex: 7,
        // width: '100%',
        alignSelf: 'stretch',
        marginHorizontal: theme?.spacing?.m,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    buttonContainer: {
        paddingTop: theme?.spacing?.xl,
    },
    addAuth: {
        padding: theme?.spacing?.m,
    }

})