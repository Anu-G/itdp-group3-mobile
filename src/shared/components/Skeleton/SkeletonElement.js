import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const SkeletonAvatarSmall = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.avatarCtn,styles.small]}></View>
    )
}

export const SkeletonProfile = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.profile]}></View>
    )
}

export const SkeletonButton = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.button]}></View>
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

export const SkeletonTitle = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <>
            <View style={[styles.skeleton,styles.title]}></View>
        </>
    )
}

export const SkeletonCategory = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <>
            <View style={[styles.skeleton,styles.category]}></View>
        </>
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

export const SkeletonComment = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    return(
        <View style={[styles.skeleton,styles.comment]}></View>
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
    avatarCtn: {
        borderRadius: 30,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 0,
    },
    profile: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    button: {
        width: 80,
        height: 24,
        borderRadius: theme?.radius?.xl,
        marginHorizontal: theme?.spacing?.s
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
    title:{
        width:"80%",
        height:24,
        marginBottom:8,
    },
    category:{
        width:"100%",
        height:24,
        marginBottom:8,
    },
    caption:{
        width:"100%",
        height: 20,
        marginBottom: 8,
    },
    captionShort:{
        width:"80%",
        height: 20,
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
    },
    comment:{
        flex:1,
        width:"100%",
        height:36,
    }
})