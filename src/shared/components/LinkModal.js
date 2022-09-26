import { Ionicons } from "@expo/vector-icons"
import { Linking, Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { ButtonBigComponent } from "./ButtonBig"
import { TextProfile } from "./Label"

export const LinkModal = ({linksIn,handleClickLinks}) => {
    const linkEXP = [
        "HAHA",
        "HIHI",
        "HOHO"
    ]
    const theme = useTheme();
    const styles = styling(theme.state.style)
    const links = linksIn.map((link,index)=>{
        const regexp = new RegExp('https://www.')
        let linked = ''
        if (!regexp.test(link)) {
            linked = 'https://www.' + link.link
        } else {
            linked = link.link
        }
        const linki = 'Link' + `${index}`
        return(
            <ButtonBigComponent label={link.label} onClick={()=>handleClickLink(linked)} style={styles.link}/>
        )
    })
    const handleClickLink = (link) => {
        Linking.openURL(`${link}`)
    }
    return(
        <Modal 
            animationType="slide"
            transparent={true}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="ios-chevron-back-outline" size={24} color={theme.state?.style?.colors.inputBorderInactive} onPress={handleClickLinks}/>
                    <View style={styles.headerTitle}>
                        <TextProfile text="LINKS"/>
                    </View>
                </View>
                <View style={styles.linkContainer}>
                    {links}
                </View>
            </View>
        </Modal>
    )
}

const styling = (theme) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:theme.colors.navbarBackground,
        marginTop:"100%",
        borderRadius: theme.radius.xl
    },
    header:{
        marginHorizontal:theme.spacing.m,
        marginVertical:theme.spacing.m,
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    headerTitle:{
        flex:1,
        position:"relative",
        backgroundColor:theme.colors.searchBackground,
        alignItems:"center",
        alignSelf:"baseline",
        justifyContent:"center",
        marginRight:40
    },
    linkContainer:{
        marginHorizontal:theme.spacing?.xl
    },
    link:{
        marginBottom:theme.spacing?.s
    }
})