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

export const SettingsImageProfile = ({ style = {}, source }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <Image source={source === '' ? require('../../../assets/images/user-default.png') : { uri: source }} style={styles.imageProfileSettings} />
    )
}

export const AvatarSmall = ({ style = {}, accId, handleClick, source = 'https://reactjs.org/logo-og.png' }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <View style={[styles.avatarCtn, styles.small]}>
            <TouchableOpacity onPress={() => handleClick(accId)}>
                {source.includes("https://") === true || source.includes("file://") == true ?
                    <Image source={{ uri: source }} style={styles.avatarProfile} />
                    :
                    <Image source={source} style={styles.avatarProfile} />
                }
            </TouchableOpacity>
        </View>
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
    avatarCtn: {
        backgroundColor: '#FE5454',
        height: 10,
        width: 10,
        borderRadius: 30,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 0,
    },
    avatarProfile: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    small: {
        height: 40,
        width: 40,
    },
    containerSquare: {
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareUp: {
        width: 85,
        height: 95,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    squareDown: {
        width: 72,
        height: 72,
        borderWidth: 1.5,
        borderColor: '#FED154',
        backgroundColor: '#3B4046',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trash: {
        zIndex: 101,
        elevation: 101,
        position: 'absolute',
    },
})