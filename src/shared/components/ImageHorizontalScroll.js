import React from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import { ImageWithDeleteSign } from './ImageAddCatalog'

export const ImageHorizontalScroll = ({images = null, handleDeleteImage}) => {
    const styles = styling()
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                images !== null && 
                    images.length > 1 ? 
                        images.map((link, i) => <ImageWithDeleteSign source={link} handleClick={() => handleDeleteImage(i)} key={i} />)
                    :
                        <ImageWithDeleteSign source={images[0]} handleClick={() => handleDeleteImage(0)} />
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