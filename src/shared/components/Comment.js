import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext"
import { Caption, TextComment } from "./Label";

export const CommentComponent = ({userName='USER',text='He decided that the time had come to be stronger than any of the excuses hed used until then.',source='https://reactjs.org/logo-og.png'}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <View style={styles.commentContainer}>
            <Image source={{uri: source}} style={styles.commentImage}/>
            <View style={styles.commentContainer2}>
                <Caption text={userName} style={styles.commentText}/>
                <TextComment text={text} style={styles.commentText}/>
            </View>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    commentContainer:{
        height:'auto',
        paddingLeft:12,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    commentContainer2:{
        flexDirection:'column',
        flex:1,
        width:'100%',
        height:'100%',
    },
    commentImage:{
        width:36,
        height:36,
        borderRadius:theme?.radius?.cl,
        marginRight:theme?.spacing?.s,
    },
    commentText:{
        marginVertical:-theme?.spacing?.xxs,
    },
})