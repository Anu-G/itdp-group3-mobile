import { Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { Image, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
export const SLIDER_WIDTH = 376
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 7)

export const ImageViewTimeline = ({item, index}) => {
    return (
        <View style={{width: 376, height: 218, borderRadius: 10, backgroundColor: '#F4F4F4'}} key={index}>
            {   item.toUpperCase().includes(".MP4") || item.toUpperCase().includes(".MOV") ||
                item.toUpperCase().includes(".WMV") || item.toUpperCase().includes(".FLV") ||
                item.toUpperCase().includes(".AVI") || item.toUpperCase().includes(".WebM") ||
                item.toUpperCase().includes(".AVCHD") || item.toUpperCase().includes(".MKV") ?
                <Video source={{uri: item}} style={{width: 376, height: 218, borderRadius: 10}} useNativeControls={true} resizeMode={'contain'}/>
                :
                <Image source={{uri: item}} style={{width: 376, height: 218, borderRadius: 10}} resizeMode={'contain'}/>
            }
        </View>
    )
}

export const ImageViewTimelineMany = ({data}) => {
    const [index, setIndex] = useState(0)
    const isCarousel = useRef(null)

    return (
        <View>
            <Carousel
                layout='tinder'
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={ImageViewTimeline}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
                loop={true}
                inactiveSlideOpacity={1}
                removeClippedSubviews={false}
            />
            {/* <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: 'white',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                containerStyle={{paddingVertical: 0, paddingTop: 8}}
            /> */}
        </View>
    )
}