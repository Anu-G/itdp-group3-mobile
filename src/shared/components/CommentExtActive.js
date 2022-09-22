import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { CommentColumn } from "./CommentColumn"
import { CommentExtends } from "./CommentExtends"
import { Caption } from "./Label"

export const CommentExtActive = ({ comments, handleCommentChange, maxLength, charLength, value, isButtonSendActive, buttonLabel, handleOnClickSend, avatar }) => {
    const theme = useTheme()
    const styles = styling(theme.state.style)
    return (
        <View style={styles.extCmt}>
                {comments == null ? '' : <CommentExtends comments={comments}/>}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image source={{uri: avatar}} style={{width: 36, height: 36, borderRadius: 18}}/>
                    <CommentColumn handleChange={handleCommentChange} maxLength={maxLength} charLength={charLength} value={value} placeholder='Add comment...'/>
                    <TouchableOpacity disabled={!isButtonSendActive} onPress={handleOnClickSend} style={{marginTop: 8}}>
                        {isButtonSendActive? <Caption text={buttonLabel} style={{color: '#FED154'}}/> : <Caption text={buttonLabel} style={{color: '#849EB9'}}/>}
                    </TouchableOpacity>
                </View>
        </View>
    )
}


const styling = (theme) => StyleSheet.create({
    extCmt: {
        flex: 1,
        paddingTop: 8
    },
})