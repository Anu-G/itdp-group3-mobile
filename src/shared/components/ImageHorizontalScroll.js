import React from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

export const ImageHorizontalScroll = ({images = null}) => {
    const styles = styling()
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                images !== null && 
                    images.length > 1 ? 
                        images.map((link, i) => <Image source={{uri: link}} style={styles.image} key={i}/>)
                    :
                        <Image source={{uri: images[0]}} style={styles.image}/>
            }
        </ScrollView> 
    )
}

const styling = () => StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 4,
    }
})