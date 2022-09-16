import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext"
import { TextSettingProfile } from "./Label";

export const SettingItemComponent = ({label='Template',}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return(
        <View style={styles.settingItemContainer}>
            <Ionicons name="person" size={24} style={styles.settingItemIcon}/>
            <View style={styles.settingItemContainer2}>
                <TextSettingProfile text={label}/>
                <MaterialIcons name="keyboard-arrow-right" size={24} style={styles.settingItemArrow}/>
            </View>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    settingItemContainer:{
        width:328,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal: theme?.spacing?.s,
        borderBottomWidth: 1,
        borderBottomColor: theme?.colors?.settingItemBorder,
    },
    settingItemContainer2:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        marginLeft:12,
    },
    settingItemIcon:{
        color:theme?.colors?.settingItemIcon
    },
    settingItemArrow:{
        color:theme?.colors?.settingItemIcon,
        marginHorizontal:-8        
    }
})