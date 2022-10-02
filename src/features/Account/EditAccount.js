import View from "@expo/html-elements/build/primitives/View";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { InputTextNoError, InputTextWithError } from "../../shared/components/CustomTextInput/CustomTextInput";
import { MainContainer } from "../../shared/components/MainContainer";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useDep } from "../../shared/context/DependencyContext";
import { useTheme } from "../../shared/context/ThemeContext"

export const EditAccount = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [email, setEmail] = useState({});
    const [phoneNumber, setPhoneNumber] = useState({});
    const [emailCr, setEmailCr] = useState('');
    const [phoneNumberCr, setPhoneNumberCr] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false);

    const checkEmail = (text) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const mail = String(text)

        const result = mail.toLowerCase().match(re);

        if (!result) {
            setEmailCr('E-mail is invalid!');
        } else {
            setEmailCr('')
        }
    }

    const checkPhoneNumber = (text) => {
        const phoneEval = /^\d+$/;
        const res = phoneEval.test(text)
        if (res) {
            setPhoneNumberCr('')
        } else {
            setPhoneNumberCr('Phone Number is invalid!')
        }
    }

    const handleEmailChange = (text) => {
        setEmail(prevState => ({ ...prevState, text }));
        checkEmail(text);
    }

    const handlePhoneNumberChange = (text) => {
        setPhoneNumber(prevState => ({ ...prevState, text }));
        checkPhoneNumber(text);
    }

    const handleSaveStatus = () => {
        if (!loading && phoneNumberCr == '' && emailCr == '') {
            setSaveStatus(false)
        } else {
            setSaveStatus(true)
        }
    }

    useEffect(() => {
        handleSaveStatus()
    }, [loading, phoneNumber, email, phoneNumberCr, emailCr])

    //navigation ==================================================================================
    const navigator = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'} />,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} disabled={saveStatus} onPress={() => handleSavePress()} ><Text style={{ color: theme.state.style.colors.button, fontSize: 16 }}>Save</Text></TouchableOpacity>)
        })
    }, [navigation, saveStatus])

    const handleSavePress = () => {
        saveData();
    }

    //service =====================================================================================
    const { settingAccountService } = useDep()
    const user = useSelector(state => state.auth)

    const saveData = async () => {
        setLoading(true)
        try {
            const response = await settingAccountService.doUpdate({
                "account_id": user.accountId,
                "user_name": `${user.userName}`,
                "email": `${email.text}`,
                "phone_number": `${phoneNumber.text}`
            })
            if (response) {
                navigator.navigate(ROUTE.ACCOUNT, { refresh: Date.now })
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainContainer>
            <View style={styles.mainCtn}>
                <InputTextWithError
                    text={'E-mail'}
                    value={email}
                    onChange={handleEmailChange}
                    style={styles.inputCtn}
                    error={emailCr} />
                <InputTextWithError
                    text={'Phone Number'}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    style={styles.inputCtn}
                    error={phoneNumberCr} />
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    mainCtn: {
        flex: 1,
        flexDirection: 'column',
        margin: theme?.spacing?.m,
        alignSelf: 'stretch',
    },
    inputCtn: {
        marginBottom: theme?.spacing?.m,
    },
})