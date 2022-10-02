import { useState } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import { useDep } from "../context/DependencyContext"
import { useTheme } from "../context/ThemeContext"
import { ButtonComponent } from "./Button"
import { Caption, TextTimeline } from "./Label"

export const ActivateModalComponent = ({ handleShowActivate }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const [logoutReq, setLogoutReq] = useState(false)

    // services ========================================================================================
    const { settingAccountService } = useDep();
    const user = useSelector(state => state.auth);

    const onActivate = async () => {
        try {
            const response = await settingAccountService.doActivateBusiness({
                "account_id": user.accountId
            })
            if (response.status == 200) {
                setLogoutReq(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleOnActivate = () => {
        onActivate()
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalCtn}>
                <View style={styles.mainCtn}>
                    {logoutReq
                        ?
                        <>
                            <View style={styles.textCtn}>
                                <Caption text={"Please Log Out your account to complete this step"} style={styles.caption} />
                            </View>
                            <View style={styles.buttonCtn}>
                                <ButtonComponent label={"Okey"} onClick={() => handleShowActivate()} style={styles.btn} />
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.textCtn}>
                                <Caption text={"Are you sure to activate Business Account ?"} style={styles.caption} />
                                <TextTimeline text={"This action cannot be undone."} />
                            </View>
                            <View style={styles.buttonCtn}>
                                <ButtonComponent label={"Yes! I am"} onClick={() => handleOnActivate()} style={styles.btn} />
                                <TouchableOpacity onPress={() => handleShowActivate()}>
                                    <Text style={styles.cancel}>Hm.. I'm not sure</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
            </View>
        </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    modalCtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.headerColor
    },
    mainCtn: {
        backgroundColor: theme?.pallete?.dark,
        width: 229,
        height: 150,
        // padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: "absolute",
        padding: theme?.spacing?.m,
        borderRadius: theme?.radius?.m,
        borderWidth: 1,
        borderColor: theme?.pallete?.yellow
    },
    textCtn: {
        flex: 2,
        alignItems: "center"
    },
    caption: {
        textAlign: "center"
    },
    buttonCtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    btn: {
        margin: 0,
        alignSelf: 'auto',
        fontSize: 10
    },
    cancel: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        color: theme.pallete.lightBlue
    }
})