import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ImageProfile = ({style={}, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <Image source={{uri: source}} style={styles.imageProfile}/>
    )
}

export const ImageProfileOTHER = ({style={}, source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <Image source={{uri: source}} style={styles.imageProfileOTHER}/>
    )
}

const styling = (theme) => StyleSheet.create({
    imageProfile:{
        width:100,
        height:80,
        borderRadius:theme?.radius?.m,
    },
    imageProfileOTHER:{
        width:120,
        height:120,
    }
})