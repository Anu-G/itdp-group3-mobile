import { FontAwesome } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Caption, TextProfile } from '../../shared/components/Label'
import { MainContainer } from '../../shared/components/MainContainer'
import { useDep } from '../../shared/context/DependencyContext'
import { useTheme } from '../../shared/context/ThemeContext'
import { checkErr } from '../../utils/CommonUtils'
import { Dimensions } from 'react-native'
import { Swiper } from '../../shared/components/Swiper'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DetailProductCard = ({ navigation }) => {
    const theme = useTheme()
    const styles = styling(theme)
    const route = useRoute()
    // state
    const [productId, setProductId] = useState()
    const [accountId, setAccountId] = useState()
    const [product, setProduct] = useState({
        product_id: 0,
        product_name: '',
        price: 0,
        description: '',
        detail_media_products: []
    })
    const [readMore, setReadMore] = useState(true)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage: () => <FontAwesome size={24} name='chevron-left' color={'#849EB9'} style={{ marginLeft: 4 }}/>,
        })
    })

    useEffect(() => {
        getDetailProduct()
    }, [])

    // service 
    const {productService} = useDep()

    const getDetailProduct = async () => {
        try {
            const response = await productService.doGetProductByProduct({
                product_id: `${route.params.data.productId}`,
                account_id: `${route.params.data.accountId}`
            })

            let resp = response.data.data
            if (resp.product_name !== '') {
                setProduct({
                    product_id: resp.product_id,
                    product_name: resp.product_name,
                    price: resp.price,
                    description: resp.description,
                    detail_media_products: resp.detail_media_products.map((item,i) => {
                        return {url: item, name: `${i+1}/${resp.detail_media_products.length}`}
                    })
                })
            }
        } catch (err) {
            console.log(err);
            checkErr(err)
        }
    }

    const handleReadMore = () => {
        setReadMore(!readMore)
    }

  return (
    <MainContainer>
        <View style={styles.detailProductBg}>
            <View style={{height: 250}}>
            <Swiper 
                imageWidth={windowWidth}
                imageHeight={250}
                images={product.detail_media_products} 
                swipeBottom={e => console.log('swipe bottom: ', e)}
                swipeTop={e => console.log('swipe top: ', e)}
                textSize={16}
            />
            </View>
            <View style={{paddingLeft: 16, paddingTop: 8}}>
                <TextProfile text={`Rp ${product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`} style={{fontSize: 24}}/>
                <Caption text={product.product_name} style={{fontSize: 20}}/>
                <Caption text={product.description} readMore={readMore} handleReadMore={handleReadMore}/>
            </View>
        </View>
    </MainContainer>
  )
}

const styling = (theme) => StyleSheet.create({
    detailProductBg:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255, 0.2)',
    },
})