import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { Image, Pressable, StyleSheet, View } from "react-native"
import { Text14SemiBoldWhite } from "../../shared/components/Label"
import { ROUTE } from "../../shared/constants/NavigationConstants"
import { useTheme } from "../../shared/context/ThemeContext"

export const TutorialPage = () => {

    const theme = useTheme()
    const styles = styling(theme.state.style)

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={styles.iconColor.color} />
        })
    }, [navigation])
    
    return(
        <>
            <View style={styles.container}>
                <Pressable onPress={()=>{
                    navigation.navigate(ROUTE.TUTORIAL_TO_BUSINESS)
                }}>
                    <View style={styles.goToOtherPage}>
                    <Text14SemiBoldWhite text={'1. How to Change to Business Account'}/>

                    <Feather name="chevron-right"
                        size={20}
                        color={styles.goToOtherPage.color} /> 

                    </View>
                </Pressable>


                <Pressable >
                    <View style={styles.goToOtherPage}>
                    <Text14SemiBoldWhite text={'2. How to Post a Content'}/>

                    <Feather name="chevron-right"
                        size={20}
                        color={styles.goToOtherPage.color} /> 

                    </View>
                </Pressable>


                <Pressable >
                    <View style={styles.goToOtherPage}>
                    <Text14SemiBoldWhite text={'3. How to set up my profile'}/>

                    <Feather name="chevron-right"
                        size={20}
                        color={styles.goToOtherPage.color} /> 

                    </View>
                </Pressable>
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
        // ...theme?.text?.text32,
    },
    container: {
        padding: theme?.spacing?.s,
        flex: 1,
    },
    iconColor: {
        color: theme?.pallete?.lightBlue
    },
})