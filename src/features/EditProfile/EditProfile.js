import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { MainContainer } from "../../shared/components/MainContainer"
import { SettingItemComponent } from "../../shared/components/SettingItem";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useTheme } from "../../shared/context/ThemeContext"

export const EditProfile = ({}) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const navigation = useNavigation()

    const handlePress = (route) => {
        navigation.navigate(route)
    }

    return(
        <MainContainer>
            <View style={styles.container}>
                <SettingItemComponent label="Account" handlePress={()=>{handlePress(ROUTE.SETTING)}}/>
                <SettingItemComponent label="Catalog" handlePress={()=>{handlePress(ROUTE.SETTING)}}/>
                <SettingItemComponent label="FAQ" handlePress={()=>{handlePress(ROUTE.SETTING)}}/>
                <SettingItemComponent label="Support" handlePress={()=>{handlePress(ROUTE.SETTING)}}/>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:theme?.spacing?.m,
        flexDirection:'column',
        justifyContent:'flex-start'
    }
})