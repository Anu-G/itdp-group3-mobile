
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext"

export const NavbarComponent = ({style={}, isActive = 1}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    
    return(
        <View style={[styles.navbarContainer,style]}>
            {/* <Text>{'CEK'}</Text> */}
            <FontAwesome name="home" size={30} style={isActive == 1 ? styles.navbarItemActive : styles.navbarItemInactive}/>
            <Entypo name="magnifying-glass" size={30} style={isActive == 2 ? styles.navbarItemActive : styles.navbarItemInactive}/>
            <MaterialCommunityIcons name="bell" size={30} style={isActive == 3 ? styles.navbarItemActive : styles.navbarItemInactive}/>
            <Image source={require('../../../assets/images/TokTokLogo.png')} style={isActive == 4 ? styles.navbarImageActive :styles.navbarImage}/>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    navbarContainer:{
        alignSelf:'stretch',
        flexDirection:'row',
        backgroundColor:theme?.colors?.navbarBackground,
        justifyContent:'space-evenly',
        paddingTop: theme?.spacing?.sm,
        height:64,
    },
    navbarImage:{
        width:30,
        height:30,
        borderRadius:50,
    },
    navbarImageActive:{
        width:30,
        height:30,
        borderColor:theme?.color?.button,
        borderWidth:1,
        borderRadius:50
    },
    navbarItemInactive:{
        color:theme?.colors?.navbarItem,
    },
    navbarItemActive:{
        color:theme?.colors?.button,
        textShadowOffset:{
            width:0,
            height:1,
        },
        textShadowRadius:0.8,
        textShadowColor:'black'
    }
})