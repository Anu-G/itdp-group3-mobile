import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Caption, TextProfile } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useTheme } from '../../shared/context/ThemeContext'

export const DetailProductCard = ({ handleClick, product }) => {
    const theme = useTheme()
    const styles = styling(theme)
    // state
    const avatar = product.avatar
    const name = product.profile_name
    const productName = product.product_name
    const productPrice = product.price
    const caption = product.caption
    const links = product.detail_media_products

    const [readMore, setReadMore] = useState(true)

    const handleReadMore = () => {
        setReadMore(!readMore)
    }

    return (
        <MainContainer>
            <View style={styles.detailProductBg}>
                <View style={styles.detailProductWrp}>
                    <View style={styles.detailProductCtn}>
                        <View>
                            <View style={styles.productHd}>
                                <Image source={{ uri: avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                <View style={styles.nameLocCtn}>
                                    <TextProfile text={name} />
                                </View>
                            </View>
                            <View style={styles.xBtn} onClick={handleClick}>
                                <FontAwesome name='xmark' size={20} />
                            </View>
                        </View>

                        <View style={styles.foodHd}>
                            <Caption text={productName} />
                            {/* <Caption text={price.format(productPrice)}/> */}
                            <Caption text={productPrice} />
                        </View>

                        <View style={styles.captionCtn}>
                            <Caption text={caption} readMore={readMore} handleReadMore={handleReadMore} />
                        </View>

                        <View>
                            <View style={styles.imgViewCtn}>
                                {/* {Array.isArray(links) && links.length !== 1 ? <ImagesViewTimelineMany links={links}/> : <ImageViewTimeline link={links}/>} */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </MainContainer>
    )
}

const styling = (theme) => StyleSheet.create({
    detailProductBg: {
        position: 'fixed',
        margin: 0,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    detailProductWrp: {
        minWidth: 300,
        minHeight: 200,
        position: 'absolute',
        backgroundColor: '#3B4046',
        borderRadius: 20,
    },
    detailProductCtn: {
        minHeight: 150,
        width: 200,
        padding: 16,
        flex: 1,
        flexDirection: 'column'
    },
    xBtn: {
        marginLeft: 0,
        // cursor:'pointer',
        color: '#FE5454',
        float: 'right',
    },
    imgViewCtn: {
        minHeight: 300,
    },
    foodHd: {
        margin: '16,0,0,0',
    },
})