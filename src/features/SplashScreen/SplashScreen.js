import { Image, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../shared/context/ThemeContext"

export const SplashScreen = () => {
    const theme = useTheme();
    const styles = styling(theme.state.style)

    return(
        <>
        <View style={styles.container}>
            <Image source={require("../../../assets/images/Toktok-Logo.png")} />
        </View>
        </>
    )
}

const styling = (theme) => StyleSheet.create({
    container:{
        backgroundColor: '#FED154',
        flex: 1, 
        alignContent: "center",
        justifyContent: "center"
    }
})