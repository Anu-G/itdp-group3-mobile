import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ROUTE } from "../constants/NavigationConstants"
import { useTheme } from "../context/ThemeContext"
import { ButtonComponent } from "./Button"
import { Caption, TextTimeline } from "./Label"

export const LoginModalComponent = ({handleNoLogin,text="suck lolipop"}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    const navigator = useNavigation()

    return (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalCtn}>
                <View style={styles.mainCtn}>
                    <View style={styles.textCtn}>
                        <Caption text={`You want to ${text}`} style={styles.caption} />
                        <TextTimeline text={"Join us in TokTok !"} style={styles.caption}/>
                    </View>
                    <View style={styles.buttonCtn}>
                        <ButtonComponent label={"Sign Up"} onClick={() => navigator.navigate(ROUTE.SIGNUP)} style={styles.btn} />
                        <TouchableOpacity onPress={() => handleNoLogin()}>
                            <Text style={styles.cancel}>Hm.. Later</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(59, 64, 70, 0.5)'
    },
    mainCtn: {
        backgroundColor: theme?.colors?.navbarBackground,
        width: 229,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: "absolute",
        padding: theme?.spacing?.m,
        borderRadius: theme?.radius?.m
    },
    textCtn: {
        flex: 2,
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
        alignSelf: 'auto'
    },
    cancel: {
        fontSize: 8,
        fontFamily: 'Poppins-Regular',
        color: theme.colors.white
    }
})