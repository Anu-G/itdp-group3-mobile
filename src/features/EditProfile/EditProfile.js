import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { MainContainer } from "../../shared/components/MainContainer"
import { SettingItemComponent } from "../../shared/components/SettingItem";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { useTheme } from "../../shared/context/ThemeContext"

export const EditProfile = ({ navigation }) => {
    const theme = useTheme();
    const styles = styling(theme.state.style);
    const navigator = useNavigation()
    const user = useSelector(state => state.auth)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#F4F4F4'} />
        })
    }, [navigation])

    return (
        <MainContainer>
            <View style={styles.container}>
                <SettingItemComponent label="Account" handlePress={() => navigator.navigate(ROUTE.EDIT_ACCOUNT)} iconName={'person'} iconStatus={true} />
                {user.roleId === 2 && <SettingItemComponent label="Catalog" handlePress={() => navigator.navigate(ROUTE.MANAGE_PRODUCT)} iconName={'book'} iconStatus={true} />}
                {user.roleId === 2 && <SettingItemComponent label="FAQ" handlePress={() => navigator.navigate(ROUTE.ADD_FAQ)} iconName={'help-outline'} iconStatus={true} />}
                <SettingItemComponent label="Support" handlePress={() => navigator.navigate(ROUTE.STATIC_PAGE)} iconName={'information'} iconStatus={true} />
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: theme?.spacing?.m,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
    }
})