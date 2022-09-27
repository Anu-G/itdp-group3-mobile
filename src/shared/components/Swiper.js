import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, StatusBar, Platform } from 'react-native';

const windowWidth = Dimensions.get('screen').width

export const Swiper = ({ images, textSize, textColor, textBold, textUnderline, imageHeight, imageWidth, swipeBottom, swipeTop, styleImage }) => {
    const height = imageHeight
    const handleClick = (e, item) => {
        if (e.nativeEvent.contentOffset.y < 0) {
            swipeBottom(item)
        } else {
            swipeTop(item)
        }
    }

    return (
        <ScrollView horizontal={true} pagingEnabled={true} style={{ marginVertical: 0 }}>
            {images &&
                images.map((item, index) => {
                    return (typeof item.url === 'string' && typeof item.name === 'string' ?
                        <ScrollView key={index} onScrollEndDrag={(e) => handleClick(e, item)}>
                            {item.url.toUpperCase().includes(".MP4") === true ?
                                <VideoPlayer
                                    videoProps={{
                                        shouldPlay: false,
                                        resizeMode: ResizeMode.CONTAIN,
                                        source: { uri: item.url.replace(/\s+/g, '') },
                                    }}
                                    slider={{ visible: false }}
                                    timeVisible={false}
                                    fullscreen={{ visible: false }}
                                    style={{ height: height, width: imageWidth, videoBackgroundColor: '#F4F4F4' }}
                                />
                                // <Video onError={error => {console.log(error)}} style={[{ height: height, width: imageWidth, backgroundColor:'white' }, styleImage]} useNativeControls={true} source={{ uri: item.url.replace(/\s+/g, '') }} resizeMode='contain'/>
                                :
                                <Image style={[{ height: height, width: imageWidth, backgroundColor: 'white' }, styleImage]} source={{ uri: item.url }} resizeMode={'contain'} />
                            }
                            <View style={styles.imageText}>
                                <Text style={[
                                    typeof textSize === 'number' && textSize > 0 && textSize <= 40 ? { fontSize: textSize } : { fontSize: 30 },
                                    typeof textBold === 'boolean' && textBold && { fontWeight: 'bold' },
                                    typeof textColor === 'string' && { color: textColor },
                                    typeof textUnderline === 'boolean' && textUnderline && { textDecorationLine: 'underline' },
                                    { backgroundColor: 'rgba(76, 74, 74, 0.1)', width: 30, borderRadius: 4, textAlign: 'center' }
                                ]}>
                                    {item.name && item.name}
                                </Text>
                            </View>
                        </ScrollView>
                        :
                        null
                    )
                })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageText: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    },
});
