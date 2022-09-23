import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const SkeletonAvatarSmall = ({styleEX}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.avatarCtn,styles.small,styleEX]}></View>
    )
}

export const SkeletonTouchableOpacity = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.touchableOpacity]}></View>
    )
}

export const SkeletonIcon24 = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.icon24]}></View>
    )
}

export const SkeletonCaption = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <>
            <View style={[styles.skeleton,styles.caption]}></View>
        </>
    )
}

export const SkeletonCaptionShort = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.captionShort]}></View>
    )
}

export const SkeletonTimelineImage = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.timelineImage]}></View>
    )
}

export const SkeletonTimelineStatus = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.status]}></View>
    )
}

export const SkeletonTimelineDate = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.date]}></View>
    )
}

const styling = (theme) => StyleSheet.create({
    skeleton:{
        backgroundColor:"#ddd",
        overflow: "hidden",
        borderRadius: 4,
    },
    skeletonAnimation:{
        
    },
    avatarCtn: {
        borderRadius: 30,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 0,
    },
    small : {
        height: 40,
        width: 40,
    },
    touchableOpacity: {
        flex:6,
        alignContent: "flex-start",
        justifyContent: "center"
    },
    icon24:{
        width:24,
        height:24,
    },
    caption:{
        width:"100%",
        height: 24,
        marginBottom: 8,
    },
    captionShort:{
        width:"80%",
        height: 24,
        marginBottom: 8,
    },
    timelineImage:{
        width:376,
        height:218
    },
    status:{
        width:48,
        height:24
    },
    date:{
        width:48,
        height:24
    }
})