import { AntDesign, Entypo, EvilIcons, Ionicons, Octicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { style } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes"
import { Dimensions, Linking, Modal, Share, StyleSheet, TouchableOpacity, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import { checkErr } from "../../utils/CommonUtils"
import { ROUTE } from "../constants/NavigationConstants"
import { useDep } from "../context/DependencyContext"
import { useTheme } from "../context/ThemeContext"
import { ButtonBigComponent } from "./ButtonBig"
import { TextProfile, Title1 } from "./Label"

export const PostModal = ({ post, handleClose}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style)
    const navigation = useNavigation();
    const user = useSelector(state=>state.auth)

    const {postService} = useDep()

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Check this post on TokTok App! https://itdp-group3-frontend-git-staging-anu-g.vercel.app/feeds'
            })
        } catch (err) {
            console.log(err);
            checkErr(err)
        }
    }

    const handleEdit = () => {
        navigation.navigate(ROUTE.EDIT_POST,{post:post,accId:user.accountId})
    }

    const handleDelete = async () => {
        try {
            const response = await postService.doDeleteData({
                "feed_id":post.post_id
            })
        } catch (e) {
            console.log(e);
            checkErr(e)
        } 
    }

    console.log(post,"\n\n==",user);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={()=>handleClose()}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <AntDesign name="sharealt" size={30} color="black" onPress={()=>handleShare()} style={styles.button}/>
                        <AntDesign name="link" size={30} color="black" onPress={()=>handleShare()} style={styles.button}/>
                        {user.accountId == post.account_id
                            &&
                            <>
                            <Octicons name="gear" size={30} color="black" onPress={()=>handleEdit()} style={styles.button}/>
                            <AntDesign name="delete" size={30} color="black" onPress={()=>handleDelete()} style={styles.button}/>
                            </>}
                    </View>
                </View>
        </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: Dimensions.get('window').height - 150,
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl
    },
    header: {
        marginHorizontal: theme.spacing.m,
        marginTop: theme.spacing.xxl,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        borderWidth: 1,
        borderColor: theme.colors.white,
        padding:theme?.spacing?.m,
        borderRadius:theme?.radius.cl
    },
})