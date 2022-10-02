import { Video } from 'expo-av'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export const ImagesViewProfile = ({ link, handleClick }) => {
    const theme = useTheme()
    const styles = styling(theme)

    const width = (Dimensions.get('window').width - 80) / 2;
    const height = width * 0.75

    return (
        <View style={styles.container}>
            <View style={styles.imgVwCtn}>
                {
                    link.toUpperCase().includes(".MP4") || link.toUpperCase().includes(".MOV") ||
                        link.toUpperCase().includes(".WMV") || link.toUpperCase().includes(".FLV") ||
                        link.toUpperCase().includes(".AVI") || link.toUpperCase().includes(".WebM") ||
                        link.toUpperCase().includes(".AVCHD") || link.toUpperCase().includes(".MKV") ?
                        <Video source={{ uri: link }} style={styles.video} />
                        :
                        <Image source={{ uri: link }} style={styles.imgVwProfile} resizeMode={'cover'} />
                }
            </View>
        </View>
    )
}

const styling = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 12,
        // marginBottom: 8,
        // marginLeft: 12,
        // marginRight: 12,
        alignSelf: 'stretch',
    },
    imgVwCtn: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 12
    },
    video: {
        height: 0,
        width: 0,
    },
    imgVwProfile: {
        width: (Dimensions.get('window').width - 80) / 2,
        height: ((Dimensions.get('window').width - 80) / 2) * 0.75,
        borderRadius: 4,
        backgroundColor: 'white',
    }
})