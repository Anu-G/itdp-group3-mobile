import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext"
import { TextSettingProfile } from "./Label";

export const SettingItemComponent = ({ label = 'Template', handlePress = {}, style = {}, iconStatus = true, iconName='' }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);

    return (
        <TouchableOpacity style={[styles.settingItemContainer, style]} onPress={handlePress}>
            {iconStatus && <Ionicons name={iconName} size={24} style={styles.settingItemIcon} />}
            <View style={styles.settingItemContainer2} >
                <TextSettingProfile text={label} />
                <MaterialIcons name="keyboard-arrow-right" size={24} style={styles.settingItemArrow} />
            </View>
        </TouchableOpacity>
    )
}

const styling = (theme) => StyleSheet.create({
    settingItemContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme?.spacing?.s,
        borderBottomWidth: 1,
        borderBottomColor: theme?.colors?.settingItemBorder,
        alignSelf: 'stretch'
    },
    settingItemContainer2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginLeft: 12,
    },
    settingItemIcon: {
        color: theme?.colors?.settingItemIcon
    },
    settingItemArrow: {
        color: theme?.colors?.settingItemIcon,
        marginHorizontal: -8
    }
})