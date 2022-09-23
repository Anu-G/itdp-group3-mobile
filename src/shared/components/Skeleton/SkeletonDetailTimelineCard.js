import { Ionicons } from "@expo/vector-icons"
import { useEffect, useRef } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { MainContainer } from "../MainContainer"
import { SkeletonAvatarSmall, SkeletonCaption, SkeletonCaptionShort, SkeletonComment, SkeletonIcon24, SkeletonTimelineDate, SkeletonTimelineImage, SkeletonTimelineStatus, SkeletonTouchableOpacity } from "./SkeletonElement"

export const SkeletonDetailTimelineCard = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style,colorChange)
    
    const colorChange = new Animated.Value(1)

    useEffect(()=>{
        Animated.loop(
            Animated.sequence(
                [Animated.timing(
                    colorChange,
                    {
                        toValue:0.4,
                        duration:1000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    colorChange,
                    {
                        toValue:1,
                        duration:1000,
                        useNativeDriver: true
                    }
                )]
            )
        ).start()
    },[colorChange])

    return(
        <MainContainer>
            <View style={styles.timelineCtn}>
                <View>
                    <View style={styles.profileHd}>
                        <Animated.View style={{flex: 1, opacity:colorChange}}>
                            <SkeletonAvatarSmall/>
                        </Animated.View>
                        <Animated.View style={{width: "70%", opacity:colorChange}}>
                            <SkeletonTouchableOpacity/>
                        </Animated.View>
                        <Animated.View style={[styles.optionBtn, {opacity:colorChange}]}>
                            <Ionicons name="ios-ellipsis-horizontal" size={24} color='#F4F4F4' />                
                        </Animated.View>
                    </View>
                </View>

                <Animated.View style={[styles.captionCtn, {opacity:colorChange}]}>
                    <SkeletonCaption/>
                    <SkeletonCaption/>
                    <SkeletonCaptionShort/>
                </Animated.View>

                <Animated.View style={{opacity:colorChange}}>
                    <SkeletonTimelineImage/>
                </Animated.View>

                <View style={styles.bottonCtn}>
                    <View style={styles.bottomLikeCommentCtn}>
                        <View style={styles.bottomBtn}>
                            <Animated.View style={{flex: 1, flexDirection: 'row',opacity: colorChange}}>
                                <SkeletonTimelineStatus/>
                            </Animated.View>
                        </View>

                        <View style={styles.bottomBtn}>
                            <View style={styles.bottomBtn}>
                                <Animated.View style={{flex: 1, flexDirection: 'row', opacity: colorChange}}>
                                    <SkeletonTimelineStatus/>
                                </Animated.View>
                            </View>
                        </View>
                    </View>

                    <Animated.View style={{opacity:colorChange}}>
                        <SkeletonTimelineDate/>
                    </Animated.View>
                </View>

                <Animated.View style={{alignSelf: 'stretch',opacity:colorChange,marginTop:16}}>
                    <View style={styles.comment}>
                        <SkeletonAvatarSmall/>
                        <SkeletonComment/>
                    </View>
                    <View style={styles.comment}>
                        <SkeletonAvatarSmall/>
                        <SkeletonComment/>
                    </View>
                    <View style={styles.comment}>
                        <SkeletonAvatarSmall/>
                        <SkeletonComment/>
                    </View>
                </Animated.View>
            </View>
        </MainContainer>
    )
}

const styling = (theme,colorChange) => StyleSheet.create({
    timelineCtn: {
        padding: 16,
        borderWidth: 1,
        borderBottomColor: '#1E2329',
        borderStyle: 'solid',
        alignSelf: 'stretch',

        flex: 1,
        flexDirection: 'column',
    },
    optionBtn: {
        marginLeft: 0,
        alignItems: 'flex-end',
        flex: 1
    },
    profileHd: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomBtn: {
        alignItems: 'center',
        marginRight: 12
    },
    bottonCtn: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    bottomLikeCommentCtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    captionCtn: {
        marginTop: 8,
        marginRight: 0,
    },
    commentCountCtn: {
        opacity: 0.8,
        marginLeft: 4
    },
    likeCountCtn: {
        opacity: 0.8,
        marginLeft: 4
    },
    xBtn : {
        width: 28,
        height: 32,
        marginLeft: 0,
        color: '#FE5454',
    },
    rightBtnCtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'orange'
    },
    transition:{
        opacity:colorChange
    },
    comment:{
        flexDirection:"row",
        marginTop:16,
        alignItems:"center",
    }
})