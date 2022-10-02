import View from "@expo/html-elements/build/primitives/View";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { InputTextNoError, InputTextPassword, InputTextWithError } from "../../shared/components/CustomTextInput/CustomTextInput";
import { MainContainer } from "../../shared/components/MainContainer";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useDep } from "../../shared/context/DependencyContext";
import { useTheme } from "../../shared/context/ThemeContext"
import { useViewState } from "../../shared/hooks/ViewState";
import { checkErr } from "../../utils/CommonUtils";

export const ChangePassword = ({navigation}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const [password, setPassword] = useState('');
    const [passwordCek, setPasswordCek] = useState('');
    const [passwordCr, setPasswordCr] = useState('');
    const [passwordCekCr, setPasswordCekCr] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveStatus,setSaveStatus] = useState(false);

    const checkPassword = (text) => {
        if (text.length < 8) {
            setPasswordCr('Password must at least 8 character')
        } else {
            setPasswordCr('')
        }
    }

    const checkPasswordCek = (text) => {
        if (text.length < 8) {
            setPasswordCekCr('Password must at least 8 character')
        } else {
            setPasswordCekCr('')
        }
    } 

    const handlePasswordChange = (text) => {
        setPassword(text);
        console.log(text);
        checkPassword(text);
    }

    const handlePasswordCekChange = (text) => {
        setPasswordCek(text)
        checkPasswordCek(text);
    }

    const handleSaveStatus = () => {
        if (!loading && passwordCr == '' && passwordCekCr == '') {
            setSaveStatus(false)
        } else {
            setSaveStatus(true)
        }
    }

    useEffect(()=>{
        handleSaveStatus()
    },[loading,password,passwordCek,passwordCekCr,passwordCr])

    //navigation ==================================================================================
    const navigator = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <Text style={{ color: styles.iconColor.color, fontSize: 16 }}>Cancel</Text>,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} disabled={saveStatus} onPress={()=>handleSavePress()} ><Text style={{ color: theme.state.style.pallete.yellow, fontSize: 16, fontWeight: 'bold' }}>Save</Text></TouchableOpacity>)
        })
    }, [navigation, saveStatus])

    const handleSavePress = () => {
        if (password == passwordCek) {
            saveData();
        } else {
            const err = Error('Password does not match')
            setError(checkErr(err));
        }
    }

    //service =====================================================================================
    const {settingAccountService} = useDep()
    const user = useSelector(state=>state.auth)
    const {viewState,setError} = useViewState();
    const [visible, setVisible] = useState(false)

    const onDismissSnackBar = _ => {
        setVisible(false);
        if (viewState.error !== null) {
            setError(null);
        };
    };

    const saveData = async () => {
        setLoading(true)
        try {
            const response = await settingAccountService.doUpdate({
                "account_id":user.accountId,
                "user_name":`${user.userName}`,
                "password":password
            })
            if (response) {
                navigator.navigate(ROUTE.ACCOUNT,{refreshP: Date.now})   
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return(
        <MainContainer>
            <View style={styles.mainCtn}>
                <InputTextPassword
                    text={'New Password'}
                    value={password}
                    onChange={handlePasswordChange}
                    style={styles.inputCtn}
                    error={passwordCr}/>
                <InputTextPassword
                    text={'Confirm New Password'}
                    value={passwordCek}
                    onChange={handlePasswordCekChange}
                    style={styles.inputCtn}
                    error={passwordCekCr}/>   
            </View>
            {viewState.error !== null && !visible ? setVisible(true) : null}
            {viewState.error !== null && <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>{viewState.error}</Snackbar>}
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    mainCtn:{
        flex:1,
        flexDirection:'column',
        margin:theme?.spacing?.m,
        alignSelf:'stretch',
    },
    inputCtn:{
        marginBottom:theme?.spacing?.m,
    },
    iconColor: {
        color: theme?.pallete?.lightBlue
    }
})