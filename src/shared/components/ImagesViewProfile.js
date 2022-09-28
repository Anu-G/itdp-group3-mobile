import { Video } from 'expo-av'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export const ImagesViewProfile = ({ link, handleClick }) => {
    const theme = useTheme()
    const styles = styling(theme)
  return (
    <View style={styles.container}>
        <View style={styles.imgVwCtn}>
            {link.toUpperCase().includes(".MP4") || link.toUpperCase().includes(".MOV") ||
            link.toUpperCase().includes(".WMV") || link.toUpperCase().includes(".FLV") ||
            link.toUpperCase().includes(".AVI") || link.toUpperCase().includes(".WebM") ||
            link.toUpperCase().includes(".AVCHD") || link.toUpperCase().includes(".MKV") ?
            <Video source={{uri: link}} style={styles.video} onclick={handleClick}/>
            :
            <Image style={styles.imgVwProfile} source={{uri: link}} onclick={handleClick}/>}
        </View>
    </View>
  )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'stretch',
    },
    imgVwCtn: {
        width: 120,
        height: 168,
        borderRadius: 20,
        cursor:'pointer',
    },
    video: {
        maxHeight: 136,
        width: 120,
    },
    imgVwProfile: {
        maxHeight: 136,
        width: 120,
        borderRadius: 20,
        objectFit: 'cover',
    }

})
