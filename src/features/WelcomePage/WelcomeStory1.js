import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonMediumComponent } from '../../shared/components/ButtonMedium'
import { Caption, TextProfile } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useTheme } from '../../shared/context/ThemeContext'

export const WelcomeStory1 = () => {
    const theme = useTheme()
    const styles = styling(theme.state.styling)
    const navigation = useNavigation()

    useEffect(() => {
        nextPage;
    }, [])

    const nextPage = setTimeout(() => {
        navigation.navigate(ROUTE.WELCOME_STORY_2)
    }, 10000);

    const onNavigate = _ => {
        navigation.navigate(ROUTE.WELCOME_STORY_2);
        clearTimeout(nextPage);
    }

    const onSkip = _ => {
        navigation.navigate(ROUTE.SIGNUP);
        clearTimeout(nextPage);
    }

    return (
        <MainContainer>
            <View style={styles.container}>
                <View style={styles.imageCtn}>
                    <Image style={styles.image} source={require('../../../assets/animations/Product-hunt.gif')} />
                </View>
                <View style={styles.textCtn}>
                    <TextProfile text={'Find your desire product'} style={styles.textProfile} />
                    <Caption text={'Search any product you want or place you wish to come!'} style={styles.caption1} />
                    <ButtonMediumComponent label={'Next'} style={styles.button} onClick={onNavigate} />
                    <TouchableOpacity style={{ marginTop: 8 }} onPress={onSkip}>
                        <Caption text={'skip'} style={styles.caption2} />
                    </TouchableOpacity>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    imageCtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textCtn: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 311,
        height: 282,
    },
    textProfile: {
        marginTop: 114,
        color: '#1E2329',
        fontSize: 20,
    },
    caption1: {
        textAlign: 'center',
        marginTop: 18,
        color: '#3B4046',
        fontSize: 14,
        paddingLeft: 21,
        paddingRight: 21,
    },
    caption2: {
        color: '#475264',
        fontSize: 14,
    },
    button: {
        marginTop: 46,
    }
})