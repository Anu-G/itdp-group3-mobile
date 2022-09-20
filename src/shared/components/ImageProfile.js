import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ImageProfile = ({ style = {}, source = 'https://reactjs.org/logo-og.png' }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <Image source={{ uri: source }} style={styles.imageProfile} />
    )
}

export const ImageProfileOTHER = ({ style = {}, source = 'https://reactjs.org/logo-og.png' }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <Image source={{ uri: source }} style={styles.imageProfileOTHER} />
    )
}

export const SettingsImageProfile = ({ style = {}, source = require('../../../assets/images/user-default.png') }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <Image source={source} style={styles.imageProfileSettings} />
    )
}

const styling = (theme) => StyleSheet.create({
    imageProfile: {
        width: 100,
        height: 80,
        borderRadius: theme?.radius?.m,
    },
    imageProfileOTHER: {
        width: 120,
        height: 120,
    },


    imageProfileSettings: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: theme?.pallete.yellow,
        marginBottom: theme?.spacing?.s,
    },
})