import { FontAwesome } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useLayoutEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Snackbar } from "react-native-paper"
import { useSelector } from "react-redux"
import { storage } from "../../apps/Storage"
import { ActivateModalComponent } from "../../shared/components/ActivateModal"
import { InputTextOnly } from "../../shared/components/CustomTextInput/CustomTextInput"
import { MainContainer } from "../../shared/components/MainContainer"
import { SettingItemComponent } from "../../shared/components/SettingItem"
import { ROUTE } from "../../shared/constants/NavigationConstants"
import { KEY } from "../../shared/constants/StoreConstants"
import { useAuth } from "../../shared/context/AuthContext"
import { useDep } from "../../shared/context/DependencyContext"
import { useTheme } from "../../shared/context/ThemeContext"
import { useViewState } from "../../shared/hooks/ViewState"
import { checkErr } from "../../utils/CommonUtils"

export const Account = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [showActivate, setShowActivate] = useState(false)

    // navigation=====================================================================================================
    const navigator = useNavigation()
    const route = useRoute()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'} />,
            headerRight: () => (<TouchableOpacity style={{ margin: 16 }} disabled={loading} onPress={() => onClickEdit()} ><Text style={{ color: "#FED154", fontSize: 16 }}>Edit</Text></TouchableOpacity>)
        })
    }, [navigation])

    const onClickEdit = () => {
        navigator.navigate(ROUTE.EDIT_ACCOUNT)
    }

    const onChangePassword = () => {
        navigator.navigate(ROUTE.CHANGE_PASSWORD)
    }

    const handleShowActivate = () => {
        setShowActivate(!showActivate)
    }

    //services========================================================================================================
    const user = useSelector(state => state.auth)
    const { settingAccountService } = useDep()
    const { onLogout } = useAuth()

    const { viewState, setError } = useViewState();
    const [visible, setVisible] = useState(false);

    const onDismissSnackBar = _ => {
        setVisible(false);
        if (viewState.error !== null) {
            setError(null);
        };
    };

    useEffect(() => {
        getData()
    }, [route, navigation])

    const getData = async () => {
        setLoading(true)
        try {
            const response = await settingAccountService.doGetDetailAccount({
                account_id: `${user.accountId}`
            })
            setEmail(prevState => response.data.data.email);
            setPhoneNumber(prevState => response.data.data.phone_number);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    const doLogout = async _ => {
        try {
            if (await onLogout()) {
                navigation.replace(ROUTE.LOGIN);
            };
        } catch (e) {
            setError(checkErr(e));
        }
    }

    return (
        <MainContainer>
            <View style={styles.mainCtn}>
                {showActivate && <ActivateModalComponent handleShowActivate={handleShowActivate} />}
                <InputTextOnly
                    editable={false}
                    text="E-mail"
                    value={email}
                    onChange={(e) => { }}
                    placeholder="sulistyo224@gmail.com"
                    style={styles.inputCtn} />
                <InputTextOnly
                    editable={false}
                    text="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => { }}
                    placeholder="085xxxx"
                    style={styles.inputCtn} />
                <SettingItemComponent label="Change your password" handlePress={() => onChangePassword()} style={styles.btnCtn} iconStatus={false} />
                {user.roleId === 1 && <SettingItemComponent label="Activate to Business Acc" handlePress={() => handleShowActivate()} style={styles.btnCtn} iconStatus={false} />}
                <SettingItemComponent label="Log Out" handlePress={doLogout} style={styles.btnCtn} iconStatus={false} />
            </View>
            {viewState.error !== null && !visible ? setVisible(true) : null}
            {viewState.error !== null && <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>{viewState.error}</Snackbar>}
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
    btnCtn: {
        alignSelf: 'stretch',
        width: 'auto',
        paddingLeft: 0
    }
})