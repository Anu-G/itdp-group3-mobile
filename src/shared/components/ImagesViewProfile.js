import { Video } from 'expo-av'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
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
        marginTop: 4,
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'stretch',
    },
    imgVwCtn: {
        width: Dimensions.get('window').width * 0.3,
        height: 168,
        borderRadius: 4,
    },
    video: {
        height: 136,
        width: Dimensions.get('window').width * 0.3,
    },
    imgVwProfile: {
        width: Dimensions.get('window').width * 0.332,
        height: 168,
        borderRadius: 4,
        backgroundColor: 'white',
    }
})