import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonMediumComponent } from '../../shared/components/ButtonMedium'
import { Caption, TextProfile } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { ROUTE } from '../../shared/constants/NavigationConstants'
import { useTheme } from '../../shared/context/ThemeContext'

export const WelcomeStory3 = () => {
    const theme = useTheme()
    const styles = styling(theme.state.styling)
    const navigation = useNavigation()

    return (
        <MainContainer>
            <View style={styles.container}>
                <View style={styles.imageCtn}>
                    <Image style={styles.image} source={require('../../../assets/animations/Feedback-bro.gif')} />
                </View>
                <View style={styles.textCtn}>
                    <TextProfile text={'Share your experience'} style={styles.textProfile} />
                    <Caption text={`Share your experience regarding some product/store! Let other's know what's on your mind!`} style={styles.caption1} />
                    <ButtonMediumComponent label={'Start post'} style={styles.button} onClick={() => navigation.navigate(ROUTE.SIGNUP)} />
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
        backgroundColor: '#F5F5F5',
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