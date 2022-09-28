import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ButtonBigComponent } from "../../shared/components/ButtonBig";
import { AuthExtLabel, Text32 } from "../../shared/components/Label";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useTheme } from "../../shared/context/ThemeContext"

export const WelcomePage = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    //service
    const navigation = useNavigation();

    const handleSignInClick = () => {
        navigation.replace(ROUTE.LOGIN)
    }

    const handleGetStartedClick = () => {
        navigation.replace(ROUTE.WELCOME_STORY_1)
    }

    const handleWelcomeStory = () => {
        navigation.replace(ROUTE.WELCOME_STORY_1)
    }

    return (
        <>
            <View style={styles.upperContainer}></View>
            <View style={styles.container} >
                <View style={{ height: 60 }}>
                    <Text style={styles.mainTitle} >Welcome</Text>
                </View>
                <Text32 text={'Find anything now!'} />

                <View style={styles.buttonBottom}>
                    <ButtonBigComponent onClick={handleGetStartedClick}
                        label={'Get Started'} />
                    <View style={styles.addAuth}>
                        <Pressable onPress={handleSignInClick} >
                            <AuthExtLabel text1={`Have an account?`} text2={'Sign in'} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )

}

const styling = (theme) => StyleSheet.create({
    mainTitle: {
        ...theme?.text.mainTitle,

    },
    addAuth: {
        marginTop: -16,
    },
    buttonBottom: {
        marginTop: theme?.spacing?.ml,
        width: '100%',
        alignContent: "stretch",
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "flex-start",
        marginHorizontal: theme?.spacing?.m,
        marginTop: 72,
        alignItems: "stretch",
    },
    upperContainer: {
        flex: 1,
    }
})