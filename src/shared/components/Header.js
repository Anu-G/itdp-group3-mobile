import { Image, StyleSheet, View } from "react-native"
import { useTheme } from "../context/ThemeContext"


export const HeaderComponent = ({style={}}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)

    return (
        <View style={styles.headerContainer}>
            <Image source={require('../../../assets/images/logo-toktok.png')} style={[styles.headerImage,style]}/>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    headerContainer:{
        alignSelf:'stretch',
        height:56,
        paddingLeft:theme?.spacing?.m,
        paddingVertical:theme?.spacing?.ssm,
        backgroundColor:theme?.colors?.navbarBackground
    },
    headerImage:{
        width:111.05,
        height:36,
    }

})