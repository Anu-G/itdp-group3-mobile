import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export const CommentExtends = ({comments}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    return (
        <View style={styles.commentExtWrp}>
            {comments.map((comment, i) => {
                return (
                    <DetailComment comment={comment.comment_fill} user={comment.display_name} profileImage={comment.profile_image} key={i}/>
                )
            })}
        </View>
    )
}

import { TextComment } from './Label'

export const DetailComment = ({user, comment, profileImage}) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
 
    return (
        <View style={styles.commentExtHdWrp}>
            <Image source={ profileImage ? {uri: profileImage } : require('../../../assets/images/user-default.png') } style={{width: 36, height: 36, borderRadius: 18}}/>
            <View style={{marginLeft: 8}}>
                <TextComment text={user} style={{fontWeight: 'bold', fontSize: 14, marginBottom: 2}}/>
                <View>
                    <TextComment text={comment} style={{marginRight: 16}}/>
                </View>
            </View>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    commentExtWrp: {
        color: 'white',
        marginTop: 1,
        marginRight: 0,
        marginBottom: 1,
        marginLeft: 2,
    },
    commentExtHdWrp: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 0.5,
        paddingRight: 16,
        paddingBottom: 12,
        marginLeft: 12,
    }
})