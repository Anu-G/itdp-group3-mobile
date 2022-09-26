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
                {
                link.toUpperCase().includes(".MP4") || link.toUpperCase().includes(".MOV") ||
                link.toUpperCase().includes(".WMV") || link.toUpperCase().includes(".FLV") ||
                link.toUpperCase().includes(".AVI") || link.toUpperCase().includes(".WebM") ||
                link.toUpperCase().includes(".AVCHD") || link.toUpperCase().includes(".MKV") ?
                    <Video source={{uri: link}} style={styles.video}/>
                :
                    <Image source={{uri: link}} style={styles.imgVwProfile} resizeMode={'contain'}/>
                }
            </View>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
        marginBottom: 8,
        marginLeft: 12,
        marginRight: 12,
        alignSelf: 'stretch',
    },
    imgVwCtn: {
        width: 158,
        height: 168,
        borderRadius: 4,
    },
    video: {
        height: 136,
        width: 120,
    },
    imgVwProfile: {
        width: 158,
        height: 168,
        borderRadius: 4,
        backgroundColor: 'white',
    }
})
