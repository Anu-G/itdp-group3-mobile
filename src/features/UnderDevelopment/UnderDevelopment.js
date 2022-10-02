import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Caption, TextProfile } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'

export const UnderDevelopment = () => {
    const theme = useTheme()
    const styles = styling(theme.state.styling)

  return (
    <MainContainer>
        <View style={styles.container}>
                <View style={styles.imageCtn}>
                    <Image style={styles.image} source={require('../../../assets/images/under-development.png')} />
                </View>
                <View style={styles.textCtn}>
                    <TextProfile text={'This page is under construction'} style={styles.textProfile} />
                    <Caption text={'We are working on it!'} style={styles.caption} />
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
        justifyContent: 'center',
    },
    imageCtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textCtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 311,
        height: 282,
    },
    textProfile: {
        fontSize: 20,
        textAlign: 'center',
    },
    caption: {
        textAlign: 'center',
        marginTop: 18,
        fontSize: 14,
        paddingLeft: 21,
        paddingRight: 21,
    },
})