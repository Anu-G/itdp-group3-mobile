import { Feather, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { Caption, Text14SemiBoldWhite, Text32, TextSettingProfile } from "../../shared/components/Label"
import { ROUTE } from "../../shared/constants/NavigationConstants"
import { useTheme } from "../../shared/context/ThemeContext"

export const StaticPage = () => {

    const theme = useTheme();
    const styles = styling(theme.state.style)

    const navigation = useNavigation();
    const toHelpCenterClick = () => {
        navigation.navigate(ROUTE.HELP_CENTER)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={styles.iconColor.color} />
        })
    }, [navigation])
    return (
        <>
            <View style={styles.container}>
                <View style={styles.goToOtherPage}>
                    <View>
                        <Text14SemiBoldWhite text={'Version'} />
                        <Caption text={'ver 1.0'} />
                    </View>
                </View>

                <Pressable onPress={toHelpCenterClick}>
                    <View style={styles.goToOtherPage}>
                        <Text14SemiBoldWhite text={'Help Center'} />
                        <Feather
                            name="chevron-right"
                            size={20}
                            color={styles.goToOtherPage.color}
                        />
                    </View>

                </Pressable>

                <View style={styles.goToOtherPage}>
                    <Text14SemiBoldWhite text={'About Us Us'} />
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={styles.goToOtherPage.color}
                    />
                </View>

                <View style={styles.goToOtherPage}>
                    <Text14SemiBoldWhite text={'Contact Us'} />
                    <Feather
                        name="chevron-right"
                        size={20}
                        color={styles.goToOtherPage.color}
                    />
                </View>
            </View>
        </>
    )
}

const styling = (theme) => StyleSheet.create({
    goToOtherPage: {
        minHeight: 60,
        // backgroundColor: theme?.pallete?.lightBlue,
        borderRadius: theme?.radius?.s,
        justifyContent: "space-between",
        alignContent: 'stretch',
        padding: theme?.spacing?.xs,
        paddingVertical: theme?.spacing?.m,
        // marginVertical: theme?.spacing?.m,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomColor: theme?.pallete?.mediumBlue,
        borderBottomWidth: 1,
        width: '100%',

        ...theme?.text?.text32,
    },
    container: {
        padding: theme?.spacing?.s,
        flex: 1,
    },
    iconColor: {
        color: theme?.pallete?.lightBlue
    }
})