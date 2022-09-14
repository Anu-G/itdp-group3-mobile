
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext"

export const NavbarComponent = ({}) => {
    const theme = useTheme();
    const styles = styling(theme);
    
    return(
        <View >
            {/* <Text>{'CEK'}</Text> */}
            <FontAwesome icon="fa-solid fa-house"/>
            <FontAwesome icon="fa-solid fa-magnifying-glass"/>
            <FontAwesome icon="fa-solid fa-bell"/>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({

})